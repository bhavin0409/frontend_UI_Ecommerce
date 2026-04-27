import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <footer class="footer bg-dark text-light pt-5 pb-3" *ngIf="!isAdmin()">

    <div class="container-fluid text-center">

      <div class="row justify-content-center">

        <div class="col-lg-4 col-md-6 mb-4">
          <img src="assets/images/logo.png" class="mb-3" width="120">

          <p class="text-secondary">
            Delivering quality products right to your doorstep. Enjoy exclusive offers 
            and seamless shopping experiences with us.
          </p>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <h6 class="fw-bold mb-3">Quick Links</h6>

          <ul class="list-unstyled">
            <li><a routerLink="/" class="footer-link">Home</a></li>
            <li><a routerLink="/products" class="footer-link">Products</a></li>
            <li><a routerLink="/cart" class="footer-link">Cart</a></li>
            <li><a routerLink="/about" class="footer-link">About</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <h6 class="fw-bold mb-3">Support</h6>

          <ul class="list-unstyled">
            <li><a href="#" class="footer-link">FAQs</a></li>
            <li><a href="#" class="footer-link">Shipping</a></li>
            <li><a href="#" class="footer-link">Returns</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <hr class="border-secondary">

      <div class="small text-secondary">
        © 2026 E-Shop. All Rights Reserved.
      </div>

    </div>

  </footer>
  `,
  styles: [`
    .footer {
      background: #0f2027;
    }

    .footer-link {
      color: #adb5bd;
      text-decoration: none;
      display: block;
      margin-bottom: 6px;
      transition: 0.3s;
    }

    .footer-link:hover {
      color: #20c997;
    }
  `]
})
export class FooterComponent implements OnInit{
  private authService = inject(AuthService);
  
    isLoggedIn = this.authService.isLoggedInSignal;
  
    isAdmin = computed(() => {
      if (!this.isLoggedIn()) return false;
      return this.authService.getUserRole() === 'Admin';
    });
  
    ngOnInit(): void {
      this.isAdmin();
    }
}