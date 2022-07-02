import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LineTokenInfo, LineUserInfo, LineUserProfile } from './models/line.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  doLogin() {
    let client_id = '1657262818';
    let redirect_uri = 'http://localhost:4200/';
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += '&client_id=' + client_id;
    link += '&redirect_uri=' + redirect_uri;
    link += '&state=login';
    link += '&scope=profile%20openid%20email';
    window.location.href = link;
  }

  getToken(code: string): Observable<LineTokenInfo> {
    const lineLoginTokenUrl = `https://api.line.me/oauth2/v2.1/token`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = {
      headers
    };

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: encodeURI('http://localhost:4200/'),
      client_id: '1657262818',
      client_secret: '7e24e5aeb5f90630cc9d145c88ce38af'
    });

    return this.http.post<LineTokenInfo>(lineLoginTokenUrl, body, options);
  }

  getUserInfo(token: string) {
    const userInfoUrl = `https://api.line.me/oauth2/v2.1/userinfo`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers,
    };
    return this.http.get<LineUserInfo>(userInfoUrl, requestOptions);
  }

  getProfile(token: string) {
    const userInfoUrl = `https://api.line.me/v2/profile`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers,
    };
    return this.http.get<LineUserProfile>(userInfoUrl, requestOptions);
  }

  revokeToken(token: string): Observable<any> {
    const revokeTokenUrl = `https://api.line.me/oauth2/v2.1/revoke`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = {
      headers
    };

    const body = new URLSearchParams({
      access_token: token,
      client_id: '1657262818',
      client_secret: '7e24e5aeb5f90630cc9d145c88ce38af'
    });

    return this.http.post<any>(revokeTokenUrl, body, options);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    // this.messageService.add(`Service: ${message}`);
    console.log(`MessageService: ${message}`);
  }
}
