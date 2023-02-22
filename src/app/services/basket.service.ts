import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Product } from '../model/product';

const API_GET_BASKETS = 'http://localhost:8088/api/basket';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' })
};


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http: HttpClient) { }
  
  getAll():Observable<any>{
    return this.http.get(API_GET_BASKETS)
  }
  getById(id:string):Observable<any>{
    return this.http.get(`${API_GET_BASKETS}/${id}`);
  }
  getByUser(user:User):Observable<any>{
    return this.http.get(`${API_GET_BASKETS+'/user'}/${user}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(API_GET_BASKETS, data, {responseType:'text' as 'json'})
  }
  update(id: number, id_product: number): Observable<string> {
    return this.http.put<string>(`${API_GET_BASKETS}/${id}`, id_product,{responseType: 'text' as 'json'});
  }
  deleteProduct(id: number, id_product: number): Observable<string> {
    return this.http.put<string>(`${API_GET_BASKETS+'/deleteproduct'}/${id}`, id_product,{responseType: 'text' as 'json'});
  }
  update2(id: number, product: Product): Observable<string> {
    return this.http.put<string>(`${API_GET_BASKETS+'/product'}/${id}`, product,{responseType: 'text' as 'json'});
  }
  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${API_GET_BASKETS}/${id}`, {responseType: 'text' as 'json'});
  }
}
