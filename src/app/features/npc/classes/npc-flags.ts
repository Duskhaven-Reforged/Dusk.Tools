import {
  NPCPrimaryFlags,
  NPCSecondaryFlags,
} from '../../../types/npcForm.type';

export class NpcFlags {
  primaryFlags: NPCPrimaryFlags = {};
  secondaryFlags: NPCSecondaryFlags = {};

  constructor(
    primaryFlags: NPCPrimaryFlags,
    secondaryFlags: NPCSecondaryFlags
  ) {
    this.primaryFlags = primaryFlags;
    this.secondaryFlags = secondaryFlags;
  }

  constructAllFlags() {
    const flagConstructors: { [key: string]: (flag?: boolean) => string } = {
      gossip: this.constructGossip,
      repair: this.constructRepairer,
      questGiver: this.constructQuestGiver,
      flightMaster: this.constructFlightMaster,
      trainer: this.constructTrainer,
      innKeeper: this.constructInnKeeper,
      vendor: this.constructVendor,
    };

    const primaryFlags = Object.keys(this.primaryFlags)
      .filter(
        (key) => this.primaryFlags[key as keyof NPCPrimaryFlags] !== undefined
      )
      .map((key) =>
        flagConstructors[key](this.primaryFlags[key as keyof NPCPrimaryFlags])
      )
      .join('');

    const secondaryFlagConstructors: {
      [key: string]: (flag?: boolean) => string;
    } = {
      immuneToPlayers: this.constructImmuneToPC,
      immuneToNPC: this.constructImmuneToNPC,
      canSwim: this.constructCanSwim,
      skinnable: this.constructSkinnable,
      forceGossip: this.constructForceGossip,
    };

    const secondaryFlags = Object.keys(this.secondaryFlags)
      .filter(
        (key) =>
          this.secondaryFlags[key as keyof NPCSecondaryFlags] !== undefined
      )
      .map((key) =>
        secondaryFlagConstructors[key](
          this.secondaryFlags[key as keyof NPCSecondaryFlags]
        )
      )
      .join('');

    return [primaryFlags, secondaryFlags].join(``);
  }

  // Primary Flags
  constructGossip(gossip?: boolean) {
    return `
    .NPCFlags.GOSSIP.set(${gossip})`;
  }

  constructRepairer(repair?: boolean) {
    return `
    .NPCFlags.REPAIRER.set(${repair})`;
  }

  constructQuestGiver(questGiver?: boolean) {
    return `
    .NPCFlags.QUEST_GIVER.set(${questGiver})`;
  }

  constructFlightMaster(flightMaster?: boolean) {
    return `
    .NPCFlags.FLIGHT_MASTER.set(${flightMaster})`;
  }

  constructTrainer(trainer?: boolean) {
    return `
    .NPCFlags.TRAINER.set(${trainer})`;
  }

  constructInnKeeper(innkeeper?: boolean) {
    return `
    .NPCFlags.INNKEEPER.set(${innkeeper})`;
  }

  constructVendor(vendor?: boolean) {
    return `
    .NPCFlags.VENDOR.set(${vendor})`;
  }

  // Secondary Flags
  constructImmuneToPC(immuneToPlayers?: boolean) {
    return `
    .UnitFlags.IMMUNE_TO_PC.set(${immuneToPlayers})`;
  }

  constructImmuneToNPC(immuneToNPC?: boolean) {
    return `
    .UnitFlags.IMMUNE_TO_NPC.set(${immuneToNPC})`;
  }

  constructCanSwim(canSwim?: boolean) {
    return `
    .UnitFlags.CAN_SWIM.set(${canSwim})`;
  }

  constructSkinnable(skinnable?: boolean) {
    return `
    .UnitFlags.SKINNABLE.set(${skinnable})`;
  }

  constructForceGossip(forceGossip?: boolean) {
    return `
    .TypeFlags.FORCE_GOSSIP.set(${forceGossip})`;
  }
}
