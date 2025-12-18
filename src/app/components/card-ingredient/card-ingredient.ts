import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CEditModal } from "../ui/c-edit-modal/c-edit-modal";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Ingredient } from '../../models/ingredient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-ingredient',
  imports: [CommonModule, PortalModule, CEditModal],
  templateUrl: './card-ingredient.html',
  styleUrl: './card-ingredient.scss',
})
export class CardIngredient {
  @Input() ingredient!: Ingredient;

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
    componentRef.instance.object = this.ingredient;
    componentRef.instance.method = "PUT";
    componentRef.instance.apiurl = "/ingredients";

    componentRef.instance.saved.subscribe(() => {
      this.update.emit();
      overlayRef.detach();
    });
    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }
}
