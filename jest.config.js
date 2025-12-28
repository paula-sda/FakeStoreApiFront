/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy",
      "^@/app/(.*)$": "<rootDir>/app/$1",
    },
  };
  