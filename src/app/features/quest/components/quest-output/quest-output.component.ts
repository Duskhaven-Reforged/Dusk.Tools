import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { lucideCopy, lucideDownload, lucideUpload } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { Highlight, HighlightAuto, HighlightModule } from 'ngx-highlightjs';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';
import { ExportOptions } from '../../../../types/exportOptions.type';
import { ImportQuest, ParentQuestForm } from '../../../../types/questform.type';
import { QuestCode } from '../../classes/quest-code';
import { QuestService } from '../../services/quest.service';
import { HlmSwitchImports } from '@spartan-ng/ui-switch-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-quest-output',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmButtonDirective,
    HlmIconComponent,
    HighlightModule,
    HlmIconComponent,
    Highlight,
    HighlightAuto,
    ReactiveFormsModule,
    HlmSwitchImports,
    HlmLabelDirective,
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
  private fb = inject(FormBuilder);

  @ViewChild('fileInput') fileInput!: ElementRef;
  code: any = '';
  downloadJSONhref!: SafeUrl;
  form!: FormGroup;
  outputOptions: ExportOptions = {
    includeExport: false,
    includeSTDImport: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.subs.sink = this.questService.getQuestValues().subscribe((value) => {
      this.code = this.constructCode(value);
    });

    this.form = this.fb.group({
      includeSTDImport: [false],
      includeExport: [false],
    });

    this.subs.sink = this.form.valueChanges.subscribe((value) => {
      this.outputOptions = value;
      this.code = this.constructCode(this.questService.questValues.value);
    });
  }

  constructCode(values: ParentQuestForm) {
    if (!values.quests) {
      return '';
    }

    const code = values.quests
      .map((questObj) => {
        return new QuestCode(
          questObj.quest,
          this.outputOptions
        ).constructCode();
      })
      .join('\n\r\n\r');

    const stdImport = this.outputOptions.includeSTDImport
      ? `import { std } from "wow/wotlk
`
      : '';

    return `${stdImport}${code}`;
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

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.toastr.success('Copied to clipboard');
    } catch (error) {
      console.log(error);
      this.toastr.error('Something went wrong, check your console');
    }
  }

  export() {
    let questsJSON = JSON.stringify(this.questService.questValues.value);
    let uri = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(questsJSON)
    );
    this.downloadJSONhref = uri;
  }
}
