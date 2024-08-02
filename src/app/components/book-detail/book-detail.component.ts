import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BookListComponent} from "../book-list/book-list.component";
import { Router, ActivatedRoute } from '@angular/router';
import Book from "../../model/Book";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    BookListComponent,
    NgClass
  ],
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit{

  // variable pour stocker le livre
  book?: Book;
  // variable pour stocker le message
  message: string = '';


  /**
   * Constructeur du composant
   * @param route
   * @param router
   * @param bookService
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService) {}


  /**
   * Méthode appelée lors de l'initialisation du composant
   * Elle récupère l'id du livre dans l'url et récupère le livre correspondant
   *
   * Si la récupération est un succès, on stocke le livre dans la variable book
   * Sinon, on affiche un message d'erreur
   *
   * @return void
   */
  ngOnInit() {
    const bookId: string = this.route.snapshot.paramMap.get('id') || '';
    this.bookService.getBook(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.message = `Détails du livre avec l'id: ${bookId}`;
      },
      error: (error) => {
        this.message = `Erreur lors de la récupération du livre avec l'id: ${bookId}`;
      }
    });
  }


  /**
   * Méthode pour supprimer un livre
   * Si le livre existe, on appelle le service pour supprimer le livre
   * Si la suppression est un succès, on redirige l'utilisateur vers la liste des livres
   * Sinon, on affiche un message d'erreur
   * @return void
   */
  deleteBook() {
    if (this.book) {
      this.bookService.deleteBook(this.book.id!).subscribe({
        next: (response) => {
          return this.router.navigate(['/']);
        },
        error: (error) => {
          this.message = `Erreur lors de la suppression du livre avec l'id: ${this.book?.id}`;
        }
      });
    }
  }


  /**
   * Méthode pour éditer un livre
   * Si le livre existe, on redirige l'utilisateur vers la page d'édition du livre
   * @return void
   */
  editBook() {
    if (this.book) {
      return this.router.navigate(['/edit', this.book.id]);
    }
    return null;
  }



}
