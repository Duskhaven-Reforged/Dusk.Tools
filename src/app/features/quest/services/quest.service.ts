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
    const objectives = this.constructObjectives();
    const title = this.questValues.value.title;
    if (!title) return ''; // Handle case where title is undefined

    let code = `export const ${title.split(' ').join('_').toUpperCase()} = 
      std.Quests
      .create('duskhaven-quests', '${title
        .split(' ')
        .join('-')
        .toUpperCase()}') ${
      objectives === undefined ? '' : objectives.map((objective) => objective)
    }
      .Name.enGB.set('${title}');`;

    return code;
  }

  constructObjectives() {
    const objectiveObj = this.questValues.value.objectives;
    if (!objectiveObj) {
      return;
    }

    const returnCode: string[] = [];

    objectiveObj.forEach((objective) => {
      if ('objectiveItemID' in objective) {
        returnCode.push(`
      .Objectives.Item.add(${objective.objectiveItemID}, ${objective.count})`);
      } else {
        returnCode.push(`
      .Objectives.Entity.add(${objective.objectiveCreatureID}, ${objective.count})`);
      }
    });

    return returnCode;
  }

  async copyToClipboard(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
