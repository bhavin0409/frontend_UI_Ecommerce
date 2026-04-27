import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngAfterViewInit(): void {

    if (typeof window === 'undefined' || !window.google) {
      return;
    }
    
    window.google.accounts.id.initialize({
      client_id: `${environment.GOOGLE_CLIENT_ID}`,
      callback: (response: any) => this.handleGoogleLogin(response)
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "filled_blue", size: "large", width: 300}
    );
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.data.token);

        const role = this.auth.getUserRole();

        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }


      },
      error: () => {
        this.errorMsg = "Invalid credentails";
        this.loading = false;
      }
    });
  }

    handleGoogleLogin(response: any) {
    const idToken = response.credential;
    
    this.auth.googleLogin(idToken).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.data.token);
        const role = this.auth.getUserRole();
        localStorage.setItem("userEmail" , res.data.email);

        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }
}
