import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../core/services/admin.service';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private adminService = inject(AdminService);

  stats: any = {};
  recentOrders: any[] = [];

  chart: any; // Chart instance

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    // Chart will be created AFTER view loads
  }

  loadDashboard() {
    this.adminService.getDashboardData().subscribe({
      next: (res: any) => {

        this.stats = res.data;
        this.recentOrders = res.data.recentOrders;

        const labels = res.data.sales.map((s: any) => s.date);
        const data = res.data.sales.map((s: any) => s.total);
        this.createChart(labels, data);        
      }
    });
  }

  createChart(labels: string[], data: number[]) {

  if (this.chart) {
    this.chart.destroy();
  }

  const ctx: any = document.getElementById('salesChart');

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 123, 255, 0.05)');

  this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Revenue',
        data: data,
        borderColor: '#007bff',
        backgroundColor: gradient,
        borderWidth: 3,
        tension: 0.4, 
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      animation: {
        duration: 1200, 
        easing: 'easeInOutQuart'
      },

      plugins: {
        legend: {
          display: true,
          labels: {
            font: { size: 14 }
          }
        },

        tooltip: {
          callbacks: {
            label: function(context: any) {
              return '₹ ' + context.raw.toLocaleString(); 
            }
          }
        }
      },

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return '₹ ' + value.toLocaleString(); 
            }
          }
        }
      }
    }
  });
}
}