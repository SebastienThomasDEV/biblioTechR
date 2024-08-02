import {Component, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Observable} from "rxjs";
import Book from "../../model/Book";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {StateService} from "../../service/state.service";
import State from "../../model/State";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books?: Book[];

  constructor(private bookService: BookService, private stateService: StateService) {
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      books => this.books = books
    );
    this.stateService.data$.subscribe((data: State) => {
      switch (data.action) {
        case 'create':
          this.books?.push(data.props.book!);
          break;
        case 'update':
          const index = this.books?.findIndex((book: Book) => book.id === data.props.book?.id);
          if (index !== undefined && index !== -1) {
            this.books?.splice(index, 1, data.props.book!);
          }
          break;
        case 'delete':
          const indexDelete = this.books?.findIndex((book: Book) => book.id === data.props.book?.id);
          if (indexDelete !== undefined && indexDelete !== -1) {
            this.books?.splice(indexDelete, 1);
          }
          break;
        default:
          break;
      }
    });
  }
}
