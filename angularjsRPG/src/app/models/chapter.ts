import { Hero, Monster, Weapon, Armor } from './characters';		// character.ts

export enum CharacterAction {
	attack = "Attack",
	sneak = "Sneak",
	persuade = "Persuade",
	doNothing = "Do Nothing"
}

export enum FailureOptions {
	gameOver,
	nextChapter
}

export enum SuccessOptions {
	rewardExperience,
	rewardEquipment,
	addHeroToParty
}

export class Chapter {
	story: string[];
	options: CharacterAction[];
	enemyParty: Monster[];
	sneakPersuadeFail: CharacterAction;
	ifFail: FailureOptions;
	ifSucceed: SuccessOptions[];      // multiple options, one or all
	rewards: {
		experience: number,
		equipment: (Weapon | Armor) [],		// array of Weapon or Armor
		newHero: Hero[];
	};
	nextChapter: Chapter;
}
