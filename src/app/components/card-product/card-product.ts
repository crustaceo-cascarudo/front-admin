import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { Ingredient } from '../../models/ingredient';
import { Product } from '../../models/product';

@Component({
  selector: 'card-product',
  imports: [CommonModule],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss',
})
export class CardProduct {
  @Input() product!: Product;

}
