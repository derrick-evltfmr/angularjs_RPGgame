import { Hero, Monster, Weapon, Armor } from './character';		// character.ts

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

}
