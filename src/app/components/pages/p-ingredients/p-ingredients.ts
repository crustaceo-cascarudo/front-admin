import { Component, DestroyRef, inject } from '@angular/core';
import { Page } from '../../../models/page';
import { HttpClientService } from '../../../services/http-client-service';
import { Ingredient } from '../../../models/ingredient';
import { CardIngredient } from "../../card-ingredient/card-ingredient";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductInsert } from '../../../models/productInsert';
import { ComponentPortal } from '@angular/cdk/portal';
import { CEditModal } from '../../ui/c-edit-modal/c-edit-modal';
import { IngredientInsert } from '../../../models/ingredientInsert';

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

  portal = new ComponentPortal(CEditModal);

  private overlay = inject(Overlay);
  private destroyRef = inject(DestroyRef);

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

  openCreateModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const overlayRef = this.overlay.create(config);
    const componentRef = overlayRef.attach(this.portal);
    const newProduct: IngredientInsert = {
      name: '',
      price: 0,
      image: '',
    };

    componentRef.instance.object = newProduct;
    componentRef.instance.method = "POST";
    componentRef.instance.apiurl = "/products";

    componentRef.instance.saved.subscribe(() => {
      this.getData();
      overlayRef.detach();
    });

    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }
}
