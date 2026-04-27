import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
  loading:boolean = false;
  successMsg:string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){}

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

  registerForm = this.fb.group({
    UserName: ['' , Validators.required],
    email: ['' , [Validators.required , Validators.email]],
    password: ['', [Validators.required , Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }

    this.loading = true;

    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.successMsg = 'Registration successful!';
        this.router.navigate(['/auth/login']);
      },
      error: () => {
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
