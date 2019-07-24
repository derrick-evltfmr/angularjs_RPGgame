import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter5: Chapter = {
	story: [
		`You defeated the treasure monsters, but it seems that the evil wizard has notice your existence`,
		`So the ruin is starting to collapse, you and your teammates try to escape from the ruin`,
		`'`,
		`You are almost at the entrance of the ruin, but suddenly a black hole appears at the entrance of the ruin`,
		`All of you are shocked, because... a huge dark dragon was summoned...`,
		`it seems that it won't let you to escape from the ruin...`,
		`How do you want to handle it?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Dark Dragon", 120, {attack: 40, sneak: 100, persuade: 100}, {attack: 40, sneak: 100, persuade: 100}, 10, 25,
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
		equipment: [new Armor("Dragon Slayer Suit", 20)],
		newHero: [new Warrior("Benjamin", GenderOptions.male, CampOptions.dexterityCountry, 9, 95, {attack: 70, sneak: 40,
			persuade: 25, intelligence: 10}, new Weapon("Fire Sword", 10, 15), new Armor("Knight Armor", 15)),
				new Priest("John", GenderOptions.male, CampOptions.wiseCountry, 9, 80, {attack: 30, sneak: 20,
			persuade: 50, intelligence: 80}, new Weapon("Spirit Wand", 12, 14), new Armor("Sage Suit", 10))
		]

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

