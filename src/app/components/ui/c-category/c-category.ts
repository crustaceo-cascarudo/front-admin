import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'c-category',
  imports: [],
  templateUrl: './c-category.html',
  styleUrl: './c-category.scss',
})
export class CCategory {
  @Input() category!: Category;
  @Output() onEdit = new EventEmitter<Category>();
  @Output() onDelete = new EventEmitter<number>();

  edit(): void {
    this.onEdit.emit(this.category);
  }

  delete(): void {
    this.onDelete.emit(this.category.id);
  }
}
