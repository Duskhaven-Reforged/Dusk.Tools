import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmSwitchImports } from '@spartan-ng/ui-switch-helm';
import { HighlightModule, HighlightAuto, Highlight } from 'ngx-highlightjs';
import { ItemForm } from '../../../../types/itemForm.type';
import { ExportOptions } from '../../../../types/exportOptions.type';
import { ItemService } from '../../services/item.service';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { lucideCopy, lucideUpload, lucideDownload } from '@ng-icons/lucide';
import { ItemCode } from '../../classes/item-code';

@Component({
  selector: 'app-item-output',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmButtonDirective,
    HlmIconComponent,
    HighlightModule,
    HlmSwitchImports,
    Highlight,
    HighlightAuto,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucideCopy, lucideUpload, lucideDownload })],
  templateUrl: './item-output.component.html',
  styleUrl: './item-output.component.scss',
})
export class ItemOutputComponent {
  private subs = new SubSink();
  private itemService = inject(ItemService);
  private toastr = inject(ToastrService);
  private sanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);
  outputOptions: ExportOptions = {
    includeSTDImport: false,
    includeExport: false,
  };

  @ViewChild('fileInput') fileInput!: ElementRef;

  downloadJSONhref!: SafeUrl;
  code = '';
  form!: FormGroup;

  ngOnInit(): void {
    this.subs.sink = this.itemService.getItemValues().subscribe((value) => {
      this.code = new ItemCode(value, this.outputOptions).constructCode();
    });

    this.form = this.fb.group({
      includeSTDImport: [false],
      includeExport: [false],
    });

    this.subs.sink = this.form.valueChanges.subscribe(
      (value: ExportOptions) => {
        this.outputOptions = value;
        this.code = new ItemCode(
          this.itemService.itemValues.value,
          this.outputOptions
        ).constructCode();
      }
    );
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

    const parsedJSON: ItemForm = JSON.parse(await files[0].text());
    console.log(parsedJSON);
    // this.npcService.setImportedNPC(parsedJSON);
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
    // let npcJSON = JSON.stringify(this.npcService.npcValues.value);
    // let uri = this.sanitizer.bypassSecurityTrustUrl(
    //   'data:text/json;charset=UTF-8,' + encodeURIComponent(npcJSON)
    // );
    // this.downloadJSONhref = uri;
  }
}
