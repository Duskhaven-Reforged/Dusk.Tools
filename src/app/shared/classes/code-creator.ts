import { ExportOptions } from '../../types/exportOptions.type';
import { NPCForm } from '../../types/npcForm.type';
import { Questform } from '../../types/questform.type';

export abstract class CodeCreator {
  abstract values: Questform | NPCForm;
  abstract exportOptions: ExportOptions;

  constructor(values: Questform | NPCForm, exportOptions: ExportOptions) {}

  abstract constructCode(): string;

  public constructImports() {
    return this.exportOptions.includeSTDImport
      ? `import { std } from "wow/wotlk";
`
      : '';
  }
}
