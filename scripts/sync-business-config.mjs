#!/usr/bin/env node
/**
 * Sync de vendored business-config codegen in deze repo (SPL Fase 2/3).
 *
 * Spec-besluit 1: de website importeert de workspace-package NIET runtime (geïsoleerde
 * Docker-build-context). We vendoren een kopie van het gegenereerde TS-artefact en
 * committen die. Run dit op de dev-machine wanneer packages/business-config wijzigt —
 * regenereer daar eerst met `npm run generate:ts`.
 *
 * Bron wordt verwacht op <workspace>/packages/business-config/generated/... — werkt
 * vanuit zowel projects/ als deploy/ checkout (beide twee niveaus onder de root).
 */
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url)); // <repo>/scripts
const repoRoot = resolve(here, '..');
const src = resolve(repoRoot, '../../packages/business-config/generated/business-config.generated.ts');
const dest = join(repoRoot, 'data', 'business-config.generated.ts');

if (!existsSync(src)) {
  console.error(
    `[sync-business-config] bron niet gevonden:\n  ${src}\n` +
      'Run eerst `npm run generate:ts` in packages/business-config.',
  );
  process.exit(1);
}

copyFileSync(src, dest);
console.log(`[sync-business-config] gesynct:\n  ${src}\n  -> ${dest}`);
