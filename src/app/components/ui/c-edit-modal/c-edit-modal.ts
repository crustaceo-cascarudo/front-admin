import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientService } from '../../../services/http-client-service';
import { Page } from '../../../models/page';

@Component({
  selector: 'c-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './c-edit-modal.html',
  styleUrl: './c-edit-modal.scss',
})
export class CEditModal {
  http = inject(HttpClientService);

  @Input() method!: "PUT" | "POST";
  @Input() object!: Object;
  @Input() apiurl!: string;
  @Input() onBeforeSubmit?: (obj: Record<string, any>) => Record<string, any>;
  @Input() excludeFields: string[] = ['finalPrice'];
  @Input() readonlyFields: string[] = ['id', 'slug', 'role'];
  @Input() attributeOptionsToBeFilled: string[] = [];
  @Output() saved = new EventEmitter<void>();
  keys!: string[];
  attributes!: any[];
  options: Record<string, any[]> = {};

  arrayValueToBeAdded: string = "";

  ngOnInit() {
    this.keys = Object.keys(this.object!);
    this.attributes = Object.entries(this.object!);
    this.fillOptionArray();
  }

  checkIfArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  checkIfBoolean(obj: any): boolean {
    return typeof obj === 'boolean';
  }

  isReadOnlyField(key: string): boolean {
    return this.readonlyFields.includes(key);
  }

  upload(){
    var obj: Record<string, any> = {};
    this.attributes.forEach(([key, value]) => {
      if (!this.excludeFields.includes(key)) {
        obj[key] = value;
      }

      
    });

    if (this.onBeforeSubmit) {
      obj = this.onBeforeSubmit(obj);
    }

    console.log(`${this.method} a la url ${this.apiurl}:`, obj);
    switch (this.method) {
      case "POST":
        this.http.post(this.apiurl, obj).subscribe((response) => {
          console.log("POST response: ", response);
          this.saved.emit();
        })
        break;

      case "PUT":
        this.http.put(this.apiurl, obj['id'], obj).subscribe((response) => {
          console.log("PUT response: ", response);
          this.saved.emit();
        })
        break;
    }
  }

  delete(){
    let obj: Record<string, any> = this.makeRecord();
    this.http.delete(this.apiurl, obj['id']).subscribe(() => { this.saved.emit(); });
  }

  makeRecord(): Record<string, any>{
    var obj: Record<string, any> = {};
    this.attributes.forEach(([key, value]) => {
      if (key != "finalPrice") {
        obj[key] = value;
      }
    });

    console.log(obj);
    return obj;
  }

  fillOptionArray(){
    
    console.log(this.attributeOptionsToBeFilled);
    
    this.attributeOptionsToBeFilled.forEach(attrKey => {
      this.http.getAll("/"+attrKey).subscribe(response => {
       this.options[attrKey] = (response as Page<any>).data;
      });
    });
  }

  addSelectedValue(attrKey: string){
    let index: number = this.attributes.findIndex(([key, value]) => key === attrKey);
    let optionToBeAdded = this.options[attrKey].find((option: any) => option.name === this.arrayValueToBeAdded);
    this.attributes[index][1].push(optionToBeAdded);
    console.log(this.arrayValueToBeAdded);
    console.log(this.attributes[index][1])
  }
}
