import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Questform } from '../../../types/questform.type';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private questValues = new BehaviorSubject<Questform>({});

  getQuestValues() {
    return this.questValues.asObservable();
  }

  setQuestValues(values: Questform) {
    this.questValues.next(values);
  }

  constructor() {}

  constructCode() {
    const title = this.questValues.value.title;
    if (!title) return ''; // Handle case where title is undefined

    let code = `export const ${title.split(' ').join('_').toUpperCase()} = 
      std.Quests
      .create('duskhaven-quests', '${title.split(' ').join('-').toUpperCase()}')
      .Name.enGB.set('${title}');`;

    return code;
  }

  async copyToClipboard(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
