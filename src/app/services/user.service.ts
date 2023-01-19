import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_GET_USERS = 'http://localhost:8088/api/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAll():Observable<any>{
    return this.http.get(API_GET_USERS)
  }
  getById(id:string):Observable<any>{
    return this.http.get(`${API_GET_USERS}/${id}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(API_GET_USERS, data, {responseType:'text' as 'json'})
  }
  update(id: number, data: any): Observable<string> {
    return this.http.put<string>(`${API_GET_USERS}/${id}`, data,{responseType: 'text' as 'json'});
  }
  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${API_GET_USERS}/${id}`, {responseType: 'text' as 'json'});
  }
}
