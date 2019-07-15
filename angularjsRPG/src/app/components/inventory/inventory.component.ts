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

}




