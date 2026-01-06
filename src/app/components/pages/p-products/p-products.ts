import { Component, DestroyRef, inject } from '@angular/core';
import { Product } from '../../../models/product';
import { CardProduct } from "../../card-product/card-product";
import { HttpClientService } from '../../../services/http-client-service';
import { Page } from '../../../models/page';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CEditModal } from '../../ui/c-edit-modal/c-edit-modal';
import { ProductInsert } from '../../../models/productInsert';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'p-products',
  imports: [CardProduct, MatPaginatorModule],
  templateUrl: './p-products.html',
  styleUrl: './p-products.scss',
})
export class PProducts {
  url: string = "/products";

  pageContent!: Page<Product>;
  products!: Product[];

  http = inject(HttpClientService);

  portal = new ComponentPortal(CEditModal);

  private overlay = inject(Overlay);
  private destroyRef = inject(DestroyRef);


  ngOnInit() {
    this.getData();
  }

  getData(pageIndex: number = 1, pageSize: number = 10) {
    this.http.getPage(this.url, pageIndex, pageSize).subscribe({
      next: (datos) => {
        console.log(datos);
        
        this.pageContent = datos as unknown as Page<Product>;
        this.products = this.pageContent?.data;
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  handlePageEvent(event: PageEvent){
    this.getData(event.pageIndex+1, event.pageSize);
  }

  findById(id: number) {
    this.http.getById(this.url, id).subscribe({
      next: (datos) => this.products = (datos as unknown as Page<Product>).data,
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  findByName(name: string) {
    this.http.getByName(this.url, name).subscribe({
      next: (datos) => this.products = datos as unknown as Product[],
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
    const newProduct: ProductInsert = {
          name: '',
          ingredients: [],
          basePrice: 0,
          discountPercentage: 0,
          finalPrice: 0,
          image: '',
          categories: []
    };

    componentRef.instance.object = newProduct;
    componentRef.instance.method = "POST";
    componentRef.instance.apiurl = "/products";
    componentRef.instance.attributeOptionsToBeFilled = ["ingredients", "categories"];
    
    componentRef.instance.saved.subscribe(() => {
      this.getData();
      overlayRef.detach();
    });

    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }
}
