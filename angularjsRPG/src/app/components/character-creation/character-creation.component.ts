import { Component } from '@angular/core';
import { CharacterOptions } from '../../models/character-options';

@Component({
  selector: "character-creation-component",
  templateUrl: "./character-creation.component.html",
  styleUrls: ["./character-creation.component.css"]
})

export class CharacterCreationComponent{
	character = {                           // set up some properties for character
		race: '--Choose--',                 // set the default to some string
		class: '--Choose--',
		gender: undefined,                  // it's ok to set undefined because they are button
		name: undefined                     // not displaying anything
	}

	characterComplete: boolean = false;     // set a characterComplete flag
											// typescript boolean

	races = CharacterOptions.races;
	classes = CharacterOptions.classes;
	genders = CharacterOptions.genders;

}
