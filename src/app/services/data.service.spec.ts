import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndpointBase } from './endpoint_base.service';
import { catchError, tap } from 'rxjs/operators';



@Injectable()
export class Serviceendpoint extends EndpointBase {
  baseUrl: string = environment.baseUrl;
  private readonly _login: string = '/api/Login';
  private readonly _chat: string = '/api/Message';
  private readonly _reg: string = '/api/Auth';


  get login() { return this.baseUrl + this._login }
  get chat() { return this.baseUrl + this._chat }
  get reg() { return this.baseUrl + this._reg}

  constructor(private http: HttpClient) {
    super();
  }

  getLogin<T>(login: any): Observable<any> {
    const endpointUrl = this.login + "/Login";
    console.log(JSON.stringify(endpointUrl));
    return this.http.post(endpointUrl, login).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.handleError)
    );
  }
getAdminMessage<T>(email: any): Observable<T> {
    const endpointUrl = this.chat+'/GetMessages?EmailId='+email;
    return this.http.get<T>(endpointUrl,this.requestHeaders).pipe(tap(data => {
      return data;
    }),
      catchError(this.handleError)
    );
  }
  getChatDetails<T>(): Observable<T> {

    const endpointUrl = this.chat + '/GetAll' ;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(tap(data => {
      return data;
    }),
      catchError(this.handleError)
    );
  }

  registerUser<T>(reg: any): Observable<T> {

    const endpointUrl = this.reg;
    return this.http.post<T>(endpointUrl,reg,this.requestHeaders).pipe(tap(data => {
      return data;
    }),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      console.error('An error occured:',error.message);
    }
    else{
      console.error('serverside error',error.message);
    }
    return throwError(error.message)
   };
}
