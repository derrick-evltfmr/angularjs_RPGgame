import { Component } from '@angular/core';
import { CharacterOptions } from 'src/app/models/character-options';
import { GameControllerService } from 'src/app/services/game-controller.service';

@Component({
	selector: "character-creation-component",
	templateUrl: "./character-creation.component.html",
	styleUrls: ["./character-creation.component.css"]
})

export class CharacterCreationComponent{
	constructor(private gameControllerService: GameControllerService) {}

	character = {                           // set up some properties for character
		race: '--Choose--',                   // set the default to some string
		class: '--Choose--',
		gender: undefined,                    // it's ok to set undefined because they are button
		name: undefined                       // not displaying anything
	}

	characterComplete: boolean = false;     // set a characterComplete flag
																					// typescript boolean

	races = CharacterOptions.races;
	classes = CharacterOptions.classes;
	genders = CharacterOptions.genders;


	changeRace(race: string) {
		this.character.race = race;
		this.checkCompleted();
	}

	changeClass(someClass: string) {		// class is reserved word so we can't use that
		this.character.class = someClass;
		this.checkCompleted();
	}

	changeGender(gender: string) {
		this.character.gender = gender;
		this.checkCompleted();
	}

	changeName() {
		this.checkCompleted();
	}

	checkCompleted(){
		this.characterComplete = this.character.race !== "--Choose--"	// if these conditions are all True(1), then 1, because of logical and
			&& this.character.class !== "--Choose--"
			&& this.character.gender !== undefined
			&& this.character.name;										// this equals to true, not undefined(false value)
	}

	createCharacter() {
		if (!this.characterComplete) {
			return;
		}

		// console.log(this.character);
		this.gameControllerService.setMainCharacter(this.character);
	}
}
