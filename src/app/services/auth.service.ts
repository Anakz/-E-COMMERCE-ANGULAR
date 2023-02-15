import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8088/api/signin';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
  };

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  login(username:string, password:string): Observable<any>{
    let auth = {
      email:username,
      password:password
    }
    return this.http.post(AUTH_API, auth, httpOptions);
  }
  register(data:any):Observable<any>{
    return this.http.post(AUTH_API, data, {responseType:'text' as 'json'})
  }
}
