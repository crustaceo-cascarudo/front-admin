import { Component, inject } from '@angular/core';
import { Product } from '../../../models/product';
import { CardProduct } from "../../card-product/card-product";
import { HttpClientService } from '../../../services/http-client-service';

@Component({
  selector: 'p-products',
  imports: [CardProduct],
  templateUrl: './p-products.html',
  styleUrl: './p-products.scss',
})
export class PProducts {
  url: string = "/api/products";

  products!: Product[];

  http = inject(HttpClientService);

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.http.getAll(this.url).subscribe({
      next: (datos) => this.products = datos as unknown[] as Product[],
      error: (error) => console.log('ERROR ' + error.status),
    })
  }
}
