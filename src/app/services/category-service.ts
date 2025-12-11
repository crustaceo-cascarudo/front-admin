import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = "http://localhost:8080/api/categories"

  httpClient=inject(HttpClient);

  constructor() {}

  getAllCategories(): Observable<Category[]>{
    return this.httpClient.get<Page<Category>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getCategoryById(id: number): Observable<Category>{
    return this.httpClient.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<Category>{
    return this.httpClient.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}