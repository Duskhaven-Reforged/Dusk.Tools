import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { QuestService } from '../../services/quest.service';
import { SubSink } from 'subsink';
import { CommonModule } from '@angular/common';
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HighlightAuto, HighlightModule, Highlight } from 'ngx-highlightjs';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideCopy, lucideZap } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-quest-output',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HighlightModule,
    HlmIconComponent,
    Highlight,
    HighlightAuto,
  ],
  providers: [provideIcons({ lucideCopy, lucideZap })],
  templateUrl: './quest-output.component.html',
  styleUrl: './quest-output.component.scss',
})
export class QuestOutputComponent implements OnInit, OnDestroy {
  private questService = inject(QuestService);
  private subs = new SubSink();
  code: any = '';

  constructor() {
    this.subs.sink = this.questService.getQuestValues().subscribe((value) => {
      this.code = this.questService.constructCode();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}
}
