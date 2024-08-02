import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import State from "../model/State";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // attribut pour stocker des données de type State dans un Subject
  private notifySubject = new Subject<State>();

  // attribut qui transforme le Subject en Observable pour pouvoir souscrire aux changements dans d'autres composants
  data$ = this.notifySubject.asObservable();

  constructor() { }

  /**
   * Méthode pour déclencher un changement de state
   * cela declenche une notification à tous les composants qui souscrivent à data$
   * @param data
   * @return void
   * */
  transfer(data: State) {
    this.notifySubject.next(data);
  }
}
