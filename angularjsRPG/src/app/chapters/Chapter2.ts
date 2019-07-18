import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter2: Chapter = {
	story: [
		`A Rogue just passed by saw that how you fight with the goblin`,
		`He rushed to the front of you and he's super interested in your style of fighting,`,
		`He said his name was Sheen and said now he's your teammate and will go on adventure with you (Unilaterally)`,
		`You don't know what to do with him, but it seems that he's a nice guy, and indeed you're very happy to have him with you.`,
		`Meanwhile, the plants around you become a bit weird. You couldn't tell what's going wrong, `,
		`but the astmosphere is really strange. Sheen finds that the plants are moving!!`,
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
		new Monster("Treeant", 15, {attack: 7, sneak: 5, persuade: 8}, {attack: 10, sneak: 10, persuade: 10}, 5, 10, "../../assets/treeant.png"),
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
		experience: 7000,
		equipment: [new Weapon("Alloy Steel Sword", 2, 6), new Armor("Leather Armor", 8)],
		newHero: new Priest("Elizabeth", GenderOptions.female, CampOptions.wiseCountry, 5, 28, {attack: 5, sneak: 8,
			persuade: 12, intelligence: 15}, new Weapon("Wand", 3, 10), new Armor("Elegant Clothes", 5))

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

