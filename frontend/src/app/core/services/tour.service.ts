import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TourResponse, TourRequest, TourImageResponse } from '../models/tour.model';
import { Page } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = `${environment.apiUrl}/tours`;

  constructor(private http: HttpClient) {}

  getAllTours(page: number = 0, size: number = 10, city?: string, categoryId?: number): Observable<Page<TourResponse>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (city) params = params.set('city', city);
    if (categoryId) params = params.set('categoryId', categoryId.toString());
    
    return this.http.get<Page<TourResponse>>(this.apiUrl, { params });
  }

  getTourById(id: number): Observable<TourResponse> {
    return this.http.get<TourResponse>(`${this.apiUrl}/${id}`);
  }

  createTour(tour: TourRequest): Observable<TourResponse> {
    return this.http.post<TourResponse>(`${this.apiUrl}/guide`, tour);
  }

  deleteTour(tourId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/guide/${tourId}`);
  }

  publishTour(tourId: number): Observable<TourResponse> {
    return this.http.put<TourResponse>(`${this.apiUrl}/guide/${tourId}/publish`, {});
  }

  getMyTours(): Observable<TourResponse[]> {
    return this.http.get<TourResponse[]>(`${this.apiUrl}/guide/my-tours`);
  }

  uploadTourImage(tourId: number, file: File): Observable<TourImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<TourImageResponse>(`${environment.apiUrl}/images/upload?tourId=${tourId}`, formData);
  }
}
