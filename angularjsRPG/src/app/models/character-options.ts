export enum CampOptions {
  wiseCountry = "Wise Country",
  strengthCountry = "Strength Country",
  dexterityCountry = "Dexterity Country",
  agileCountry = "Agile Country"
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
		CampOptions.wiseCountry,		// so this is an array of string values
		CampOptions.strengthCountry,
		CampOptions.dexterityCountry,
		CampOptions.agileCountry
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
};
