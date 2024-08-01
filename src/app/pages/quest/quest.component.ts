import { Component, inject } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { QuestService } from '../../features/quest/services/quest.service';
import { Highlight, HighlightAuto, HighlightModule } from 'ngx-highlightjs';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';
import { ToastrService } from 'ngx-toastr';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideCopy } from '@ng-icons/lucide';
import { QuestFormComponent } from '../../features/quest/components/quest-form/quest-form.component';
import { QuestOutputComponent } from '../../features/quest/components/quest-output/quest-output.component';

@Component({
  selector: 'app-quest',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardTitleDirective,
    HlmCardHeaderDirective,
    HlmCardFooterDirective,
    Highlight,
    HighlightAuto,
    HlmButtonDirective,
    HlmScrollAreaComponent,
    HlmIconComponent,
    HlmIconComponent,
    QuestFormComponent,
    QuestOutputComponent,
  ],
  providers: [provideIcons({ lucideCopy })],
  templateUrl: './quest.component.html',
  styleUrl: './quest.component.scss',
})
export class QuestComponent {
  private questService = inject(QuestService);
  private toastr = inject(ToastrService);

  code = '';

  exportCode() {
    this.code = this.questService.constructCode();
  }

  copyCode() {
    try {
      this.questService.copyToClipboard(this.code);
      this.toastr.success('Copied to clipboard');
    } catch (error) {
      this.toastr.error('Could not copy');
    }
  }
}
