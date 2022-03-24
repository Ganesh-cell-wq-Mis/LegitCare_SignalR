import { JsonPipe } from "@angular/common";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EndpointBase {
    constructor(){}
    protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let UserData = JSON.parse(sessionStorage.getItem('UserInformation') || '{}');

        const headers = new HttpHeaders({
          'Authorization': 'Bearer '+ UserData.access_token,
        });
        return ({ headers: headers });
      }
}
