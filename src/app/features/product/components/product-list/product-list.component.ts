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
  products: Product[] = [];
  search: string = '';
  page: number = 1;
  loading: boolean = false;
  selectedProduct = signal<any>({});
  private snackBar = inject(MatSnackBar);

  constructor(
    private productService: ProductService,
    private cartservice: CartService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    this.productService.getProducts(this.search, this.page)
      .subscribe({
        next: res => {
          this.products = res.data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  viewProduct(id: number) {
    this.productService.getProductById(id).subscribe((res: any) => {
      this.selectedProduct.set(res.data);

      const modal = new (window as any).bootstrap.Modal(
        document.getElementById('productDetailsModal')
      );
      modal.show();
    });
  }
  
  get formattedDescription() {
    const product = this.selectedProduct();

    if (!product?.description) return '';

    return product.description
      .replace(/\n/g, '<br>')
      .replace(/✨/g, '<br>✨')
      .replace(/🎯/g, '<br><br>🎯');
  }

  onSearch() {
    this.page = 1;
    this.loadProducts();
  }

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
  addToCart(id: number) {
    this.cartservice.addToCart(id, 1).subscribe({
      next: () => {
        this.snackBar.open('Product is added to cart', 'Close', {
          duration: 3000,
          panelClass: ['bg-success', 'text-white']
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}
