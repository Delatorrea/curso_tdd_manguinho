module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
