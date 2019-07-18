import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter2: Chapter = {
	story: [
		`A Rogue just passed by saw that how you fight with the goblin`,
		`He rushed to the front of you and he's super interested in your style of fighting,`,
		`He said his name is Kenneth and said now he's your teammate and will go on adventure with you (Unilaterally)`,
		`You don't know what to do with him, but it seems that he's a nice guy, and indeed you're very happy to have him with you.`,
		`Meanwhile, the plants around you become a bit weird. You couldn't tell what's going wrong, `,
		`but the astmosphere is really strange. Kenneth found that the plants are moving!!`,
		`You realize that the flower, tree and mushroom in front of you guys are indeed living creatures, they are monster in the forest`,
		`How do you want to handle it?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Flower Mosnter", 7, {attack: 1, sneak: 2, persuade: 1}, {attack: 7, sneak: 7, persuade: 7}, 3, 7,
			"../../assets/flowermonster.png"),
					// (name, health, skills, barriers, minDamage, maxDamage, spriteUrl)
		new Monster("Treeant", 15, {attack: 10, sneak: 5, persuade: 8}, {attack: 12, sneak: 12, persuade: 12}, 5, 15, "../../assets/treeant.png"),
		new Monster("Mushroom Monster", 7, {attack: 1, sneak: 1, persuade: 2}, {attack: 7, sneak: 7, persuade: 7}, 3, 7,
			"../../assets/mushroommonster.png")
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
		equipment: [new Weapon("Rusty Sword", 2, 6)],
		newHero: new Rogue("Kenneth", GenderOptions.male, CampOptions.dwarf, 1, 8, {attack: 1, sneak: 2,
			persuade: 1, intelligence: 1}, new Weapon("Dagger", 1, 4), new Armor("Clothes", 0))

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

