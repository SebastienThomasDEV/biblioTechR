import {Component, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Observable} from "rxjs";
import Book from "../../model/Book";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books?: Book[];

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      books => this.books = books
    );

  }
}
