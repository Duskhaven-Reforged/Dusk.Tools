import { Component } from '@angular/core';
import { ItemFormComponent } from '../../features/item/components/item-form/item-form.component';
import { ItemOutputComponent } from '../../features/item/components/item-output/item-output.component';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemFormComponent, ItemOutputComponent, AngularSplitModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {}
