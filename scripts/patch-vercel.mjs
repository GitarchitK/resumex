// Patches the Vercel output config to use nodejs20.x after astro build
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const functionsDir = '.vercel/output/functions';

try {
  const entries = readdirSync(functionsDir);
  for (const entry of entries) {
    const configPath = join(functionsDir, entry, '.vc-config.json');
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf8'));
      if (config.runtime && config.runtime.includes('nodejs18')) {
        config.runtime = 'nodejs20.x';
        writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log(`Patched ${configPath}: nodejs18.x → nodejs20.x`);
      }
    } catch {}
  }
} catch (e) {
  console.error('Patch failed:', e.message);
  process.exit(1);
}
