import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {
  // Static Mock Data for Admin Tours Table
  tours = [
    {
      id: 1,
      title: 'Sahara Desert 3-Day Trek',
      city: 'Merzouga',
      price: 1500,
      guide: { firstName: 'Ahmed', lastName: 'Ziani' },
      category: { name: 'Adventure' },
      status: 'PUBLISHED',
      availableSeats: 12
    },
    {
      id: 2,
      title: 'Chefchaouen Photography Tour',
      city: 'Chefchaouen',
      price: 450,
      guide: { firstName: 'Fatima', lastName: 'Idrissi' },
      category: { name: 'Culture' },
      status: 'DRAFT',
      availableSeats: 8
    },
    {
      id: 3,
      title: 'Atlas Mountains Hiking',
      city: 'Imlil',
      price: 600,
      guide: { firstName: 'Yassine', lastName: 'Amrani' },
      category: { name: 'Hiking' },
      status: 'PUBLISHED',
      availableSeats: 5
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold';
      case 'DRAFT': return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold';
      case 'ARCHIVED': return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold';
      default: return 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold';
    }
  }
}
