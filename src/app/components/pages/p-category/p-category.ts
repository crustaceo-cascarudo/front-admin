import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../models/category/category';
import { CategoryInsert } from '../../../models/category/category-insert';
import { Subscription } from 'rxjs';
import { HttpClientService } from '../../../services/http-client-service';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CEditModal } from '../../ui/c-edit-modal/c-edit-modal';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Page } from '../../../models/page';

@Component({
  selector: 'p-category-getAll',
  imports: [MatPaginatorModule],
  templateUrl: './p-category.html',
  styleUrl: './p-category.scss',
})
export class PCategory {
  pageContent!: Page<Category>;
  categories: Category[] = [];
  url: string = "/categories";
  service = inject(HttpClientService);
  private router = inject(Router);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getData(pageIndex: number = 1, pageSize: number = 10) {
    this.service.getPage<Category>(this.url, pageIndex, pageSize).subscribe({
      next: (page) => {
        this.pageContent = page as unknown as Page<Category>;
        this.categories = this.pageContent?.data;
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  handleDelete(id: number): void {
    this.subscription.add(
      this.service.delete(this.url, id).subscribe(() => {
        this.categories = this.categories.filter(cat => cat.id !== id);
      })
    );
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  protected handleCreate() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const overlayRef = this.overlay.create(config);
    const componentRef = overlayRef.attach(this.portal);
    const newCategory: CategoryInsert = {
      name: '',
      slug: '',
      description: '',
      estado: true
    };

    componentRef.instance.object = newCategory;
    componentRef.instance.method = "POST";
    componentRef.instance.apiurl = "/categories";
    componentRef.instance.onBeforeSubmit = (obj: Record<string, any>) => {
      if (obj['name']) {
        obj['slug'] = this.generateSlug(obj['name']);
      }
      return obj;
    };
    componentRef.instance.saved.subscribe(() => {
      this.getData();
      overlayRef.detach();
    });

    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }

  portal = new ComponentPortal(CEditModal);

  private overlay = inject(Overlay);
  private destroyRef = inject(DestroyRef);

  protected handleEdit(category: Category) {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const overlayRef = this.overlay.create(config);
    const componentRef = overlayRef.attach(this.portal);

    componentRef.instance.object = category;
    componentRef.instance.method = "PUT";
    componentRef.instance.apiurl = "/categories";
    componentRef.instance.onBeforeSubmit = (obj: Record<string, any>) => {
      if (obj['name']) {
        obj['slug'] = this.generateSlug(obj['name']);
      }
      return obj;
    };
    componentRef.instance.saved.subscribe(() => {
      this.getData();
      overlayRef.detach();
    });

    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }

  handlePageEvent(event: PageEvent) {
    this.getData(event.pageIndex + 1, event.pageSize);
  }
}
