export enum RaceOptions {
	human = "Human",
	dwarf = "Dwarf",
	elf = "Elf",
	halfling = "Halfling"
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
	races: [								// the enum values in a semi-awkward way
		RaceOptions.human,					// so this is an array of string values
		RaceOptions.dwarf,
		RaceOptions.elf,
		RaceOptions.halfling
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
