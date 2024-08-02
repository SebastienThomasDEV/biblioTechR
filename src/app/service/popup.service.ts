import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import State from "../model/State";


export interface Popup {
  title: string;
  message: string;
  type: string;
}
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  // attribut pour stocker des données de type Popup dans un Subject
  private notifySubject = new Subject<Popup>();

  // attribut qui transforme le Subject en Observable pour pouvoir souscrire aux changements dans d'autres composants
  data$ = this.notifySubject.asObservable();
  constructor() { }

  /**
   * Méthode pour déclencher l'affichage d'un popup
   * cela declenche une notification à tous les composants qui souscrivent à data$
   * @param data
   * @return void
   * */
  trigger(data: Popup) {
    this.notifySubject.next(data);
  }
}
