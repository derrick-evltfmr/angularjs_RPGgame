import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapter";
import { Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/characters';
import { GenderOptions, CampOptions, ClassOptions } from "../models/character-options";

export const Ending: Chapter = {
	story: [
		`At last, you and your part have defeated the Evil Wizard`,
		`The dark clouds disappear and the sky become bright again!`,
		`'`,
		`You say "Thanks" to your teammates, every of you are very happy that the battle is finally over.`,
		`then you all are heading back to the kingdom for the celebration.`,
		`'`,
		`The king appreciates that you saved the kingdom and so that it can become peaceful again`,
		`He confers you and your teammates as the kingdom knights, and hope that you can continue to protect the kingdom and the people in it.`,
		`'`,
		`There must be still a lot of challenges lying in the future, but you will train yourself to be much stronger than now.`,
		`and with your great teammates, you are sure that no matter what crisis comes again, you can absolutely break through it!`,
		`'`,
		`// THE END// `
	],

	options: [
	],

	enemyParty: [
	],

	sneakPersuadeFail: CharacterAction.attack,

	ifFail: FailureOptions.nextChapter,

	ifSucceed: [
		SuccessOptions.rewardExperience,
		SuccessOptions.rewardEquipment,
		SuccessOptions.addHeroToParty
	],

	rewards: {
		experience: 0,
		equipment: [],
		newHero: []

	},

	nextChapter: null   // if there's a Chapter 2, put Chapter 2
};

