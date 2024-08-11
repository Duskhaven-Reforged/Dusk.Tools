import { Component, EventEmitter, Output } from '@angular/core';
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
import { QuestGiverEntityType } from '../../../../../types/questform.type';

@Component({
  selector: 'app-quest-giver-dialog',
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
  templateUrl: './quest-giver-dialog.component.html',
  styleUrl: './quest-giver-dialog.component.scss',
})
export class QuestGiverDialogComponent {
  @Output() addQuestGiverEvent = new EventEmitter<QuestGiverEntityType>();

  addQuestGiver(ctx: any, entityType: QuestGiverEntityType) {
    this.addQuestGiverEvent.emit(entityType);
    ctx.close();
  }
}
