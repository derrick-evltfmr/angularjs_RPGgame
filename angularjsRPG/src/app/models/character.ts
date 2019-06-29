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
