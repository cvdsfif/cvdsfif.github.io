export default {
  preset: "ts-jest",
  testEnvironment: "@happy-dom/jest-environment",
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        },
        tsconfig: './tsconfig.app.json'
      },
    ]
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less)$": "<rootDir>/assets/css/__mocks__/styleMock.js"
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['!tests/*', '!**/dist/**/*', '!tests/**/*', '!src/contracts/**/*'],
  coverageReporters: ['json-summary', 'text'],
}