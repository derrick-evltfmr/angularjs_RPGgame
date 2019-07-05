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

	chooseAction(action: string): void {
		if (this.successMessages.length){
			return;
		}

		this.displayMessage = `You decide to ${action}.`;
		setTimeout(() => {			  	// just like console.log(), available everywhere in js
			switch(action) {			// 1st parameter is a function and the 2nd parameter
				case CharacterAction.attack:	// is a number of milliseconds of the delay
					this.tryAttack();			// this arrow function is useful in this case
					break;						// () => {}, it will not go out of the function
				case CharacterAction.sneak:		// but it's created inside the class, so it will
					this.trySneak();			// hold onto that value, so to keep our value
					break;						// consistent
				case CharacterAction.persuade:
					this.tryPersuade();
					break;
				case CharacterAction.doNothing:
					this.doNothing();
					break;
				default:
					console.log("Something went horribly wrong in story >> chooseAction");
			}
		}, this.actionDelay);
	}

	tryAttack(): void {
		this.gameControllerService.isFighting = true;
		this.router.navigateByUrl("/fight");	// route to the fight page
	}

	trySneak(): void {
		let sneakBarrier = 0;
		let sneakPower = 0;
		this.enemyParty.forEach( enemy => {
			sneakBarrier += enemy.barriers.sneak;
		});
		this.heroParty.forEach( hero => {
			sneakPower += hero.sneak();
		});
		if (sneakPower >= sneakBarrier) {
			this.displayMessage = `Your attempt at sneaking was a success!`;
			setTimeout(() => {
				this.onSuccess();
			}, this.actionDelay);
		} else {
			this.displayMessage = `Your attempt at sneaking was a failure!`;
			setTimeout(() => {
				this.onSneakPersuadeFailure();
			}, this.actionDelay);
		}
	}

	tryPersuade(): void {
		let persuasionBarrier = 0;
		let persuasionPower = 0;
		this.enemyParty.forEach( enemy => {
			persuasionBarrier += enemy.barriers.persuade;
		});
		this.heroParty.forEach( hero => {
			persuasionPower += hero.persuade();
		});
		if (persuasionPower >= persuasionBarrier) {
			this.displayMessage = `Your attempt at persuasion was a success!`;
			setTimeout(() => {
				this.onSuccess();
			}, this.actionDelay);
		} else {
			this.displayMessage = `Your attempt at persuasion was a failure!`;
			setTimeout(() => {
				this.onSneakPersuadeFailure();
			}, this.actionDelay);
		}
	}

	doNothing(): void {
		this.displayMessage = `You decide to do nothing and move on.`;
		setTimeout(() => {
			this.nextChapter();
		}, this.actionDelay);
	}

}

