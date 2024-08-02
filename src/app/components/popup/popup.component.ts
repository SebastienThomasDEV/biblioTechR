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
      if (this.popUps.find(p => p.title === popup.title && p.message === popup.message && p.type === popup.type) === undefined) {
        this.popUps.push(popup);
      } else {
        console.log('Popup already exists');
      }
      setTimeout(() => {
        this.popUps.shift();
      }, 5000);
    });
  }

  getTextColor(type: string) {
    return type === 'error' ? 'text-red-500' : 'text-green-500';
  }

  getBorderColor(type: string) {
    return type === 'error' ? 'border border-red-500' : 'border border-green-500';
  }
}
