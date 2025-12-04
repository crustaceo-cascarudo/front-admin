import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categories } from '../../../model/categories';

@Component({
  selector: 'c-category',
  imports: [],
  templateUrl: './c-category.html',
  styleUrl: './c-category.scss',
})
export class CCategory {
  @Input() category!: Categories;
  @Output() onEdit = new EventEmitter<Categories>();
  @Output() onDelete = new EventEmitter<string>();

  edit(): void {
    this.onEdit.emit(this.category);
  }

  delete(): void {
    this.onDelete.emit(this.category.id);
  }
}
