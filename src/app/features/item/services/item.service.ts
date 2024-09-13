import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemForm } from '../../../types/itemForm.type';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public itemValues = new BehaviorSubject<ItemForm>({});
  public importedItem = new BehaviorSubject<ItemForm | undefined>(undefined);

  constructor() {}

  getItemValues() {
    return this.itemValues.asObservable();
  }

  setItemValues(values: ItemForm) {
    this.itemValues.next(values);
  }
}
