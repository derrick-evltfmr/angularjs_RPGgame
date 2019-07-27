import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter7: Chapter = {
	story: [
		`Finally, you came to the depths of the castle, where the darkest power is the strongest.`,
		`'`,
		`"Hahahahahhh... You are really something else! I didn't even expect you can still stay alive and come here." `,
		`"However, this helps nothing, because you are all dying here."`,
		`'`,
		`The final boss Evil Wizard appears.`,
		`How do you want to handle it?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Phantom Warrior", 75, {attack: 40, sneak: 99, persuade: 99}, {attack: 40, sneak: 99, persuade: 99}, 15, 20,
			"../../assets/phantomwarrior.png"),
		new Monster("Evil Wizard", 150, {attack: 50, sneak: 999, persuade: 999}, {attack: 50, sneak: 999, persuade: 999}, 25, 40,
			"../../assets/evilwizard.png"),
		new Monster("Wraith Devil", 75, {attack: 40, sneak: 99, persuade: 99}, {attack: 40, sneak: 99, persuade: 99}, 15, 20,
			"../../assets/wraithdevil.png")
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
		experience: 99999,
		equipment: [],
		newHero: []

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

