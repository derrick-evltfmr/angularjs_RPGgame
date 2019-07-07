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

	heroTurn: boolean = true;
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

	selectOption(selectOption: FightOptions) {
		if (this.freezeActions && this.heroTurn) {
			return;
		}
		this.selectedAction = selectOption;
		this.selectedTargets = [];

		if (this.selectedAction === FightOptions.attack) {
			this.availableTargets = Teams.enemies;
			this.displayMessage = "Select a target for your attack.";
		} else if (this.selectedAction === FightOptions.specialAttack
			&& this.currentCharacter instanceof Hero
			&& this.currentCharacter.level < 3) {

				this.displayMessage = `Special attacks unlock for a character once they reach level 3`;
		} else if (this.selectedAction === FightOptions.specialAttack
			&& this.currentCharacter instanceof Hero
			&& this.currentCharacter.level > 2) {

				if (this.currentCharacter.turnsUntilSpecialAvailableAgain) {
					this.displayMessage = `Cannot use special attack yet. ${this.currentCharacter.turnsUntilSpecialAvailableAgain}
						turn(s) until it is available again.`;
				} else {
					if (this.currentCharacter instanceof Warrior) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Attack two targets at once with a small attack penalty. At level 6 and above, the attack penalty is removed.
							The two targets may be the same enemy`;
					}
					if (this.currentCharacter instanceof Ranger) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Setup a trap to protect one of your heroes. The trap will prevent all damage and the enemy will take a turn
							to free itself from the trap. At level 6 and above, the trap will also deal up to 8 damage.`;
					}
					if (this.currentCharacter instanceof Rogue) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Poison an enemy or add another stack of poison to an enemy to do up to 3 damage, with each stack of poison
							multiplying the damage. At level 6 and above, the damage is 1 - 6 times the number of poison stacks`;
					}
					if (this.currentCharacter instanceof Priest) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Select a hero to heal for up to 6 health plus an additional point for each point in the intelligence skill.
							At level 6 and above, you choose two targets to heal. The two targets can be the same hero.`;
					}
				}

		}
	}

	tryAttack(target: BaseCharacter) {
		if (this.freezeActions) {
			return;
		}
		if (target.isIncapacitated) {
			this.displayMessage = "That target is already incapacitated.";
			return;
		}

		if (this.currentCharacter instanceof Monster && target instanceof Hero) {

		}

		if (this.selectedAction === FightOptions.attack) {
			this.freezeActions = true;
			this.attack(target);
		} else if (this.currentCharacter instanceof Hero) {

		} else {
			this.displayMessage = `Please select an action option.`;
		}
	}

	attack(target: BaseCharacter) {
		this.availableTargets = Teams.none;
		if (this.currentCharacter.attack() >= target.barriers.attack) {
			let damage = this.currentCharacter.dealDamage();
			target.currentHealth -= damage;
			this.displayMessage = `${this.currentCharacter.name} hit ${target.name} dealing ${damage} damage.`;
			setTimeout(() => {
				if (target.currentHealth <= 0) {
					target.isIncapacitated = true;
					this.heroTurn ? this.enemiesIncapacitated++ : this.heroesIncapacitated++;
					this.checkIfWin();
				} else {
					this.nextTurn();
				}
			}, this.actionDelay);
		} else {
			this.displayMessage = `${this.currentCharacter.name} Missed.`;
			setTimeout(() => {
				this.nextTurn();
			}, this.actionDelay);
		}
	}

	checkIfWin() {
		this.selectedAction = FightOptions.none;
		if (this.enemiesIncapacitated === this.enemyParty.legnth) {
			this.displayMessage = `All enemies have been defeated!`;
			this.successMessages = this.gameControllerService.encounterSuccess();
			this.showNextChapterButton = true;
			this.gameControllerService.isFighting = false;
			return;
		}
		if (this.heroesIncapacitated === this.heroParty.length) {
			this.displayMessage = `All heroes have been defeated!`;
			this.showGameOverButton = true;
			this.gameControllerService.isFighting = false;
			return;
		}
		this.nextTurn();
	}



}


