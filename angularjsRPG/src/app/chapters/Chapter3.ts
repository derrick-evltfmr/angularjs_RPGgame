import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter3: Chapter = {
	story: [
		`After you defeated the plant monsters, you found that there's a girl fainted on the ground`,
		`you step forward to check if she's fine, she awakes and says she was attacked by the plant monsters`,
		`The plant monsters used the hypnotic powder to make her fall asleep. She's glad that Sheen and you defeated the plant mosnter`,
		`In another words, you saved her, so she's grateful. Her name is Elizabeth and now she joins into your team`,
		` `,
		`Elizabeth told you that you are the braver that can save the Kingdom because you have some special potential power`,
		`She told you that there're so many monster appearing around is because an evil wizard summon them out to destroy the Kingdom `,
		`You say "Sure, I'll try my best to make the Kingdom become peaceful again!`,
		`How do you want to handle it?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Dark Dragon", 30, {attack: 15, sneak: 15, persuade: 15}, {attack: 12, sneak: 12, persuade: 12}, 8, 15,
			"../../assets/darkdragon.png")
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
		experience: 7000,
		equipment: [new Weapon("Alloy Steel Sword", 2, 6), new Armor("Leather Armor", 8)],
		newHero: new Priest("Elizabeth", GenderOptions.female, CampOptions.wiseCountry, 5, 28, {attack: 5, sneak: 8,
			persuade: 12, intelligence: 15}, new Weapon("Wand", 3, 10), new Armor("Elegant Clothes", 5))

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

