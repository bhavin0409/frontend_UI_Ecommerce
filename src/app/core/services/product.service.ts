import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private api = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) { }

  getProducts(search: string = "", page: number = 1) {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page);

    return this.http.get<ApiResponse<Product[]>>(this.api, { params })
  }

  getProductById(productId: number) {
    return this.http.get(`${this.api}/${productId}`);
  }

  getAllProduct() {
    return this.http.get(`${this.api}/GetAll`);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.api}/${productId}`);
  }

  addProduct(data: FormData) {
    return this.http.post(`${this.api}`, data);
  }

  updateProduct(productId : number , data:FormData){
    console.log(productId , data);
    
    return this.http.put(`${this.api}/${productId}` , data);
  }
}
