import { Component } from '@angular/core';
import { CharacterOptions } from '../../models/character-options';

@Component({
  selector: "character-creation-component",
  templateUrl: "./character-creation.component.html",
  styleUrls: ["./character-creation.component.css"]
})

export class CharacterCreationComponent{
	character = {                           // set up some properties for character
		camp: '--Choose--',                 // set the default to some string
		class: '--Choose--',
		gender: undefined,                  // it's ok to set undefined because they are button
		name: undefined                     // not displaying anything
	}

	characterComplete: boolean = false;     // set a characterComplete flag
											// typescript boolean

	camps = CharacterOptions.camps;
	classes = CharacterOptions.classes;
	genders = CharacterOptions.genders;


	changecamp(camp: string) {
		this.character.camp = camp;
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
		this.characterComplete = this.character.camp !== "--Choose--"	// if these conditions are all True(1), then 1, because of logical and
			&& this.character.class !== "--Choose--"
			&& this.character.gender !== undefined
			&& this.character.name;										// this equals to true, not undefined(false value)
	}

	createCharacter() {
		if (!this.characterComplete) {
			return;
		}

		console.log(this.character);
	}
}
