import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: ` <div class="d-flex">

  <app-sidebar></app-sidebar>

  <div class="flex-grow-1 p-4" id="box">
    <router-outlet></router-outlet>
  </div>

</div>`,
  styles: `
  #box{
    height: 87.3vh;
    overflow: auto;
  }
  #box::-webkit-scrollbar {
    width: 6px;
  }
  #box::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
`
})
export class AdminLayoutComponent { }