import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  loading: boolean = false;
  productId !: number;
  selectedFile: File | null = null;
  previewUrl: string = "";

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    categoryId: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadProduct();
  }
  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res: any) => {
        const product: any = res.data;

        this.productForm.patchValue({
          ...product,
          categoryId: Number(product.categoryId)
        });
        this.previewUrl = 'https://localhost:7225' + product.imageUrl;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateProduct() {
  if (this.productForm.invalid) return;

  this.loading = true;

  const formData = new FormData();

  Object.entries(this.productForm.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value as any);
    }
  });

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }
  
  let id = this.productId;
  
  this.productService.updateProduct(id ,formData).subscribe({
    next: () => {
      this.loading = false;
      
      this.snackBar.open('Product updated ✅', 'Close', {
        duration: 2000,
        panelClass: ['bg-success', 'text-white']
      });
      
      this.router.navigate(['/admin/products']);
    },
    error: () => {
      this.loading = false;

      this.snackBar.open('Update failed ❌', 'Close', {
        duration: 3000,
        panelClass: ['bg-danger', 'text-white']
      });
    }
  });
}
}

