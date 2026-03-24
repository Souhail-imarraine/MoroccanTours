import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TourService } from '../../../core/services/tour.service';
import { CategoryService } from '../../../core/services/category.service';
import { TourResponse } from '../../../core/models/tour.model';
import { CategoryResponse } from '../../../core/models/category.model';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './tours.component.html'
})
export class ToursComponent implements OnInit {
  private readonly tourService = inject(TourService);
  private readonly categoryService = inject(CategoryService);
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);

  tours = signal<TourResponse[]>([]);
  categories = signal<CategoryResponse[]>([]);
  loading = signal<boolean>(true);

  searchForm = this.fb.group({
    searchCity: [''],
    selectedCategory: [null as number | null]
  });

  ngOnInit() {
    this.loadCategories();
    this.loadTours();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => this.categories.set(res),
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  loadTours() {
    this.loading.set(true);
    const { searchCity, selectedCategory } = this.searchForm.value;
    
    this.tourService.getAllTours(0, 50, searchCity || undefined, selectedCategory || undefined)
      .subscribe({
        next: (res) => {
          this.tours.set(res.content);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Failed to load tours', err);
          this.loading.set(false);
        }
      });
  }

  onSearch() {
    this.loadTours();
  }

  resetFilters() {
    this.searchForm.patchValue({ searchCity: '', selectedCategory: null });
    this.loadTours();
  }

  getPhotoUrl(path: string | undefined | null): string {
    return AuthService.getPhotoUrl(path);
  }
}
