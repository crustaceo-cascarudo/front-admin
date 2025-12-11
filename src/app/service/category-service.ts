import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from '../model/categories';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = "http://localhost:8080/api/categories"

  httpClient=inject(HttpClient);

  constructor() {}

  getAllCategories(): Observable<Categories[]>{
    return this.httpClient.get<Page<Categories>>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getCategoryById(id: number): Observable<Categories>{
    return this.httpClient.get<Categories>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Categories): Observable<Categories>{
    return this.httpClient.post<Categories>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Categories): Observable<Categories>{
    return this.httpClient.put<Categories>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}