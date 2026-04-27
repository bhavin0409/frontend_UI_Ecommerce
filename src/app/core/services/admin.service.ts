import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = `${environment.apiUrl}/Admin`

  constructor(private http: HttpClient){}

  getDashboardData(){
    return this.http.get(`${this.api}/dashboard`);
  }
  
  getAllUser(){
    return this.http.get(`${this.api}/users`);
  }

  getAllOrders(){
    return this.http.get(`${this.api}/orders`);
  }

  updateOrderStatus(orderId: number, status: string) {
  return this.http.put(
    `${this.api}/orders/${orderId}?status=${status}`,
    {} 
  );
}
}
