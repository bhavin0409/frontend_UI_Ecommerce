import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  private adminService = inject(AdminService);

  users: any[] = [];
  filteredUsers: any[] = []; 
  searchText: string = '';    

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUser().subscribe({
      next: (res: any) => {        
        this.users = res.data;
        this.filteredUsers = res.data; 
      }
    });
  }

  onSearch() {
    const search = this.searchText.toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.role?.toLowerCase().includes(search)
    );
  }
}