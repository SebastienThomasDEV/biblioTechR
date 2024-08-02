import {Component, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Observable} from "rxjs";
import Book from "../../model/Book";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {StateService} from "../../service/state.service";
import State from "../../model/State";
import {PopupService} from "../../service/popup.service";
import {BookFormComponent} from "../book-form/book-form.component";
import {ActivatedRoute, ParamMap, RouterLink, RouterLinkActive} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    BookFormComponent,
    NgClass
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books?: Book[];
  sideNavOpened = false;
  private selectedBookId: number = -1;

  constructor(private bookService: BookService, private stateService: StateService, private route: ActivatedRoute, private popupService: PopupService) {
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      books => this.books = books
    );
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedBookId = Number(params.get('id'));
        return this.bookService.getBooks();
      }));
    this.stateService.data$.subscribe((data: State) => {
      switch (data.action) {
        case 'create':
          if (data.props.book) {
            this.books?.push(data.props.book!);
          } else {
            this.popupService.trigger({
              title: 'Error',
              message: 'Book creation failed',
              type: 'error'
            });
          }
          break;
        case 'update':
          if (data.props.book) {
            this.books = this.books?.map((book: Book) => book.id === data.props.book?.id ? data.props.book! : book);
          } else {
            this.popupService.trigger({
              title: 'Error',
              message: 'Book update failed',
              type: 'error'
            });
          }
          break;
        case 'delete':
          if (data.props.book) {
            this.books = this.books?.filter((book: Book) => book.id !== data.props.book?.id);
          } else {
            this.popupService.trigger({
              title: 'Error',
              message: 'Book deletion failed',
              type: 'error'
            });
            break;
          }

          this.popupService.trigger({
            title: 'Success',
            message: `${data.props.book?.title} has been deleted`,
            type: 'success'
          });
          break;
        default:
          break;
      }
    });
  }

  deleteBook(id: string) {
    console.log('delete book', id);
    this.bookService.deleteBook(id).subscribe(
      (book: Book) => {
        const state = {action: 'delete', props: {book}};
        this.stateService.transfer(state);
      }
    );
  }

  toggleSideNav(bool?: boolean) {
    this.sideNavOpened = bool !== undefined ? bool : !this.sideNavOpened;
  }

}
