import { Component, inject } from '@angular/core';
import { Product } from '../../../models/product';
import { CardProduct } from "../../card-product/card-product";
import { HttpClientService } from '../../../services/http-client-service';
import { Page } from '../../../models/page';

@Component({
  selector: 'p-products',
  imports: [CardProduct],
  templateUrl: './p-products.html',
  styleUrl: './p-products.scss',
})
export class PProducts {
  url: string = "/products";

  page!: Page<Product>;
  products!: Product[];

  http = inject(HttpClientService);

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.getAll(this.url).subscribe({
      next: (datos) => {
        this.page = datos as unknown as Page<Product>;
        this.products = this.page?.data;
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  findById(id: number) {
    this.http.get(this.url, id).subscribe({
      next: (datos) => this.products = (datos as unknown as Page<Product>).data,
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  findByName(name: string) {
    this.http.findByName(this.url, name).subscribe({
      next: (datos) => this.products = datos as unknown as Product[],
      error: (error) => console.log('ERROR ' + error.status),
    })
  }
}
