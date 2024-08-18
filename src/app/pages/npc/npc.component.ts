import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NpcFormComponent } from '../../features/npc/components/npc-form/npc-form.component';
import { NpcOutputComponent } from '../../features/npc/components/npc-output/npc-output.component';

@Component({
  selector: 'app-npc',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    NpcFormComponent,
    NpcOutputComponent,
  ],
  templateUrl: './npc.component.html',
  styleUrl: './npc.component.scss',
})
export class NpcComponent {}
