import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { CEditModal } from '../ui/c-edit-modal/c-edit-modal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'card-product',
  imports: [CommonModule, PortalModule, CEditModal],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss',
})
export class CardProduct {
  @Input() product!: Product;

  @Output() update = new EventEmitter<void>();
  portal = new ComponentPortal(CEditModal);

  private overlay = inject(Overlay);
  private destroyRef = inject(DestroyRef);

  protected openModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const overlayRef = this.overlay.create(config);
    const componentRef = overlayRef.attach(this.portal);
    componentRef.instance.object = this.product;
    componentRef.instance.method = "PUT";
    componentRef.instance.apiurl = "/products";

    componentRef.instance.saved.subscribe(() => {
      this.update.emit();
      overlayRef.detach();
    });
    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }

}
