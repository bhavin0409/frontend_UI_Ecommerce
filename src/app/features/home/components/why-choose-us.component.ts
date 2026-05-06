import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-why-choose-us',
    standalone: true,
    imports: [CommonModule],
    template: `
  <section class="section-dark">

    <div class="container-fluid px-5">

      <h2 class="text-center text-white fw-bold mb-5 section-title">
        Why Choose Us?
      </h2>

      <div class="row g-4">

        <div class="col-md-4" *ngFor="let item of features">
          <div class="card feature-card text-center p-4">

            <div class="icon mb-3 text-success">{{ item.icon }}</div>

            <h5 class="fw-bold text-white">{{ item.title }}</h5>

            <p class="text-light">
              {{ item.description }}
            </p>

          </div>
        </div>

      </div>

    </div>

  </section>
  `,
    styles: [`
    .section-dark {
      height: 45vh;     
      background: #0f2027;
    }
    @media (max-width: 992px) {
    .section-dark {
        height: auto;
        padding: 50px 15px;
    }
    }

    @media (max-width: 576px) {
    .section-dark {
        height: auto;
        padding: 40px 10px;
    }
    }

    .feature-card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      transition: 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-10px);
    }

    .icon {
      font-size: 2rem;
    }

    .section-title::after {
      content: "";
      width: 80px;
      height: 4px;
      background: #20c997;
      display: block;
      margin: 10px auto;
    }
  `]
})
export class WhyChooseUsComponent {

    features = [
        {
            icon: '✔',
            title: 'Quality Products',
            description: 'We ensure every product meets high quality standards.'
        },
        {
            icon: '🚚',
            title: 'Fast Delivery',
            description: 'Quick and reliable delivery right to your doorstep.'
        },
        {
            icon: '💬',
            title: 'Customer Support',
            description: 'Friendly support team available to help you anytime.'
        }
    ];

}