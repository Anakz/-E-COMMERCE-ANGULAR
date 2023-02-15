import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

const API_GET_PRODUCTS = 'http://localhost:8088/api/product';

const httpOptions = {
headers: new HttpHeaders({ 
  'Content-Type': 'application/json'
})
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  getAll():Observable<any>{
    return this.http.get(API_GET_PRODUCTS)
  }
  getById(id:string):Observable<any>{
    return this.http.get(`${API_GET_PRODUCTS}/${id}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(API_GET_PRODUCTS, data, {responseType:'text' as 'json'})
  }
  update(id: number, data: any): Observable<string> {
    return this.http.put<string>(`${API_GET_PRODUCTS}/${id}`, data,{responseType: 'text' as 'json'});
  }
  delete(id: number, data: Product): Observable<string> {
    return this.http.put<string>(`${API_GET_PRODUCTS+'/delete'}/${id}`, {responseType: 'text' as 'json'});
  }
  // delete(id: number): Observable<string> {
  //   return this.http.delete<string>(`${API_GET_PRODUCTS}/${id}`, {responseType: 'text' as 'json'});
  // }
}
