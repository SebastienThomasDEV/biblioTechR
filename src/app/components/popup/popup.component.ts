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

  // attribut pour stocker les données des popups, elle sera affichée dans le template quand elle sera remplie
  popUps: Popup[] = [];

  /**
   * Constructeur du composant
   * @param popupService
   */
  constructor(private popupService: PopupService) {}


  /**
   * Méthode appelée lors de l'initialisation du composant
   * Elle souscrit aux changements de données du popupService
   * Elle ajoute les popups dans la liste popUps
   * Elle supprime les popups après 5 second
   * @return void
   * */
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


  /**
   * Méthode pour retourner la couleur du texte en fonction du type de popup
   * @param type
   * @return string
   * */
  getTextColor(type: string) {
    return type === 'error' ? 'text-red-500' : 'text-green-500';
  }

  /**
   * Méthode pour retourner la couleur de fond en fonction du type de popup
   * @param type
   */
  getBorderColor(type: string) {
    return type === 'error' ? 'border border-red-500' : 'border border-green-500';
  }
}
