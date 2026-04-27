import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: any = {};
  orderItems: any = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.orderService.getOrdersByUser().subscribe({
      next: (res: any) => {
        this.orders = res;
      }
    })
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Delivered':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
