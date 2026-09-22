/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.ts'],
  // .claude/worktrees holds full checkouts of this repo, so '**/*.test.ts' was
  // collecting four stale copies of every suite: 110 of 137 files, failing on
  // whatever the branch looked like when it was abandoned.
  testPathIgnorePatterns: ['/node_modules/', '/.claude/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      jsx: 'react'
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/navigation$': '<rootDir>/mocks/nextNavigation.ts'
  },
  testTimeout: 60000, // Increase timeout to 60s for e2e tests
  globalSetup: '<rootDir>/jest.global-setup.js',
  globalTeardown: '<rootDir>/jest.global-teardown.js'
};

module.exports = config;