import { Component, inject } from '@angular/core';
import { Page } from '../../../models/page';
import { HttpClientService } from '../../../services/http-client-service';
import { Ingredient } from '../../../models/ingredient';
import { CardIngredient } from "../../card-ingredient/card-ingredient";

@Component({
  selector: 'p-ingredients',
  imports: [CardIngredient],
  templateUrl: './p-ingredients.html',
  styleUrl: './p-ingredients.scss',
})
export class PIngredients {
  url: string = "/ingredients";

  page!: Page<Ingredient>;
  ingredients!: Ingredient[];

  http = inject(HttpClientService);

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.getAll(this.url).subscribe({
      next: (datos) => {
        this.page = datos as unknown as Page<Ingredient>;
        this.ingredients = this.page?.data;
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  findById(id: number) {
    this.http.getById(this.url, id).subscribe({
      next: (datos) => this.ingredients = (datos as unknown as Page<Ingredient>).data,
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  findByName(name: string) {
    this.http.getByName(this.url, name).subscribe({
      next: (datos) => this.ingredients = datos as unknown as Ingredient[],
      error: (error) => console.log('ERROR ' + error.status),
    })
  }
}
