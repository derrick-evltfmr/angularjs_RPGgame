import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Chapter7: Chapter = {
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
		newHero: [new Ranger("Robin", GenderOptions.male, CampOptions.dexterityCountry, 10, 108, {attack: 75, sneak: 90,
			persuade: 40, intelligence: 25}, new Weapon("Storm Spiral", 15, 24), new Armor("Wind protection suit", 15)),
				new Rogue("Katherina", GenderOptions.female, CampOptions.agileCountry, 10, 102, {attack: 80, sneak: 82,
			persuade: 30, intelligence: 30}, new Weapon("Ghost Daggers", 12, 22), new Armor("Skull hunter suit ", 14))
		]

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

