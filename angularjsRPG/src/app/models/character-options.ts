export enum CampOptions {
	strengthCountry = "Strength Country",
	agileCountry = "Agile Country",
	wisdomCountry = "Wisdom Country",
	dexterityCountry = "Dexterity Country"
}

export enum ClassOptions {
	warrior = "Warrior",
	ranger = "Ranger",
	rogue = "Rogue",
	priest = "Priest"
}

export enum GenderOptions {
	male = "Male",
	female = "Female"
}

export const CharacterOptions = {			// create an object that we can reference without having to copy
	camps: [								// the enum values in a semi-awkward way
		CampOptions.strengthCountry,		// so this is an array of string values
		CampOptions.agileCountry,
		CampOptions.wisdomCountry,
		CampOptions.dexterityCountry
	],
	classes: [
		ClassOptions.warrior,
		ClassOptions.ranger,
		ClassOptions.rogue,
		ClassOptions.priest
	],
	genders: [
		GenderOptions.male,
		GenderOptions.female
	]
}
