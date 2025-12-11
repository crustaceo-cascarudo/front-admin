import { Component, inject } from '@angular/core';
import { CCategory } from '../../ui/c-category/c-category';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'p-categories',
  imports: [CCategory],
  templateUrl: './p-categories.html',
  styleUrl: './p-categories.scss',
})
export class PCategories {
  categories: Category[] = [];
  service = inject(CategoryService);
  private subscription = new Subscription();

  ngOnInit(): void {
    console.log('Cargando categorías...');
    this.service.getAllCategories().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.categories = data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  handleEdit(category: Category): void {
  }

  handleDelete(id: number): void {
    this.subscription.add(
      this.service.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(cat => cat.id !== id);
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
