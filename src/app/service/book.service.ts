import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Book from "../model/Book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // attribut de l'URL de l'API
  private apiURL = 'http://localhost:3000/books';

  // attribut pour stocker les livres récupérés via l'API
  constructor(private http: HttpClient) { }

  /**
   * Méthode pour récupérer tous les livres
   * @return Observable<Book[]>
   */
  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }

  /**
   * Méthode pour récupérer un livre via son id
   * @param id
   * @return Observable<Book>
   *   */
  getBook(id: string) : Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }

  /**
   * Méthode pour créer un livre
   * @param book
   */
  createBook(book: Book) : Observable<Book> {
    return this.http.post<Book>(this.apiURL, book);
  }

  /**
   * Méthode pour mettre à jour un livre
   * @param book
   */
  updateBook(book: Book) : Observable<Book> {
    return this.http.put<Book>(`${this.apiURL}/${book.id}`, book);
  }

  /**
   * Méthode pour supprimer un livre
   * @param id
   */
  deleteBook(id: string) : Observable<Book> {
    return this.http.delete<Book>(`${this.apiURL}/${id}`);
  }
}
