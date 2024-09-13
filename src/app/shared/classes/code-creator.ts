import { ExportOptions } from '../../types/exportOptions.type';
import { ItemForm } from '../../types/itemForm.type';
import { NPCForm } from '../../types/npcForm.type';
import { Questform } from '../../types/questform.type';

export abstract class CodeCreator {
  abstract values: Questform | NPCForm | ItemForm;
  abstract exportOptions: ExportOptions;

  constructor(
    values: Questform | NPCForm | ItemForm,
    exportOptions: ExportOptions
  ) {}

  abstract constructCode(): string | any;

  public constructImports() {
    return this.exportOptions.includeSTDImport
      ? `import { std } from "wow/wotlk";
`
      : '';
  }
}
