import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private snackBar = inject(MatSnackBar);

  cartItems: any[] = [];

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: res => {
        this.cartItems[0] = res;
      }
    });
  }

  updateQuantity(productId: number, quantity: number) {

    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.cartService.updateCart(productId, quantity).subscribe({
      next: () => {
        this.loadCart(); 
      },
      error: (err) => {
        console.error("Update failed", err);
      }
    });
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart();
      this.snackBar.open("Product is Deleted Successfully", 'Close', {
          duration: 3000,
          panelClass: ['bg-danger', 'text-white']
        });
    });
  }

  placeOrder(){
    this.orderService.placeOrderService().subscribe({
      next: () => {
        this.loadCart();
        this.snackBar.open('Order is Placed Successfully', 'Close', {
          duration: 3000,
          panelClass: ['bg-success', 'text-white']
        });
      }
    })
  }
}
