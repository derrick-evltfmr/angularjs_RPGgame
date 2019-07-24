import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";
import { Chapter5 } from './Chapter5';

export const Chapter4: Chapter = {
	story: [
		`You met Jessica and Iris during the fight with the brick monster and stone monster`,
		`They are indeed skilled adventurers, but they are a bit timid when they meet the scary-looking monsters`,
		`They thank that you helped them to defeat the monsters, so they say they can join into your team when you need them`,
		`'`,
		`You continue to explore the ruin, from the monsters you defeated just now, you can feel that the ruin `,
		`has some relations with the evil wizard, because of the ominous magic power. `,
		`You find a room that has many treasures, with some ancient weapons, which seem to be powerful`,
		`'`,
		`However, taking away the treasures from the ruin is not such an easy thing. You and your teammates found that `,
		`three weird treasure boxes are moving. They are the guardians for the treasures`,
		`How do you want to handle it?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Treasure Monster (Red)", 60, {attack: 20, sneak: 20, persuade: 20}, {attack: 15, sneak: 15, persuade: 15}, 9, 14,
			"../../assets/redtreasuremon.png"),
		new Monster("Treasure Monster (Black)", 50, {attack: 20, sneak: 20, persuade: 20}, {attack: 15, sneak: 15, persuade: 15}, 12, 18,
			"../../assets/blacktreasuremon.png"),
		new Monster("Treasure Monster (Blue)", 60, {attack: 20, sneak: 20, persuade: 20}, {attack: 15, sneak: 15, persuade: 15}, 9, 14,
			"../../assets/bluetreasuremon.png")
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
		experience: 10000,
		equipment: [new Weapon("Ancient Sword", 8, 13), new Weapon("Ancient Bow", 9, 12),
			new Weapon("Ancient Sharp Knife", 6, 14), new Weapon("Ancient Wand", 8, 12)],
		newHero: []

	},

	nextChapter: Chapter5   // if there's a Chapter 2, put Chapter 2
};

