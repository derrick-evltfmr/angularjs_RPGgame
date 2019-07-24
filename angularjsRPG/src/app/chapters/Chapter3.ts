import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";
import { Chapter4 } from './Chapter4';

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
		new Monster("Stone Monster", 50, {attack: 12, sneak: 12, persuade: 12}, {attack: 10, sneak: 10, persuade: 10}, 7, 12,
			"../../assets/stonemonster.png"),
		new Monster("Brick Monster", 50, {attack: 12, sneak: 12, persuade: 12}, {attack: 10, sneak: 10, persuade: 10}, 7, 12,
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
		experience: 8000,
		equipment: [new Armor("Brick Armor", 12), new Armor("Stone Armor", 12)],
		newHero: [new Warrior("Jessica", GenderOptions.female, CampOptions.strengthCountry, 6, 38, {attack: 20, sneak: 14,
				persuade: 12, intelligence: 8}, new Weapon("Power Sword", 6, 12), new Armor("Warrior Armor", 9)),
				new Ranger("Iris", GenderOptions.female, CampOptions.dexterityCountry, 6, 32, {attack: 15, sneak: 21,
				persuade: 7, intelligence: 12}, new Weapon("Double Bow", 7, 11), new Armor("Ranger Suit", 7))]

	},

	nextChapter: Chapter4   // if there's a Chapter 2, put Chapter 2
};

