import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { lucideCopy, lucideDownload, lucideUpload } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { Highlight, HighlightAuto, HighlightModule } from 'ngx-highlightjs';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';
import { ImportQuest } from '../../../../types/questform.type';
import { QuestService } from '../../services/quest.service';

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
  providers: [provideIcons({ lucideCopy, lucideUpload, lucideDownload })],
  templateUrl: './quest-output.component.html',
  styleUrl: './quest-output.component.scss',
})
export class QuestOutputComponent implements OnInit, OnDestroy {
  private questService = inject(QuestService);
  private toastr = inject(ToastrService);
  private subs = new SubSink();
  private sanitizer = inject(DomSanitizer);
  @ViewChild('fileInput') fileInput!: ElementRef;
  code: any = '';
  downloadJSONhref!: SafeUrl;

  constructor() {
    this.subs.sink = this.questService.getQuestValues().subscribe((value) => {
      this.code = this.questService.constructCode();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  async uploadQuest(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    if (!files) return;

    const parsedJSON: ImportQuest = JSON.parse(await files[0].text());
    this.questService.setImportedQuest(parsedJSON);
  }

  copyCode() {
    try {
      this.questService.copyToClipboard();
      this.toastr.success('Copied to clipboard');
    } catch (error) {
      this.toastr.error('Something went wrong, check your console');
      console.log(error);
    }
  }

  export() {
    let questsJSON = JSON.stringify(this.questService.questValues.value);
    let uri = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(questsJSON)
    );
    this.downloadJSONhref = uri;
  }

  ngOnInit(): void {}
}
