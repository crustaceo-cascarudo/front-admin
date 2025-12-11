import { Component, inject } from '@angular/core';
import { CCategory } from '../../ui/c-category/c-category';
import { Categories } from '../../../model/categories';
import { CategoryService } from '../../../service/category-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'p-categories',
  imports: [CCategory],
  templateUrl: './p-categories.html',
  styleUrl: './p-categories.scss',
})
export class PCategories {
  categories: Categories[] = [];
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

  handleEdit(category: Categories): void {
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
