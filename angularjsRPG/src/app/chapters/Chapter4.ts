import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter4: Chapter = {
	story: [
		`You met Jessica and Iris during the fight with the brick monster and stone monster`,
		`They are indeed skilled adventurers, but they are a bit timid when they meet the scary-looking monsters`,
		`They thank that you helped them to defeat the monsters, so they say they can join into your team when you need them`,
		` `,
		`You continue to explore the ruin, from the monsters you defeated just now, you can feel that the ruin `,
		`has some relations with the evil wizard, because of the ominous magic power. `,
		`You find a room that has many treasures, with some ancient weapons, which seem to be powerful`,
		` `,
		`You arrive at an unknown ruin, suddenly the ground is shaking, you hear people screaming inside the ruin`,
		`When you try to go to where the sounds were from, you block by two living statues`,
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
		experience: 5000,
		equipment: [new Weapon("Ancient Wand", 5, 12), new Armor("Stone Armor", 12)],
		newHero: [new Warrior("Jessica", GenderOptions.female, CampOptions.strengthCountry, 6, 38, {attack: 20, sneak: 14,
				persuade: 12, intelligence: 8}, new Weapon("Power Sword", 6, 12), new Armor("Warrior Armor", 9)),
				new Ranger("Iris", GenderOptions.female, CampOptions.dexterityCountry, 6, 32, {attack: 15, sneak: 21,
				persuade: 7, intelligence: 12}, new Weapon("Double Bow", 7, 11), new Armor("Ranger Suit", 7))]

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

