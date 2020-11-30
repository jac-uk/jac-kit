module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/packages/$1"
  }
};
