import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { BookingResponse } from '../../../core/models/booking.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-guide-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html'
})
export class BookingsComponent implements OnInit {
  private readonly bookingService = inject(BookingService);
  readonly authService = inject(AuthService);

  bookings   = signal<BookingResponse[]>([]);
  loading    = signal(true);
  confirming = signal<number | null>(null);
  rejecting  = signal<number | null>(null);
  error      = signal('');

  ngOnInit(): void { this.loadBookings(); }

  loadBookings(): void {
    this.loading.set(true);
    this.bookingService.getMyBookings().subscribe({
      next:  res => { this.bookings.set(res); this.loading.set(false); },
      error: ()  => { this.error.set('Failed to load bookings.'); this.loading.set(false); }
    });
  }

  confirm(id: number): void {
    this.confirming.set(id);
    this.bookingService.confirmBooking(id).subscribe({
      next:  () => { this.confirming.set(null); this.loadBookings(); },
      error: ()  => this.confirming.set(null)
    });
  }

  reject(id: number): void {
    this.rejecting.set(id);
    this.bookingService.rejectBooking(id).subscribe({
      next:  () => { this.rejecting.set(null); this.loadBookings(); },
      error: ()  => this.rejecting.set(null)
    });
  }

  getPhotoUrl(path: string | undefined | null): string {
    return AuthService.getPhotoUrl(path);
  }

  statusColor(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700';
      case 'PENDING':   return 'bg-yellow-100 text-yellow-700';
      case 'CANCELLED': return 'bg-red-100 text-red-600';
      default:          return 'bg-gray-100 text-gray-500';
    }
  }
}
