import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api = `${environment.apiUrl}/Cart`;

  private _cartCount = signal(0);
  cartCount = this._cartCount.asReadonly();
  
  constructor(private http: HttpClient) { }

  getCart(){
    return this.http.get<Cart>(this.api);
  }

  addToCart(productId:number , quantity:number = 1){
    return this.http.post(`${this.api}` , {
      productId,
      quantity
    });
  }

  removeFromCart(productId:number){
    return this.http.delete(`${this.api}/${productId}`);
  }

  updateCart(productId: number, quantity: number) {
  return this.http.patch(`${this.api}/update`, {
    productId,
    quantity
  });
}
  // loadingCartCount(){
  //   this.getCart().subscribe({
  //     next: (cart:any) => {
  //       const total = cart.Items.reduce((sum: number , i: any) => {
  //         return sum + i.quantity
  //       } , 0);
  //       this._cartCount = total;
  //     }
  //   });
  // }
}
