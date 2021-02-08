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
  "cacheDirectory": "../.jest-cache",
  "coverageDirectory": "../coverage",
  "collectCoverageFrom": [
    "**/*.{ts}",
    "!main.ts"
  ],
  "testEnvironment": "node"
};
