import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  public constructor(private router:Router) {}

  cartCount = this.cartService.cartCount;
  isLoggedIn = this.authService.isLoggedInSignal;
  
  isAdmin = computed(() => {
    if (!this.isLoggedIn()) return false;
    return this.authService.getUserRole() === 'Admin';
  });

  ngOnInit(): void {
    this.isLoggedIn();
    this.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
