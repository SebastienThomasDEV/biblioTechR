import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import Book from "../../model/Book";
import {EnumStatus} from "../../utils/EnumStatus";
import {BookService} from "../../service/book.service";
import {StateService} from "../../service/state.service";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {PopupService} from "../../service/popup.service";

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgIf, NgClass
  ],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {

  // EventEmitter pour fermer la sideNav
  @Output() closeSideNav: EventEmitter<boolean> = new EventEmitter(); // boolean pour fermer le sideNav

  // error de feedback pour l'utilisateur

  // Décrit les validateurs pour les champs du formulaire
  // pour chaque champ, on a une liste de validateurs qui checkent
  // si le champ est requis, s'il a une longueur minimale de 1 et s'il n'est pas nul
  validators: Validators = [
    Validators.required,
    Validators.minLength(1),
    Validators.nullValidator
  ]

  // Object qui représente le formulaire de création de livre, on lui passe les validateurs
  formBook: FormGroup = new FormGroup({
    title: new FormControl('', this.validators),
    author: new FormControl('', this.validators),
    description: new FormControl('', this.validators),
    status: new FormControl(EnumStatus.AVAILABLE, this.validators),
  });

  constructor(
    private bookService: BookService,
    private stateService: StateService,
    private popupService: PopupService,
    private router: Router)
  {}

  ngOnInit() {}


  /**
   * Méthode qui est appelée lors de la soumission du formulaire
   * Elle récupère les données du formulaire et crée un livre
   * Elle envoie ensuite le livre créé à l'API
   *
   * Si la création est un succès, on notifie l'utilisateur
   * Sinon, on affiche un error d'erreur
   * Enfin, on reset le formulaire
   *
   *
   * @returns void
   */
  onSubmit() {
    const book: Book = this.formBook.value;
    const validity = this.checkControlsInvalidity(this.formBook);
    if (validity.length > 0) {
      this.popupService.trigger({type: 'error', message: `The following fields are invalid: ${validity.join(', ')}`, title: 'Error'});
      return;
    }
    this.bookService.createBook(book).subscribe({
      next: (book: Book) => {
        const state = {action: 'create', props: {book}};
        this.stateService.transfer(state);
        this.popupService.trigger({type: 'success', message: 'Book created successfully', title: 'Success'});
        this.closeSideNav.emit(false);
      },
      error: (error) => {
        this.popupService.trigger({type: 'error', message: error, title: 'Error'});
      },
      complete: () => {
        this.formBook.reset();
        this.formBook.controls['status'].setValue(EnumStatus.AVAILABLE);
      }
    });
  }

  /**
   * Méthode qui checke si les champs du formulaire sont invalides
   * Elle retourne un tableau contenant les champs invalides
   *
   * @param form
   */
  checkControlsInvalidity(form: FormGroup) {
    const invalidControls = [];
    for (const key in form.controls) {
      if (this.formBook.controls[key].invalid) {
        invalidControls.push(key);
      }
    }
    return invalidControls;
  }


  /**
   * Méthode qui checke si un champ est invalide
   * Elle retourne un boolean
   *
   * @param control
   * @returns boolean
   * */
  toggleErrorClass(control: string) {
    return this.formBook.controls[control].invalid && this.formBook.controls[control].touched;
  }





}
