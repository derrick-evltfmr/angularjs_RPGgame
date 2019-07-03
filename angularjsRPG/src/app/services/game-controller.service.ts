import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Hero, Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest } from '../models/character';
import { Chapter } from '../models/chapter';
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

	}
}
