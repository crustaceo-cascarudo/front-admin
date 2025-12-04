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
    this.loadCategories();
  }

  loadCategories(): void {
    this.subscription.add(
      this.service.getAllCategories().subscribe((data) => {
        this.categories = data;
      })
    );
  }

  handleEdit(category: Categories): void {
  }

  handleDelete(id: string): void {
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
