import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellFormComponent } from '../../features/spells/spell-form/spell-form.component';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [CommonModule, SpellFormComponent, AngularSplitModule],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
}