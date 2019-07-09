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
			if (target.hasTrapDefence) {
				this.currentCharacter.isTrapped = true;

				if (target.hasDamagingTrap) {
					let damage = Math.floor(Math.random() * 8) + 1;
					this.currentCharacter.currentHealth -= damage;
					this.displayMessage = `${target.name} was protected by a trap. ${this.currentCharacter.name}
						is stuck in the trap, taking ${damage} damage.`;
					if (this.currentCharacter.currentHealth <= 0) {
						this.currentCharacter.isIncapacitated = true;
						this.enemiesIncapacitated++;
					}
				} else {
					this.displayMessage = `${target.name} was protected by a trap. ${this.currentCharacter.name}
						is stuck in the trap.`;
				}

				target.hasTrapDefence = false;
				target.hasDamagingTrap = false;
				setTimeout(() => {
					this.checkIfWin();
				}, this.actionDelay);
				return;
			}
		}

		if (this.selectedAction === FightOptions.attack) {
			this.freezeActions = true;
			this.attack(target);
		} else if (this.currentCharacter instanceof Hero
			&& this.currentCharacter.level > 2
			&& this.selectedAction === FightOptions.specialAttack) {

				const upgraded: boolean = this.currentCharacter.level > 5;

				if (this.currentCharacter instanceof Warrior) {
					this.warriorSpecialAttack(target, upgraded);
				}
				if (this.currentCharacter instanceof Ranger) {
					this.rangerSpecialAttack(target, upgraded);
				}
				if (this.currentCharacter instanceof Rogue) {
					this.rogueSpecialAttack(target, upgraded);
				}
				if (this.currentCharacter instanceof Priest) {
					this.priestSpecialAttack(target, upgraded);
				}

		} else {
			this.displayMessage = `Please select an action option.`;
		}
	}

	warriorSpecialAttack(target: BaseCharacter, upgraded: boolean) {
		if (!(target instanceof Monster)) {
			this.displayMessage = `Only enemies can be targeted for a warrior's special attack.`;
			return;
		} else if (this.currentCharacter instanceof Hero) {
			this.freezeActions = true;
			this.currentCharacter.turnsUntilSpecialAvailableAgain = this.turnsBetweenSpecial;
			let doubleAttackPenalty = upgraded ? 0 : 4;
			let firstTarget: BaseCharacter = this.selectedTargets[0];
			let secondTarget: BaseCharacter = this.selectedTargets[1];

			if (this.currentCharacter.attack() - doubleAttackPenalty >= firstTarget.barriers.attack) {
				let damage = this.currentCharacter.dealDamage();
				firstTarget.currentHealth -= damage;
				this.displayMessage = `${this.currentCharacter.name} hit ${firstTarget.name} dealing ${damage} damage.`;
				if (firstTarget.currentHealth <= 0){
					firstTarget.isIncapacitated = true;
					this.enemiesIncapacitated++;
				}
			} else {
				this.displayMessage = `${this.currentCharacter.name} Missed.`;
			}

			setTimeout(() => {
				if (this.currentCharacter.attack() - doubleAttackPenalty >= secondTarget.barriers.attack) {
					let damage = this.currentCharacter.dealDamage();
					secondTarget.currentHealth -= damage;
					this.displayMessage = `${this.currentCharacter.name} hit ${secondTarget.name} dealing ${damage} damage.`;
					if (secondTarget.currentHealth <= 0){
						secondTarget.isIncapacitated = true;
						this.enemiesIncapacitated++;
					}
				} else {
					this.displayMessage = `${this.currentCharacter.name} Missed.`;
				}

				setTimeout(() => {
					this.selectedTargets = [];
					this.checkIfWin();
				}, this.actionDelay);
			}, this.actionDelay);


		}

		this.selectedTargets.push(target);

		if (this.selectedTargets.length < 2){
			this.displayMessage = `Select a second target for your warrior's special attack`;
		}
	}

	rangerSpecialAttack(target: BaseCharacter, upgraded: boolean) {
		if (!(target instanceof Hero)) {
			this.displayMessage = `Only a hero can be targeted for a ranger's special attack`;
			return;
		}

		if (target.hasTrapDefence) {
			this.displayMessage = `Target hero already has a trap defense in place.`;
			return;
		}

		this.freezeActions = true;
		if (this.currentCharacter instanceof Hero) {
			this.currentCharacter.turnsUntilSpecialAvailableAgain = this.turnsBetweenSpecial;
		}

		this.displayMessage = `${this.currentCharacter.name} set up a grap to protect ${target.name}`;
		target.hasTrapDefence = true;
		target.hasDamagingTrap = upgraded;
		setTimeout(() => {
			this.nextTurn();
		}, this.actionDelay);

	}

	rogueSpecialAttack(target: BaseCharacter, upgraded: boolean) {
		if (!(target instanceof Monster)) {
			this.displayMessage = `Only a monster can be targeted for a rogue's special attack`;
			return;
		}

		this.freezeActions = true;
		if (this.currentCharacter instanceof Hero) {
			this.currentCharacter.turnsUntilSpecialAvailableAgain = this.turnsBetweenSpecial;
		}

		target.isStrongPoisoned = upgraded;
		target.poisonStacks++;
		this.displayMessage = `${target.name} was poisoned. (${target.poisonStacks} stack(s))`;

		setTimeout(() => {
			this.nextTurn();
		}, this.actionDelay);

	}

	priestSpecialAttack(target: BaseCharacter, upgraded: boolean) {
		if (!(target instanceof Hero)) {
			this.displayMessage = `Only a hero can be targeted for a priest's special ability`;
			return;
		}

		if (upgraded) {
			this.selectedTargets.push(target);

			if (this.selectedTargets.length < 2) {
				this.displayMessage = `Select a second target to heal.`;
				return;
			}

			this.freezeActions = true;
			if (this.currentCharacter instanceof Hero) {
				this.currentCharacter.turnsUntilSpecialAvailableAgain = this.turnsBetweenSpecial;
			}

			let heal1 = Math.floor((Math.random() * 6) + 1 + this.currentCharacter.skills.intelligence);
			let heal2 = Math.floor((Math.random() * 6) + 1 + this.currentCharacter.skills.intelligence);
			let target1 = this.selectedTargets[0];
			let target2 = this.selectedTargets[1];

			target1.currentHealth = target1.currentHealth + heal1 > target1.maxHealth ? target1.maxHealth : target1.currentHealth + heal1;
			this.displayMessage = `${target1.name} was healed for ${heal1} health.`;

			setTimeout(() => {
				target2.currentHealth = target2.currentHealth + heal2 > target2.maxHealth ? target2.maxHealth : target2.currentHealth + heal2;
				this.displayMessage = `${target2.name} was healed for ${heal2} health.`;
				this.selectedTargets = [];
				setTimeout(() => {
					this.nextTurn();
				}, this.actionDelay);
			}, this.actionDelay);

		} else {
			this.freezeActions = true;
			if (this.currentCharacter instanceof Hero) {
				this.currentCharacter.turnsUntilSpecialAvailableAgain = this.turnsBetweenSpecial;
			}

			let healing = Math.floor((Math.random() * 6) + 1 + this.currentCharacter.skills.intelligence);
			target.currentHealth = target.currentHealth + healing > target.maxHealth ? target.maxHealth : target.currentHealth + healing;
			this.displayMessage = `${target.name} was healed for ${healing} health.`;

			setTimeout(() => {
				this.nextTurn();
			}, this.actionDelay);
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

	nextTurn() {
		if (this.currentCharacter instanceof Monster
			&& this.currentCharacter.poisonStacks
			&& !this.currentCharacter.hasTakenPoisonDamageThisTurn) {

				this.currentCharacter.hasTakenPoisonDamageThisTurn = true;
				let maxDamage = this.currentCharacter.isStrongPoisoned ? 6 : 3;
				let poisonDamage = (Math.floor(Math.random() * maxDamage) + 1 ) * this.currentCharacter.poisonStacks;
				this.currentCharacter.currentHealth -= poisonDamage;
				this.displayMessage = `${this.currentCharacter.name} took ${poisonDamage} poison damage`;
				if (this.currentCharacter.currentHealth <= 0) {
					this.currentCharacter.isIncapacitated = true;
					this.enemiesIncapacitated++;
				}
				setTimeout(() => {
					this.checkIfWin();
				}, this.actionDelay);
				return;
			}

			if (this.currentCharacter instanceof Monster && this.currentCharacter.hasTakenPoisonDamageThisTurn) {
				this.currentCharacter.hasTakenPoisonDamageThisTurn = false;
			}

			this.availableTargets = Teams.none;
			this.selectedAction = FightOptions.none;
			this.characterIndex++;
			let nextCharacter;

			if (this.heroTurn) {
				nextCharacter = this.heroParty[this.characterIndex];
			} else {
				nextCharacter = this.enemyParty[this.characterIndex];
			}

			if (nextCharacter) {
				if (!nextCharacter.isIncapacitated) {
					this.currentCharacter = nextCharacter;
					this.displayMessage = `It's ${this.currentCharacter.name}'s turn`;
					if (this.currentCharacter instanceof Hero) {
						this.freezeActions = false;
						if (this.currentCharacter.turnsUntilSpecialAvailableAgain) {
							this.currentCharacter.turnsUntilSpecialAvailableAgain--;
						}
					} else {
						setTimeout(() => {
							this.takeEnemyTurn();
						}, this.actionDelay);
					}
				} else {
					this.nextTurn();
				}
			} else {
				this.heroTurn = !this.heroTurn;
				this.characterIndex = -1;
				this.nextTurn();
			}

	}

	takeEnemyTurn() {
		if (this.currentCharacter instanceof Monster && this.currentCharacter.isTrapped) {
			this.currentCharacter.isTrapped = false;
			this.displayMessage = `${this.currentCharacter.name} freed itself from the trap.`;
			setTimeout(() => {
				this.nextTurn();
			}, this.actionDelay);
		} else {
			let target: Hero;
			this.selectedAction = FightOptions.attack;

			while (!target){
				let randomTargetIndex = Math.floor(Math.random() * this.heroParty.length);
				let potentialTarget = this.heroParty[randomTargetIndex];
				if (!potentialTarget.isIncapacitated) {
					target = potentialTarget;
				}
			}
			this.displayMessage = `${this.currentCharacter.name} attacks ${target.name}.`;

			setTimeout(() => {
				this.tryAttack(target);
			}, this.actionDelay);
		}
	}

	nextChapter() {
		this.gameControllerService.nextChapter();
		this.router.navigateByUrl("/story");
	}

	gameOver() {
		this.gameControllerService.gameOver();
	}

}


