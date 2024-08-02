import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {EnumStatus} from "../../utils/EnumStatus";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent implements OnInit {

  bookId: string;

  formBook: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.bookId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.bookService.getBook(this.bookId).subscribe(book => {
      this.formBook.setValue({
        title: book.title,
        author: book.author,
        description: book.description,
        status: book.status
      })
    })
  }

  onSubmit() {
    if (this.formBook.valid) {
      this.bookService.getBook(this.bookId).subscribe((book)=> {
        let newUpdatedBook = {
          ...this.formBook.getRawValue(),
          id: this.bookId
        }
        this.bookService.updateBook(newUpdatedBook).subscribe(() => {
          this.router.navigate(['']);
        })
      })

    }
  }

}
