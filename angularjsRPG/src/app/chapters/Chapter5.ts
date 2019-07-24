import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter5: Chapter = {
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
		new Monster("Dark Dragon", 100, {attack: 30, sneak: 30, persuade: 30}, {attack: 30, sneak: 30, persuade: 30}, 10, 25,
			"../../assets/darkdragon.png")
	],

	sneakPersuadeFail: CharacterAction.attack,

	ifFail: FailureOptions.nextChapter,

	ifSucceed: [
		SuccessOptions.rewardExperience,
		SuccessOptions.rewardEquipment,
		SuccessOptions.addHeroToParty
	],

	rewards: {
		experience: 15000,
		equipment: [new Weapon("Alloy Steel Sword", 5, 10), new Armor("Leather Armor", 8)],
		newHero: [new Priest("Elizabeth", GenderOptions.female, CampOptions.wiseCountry, 5, 35, {attack: 10, sneak: 12,
			persuade: 18, intelligence: 25}, new Weapon("Wand", 3, 10), new Armor("Elegant Clothes", 5))]

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

