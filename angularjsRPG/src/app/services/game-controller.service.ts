import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Hero, Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest, checkCamp, ExperienceToLevel } from '../models/characters';
import { Chapter, SuccessOptions } from '../models/chapter';
import { Chapter1 } from '../chapters/Chapter1';
import { CampOptions, GenderOptions, ClassOptions } from '../models/character-options';

@Injectable()
export class GameControllerService {
	constructor(private router: Router) {}	// automatically create a property on an object for us to navigate

	mainCharacter: Hero;
	currentChapter: Chapter = Chapter1;

	isFighting: boolean = false;
	actionDelay: number = 1500;				// delay between each action (milliseconds)

	heroParty: Hero[] = [];					// set the empty array, when we start, we add the character to the array
	partyInventory: (Weapon | Armor)[] = [];
	availableHeroes: Hero[] = [];

	enemyParty: Monster[] = [];
/*
	numberOfAllCharacters = Object.keys(characterId).length / 2; 			// get the number of enums, not applicable for string enum
	teamMemberExists = new Array(this.numberOfAllCharacters).fill(false);
*/

	setMainCharacter(character) {
		switch (character.class) {
			case ClassOptions.warrior:
				this.mainCharacter = new Warrior(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence: 0}, new Weapon("Wooden Sword", 1, 3), new Armor("Basic Clothes", 0));
				break;
			case ClassOptions.ranger:
				this.mainCharacter = new Ranger(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence: 0}, new Weapon("Wooden Bow", 1, 3), new Armor("Basic Clothes", 0));
				break;
			case ClassOptions.rogue:
				this.mainCharacter = new Rogue(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence: 0}, new Weapon("Wooden Dagger", 1, 3), new Armor("Basic Clothes", 0));
				break;
			case ClassOptions.priest:
				this.mainCharacter = new Priest(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence: 0}, new Weapon("Wooden Wand", 1, 3), new Armor("Basic Clothes", 0));
				break;
		}

		// Keep in mind that in JavaScript, the objects are passed by reference, while other variable are passed by value
		checkCamp(this.mainCharacter);
		this.heroParty.push(this.mainCharacter);
		this.router.navigateByUrl('/story');		// move the user from the character creation page to the story page
	}

	encounterSuccess(): string[] {

		let messages: string[] = [];
		this.currentChapter.ifSucceed.forEach(reward => {
			switch (reward) {
				case SuccessOptions.rewardExperience:
					messages.push(`Each member of your party received ${this.currentChapter.rewards.experience} experience. `);
					this.heroParty.forEach(hero => {
						hero.experience += this.currentChapter.rewards.experience;
						if (hero.experience >= ExperienceToLevel[hero.level]) {
							messages.push(`${hero.name} leveled up! Upgrade the stats on the inventory screen.`)
							hero.levelUp();
						}
					});
					break;
				case SuccessOptions.rewardEquipment:
					messages.push("You received the following equipment: ");
					this.currentChapter.rewards.equipment.forEach(equipment => {
						if (equipment instanceof Armor) {	// typescript keywoard: instanceof
							messages.push(`${equipment.name} -- Attack Barrier Bonus: ${equipment.attackBarrierBonus}`);
						} else {
							messages.push(`${equipment.name} -- Min Damges: ${equipment.minDamage}, Max Damages: ${equipment.maxDamage}`);
						}
						this.partyInventory.push(equipment);
					});
					break;
				case SuccessOptions.addHeroToParty:
					let newHero: Hero = this.currentChapter.rewards.newHero;
					if (this.heroParty.length < 3 ) {
						messages.push(`A new hero joined your party! ${newHero.name} - ${newHero.characterRole} - level ${newHero.level}`);
						this.heroParty.push(newHero);
					} else {
						messages.push(`A new hero is available to join your party! ${newHero.name} - ${newHero.characterRole} - level ${newHero.level}`);
						this.availableHeroes.push(newHero);
					}
					break;
			}
		});
		return messages;

	}

	nextChapter(): void {
		this.heroParty.forEach(hero => hero.rest());
		this.currentChapter = this.currentChapter.nextChapter;
		this.enemyParty = this.currentChapter.enemyParty;
	}

	gameOver(): void {
		this.mainCharacter = undefined;
		this.currentChapter = Chapter1;
		this.heroParty = [];
		this.partyInventory = [];
		this.availableHeroes = [];
		this.enemyParty = this.currentChapter.enemyParty;

		this.router.navigateByUrl("/");
	}

	/*
	checkHeroIdentity = (hero: Hero) => {
		switch (hero.gender) {
			case GenderOptions.male:
				switch (hero.characterRole) {
					case ClassOptions.warrior:
						this.teamMemberExists[characterId.maleWarrior] = true;
						break;
					case ClassOptions.ranger:
						this.teamMemberExists[characterId.maleRanger] = true;
						break;
					case ClassOptions.rogue:
						this.teamMemberExists[characterId.maleRogue] = true;
						break;
					case ClassOptions.priest:
						this.teamMemberExists[characterId.malePriest] = true;
						break;
				}
				break;
			case GenderOptions.female:
				switch (hero.characterRole) {
					case ClassOptions.warrior:
						this.teamMemberExists[characterId.femaleWarrior] = true;
						break;
					case ClassOptions.ranger:
						this.teamMemberExists[characterId.femaleRanger] = true;
						break;
					case ClassOptions.rogue:
						this.teamMemberExists[characterId.femaleRogue] = true;
						break;
					case ClassOptions.priest:
						this.teamMemberExists[characterId.femalePriest] = true;
						break;
				}
				break;
		}
	}

	pickRewardingHero(): Hero {
		this.heroParty.forEach(hero => {
			this.checkHeroIdentity(hero);
		});
		this.availableHeroes.forEach(hero => {
			this.checkHeroIdentity(hero);
		});
		let OK = false;
		let pickHeroId = 0;
		let pickHero;
		while (!OK) {
			pickHeroId = Math.floor(Math.random() * this.numberOfAllCharacters);	// 0 to maxIndex (number of characters -1)
			if (this.teamMemberExists[pickHeroId] === false) {
				OK = true;
			}
		}

		switch (pickHeroId) {
			case characterId.maleWarrior:
				pickHero = new Warrior("Benjamin", GenderOptions.male, CampOptions.dexterityCountry, 1, 10, {attack: 2, sneak: 1,
						persuade: 1, intelligence: 1}, new Weapon("Sword", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.femaleWarrior:
				pickHero = new Warrior("Jessica", GenderOptions.female, CampOptions.dexterityCountry, 1, 10, {attack: 2, sneak: 1,
						persuade: 1, intelligence: 1}, new Weapon("Sword", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.maleRanger:
				pickHero = new Ranger("Robin", GenderOptions.male, CampOptions.dexterityCountry, 1, 8, {attack: 1, sneak: 1,
						persuade: 2, intelligence: 1}, new Weapon("Bow", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.femaleRanger:
				pickHero = new Ranger("Iris", GenderOptions.female, CampOptions.dexterityCountry, 1, 8, {attack: 1, sneak: 1,
						persuade: 2, intelligence: 1}, new Weapon("Bow", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.maleRogue:
				pickHero = new Rogue("Sheen", GenderOptions.male, CampOptions.agileCountry, 1, 8, {attack: 1, sneak: 2,
						persuade: 1, intelligence: 1}, new Weapon("Dagger", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.femaleRogue:
				pickHero = new Rogue("Katherina", GenderOptions.female, CampOptions.agileCountry, 1, 8, {attack: 1, sneak: 2,
						persuade: 1, intelligence: 1}, new Weapon("Dagger", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.malePriest:
				pickHero = new Priest("John", GenderOptions.male, CampOptions.wiseCountry, 1, 6, {attack: 1, sneak: 1,
						persuade: 1, intelligence: 2}, new Weapon("Wand", 1, 4), new Armor("Clothes", 0));
				break;
			case characterId.femalePriest:
				pickHero = new Priest("Elizabeth", GenderOptions.female, CampOptions.wiseCountry, 1, 6, {attack: 1, sneak: 1,
						persuade: 1, intelligence: 2}, new Weapon("Wand", 1, 4), new Armor("Clothes", 0));
				break;
		}

		return pickHero;

	}
	*/

}
