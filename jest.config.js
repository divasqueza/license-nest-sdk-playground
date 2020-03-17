module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "./src",
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(t)s$": "ts-jest"
  },
  "coverageDirectory": "../coverage",
  "collectCoverageFrom": [
    "**/*.{ts}",
    "!main.ts"
  ],
  "testEnvironment": "node"
};
