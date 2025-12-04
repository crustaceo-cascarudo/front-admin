import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../model/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = "http://localhost:3000/categories"

  httpClient=inject(HttpClient);

  constructor() {}

  getAllCategories(): Observable<Categories[]>{
    return this.httpClient.get<Categories[]>(this.apiUrl);
  }

  getCategoryById(id: string): Observable<Categories>{
    return this.httpClient.get<Categories>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Categories): Observable<Categories>{
    return this.httpClient.post<Categories>(this.apiUrl, category);
  }

  updateCategory(id: string, category: Categories): Observable<Categories>{
    return this.httpClient.put<Categories>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}