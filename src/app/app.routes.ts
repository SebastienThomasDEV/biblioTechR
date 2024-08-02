import { Routes } from '@angular/router';
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {BookListComponent} from "./components/book-list/book-list.component";

export const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'details/:id',
    component: BookDetailComponent
  }
];
