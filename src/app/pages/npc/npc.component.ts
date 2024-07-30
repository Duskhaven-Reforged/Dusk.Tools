import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-npc',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './npc.component.html',
  styleUrl: './npc.component.scss'
})
export class NpcComponent {

}
