import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  selectedFile!: File;
  
  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Home Appliances' },
    { id: 5, name: 'Sports' }
  ];

  productForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/) // no special chars
      ]
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10000)
      ]
    ],

    price: [
      0,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000)
      ]
    ],

    stock: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(10000)
      ]
    ],

    categoryId: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    image: [
      null,
      [
        Validators.required
      ]
    ]
  });

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.snackBar.open('Only PNG/JPG allowed', 'Close', {
        duration: 3000,
        panelClass: ['bg-danger', 'text-white']
      });
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      this.snackBar.open('Max file size is 2MB', 'Close', {
        duration: 3000,
        panelClass: ['bg-danger', 'text-white']
      });
      return;
    }

    this.selectedFile = file;
    this.productForm.patchValue({ image: file });
  }

  addProduct() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('name', this.productForm.value.name!);
    formData.append('description', this.productForm.value.description!);
    formData.append('price', this.productForm.value.price!.toString());
    formData.append('stock', this.productForm.value.stock!.toString());
    formData.append('categoryId', this.productForm.value.categoryId!.toString());

    // file
    formData.append('image', this.selectedFile);

    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.snackBar.open('Product Added ✅', 'Close', {
          duration: 3000,
          panelClass: ['bg-success', 'text-white']
        });
        this.productForm.reset();
      },
      error: (err) => {
        console.log("Product is not added", err);
      }
    });
  }
}
