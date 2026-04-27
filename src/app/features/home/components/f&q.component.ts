import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="section-dark">

    <div class="container-fluid px-5 py-5">

      <h2 class="text-center text-white fw-bold mb-5 section-title">
        Frequently Asked Questions
      </h2>

      <div class="accordion" id="faqAccordion">

        <div class="accordion-item"
             *ngFor="let faq of faqs; let i = index">

          <h2 class="accordion-header">
            <button class="accordion-button"
                    [class.collapsed]="i !== 0"
                    data-bs-toggle="collapse"
                    [attr.data-bs-target]="'#faq' + i">

              {{ faq.question }}

            </button>
          </h2>

          <div [id]="'faq' + i"
               class="accordion-collapse collapse"
               [class.show]="i === 0">

            <div class="accordion-body">
              {{ faq.answer }}
            </div>

          </div>

        </div>

      </div>

    </div>

  </section>
  `,
  styles: [`
    .section-dark {
      background: #0f2027;
    }

    .accordion-item {
      background: rgba(255,255,255,0.05);
      border: none;
      margin-bottom: 10px;
    }

    .accordion-button {
      background: transparent;
      color: white;
    }

    .accordion-body {
      color: #ddd;
    }
  `]
})
export class FaqComponent {

  faqs = [
    {
      question: 'What is the return policy?',
      answer: 'You can return any product within 30 days of purchase for a full refund, provided it is unused and in its original packaging.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5–7 business days. Express delivery options are available during checkout.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping fees and delivery timelines depend on your location.'
    },
    {
      question: 'Is Cash on Delivery (COD) available?',
      answer: 'Yes, Cash on Delivery is available on selected products and locations. Availability will be shown during checkout.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking link via email and can also track it from the “My Orders” section.'
    }
  ];

}