import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellFormComponent } from '../../features/spells/spell-form/spell-form.component';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [CommonModule, SpellFormComponent],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
}