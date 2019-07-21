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
		new Monster("Stone Monster", 20, {attack: 12, sneak: 12, persuade: 12}, {attack: 10, sneak: 10, persuade: 10}, 7, 12,
			"../../assets/stonemonster.png"),
		new Monster("Brick Monster", 20, {attack: 12, sneak: 12, persuade: 12}, {attack: 10, sneak: 10, persuade: 10}, 7, 12,
			"../../assets/brickmonster.png")
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
		newHero: new Priest("Elizabeth", GenderOptions.female, CampOptions.wiseCountry, 5, 28, {attack: 5, sneak: 8,
			persuade: 12, intelligence: 15}, new Weapon("Wand", 3, 10), new Armor("Elegant Clothes", 5))

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

