import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  HlmSwitchComponent,
  HlmSwitchImports,
} from '@spartan-ng/ui-switch-helm';
import { SubSink } from 'subsink';
import { SharedModule } from '../../../../shared/shared.module';
import { ModelsDialogComponent } from '../../../npc/components/models-dialog/models-dialog.component';
import { ItemService } from '../../services/item.service';
import { SelectChoice } from '../../../../types/selectChoice.type';
import { ItemForm } from '../../../../types/itemForm.type';
import { WeaponDetailsComponent } from './weapon-details/weapon-details.component';
import { ArmorDetailsComponent } from './armor-details/armor-details.component';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HlmCardImports,
    HlmLabelDirective,
    HlmSwitchImports,
    HlmSwitchComponent,
    ModelsDialogComponent,
    HlmIconComponent,
    HlmButtonDirective,
    WeaponDetailsComponent,
    ArmorDetailsComponent,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private subs = new SubSink();
  qualityClass = '';

  form!: FormGroup;

  typeOptions: SelectChoice[] = [
    { value: 'AMMO', label: 'Ammo' },
    { value: 'BACK', label: 'Back' },
    { value: 'BAG', label: 'Bag' },
    { value: 'CHEST', label: 'Chest' },
    { value: 'FEET', label: 'Feet' },
    { value: 'FINGER', label: 'Finger' },
    { value: 'HANDS', label: 'Hands' },
    { value: 'HEAD', label: 'Head' },
    { value: 'LEGS', label: 'Legs' },
    { value: 'MAINHAND', label: 'Mainhand' },
    { value: 'NECK', label: 'Neck' },
    { value: 'NON_EQUIPPABLE', label: 'Non-Equippable' },
    { value: 'OFFHAND', label: 'Offhand' },
    { value: 'QUIVER', label: 'Quiver' },
    { value: 'RANGED', label: 'Ranged' },
    { value: 'RELIC', label: 'Relic' },
    { value: 'ROBE', label: 'Robe' },
    { value: 'SHIELD', label: 'Shield' },
    { value: 'SHIRT', label: 'Shirt' },
    { value: 'SHOULDER', label: 'Shoulder' },
    { value: 'TABARD', label: 'Tabard' },
    { value: 'THROWN', label: 'Thrown' },
    { value: 'TOME', label: 'Tome' },
    { value: 'TRINKET', label: 'Trinket' },
    { value: 'TWOHAND', label: 'Two-Hand' },
    { value: 'WAIST', label: 'Waist' },
    { value: 'WAND_GUN', label: 'Wand-Gun' },
    { value: 'WEAPON', label: 'Weapon' },
    { value: 'WRISTS', label: 'Wrists' },
    { value: 'ARMOR', label: 'Armor' },
  ];

  qualityOptions: SelectChoice[] = [
    { value: 'BLUE', label: 'Blue', className: 'text-blue-600' },
    { value: 'GRAY', label: 'Gray', className: 'text-gray-600' },
    { value: 'GREEN', label: 'Green', className: 'text-green-600' },
    { value: 'HEIRLOOM', label: 'Heirloom', className: 'text-yellow-300' },
    { value: 'ORANGE', label: 'Orange', className: 'text-orange-600' },
    { value: 'PURPLE', label: 'Purple', className: 'text-purple-600' },
    { value: 'WHITE', label: 'White', className: 'text-white' },
  ];

  bondingOptions: SelectChoice[] = [
    { value: 'QUEST_ITEM', label: 'Quest Item' },
    { value: 'BINDS_ON_EQUIP', label: 'Binds on Equip' },
    { value: 'BINDS_ON_PICKUP', label: 'Binds on Pickup' },
    { value: 'BINDS_ON_USE', label: 'Binds on Use' },
    { value: 'NO_BOUNDS', label: 'No Bounds' },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      moduleName: '',
      type: [''],
      quality: [''],
      itemLevel: [''],
      displayID: [''],
      requiredLevel: [0],
      bonding: [''],
      flavorText: [''],
      maxStack: [0],
      price: this.fb.group({
        sellPrice: [0],
        buyPrice: [0],
      }),
      weaponDetails: [''],
      armorDetails: [''],
    });

    this.subs.sink = this.form.valueChanges.subscribe((value: ItemForm) => {
      this.itemService.setItemValues(value);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleInput(event: KeyboardEvent) {
    event.stopPropagation();
  }
}
