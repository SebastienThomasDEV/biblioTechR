import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {EnumStatus} from "../../utils/EnumStatus";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './edit-book.component.html',
})
export class EditBookComponent implements OnInit {

  // attribut pour stocker l'id du livre
  bookId: string;

  // Object qui représente le formulaire de création de livre
  formBook: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
  });

  /**
   * Constructeur du composant
   * @param bookService
   * @param activatedRoute
   * @param router
   * @return void
   * */
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.bookId = this.activatedRoute.snapshot.params['id'];
  }

  /**
   * Méthode appelée lors de l'initialisation du composant
   * Elle récupère le livre via l'API
   * @return void
   */
  ngOnInit() {
    this.bookService.getBook(this.bookId).subscribe(book => {
      this.formBook.setValue({
        title: book.title,
        author: book.author,
        description: book.description,
        status: book.status
      })
    })
  }

  /**
   * Méthode qui est appelée lors de la soumission du formulaire
   * Elle récupère les données du formulaire et crée un livre
   * Elle envoie ensuite le livre créé à l'API
   *
   * Si la création est un succès, on notifie l'utilisateur
   * Sinon, on affiche un error d'erreur
   * Enfin, on reset le formulaire
   * @return void
   */
  onSubmit() {
    if (this.formBook.valid) {
      this.bookService.getBook(this.bookId).subscribe((book)=> {
        let newUpdatedBook = {
          ...this.formBook.getRawValue(),
          id: this.bookId
        }
        this.bookService.updateBook(newUpdatedBook).subscribe(() => {
          this.router.navigate(['']);
        })
      })

    }
  }

  protected readonly oncancel = oncancel;

  onCancel() {
    this.router.navigate(['']);
  }
}
