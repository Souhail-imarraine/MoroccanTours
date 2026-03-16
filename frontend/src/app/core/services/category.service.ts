import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CategoryResponse, CategoryRequest } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.apiUrl);
  }

  createCategory(category: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.apiUrl}/admin`, category);
  }

  updateCategory(id: number, category: CategoryRequest): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.apiUrl}/admin/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }
}
