import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../models/category/category';


@Component({
  selector: 'category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
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
