import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HighlightAuto, HighlightModule, Highlight } from 'ngx-highlightjs';
import { SubSink } from 'subsink';
import { NpcService } from '../../services/npc.service';
import { provideIcons } from '@ng-icons/core';
import { lucideCopy } from '@ng-icons/lucide';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-npc-output',
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
  providers: [provideIcons({ lucideCopy })],
  templateUrl: './npc-output.component.html',
  styleUrl: './npc-output.component.scss',
})
export class NpcOutputComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private npcService = inject(NpcService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.subs.sink = this.npcService.getNPCValues().subscribe((value) => {
      this.code = this.npcService.constructCode();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  code = '';

  copyCode() {
    try {
      this.npcService.copyToClipboard();
      this.toastr.success('Copied to clipboard');
    } catch (error) {
      console.log(error);
    }
  }
}
