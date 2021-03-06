import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";
import { Chapter2 } from './Chapter2';

export const Chapter1: Chapter = {
	story: [
		`You enter the woods, chasing after the goblin who stole your father's sword.`,
		`You lose sight of them in the thick woods and begin to creep forward,`,
		`relying on your ears to warm you of danger and hopefully to locate the theiving goblins.`,
		`Shenanigans ensue and an encounter begins. Now the question is: How do you want to handle it (approach this enocunter)?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Goblin", 5, {attack: 2, sneak: 0, persuade: 0}, {attack: 7, sneak: 7, persuade: 7}, 1, 3, "../../assets/goblin.png")
					// (name, health, skills, barriers, minDamage, maxDamage, spriteUrl)
	],

	sneakPersuadeFail: CharacterAction.attack,

	ifFail: FailureOptions.nextChapter,

	ifSucceed: [
		SuccessOptions.rewardExperience,
		SuccessOptions.rewardEquipment,
		SuccessOptions.addHeroToParty
	],

	rewards: {
		experience: 3000,
		equipment: [new Weapon("Father's Rusty Sword", 3, 8)],
		newHero: [new Rogue("Sheen", GenderOptions.male, CampOptions.strengthCountry, 3, 28, {attack: 15, sneak: 18,
			persuade: 8, intelligence: 1}, new Weapon("Dagger", 2, 7), new Armor("Casual Clothes", 3))]

	},

	nextChapter: Chapter2   // if there's a Chapter 2, put Chapter 2
};

