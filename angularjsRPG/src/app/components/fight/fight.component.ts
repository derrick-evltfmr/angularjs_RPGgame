import { Component } from '@angular/core';
import { GameControllerService } from '../../services/game-controller.service';
import { Hero, Monster, BaseCharacter, FightOptions, Warrior, Ranger, Rogue, Priest } from '../../models/characters';
import { Router } from '@angular/router';

enum Teams {
	heroes,
	enemies,
	none
}

@Component({
  selector: "fight-component",
  templateUrl: "./fight.component.html",
  styleUrls: ["./fight.component.css"]
})

export class FightComponent{

}
