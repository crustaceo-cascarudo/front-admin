import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../models/page';
import { Product } from '../models/product';
import { Category } from '../models/category/category';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl = "http://localhost:8080/api";

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  httpClient = inject(HttpClient);

  constructor() { }

  // TODO: Convert all uses of getAll to getPage
  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  getAll<T>(url: string): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}`);
  }

  // Metdo temporal para obtener los usuarios
  getAllArray<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.baseUrl + url}`);
  }

  getById<T>(url: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`);
  }

  getByName<T>(url: string, name: string): Observable<T[]> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?name=${name}`)
      .pipe(
        map(response => response.data)
      );
  }

  create<T>(url: string, object: T): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl + url}`, object);
  }

  post(url: string, object: Record<string, any>) {
    return this.httpClient.post<Record<string, any>>(this.baseUrl + url, object);
  }

  put(url: string, id: number, object: Record<string, any>) {
    return this.httpClient.put<Record<string, any>>(this.baseUrl + url + '/' + id, object);
  }

  update(url: string, id: number, any: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl + url}${id}`, any);
  }

  delete(url: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl + url}/${id}`);
  }
}
