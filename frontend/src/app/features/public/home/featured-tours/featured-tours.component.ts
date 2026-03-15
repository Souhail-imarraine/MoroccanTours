import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TourService } from '../../../../core/services/tour.service';
import { CategoryService } from '../../../../core/services/category.service';
import { TourResponse } from '../../../../core/models/tour.model';
import { CategoryResponse } from '../../../../core/models/category.model';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-featured-tours',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-tours.component.html'
})
export class FeaturedToursComponent implements OnInit {

  private readonly tourService = inject(TourService);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  categories = signal<CategoryResponse[]>([]);
  latestTours = signal<TourResponse[]>([]);

  destinations = [
    { name: 'Marrakech',
      tagline: 'The Red City',
      image: 'Marrakech.webp'
    },
    {
      name: 'Chefchaouen',
      tagline: 'The Blue Pearl',
      image: 'chefchaouen.jpg'
    },
    { name: 'Fes', tagline: 'Ancient Medina', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' },
    {
      name: 'Sahara',
      tagline: 'Desert Experience',
      image: 'Sahara.webp'
    },
    {
      name: 'Essaouira',
      tagline: 'Coastal Charm',
      image: 'Essaouira.avif'
    },
    {
      name: 'Tanger',
      tagline: 'Coastal Charm',
      image: 'Tanger.webp'
    }
  ];

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => this.categories.set(res),
      error: (err) => console.error(err)
    });

    this.tourService.getAllTours(0, 4).subscribe({
      next: (res) => this.latestTours.set(res.content),
      error: (err) => console.error(err)
    });
  }

  filterByCategory(id: number) {
    this.router.navigate(['/tours'], { queryParams: { category: id } });
  }

  filterByCity(city: string) {
    this.router.navigate(['/tours'], { queryParams: { city: city } });
  }

  getPhotoUrl(path: string | undefined | null): string {
    return AuthService.getPhotoUrl(path);
  }
}
