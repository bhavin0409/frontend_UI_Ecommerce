import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api = `${environment.apiUrl}/Orders`;
  constructor(private http: HttpClient) { }

  getOrdersByUser(){
    return this.http.get(`${this.api}`);
  }

  placeOrderService(){
    return this.http.post(`${this.api}`, null);
  }
}
