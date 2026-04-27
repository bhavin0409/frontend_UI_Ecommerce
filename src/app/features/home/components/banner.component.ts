import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <section class="hero d-flex align-items-center">

    <div class="container-fluid px-5">
      <div class="row align-items-center">

        <div class="col-lg-6 text-white">
          <h1 class="display-2 fw-bold mb-4">
            Elevate Your Shopping Experience
          </h1>

          <p class="lead mb-4">
            Discover premium products, unbeatable deals, and a seamless shopping journey.
          </p>

          <div class="d-flex gap-3">
            <a routerLink="/products" class="btn btn-success btn-lg px-4">
              Shop Now
            </a>

            <a routerLink="/products" class="btn btn-outline-light btn-lg px-4">
              Explore
            </a>
          </div>
        </div>

        <div class="col-lg-6 text-center">
          <img src="assets/images/banner.png" class="img-fluid hero-img" />
        </div>

      </div>
    </div>

  </section>
  `,
  styles: [`
    .hero {
      height: 75vh;
      background: #0f2027;
    }

    .hero-img {
      max-height: 500px;
    }
  `]
})
export class BannerComponent {}