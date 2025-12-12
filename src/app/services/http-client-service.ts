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
    return this.http.get<Page<any>>(this.baseUrl+url)
  }

  get(url: string, id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + url + "/" + id);
  }

  findByName(url: string, name: string) {
    return this.http.get<any[]>(this.baseUrl +"/search" + "?name=" + name);
  }

  getByCategoria(categoria: string) {
    return this.http.get<Product[]>(this.baseUrl + "?categoria=" + categoria);
  }




  getByPrecio(precio: number) {
    return this.http.get<Product[]>(this.baseUrl + "/?precio_gte=" + precio);
  }
  

  postArticulo(articulo: Product) {
    return this.http.post<Product>(this.baseUrl, articulo);
  }

  putArticulo(articulo: Product) {
    return this.http.put<Product>(this.baseUrl + "/" + String(articulo.id), articulo);
  }

  delete(id: String) {
    var response: Boolean;
    this.http.delete(this.baseUrl + "/" + id).subscribe((r) => console.log(r));
  }
}
