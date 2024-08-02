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
  private notifySubject = new Subject<Popup>();

  data$ = this.notifySubject.asObservable();
  constructor() { }

  trigger(data: Popup) {
    this.notifySubject.next(data);
  }
}
