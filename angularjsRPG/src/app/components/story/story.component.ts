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

}
