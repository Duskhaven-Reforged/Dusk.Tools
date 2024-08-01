import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  constructor() {}

  constructCode() {
    return `export const KILLED_CREATURE =
    std.CreatureTemplates
    .create('tswow-tests', 'killed-creature')
    .Name.enGB.set('Killed Creature')
    .Models.addDefaultBear()
    .FactionTemplate.set(189)
    .Level.set(1)`;
  }

  async copyToClipboard(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
