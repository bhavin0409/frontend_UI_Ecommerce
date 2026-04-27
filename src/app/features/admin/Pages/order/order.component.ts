import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  private adminService = inject(AdminService);
  orders: any = [];
  loadingId: number | null = null;
  filteredOrders: any[] = [];

  searchTerm: string = '';
  selectedStatus: string = '';
  sortOption: string = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders = async() => {
    await this.adminService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res;
        this.filteredOrders = [...this.orders];
      }
    })
  }

  updateStatus = (orderId: number, event: any) => {
  const status = event.target.value;;

  this.loadingId = orderId;

  this.adminService.updateOrderStatus(orderId, status).subscribe({
    next: () => {
      const order = this.orders.find((o : any) => o.id === orderId);
      
      if (order) {
        order.status = status;
      }
      this.loadingId = null;

    },
    error: (err) => {
      console.log("update order status is not working", err);
      this.loadingId = null;
    }
  });
};
  applyFilters() {
    let data = [...this.orders];

    if (this.searchTerm) {
      data = data.filter(order =>
        order.id.toString().includes(this.searchTerm) ||
        order.items.some((item: any) =>
          (item.productName || '').toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }

    if (this.selectedStatus) {
      data = data.filter(order => order.status === this.selectedStatus);
    }

    if (this.sortOption === 'date-desc') {
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (this.sortOption === 'date-asc') {
      data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    if (this.sortOption === 'amount-desc') {
      data.sort((a, b) => b.totalAmount - a.totalAmount);
    }

    if (this.sortOption === 'amount-asc') {
      data.sort((a, b) => a.totalAmount - b.totalAmount);
    }

    this.filteredOrders = data;
  }
  resetFilters() {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.sortOption = '';
    this.filteredOrders = [...this.orders];
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
