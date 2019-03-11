module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "./src",
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "coverageDirectory": "../coverage",
  "collectCoverageFrom": [
    "**/*.{ts}",
    "!**/*.module.ts",
    "!main.ts"
  ],
  "testEnvironment": "node"
};