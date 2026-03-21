import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LanguageRequest, LanguageResponse } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private apiUrl = `${environment.apiUrl}/languages`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LanguageResponse[]> {
    return this.http.get<LanguageResponse[]>(this.apiUrl);
  }

  create(request: LanguageRequest): Observable<LanguageResponse> {
    return this.http.post<LanguageResponse>(`${this.apiUrl}/admin`, request);
  }

  update(id: number, request: LanguageRequest): Observable<LanguageResponse> {
    return this.http.put<LanguageResponse>(`${this.apiUrl}/admin/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }
}
