import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Hero, Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest, checkCamp } from '../models/character';
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

	setMainCharacter(character: {name: string, class: ClassOptions, camp: CampOptions, gender: GenderOptions}) {
		switch(character.class) {
			case ClassOptions.warrior:
				this.mainCharacter = new Warrior(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence:0}, new Weapon("Wooden Sword", 1, 3), new Armor("Basic Clothes",0));
				break;
			case ClassOptions.ranger:
				this.mainCharacter = new Ranger(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence:0}, new Weapon("Wooden Bow", 1, 3), new Armor("Basic Clothes",0));
				break;
			case ClassOptions.rogue:
				this.mainCharacter = new Rogue(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence:0}, new Weapon("Wooden Dagger", 1, 3), new Armor("Basic Clothes",0));
				break;
			case ClassOptions.priest:
				this.mainCharacter = new Priest(character.name, character.gender, character.camp, 1, 10,
					{attack: 0, sneak: 0, persuade: 0, intelligence:0}, new Weapon("Wooden Wand", 1, 3), new Armor("Basic Clothes",0));
				break;
		}

		// Keep in mind that in JavaScript, the objects are passed by reference, while other variable are passed by value
		checkCamp(this.mainCharacter);
		this.heroParty.push(this.mainCharacter);
		this.router.navigateByUrl('/story');
	}

	encounterSuccess(): string[] {
		let messages: string[] = [];
		this.currentChapter.ifSucceed.forEach(reward => {
			switch(reward){
				case SuccessOptions.rewardExperience:
					break;
				case SuccessOptions.rewardEquipment:
					break;
				case SuccessOptions.addHeroToParty:
					break;
			}
		});
		return messages;

	}
}
