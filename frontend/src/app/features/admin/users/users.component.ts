import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { UserResponse } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);

  users          = signal<UserResponse[]>([]);
  pendingGuides  = signal<UserResponse[]>([]);
  loadingUsers   = signal(true);
  loadingGuides  = signal(true);
  togglingId     = signal<number | null>(null);
  approvingId    = signal<number | null>(null);
  rejectingId    = signal<number | null>(null);
  activeTab      = signal<'all' | 'pending'>('pending');

  ngOnInit(): void {
    this.loadUsers();
    this.loadPendingGuides();
  }

  loadUsers(): void {
    this.loadingUsers.set(true);
    this.userService.getAllUsers(0, 100).subscribe({
      next:  res => { this.users.set(res.content); this.loadingUsers.set(false); },
      error: ()  => this.loadingUsers.set(false)
    });
  }

  loadPendingGuides(): void {
    this.loadingGuides.set(true);
    this.userService.getPendingGuideRequests().subscribe({
      next:  res => { this.pendingGuides.set(res); this.loadingGuides.set(false); },
      error: ()  => this.loadingGuides.set(false)
    });
  }

  toggleStatus(user: UserResponse): void {
    this.togglingId.set(user.id);
    this.userService.updateUserStatus(user.id, !user.active).subscribe({
      next:  () => { this.togglingId.set(null); this.loadUsers(); },
      error: ()  => this.togglingId.set(null)
    });
  }

  approveGuide(id: number): void {
    this.approvingId.set(id);
    this.userService.approveGuide(id).subscribe({
      next:  () => { this.approvingId.set(null); this.loadPendingGuides(); this.loadUsers(); },
      error: ()  => this.approvingId.set(null)
    });
  }

  rejectGuide(id: number): void {
    if (!confirm('Reject this guide application?')) return;
    this.rejectingId.set(id);
    this.userService.rejectGuide(id).subscribe({
      next:  () => { this.rejectingId.set(null); this.loadPendingGuides(); },
      error: ()  => this.rejectingId.set(null)
    });
  }

  roleColor(role: string): string {
    switch (role) {
      case 'ADMIN':   return 'bg-purple-100 text-purple-700';
      case 'GUIDE':   return 'bg-orange-100 text-orange-700';
      case 'TOURIST': return 'bg-blue-100 text-blue-600';
      default:        return 'bg-gray-100 text-gray-500';
    }
  }

  formatLanguages(user: UserResponse): string {
    return user.languages?.map(l => l.name).join(', ') || '—';
  }
}
