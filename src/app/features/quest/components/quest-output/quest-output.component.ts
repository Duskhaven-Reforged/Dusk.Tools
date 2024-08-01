import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { QuestService } from '../../services/quest.service';
import { SubSink } from 'subsink';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quest-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quest-output.component.html',
  styleUrl: './quest-output.component.scss',
})
export class QuestOutputComponent implements OnInit, OnDestroy {
  private questService = inject(QuestService);
  private subs = new SubSink();
  code: any = '';

  constructor() {
    this.subs.sink = this.questService.getQuestValues().subscribe((value) => {
      this.code = value;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}
}
