import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  baseURL = environment.apiUrl + 'api/user';

  constructor(private httpClient: HttpClient) {}

  findById(id: any): Observable<any>{
    return this.httpClient.get<any>(this.baseURL + '/' + id);
  }

  signIn(authRequest: any): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + '/signin', authRequest);
  }

  signOut(id: any): Observable<any> {
    return this.httpClient.put<any>(this.baseURL + '/sign-out/' + id, null);
  }

  signUp(request: any): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, request);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') != null;
  }

  public getUserId() {
    return localStorage.getItem('userId');
  }
  public getScheduleBoolean() {
    return localStorage.getItem('scheduleBoolean');
  }
  public getAccountBoolean() {
    return localStorage.getItem('accountBoolean');
  }
  getUserName(): any {
    return localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')!).displayName : '';
  }

  getUserPosition(): any {
    return localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')!).position : '';
  }

  public getToken(): any {
    return localStorage.getItem('accessToken');
  }
}
