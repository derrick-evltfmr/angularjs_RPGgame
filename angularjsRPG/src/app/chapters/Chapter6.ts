import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter6: Chapter = {
	story: [
		`During the fight with the Dark Dragon, two guys appeared and gave you a hand`,
		`With the help of Benjamin and John, you successfully defeated the Dark Dragon`,
		`You leave the ruin in time, after you all get out, the ruin collapses `,
		`'`,
		`You say 'Thanks' to them, they said they are just two random bravers that passing by`,
		`But they are very interested to join the fight against the evil wizard, so they are now your new teammates`,
		`'`,
		`Your party goes through the magic river and comes to a valley, you can feel there are some very strong magic power in the deep inside`,
		`Everything around becomes darker and darker. And finally you reach a castle.`,
		`From the dark energy, you can tell the evil wizard must be inside the castle, but your party is not the first that arrives here`,
		`Inside there are two people's shadows fighting with the monster, but there is a great quantity of the enemies`,
		`You want to help, and at this time, three monsters are rushing to your side.`,
		`How do you want to handle it?`
	],

	options: [
		CharacterAction.attack,
		CharacterAction.sneak,
		CharacterAction.persuade
	],

	enemyParty: [
		new Monster("Skull Monster", 60, {attack: 30, sneak: 70, persuade: 70}, {attack: 30, sneak: 70, persuade: 70}, 12, 18,
			"../../assets/skullmonster.png"),
		new Monster("Dark Pumpkin", 100, {attack: 30, sneak: 70, persuade: 70}, {attack: 30, sneak: 70, persuade: 70}, 14, 25,
			"../../assets/darkpumpkin.png"),
		new Monster("Bat Monster", 60, {attack: 30, sneak: 70, persuade: 70}, {attack: 30, sneak: 70, persuade: 70}, 12, 18,
			"../../assets/batmonster.png")
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
		experience: 18000,
		equipment: [new Weapon("Evil breaker", 18, 30)],
		newHero: [new Warrior("Benjamin", GenderOptions.male, CampOptions.dexterityCountry, 9, 95, {attack: 70, sneak: 40,
			persuade: 25, intelligence: 10}, new Weapon("Fire Sword", 10, 15), new Armor("Knight Armor", 15)),
				new Priest("John", GenderOptions.male, CampOptions.wiseCountry, 9, 80, {attack: 30, sneak: 20,
			persuade: 50, intelligence: 80}, new Weapon("Spirit Wand", 12, 14), new Armor("Sage Suit", 10))
		]

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

