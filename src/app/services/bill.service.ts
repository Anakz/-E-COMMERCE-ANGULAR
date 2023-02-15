import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

const API_GET_BILLS = 'http://localhost:8088/api/bill';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(API_GET_BILLS)
  }
  getById(id:string):Observable<any>{
    return this.http.get(`${API_GET_BILLS}/${id}`);
  }
  create(data:any):Observable<any>{
    return this.http.post(API_GET_BILLS, data, {responseType:'text' as 'json'})
  }
  update(id: number, data: any): Observable<string> {
    return this.http.put<string>(`${API_GET_BILLS}/${id}`, data,{responseType: 'text' as 'json'});
  }
  delete(id: number, data: Product): Observable<string> {
    return this.http.put<string>(`${API_GET_BILLS+'/delete'}/${id}`, {responseType: 'text' as 'json'});
  }

}
