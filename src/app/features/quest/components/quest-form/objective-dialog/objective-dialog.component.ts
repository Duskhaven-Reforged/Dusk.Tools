import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-objective-dialog',
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
  templateUrl: './objective-dialog.component.html',
  styleUrl: './objective-dialog.component.scss',
})
export class ObjectiveDialogComponent {
  @Output() addObjectiveEvent = new EventEmitter<'Item Drop' | 'NPC Target'>();

  addItemDrop(ctx: any) {
    this.addObjectiveEvent.emit('Item Drop');
    ctx.close();
  }

  addNPC(ctx: any) {
    this.addObjectiveEvent.emit('NPC Target');
    ctx.close();
  }
}
