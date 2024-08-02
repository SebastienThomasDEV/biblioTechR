import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import State from "../model/State";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private notifySubject = new Subject<State>();

  data$ = this.notifySubject.asObservable();

  transfer(data: State) {
    this.notifySubject.next(data);
  }

}
