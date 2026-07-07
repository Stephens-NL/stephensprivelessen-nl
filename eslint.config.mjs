// Flat config for ESLint 10 + eslint-config-next 16.
// Replaces the legacy .eslintrc.json (extends: next/core-web-vitals).
// next lint was removed in Next 16; lint now runs via the ESLint CLI (`eslint .`).
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import * as espree from 'espree'

export default defineConfig([
  ...nextVitals,
  {
    // eslint-config-next sets react.version 'detect', which makes
    // eslint-plugin-react 7.37.x call the removed context.getFilename() and
    // crash on ESLint 10. Pin the version to skip auto-detection.
    settings: { react: { version: '19.2' } },
    // Carried over verbatim from the old .eslintrc.json rules block.
    rules: {
      '@next/next/no-server-import-in-page': 'off',
      'react/no-unescaped-entities': 'off',
      'no-console': ['warn', { allow: ['error'] }],
      // New in eslint-plugin-react-hooks 7 (via eslint-config-next 16);
      // absent from the previous config. Off to keep the old rule set.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    // eslint-config-next routes plain JS through Next's bundled Babel parser,
    // whose scope manager predates ESLint 10's scopeManager.addGlobals and
    // crashes. TS/TSX use typescript-eslint (fine); use espree for JS.
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: { parser: espree },
  },
  // eslint . would otherwise walk build output and generated files.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
