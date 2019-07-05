import { Component } from '@angular/core';
import { GameControllerService } from '../../services/game-controller.service';
import { CharacterAction, SuccessOptions, FailureOptions } from '../../models/chapter';
import { Hero, Monster } from '../../models/character';
import { Router } from '@angular/router';

@Component({
  selector: "story-component",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})

export class StoryComponent {
	constructor(private gameControllerService: GameControllerService,
		private router: Router) {}

	// make the variables available in story.component.html because it reads from this component
	currentChapter = this.gameControllerService.currentChapter;
	heroParty: Hero[] = this.gameControllerService.heroParty;
	enemyParty: Monster[] = this.currentChapter.enemyParty;

	actionDelay: number = this.gameControllerService.actionDelay;
	displayMessage: string = "";
	successMessages: string[] = [];
	showNextChapterButton: boolean = false;
}

