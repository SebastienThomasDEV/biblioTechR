import { Routes } from '@angular/router';
import {BookDetailComponent} from "./components/book-detail/book-detail.component";
import {BookListComponent} from "./components/book-list/book-list.component";
import {EditBookComponent} from "./components/edit-book/edit-book.component";

export const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'details/:id',
    component: BookDetailComponent
  },
  {
    path: 'edit/:id',
    component: EditBookComponent
  }

];
