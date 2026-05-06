import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  allProducts: Product[] = [];   // 🔥 original
  products: Product[] = [];      // 🔥 filtered

  search: string = '';
  page: number = 1;
  loading: boolean = false;

  selectedProduct = signal<any>({});

  private snackBar = inject(MatSnackBar);

  constructor(
    private productService: ProductService,
    private cartservice: CartService
  ) { }

  // ✅ Categories
  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Home Appliances' },
    { id: 5, name: 'Sports' }
  ];

  // ✅ Filter object
  filter = {
    minPrice: -Infinity,
    maxPrice: Infinity,
    category: '',
    sortBy: 'name',
    sortOrder: 'asc'
  };

  ngOnInit() {
    this.loadProducts();
  }

  // ✅ Load data
  loadProducts() {
    this.loading = true;

    this.productService.getProducts('', this.page)
      .subscribe({
        next: res => {
          this.allProducts = res.data;
          this.applyFilter(); // 🔥 apply filtering
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

    // 🏷 Category
    if (this.filter.category) {
      data = data.filter(p =>
        p.categoryName?.toLowerCase() === this.filter.category.toLowerCase()
      );
    }

    // 🔽 Sorting
    data.sort((a: any, b: any) => {
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

  // ✅ View Product
  viewProduct(id: number) {
    this.productService.getProductById(id).subscribe((res: any) => {
      this.selectedProduct.set(res.data);

      const modal = new (window as any).bootstrap.Modal(
        document.getElementById('productDetailsModal')
      );
      modal.show();
    });
  }

  // ✅ Description
  get formattedDescription() {
    const product = this.selectedProduct();

    if (!product?.description) return '';

    return product.description
      .replace(/\n/g, '<br>')
      .replace(/✨/g, '<br>✨')
      .replace(/🎯/g, '<br><br>🎯');
  }

  // ✅ Pagination (reapply filter)
  nextPage() {
    this.page++;
    this.loadProducts();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  // ✅ Add to cart
  addToCart(id: number) {
    this.cartservice.addToCart(id, 1).subscribe({
      next: () => {
        this.snackBar.open('Product added to cart ✅', 'Close', {
          duration: 3000,
          panelClass: ['bg-success', 'text-white']
        });
      },
      error: () => {
        this.snackBar.open('Failed ❌', 'Close', {
          duration: 3000
        });
      }
    });
  }

  // ✅ Reset filters
  resetFilters() {
    this.search = '';
    this.filter = {
      minPrice: -Infinity,
      maxPrice: Infinity,
      category: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    this.applyFilter();
  }
}