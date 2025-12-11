import { Component } from '@angular/core';
import {CardProduct } from "../../card-product/card-product";

@Component({
  selector: 'app-p-categories',
  imports: [CardProduct],
  templateUrl: './p-categories.html',
  styleUrl: './p-categories.scss',
})
export class PCategories {
  products: Prod
}
