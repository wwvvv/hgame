import { readFileSync } from 'node:fs';
import { validateManifest } from '../src/lib/manifest.ts';
const file=process.argv[2];
if (!file) { console.error('Usage: npm run validate:manifest -- path/to/game-manifest.json'); process.exit(2); }
try { const errors=validateManifest(JSON.parse(readFileSync(file,'utf8'))); if(errors.length){ console.error(errors.join('\n'));process.exit(1); } console.log('Manifest structure OK. This does NOT verify files, hashes, rights, engine compatibility, or runtime safety.'); } catch(error){console.error(error instanceof Error ? error.message : String(error));process.exit(1);}
