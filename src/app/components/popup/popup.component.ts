import {Component, OnInit} from '@angular/core';
import {Popup, PopupService} from "../../service/popup.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterLink
  ],
  templateUrl: './popup.component.html',
})
export class PopupComponent implements OnInit {

  popUps: Popup[] = [];


  constructor(private popupService: PopupService) {}

  ngOnInit() {
    console.log('PopupComponent initialized');
    this.popupService.data$.subscribe((popup: Popup) => {
      this.popUps.push(popup);
      setTimeout(() => {
        this.popUps.shift();
      }, 5000);
    });
  }

  getTextColor(type: string) {
    return type === 'error' ? 'text-red-500' : 'text-green-500';
  }

  getBorderColor(type: string) {
    return type === 'error' ? 'border-l border-red-500' : 'border-l border-green-500';
  }
}
