import { Component } from '@angular/core';
import { BannerComponent } from "./components/banner.component";
import { WhyChooseUsComponent } from "./components/why-choose-us.component";
import { FaqComponent } from "./components/f&q.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, WhyChooseUsComponent, FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
