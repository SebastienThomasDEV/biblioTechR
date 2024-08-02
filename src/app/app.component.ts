import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BookListComponent} from "./components/book-list/book-list.component";
import {BookFormComponent} from "./components/book-form/book-form.component";
import {StateService} from "./service/state.service";
import {Popup, PopupService} from "./service/popup.service";
import {PopupComponent} from "./components/popup/popup.component";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookListComponent, BookFormComponent, PopupComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test';
  constructor() {}

  ngOnInit() {
    console.log('AppComponent initialized');
  }
}
