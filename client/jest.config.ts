import { pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"
import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
	roots: ["src/"],
	preset: "ts-jest",
	testEnvironment: "node",
	modulePaths: ["src/"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "src/",
	}),
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
	},
}
export default jestConfig
