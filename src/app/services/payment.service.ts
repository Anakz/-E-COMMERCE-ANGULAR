import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

const API_GET_PAYMENTS = 'http://localhost:8088/api/payment';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(API_GET_PAYMENTS)
  }
  getById(id:string):Observable<any>{
    return this.http.get(`${API_GET_PAYMENTS}/${id}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(API_GET_PAYMENTS, data, {responseType:'text' as 'json'})
  }
  update(id: number, data: any): Observable<string> {
    return this.http.put<string>(`${API_GET_PAYMENTS}/${id}`, data,{responseType: 'text' as 'json'});
  }
  delete(id: number, data: Product): Observable<string> {
    return this.http.put<string>(`${API_GET_PAYMENTS+'/delete'}/${id}`, {responseType: 'text' as 'json'});
  }
}
