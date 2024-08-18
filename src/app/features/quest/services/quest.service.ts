import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportQuest, ParentQuestForm } from '../../../types/questform.type';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  public questValues = new BehaviorSubject<ParentQuestForm>({});
  public importedQuest = new BehaviorSubject<ImportQuest | undefined>(
    undefined
  );

  getImportedQuest() {
    return this.importedQuest.asObservable();
  }

  setImportedQuest(jsonData: ImportQuest) {
    this.importedQuest.next(jsonData);
  }

  getQuestValues() {
    return this.questValues.asObservable();
  }

  setQuestValues(values: ParentQuestForm) {
    this.questValues.next(values);
  }

  constructor() {}
}
