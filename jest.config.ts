export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png|css|less|scss)$":
      "<rootDir>/test/__ mocks __/fileMock.ts",
  },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFiles: ["./jest.polyfills.ts"],
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/setupTest.ts"],
};
