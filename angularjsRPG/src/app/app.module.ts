import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // allow us to use the NgModel two way binding for input values in the application

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

// Import the components
import { StartComponent } from './components/start/start.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { StoryComponent } from './components/story/story.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FightComponent } from './components/fight/fight.component';
import { GameControllerService } from './services/game-controller.service';

// Set up the routes
const routes: Routes = [  // create an array of Routes objects

  { path: "", component: StartComponent},
  { path: "story", component: StoryComponent},
  { path: "character-creation", component: CharacterCreationComponent},
  { path: "fight", component: FightComponent},
  { path: "**", redirectTo: ""}
];

@NgModule({
  declarations: [
	AppComponent,
	// Declare the components here so that we can use them later in our code
	// This is to tell Angular the components exist
	StartComponent,
	CharacterCreationComponent,
	StoryComponent,
	InventoryComponent,
	FightComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	RouterModule.forRoot(routes),// This creates our router with all of the routes that we've created
								 // so it will know what to use for the paths in the application
	FormsModule
  ],
  providers: [
	  GameControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
