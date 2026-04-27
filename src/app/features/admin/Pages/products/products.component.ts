import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any = [];
  search: string = '';
  page: number = 1;
  loading: boolean = false;
  selectedProduct: any = {};
  private snackBar = inject(MatSnackBar);

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.search, this.page)
      .subscribe({
        next: res => {
          this.products = res.data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  

  deleteProduct(productId: number) {

    const snack = this.snackBar.open(
      'Are you sure you want to delete this product?',
      'Delete',
      {
        duration: 5000,
        panelClass: ['bg-danger', 'text-white']
      }
    );

    snack.onAction().subscribe(() => {
      // 👉 User clicked DELETE
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();

          // ✅ Success message
          this.snackBar.open('Product deleted successfully ✅', 'Close', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white']
          });
        },
        error: () => {
          this.snackBar.open('Failed to delete product ❌', 'Close', {
            duration: 3000,
            panelClass: ['bg-danger', 'text-white']
          });
        }
      });
    });
  }

  viewProduct(product: any) {
    this.selectedProduct = product;

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('productModal')
    );
    modal.show();
  }
  onSearch() {
    this.page = 1;
    this.loadProducts();
  }

  confirmDelete(id: number) {
    const confirmAction = confirm("Are you sure you want to delete this product?");

    if (confirmAction) {
      this.deleteProduct(id);
    }
  }

  get formattedDescription() {
    if (!this.selectedProduct?.description) return '';

    return this.selectedProduct.description
      .replace(/\n/g, '<br>')       // line breaks
      .replace(/✨/g, '<br>✨')     // spacing before emoji
      .replace(/🎯/g, '<br><br>🎯'); // section spacing
  }
}
