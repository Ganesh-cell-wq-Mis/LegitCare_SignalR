import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serviceendpoint } from './data.service.spec';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private service:Serviceendpoint) { }
  getLogin(login: any): Observable<any> {
    return this.service.getLogin<any>(login);
  }
  getAdminMessages(email: any): Observable<any> {
    return this.service.getAdminMessage<any>(email);
  }
  getChats(): Observable<any> {
    return this.service.getChatDetails<any>();
  }
  registerUser(reg: any): Observable<any> {
    return this.service.registerUser<any>(reg);
  }
}
