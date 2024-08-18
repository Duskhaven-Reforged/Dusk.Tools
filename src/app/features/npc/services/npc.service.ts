import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NPCForm, NPCPrimaryFlags } from '../../../types/npcForm.type';
import { NpcFlags } from '../classes/npc-flags';

@Injectable({
  providedIn: 'root',
})
export class NpcService {
  public npcValues = new BehaviorSubject<NPCForm>({});
  public importedNPC = new BehaviorSubject<NPCForm | undefined>(undefined);

  getNPCValues() {
    return this.npcValues.asObservable();
  }

  setNPCValues(values: NPCForm) {
    this.npcValues.next(values);
  }

  constructor() {}

  getImportedNPC() {
    return this.importedNPC.asObservable();
  }

  setImportedNPC(values: NPCForm) {
    this.importedNPC.next(values);
  }
}
