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
};												// variable comes with ;


export class BaseCharacter {
	name: string;
	maxHealth: number;
	currentHealth: number;
	isIncapacitated: boolean;
	barriers: {
		attack: number,
		sneak: number,
		persuade: number
	};
	skills: {
		attack: number,
		sneak: number,
		persuade: number,
		intelligence: number
	}

	equippedWeapon: Weapon;
	equippedArmor: Armor;
	spriteUrl: string;							// url to the image we specify the character

	constructor(name: string, health: number, skills = {attack: 0, sneak: 0, persuade: 0, intelligence: 0}) {
		this.name = name;
		this.maxHealth = health;
		this.currentHealth = health;
		this.skills = skills;
		this.isIncapacitated = false;
	}

	attack() {
		return Math.floor(Math.random() * 20) + 1 + this.skills.attack;
																		// Floor will round a number down to the nearest integer
																		// random will generate a number between 0 to 1 but never 1, so 0~0.99999999
																		// 0~19 +1, so 1~20
	}

	sneak() {
		return Math.floor(Math.random() * 20) + 1 + this.skills.sneak;
	}

	persuade() {
		return Math.floor(Math.random() * 20) + 1 + this.skills.persuade;
	}

	dealDamage() {
		return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1)) + this.equippedWeapon.minDamage;

		// generate a number from 0 to (weapon.maxdamage - weapon.mindamage) + weapon.mindamage,
		// so it can reflect the weapon min/max damage difference, but still keep the damage stable
		// e.g. even if the random number is 0, it will still at least casue minDamage + 0

	}
}


export class Monster extends BaseCharacter {
	isTrapped: boolean = false;				// default to false
	poisonStacks: number = 0;
	isStrongPoison: boolean = false;
	hasTakenPoisonDamageThisTurn: boolean = false;

	// the parameters are what we want to pass in the constructor
	constructor(name, health, skills, barriers: {attack: number, sneak: number, persuade: number}, minDamage, maxDamage, spriteUrl) {
		super(name, health, skills);

		this.barriers = barriers;
		this.equippedWeapon = new Weapon (undefined, minDamage, maxDamage);

		this.spriteUrl = spriteUrl;
	}
}


export class Hero extends BaseCharacter {
	gender: string;
	race: string;
	characterRole: string;
	experience: number;
	level: number;
	availableSkillPoints: number;
	hasTrapDefence: boolean;
	hasDamagingTrap: boolean;
	turnsUntilSpecialAvailableAgain: number;

	constructor(name, gender, race, level, health, skills, weapon, armor){
		super(name, health, skills);

		this.gender = gender;
		this.race = race;
		this.experience = 0;
		this.level = level;
		this.equippedWeapon = weapon;
		this.equipNewArmor(armor);
	}

	levelUp(): void {
		this.experience -= ExperienceToLevel(this.level);
		this.level++;
		this.availableSkillPoints += 2;
		if(this.experience >= ExperienceToLevel(this.level)){
			this.levelUp();
		}
	}

	equipNewArmor(armor: Armor): void {
		if(this.equippedArmor){
			this.barriers.attack -= this.equippedArmor.attackBarrierBonus;
		}
		this.equippedArmor = armor;
		this.barriers.attack += armor.attackBarrierBonus;
	}

	equipNewWeapon(weapon: Weapon): void {
		this.equippedWeapon = weapon;
	}

	rest(): void {
		this.currentHealth = this.maxHealth;
		this.isIncapacitated = false;
		this.turnsUntilSpecialAvailableAgain = 0;
	}


}