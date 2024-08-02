import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Book from "../model/Book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiURL = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }
  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }
  getBook(id: string) : Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }
  createBook(book: Book) : Observable<Book> {
    return this.http.post<Book>(this.apiURL, book);
  }
}
