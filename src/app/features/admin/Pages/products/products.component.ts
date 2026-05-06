import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  allProducts: any[] = [];
  products: any[] = [];

  search: string = '';
  page: number = 1;
  loading: boolean = false;

  selectedProduct: any = {};

  // ✅ Your categories
  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Home Appliances' },
    { id: 5, name: 'Sports' }
  ];

  // ✅ Filter object
  filter = {
    minPrice: 0,
    maxPrice: Infinity,
    category: '',   // store category name
    sortBy: 'name',
    sortOrder: 'asc'
  };

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    this.productService.getProducts('', this.page)
      .subscribe({
        next: res => {
          this.allProducts = res.data;
          this.applyFilter();
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  // ✅ FILTER + SORT
  applyFilter() {
    let data = [...this.allProducts];

    // 🔍 Search
    if (this.search) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    // 💰 Price
    data = data.filter(p =>
      p.price >= this.filter.minPrice &&
      p.price <= this.filter.maxPrice
    );

    // 🏷 Category (using your list)
    if (this.filter.category) {
      data = data.filter(p =>
        p.categoryName?.toLowerCase() === this.filter.category.toLowerCase()
      );
    }

    // 🔽 Sorting
    data.sort((a, b) => {
      let valA = a[this.filter.sortBy];
      let valB = b[this.filter.sortBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      return this.filter.sortOrder === 'asc'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });

    

    this.products = data;
  }
resetFilters() {
  this.search = '';
  this.filter = {
    minPrice: 0,
    maxPrice: Infinity,
    category: '',
    sortBy: 'name',
    sortOrder: 'asc'
  };
  this.applyFilter();
}
  // ✅ Delete
  deleteProduct(productId: number) {
    const snack = this.snackBar.open(
      'Are you sure you want to delete this product?',
      'Delete',
      { duration: 5000, panelClass: ['bg-danger', 'text-white'] }
    );

    snack.onAction().subscribe(() => {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
          this.snackBar.open('Product deleted ✅', 'Close', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white']
          });
        },
        error: () => {
          this.snackBar.open('Delete failed ❌', 'Close', {
            duration: 3000,
            panelClass: ['bg-danger', 'text-white']
          });
        }
      });
    });
  }

  // ✅ Modal
  viewProduct(product: any) {
    this.selectedProduct = product;

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('productModal')
    );
    modal.show();
  }

  // ✅ Description
  get formattedDescription() {
    if (!this.selectedProduct?.description) return '';

    return this.selectedProduct.description
      .replace(/\n/g, '<br>')
      .replace(/✨/g, '<br>✨')
      .replace(/🎯/g, '<br><br>🎯');
  }
}