import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BookListComponent} from "../book-list/book-list.component";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import Book from "../../model/Book";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    BookListComponent
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit{
  book?: Book;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService) {}

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

  // gotoItems(book: Book) {
  //   const bookId = book ? book.id : null;
  //   // Pass along the book id if available
  //   // so that the BookList component can select that item.
  //   this.router.navigate(['/details', { id: bookId }]);
  // }


}
