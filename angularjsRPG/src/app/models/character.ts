import { RaceOptions, ClassOptions, GenderOptions } from './character-options';

export class Armor {
	constructor(name: string, attackBarrierBonus: number) {
		this.name = name;
		this.attackBarrierBonus = attackBarrierBonus;
	}

	name: string;
	attackBarrierBonus: number;
}


export class Weapon {
	constructor(name: string, minDamage: number, maxDamage: number) {
		this.name = name;
		this.minDamage = minDamage;
		this.maxDamage = maxDamage;
	}

	name: string;
	minDamage: number;
	maxDamage: number;
}


export enum CharacterSkills {
	attack = "attack",
	sneak = "sneak",
	persuade = "persuade",
	intelligence = "intelligence"
}


export enum FightOptions {
	attack = "Attack",
	specialAttack = "Special Attack",
	none = "None"								// This may not be helpful in the fight, but it will be helpful in our code
												// we can check to see whether we have selected an action
}

export const ExperienceToLevel = {				// How much experience we need to level up our character
	1: 1000,
	2: 2000,
	3: 3000,
	4: 4000,
	5: 5000,
	6: 6000,
	7: 7000,
	8: 8000,
	9: 9000
};												// variable usually comes with ;


