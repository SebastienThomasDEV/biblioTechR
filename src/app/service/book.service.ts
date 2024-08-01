import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Book from "../model/Book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksSubject = new BehaviorSubject<Book[]>([]);
  private apiURL = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }

}
