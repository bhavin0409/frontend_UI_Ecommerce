import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderComponent } from '../../shared/components/order/order.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule , OrderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private authService = inject(AuthService);
  private email: any = localStorage.getItem("userEmail");
  isLoggedIn = this.authService.isLoggedInSignal;
  isAdmin = computed(() => {
    if (!this.isLoggedIn()) return false;
    return this.authService.getUserRole() === 'Admin';
  });


  public user: any = {};
  public loading: boolean = false;
  public successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  editForm = this.fb.group({
    Id: [0],
    UserName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  loadUser = () => {
    this.authService.getUser(this.email).subscribe({
      next: (res) => {
        this.user = res;
            console.log(this.user);
        this.editForm.patchValue({
          Id: this.user.id,
          UserName: this.user.userName,
          email: this.user.email
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  editProfile() {
    if (this.editForm.invalid) return;

    this.loading = true;

    this.authService.updateUser(this.editForm.value).subscribe({
      next: () => {
        this.successMsg = "User Profile Updated ✅";
        this.loading = false;
        this.router.navigate(['/profile']);
        this.loadUser();
      },
      error: (err) => {
        this.successMsg = err.error?.message || "Failed to Update ❌";
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.loadUser();    
    this.isAdmin();
  }
}