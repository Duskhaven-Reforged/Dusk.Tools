import { Component, EventEmitter, Output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogTriggerDirective,
  BrnDialogContentDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogHeaderComponent,
  HlmDialogFooterComponent,
  HlmDialogTitleDirective,
  HlmDialogDescriptionDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-models-dialog',
  standalone: true,
  imports: [
    HlmButtonDirective,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucidePlus })],
  templateUrl: './models-dialog.component.html',
  styleUrl: './models-dialog.component.scss',
})
export class ModelsDialogComponent {
  @Output() addModelEvent = new EventEmitter<'npcID' | 'visualID'>();

  addNPCID(ctx: any) {
    this.addModelEvent.emit('npcID');
    ctx.close();
  }

  addVisualID(ctx: any) {
    this.addModelEvent.emit('visualID');
    ctx.close();
  }
}
