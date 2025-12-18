import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api';

  getAll(url: string): Observable<Page<any>> {
    console.log("Url:"+this.baseUrl+url);
    return this.http.get<Page<any>>(this.baseUrl+url);
  }

  get(url: string, id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + url + "/" + id);
  }

  findByName(url: string, name: string) {
    return this.http.get<any[]>(this.baseUrl +"/search" + "?name=" + name);
  }


  post(url: string, object: Record<string, any>) {
    return this.http.post<Record<string, any>>(this.baseUrl + url, object);
  }
  put(url: string, id: number, object: Record<string, any>) {
    return this.http.put<Record<string, any>>(this.baseUrl + url + "/" + id, object);
  }

  delete(url: string, id: number) {
    var response: Boolean;
    this.http.delete(this.baseUrl + url + "/" + id).subscribe((r) => console.log(r));
  }
}
