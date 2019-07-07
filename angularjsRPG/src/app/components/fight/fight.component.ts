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
	consturctor(private gameControllerService: GameControllerService,
		private router: Router) {}

	HeroTurn: boolean = true;
	actionDelay: number = this.gameControllerService.actionDelay;
	turnsBetweenSpecial: number = 2;
	characterIndex: number = 0;
	freezeActions: boolean = false;

	heroParty: Hero[] = this.gameControllerService.heroParty;
	heroesIncapacitated: number = 0;
	enemyParty: Monster[] = this.gameControllerService.enemyParty;
	enemiesIncapacitated: number = 0;

	currentCharacter: BaseCharacter = this.heroParty[this.characterIndex];
	_fightOptions: typeof FightOptions = FightOptions;
	_teams: typeof Teams = Teams;
	selectedAction: FightOptions = FightOptions.none;
	availableTargets: Teams = Teams.none;
	selectedTargets: BaseCharacter[] = [];

	displayMessage: string = `${this.currentCharacter.name}'s turn.`;
	successMessages: string[] = [];
	showNextChapterButton: boolean = false;
	showGameOverButton: boolean = false;
}
