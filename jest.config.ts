import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	preset: "ts-jest",

	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	}
};

export default config;
