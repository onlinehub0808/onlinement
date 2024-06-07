// Import the necessary types from 'ts-jest' for TypeScript support
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  // Use 'ts-jest' preset to handle TypeScript files in Jest
  preset: "ts-jest",

  // Set the test environment to 'jsdom' to emulate a browser environment
  testEnvironment: "jsdom",
};