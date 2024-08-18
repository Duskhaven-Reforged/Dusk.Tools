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
    return gossip === true
      ? `
    .NPCFlags.GOSSIP.set(${gossip})`
      : '';
  }

  constructRepairer(repair?: boolean) {
    return repair === true
      ? `
    .NPCFlags.REPAIRER.set(${repair})`
      : '';
  }

  constructQuestGiver(questGiver?: boolean) {
    return questGiver === true
      ? `
    .NPCFlags.QUEST_GIVER.set(${questGiver})`
      : '';
  }

  constructFlightMaster(flightMaster?: boolean) {
    return flightMaster === true
      ? `
    .NPCFlags.FLIGHT_MASTER.set(${flightMaster})`
      : '';
  }

  constructTrainer(trainer?: boolean) {
    return trainer === true
      ? `
    .NPCFlags.TRAINER.set(${trainer})`
      : '';
  }

  constructInnKeeper(innkeeper?: boolean) {
    return innkeeper === true
      ? `
    .NPCFlags.INNKEEPER.set(${innkeeper})`
      : '';
  }

  constructVendor(vendor?: boolean) {
    return vendor === true
      ? `
    .NPCFlags.VENDOR.set(${vendor})`
      : '';
  }

  // Secondary Flags
  constructImmuneToPC(immuneToPlayers?: boolean) {
    return immuneToPlayers === true
      ? `
    .UnitFlags.IMMUNE_TO_PC.set(${immuneToPlayers})`
      : '';
  }

  constructImmuneToNPC(immuneToNPC?: boolean) {
    return immuneToNPC === true
      ? `
    .UnitFlags.IMMUNE_TO_NPC.set(${immuneToNPC})`
      : '';
  }

  constructCanSwim(canSwim?: boolean) {
    return canSwim === true
      ? `
    .UnitFlags.CAN_SWIM.set(${canSwim})`
      : '';
  }

  constructSkinnable(skinnable?: boolean) {
    return skinnable === true
      ? `
    .UnitFlags.SKINNABLE.set(${skinnable})`
      : '';
  }

  constructForceGossip(forceGossip?: boolean) {
    return forceGossip === true
      ? `
    .TypeFlags.FORCE_GOSSIP.set(${forceGossip})`
      : '';
  }
}
