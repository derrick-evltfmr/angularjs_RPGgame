import { Component } from '@angular/core';
import { componentFactoryName } from '@angular/compiler';
import { GameControllerService } from '../../services/game-controller.service';
import { Hero, Weapon, Armor, CharacterSkills, ExperienceToLevel } from '../../models/characters';


@Component({
  selector: "inventory-component",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"]
})

export class InventoryComponent {
	constructor(private gameControllerService: GameControllerService) {}

	inventoryIsOpen: boolean = false;

	_characterSkills: typeof CharacterSkills = CharacterSkills;
	heroParty: Hero[] = this.gameControllerService.heroParty;
	mainCharacter: Hero = this.gameControllerService.mainCharacter;
	availableHeroes: Hero[] = this.gameControllerService.availableHeroes;
	inventory: (Weapon|Armor)[] = this.gameControllerService.partyInventory;
	_experienceToLevel: typeof ExperienceToLevel = ExperienceToLevel;

	selectedHero: Hero = this.heroParty[0];
	showAvailableHeroesScreen: boolean = false;
	isFighting: boolean = this.gameControllerService.isFighting;

	openInventory() {
		this.inventoryIsOpen = true;
		this.heroParty = this.gameControllerService.heroParty;
		this.availableHeroes = this.gameControllerService.availableHeroes;
		this.inventory = this.gameControllerService.partyInventory;
		this.selectedHero = this.heroParty[0];
		this.showAvailableHeroesScreen = false;
		this.isFighting = this.gameControllerService.isFighting;
	}

	closeInventory() {
		this.inventoryIsOpen = false;
	}

	setSelectedHero(newHero: Hero) {
		this.showAvailableHeroesScreen = false;
		if (this.selectedHero !== newHero) {
			this.selectedHero = newHero;
		}
	}

}





