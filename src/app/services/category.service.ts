import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

const API_GET_CATEGORY = 'http://localhost:8088/api/category';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(API_GET_CATEGORY)
  }
  getByName(name:string):Observable<any>{
    return this.http.get(`${API_GET_CATEGORY+'/name'}/${name}`)
  }
  getById(id:number):Observable<any>{
    return this.http.get(`${API_GET_CATEGORY}/${id}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(API_GET_CATEGORY, data, {responseType:'text' as 'json'})
  }
  update(id: number, data: any): Observable<string> {
    return this.http.put<string>(`${API_GET_CATEGORY}/${id}`, data,{responseType: 'text' as 'json'});
  }
  delete(id: number, data: Category): Observable<string> {
    return this.http.put<string>(`${API_GET_CATEGORY+'/delete'}/${id}`, {responseType: 'text' as 'json'});
  }
  // delete(id: number): Observable<string> {
  //   return this.http.delete<string>(`${API_GET_CATEGORY}/${id}`, {responseType: 'text' as 'json'});
  // }
}
