export type ReleaseManifest = {
  schemaVersion: 1; gameId: string; releaseId: string;
  engine: 'webgal'; engineVersion: string; edition: 'demo' | 'full';
  entry: string; saveVersion: number;
  assets: { path: string; bytes: number; sha256: string }[];
};
export function isSafeRelativePath(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= 512 &&
    /^[a-zA-Z0-9_./-]+$/.test(value) && !value.startsWith('/') &&
    value.split('/').every(part => !!part && part !== '.' && part !== '..');
}
export function validateManifest(input: unknown): string[] {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return ['manifest must be an object'];
  const x = input as Record<string, unknown>; const errors: string[] = [];
  const id = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (x.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  for (const key of ['gameId', 'releaseId']) if (typeof x[key] !== 'string' || !id.test(x[key] as string) || (x[key] as string).length > 100) errors.push(`${key} is invalid`);
  if (x.engine !== 'webgal') errors.push('only webgal is accepted by the draft contract');
  if (typeof x.engineVersion !== 'string' || !/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(x.engineVersion)) errors.push('engineVersion must be explicit');
  if (x.edition !== 'demo' && x.edition !== 'full') errors.push('edition must be demo or full');
  if (!isSafeRelativePath(x.entry) || !x.entry.endsWith('.html')) errors.push('entry must be a safe relative HTML path');
  if (!Number.isSafeInteger(x.saveVersion) || (x.saveVersion as number) < 1) errors.push('saveVersion must be a positive integer');
  const seen = new Set<string>(); let total = 0;
  if (!Array.isArray(x.assets) || x.assets.length === 0 || x.assets.length > 10000) errors.push('assets must contain 1..10000 files');
  else {
    for (const raw of x.assets) {
      if (!raw || typeof raw !== 'object') { errors.push('invalid asset'); continue; }
      const a = raw as Record<string, unknown>;
      if (!isSafeRelativePath(a.path)) errors.push('unsafe asset path');
      else {
        const folded = a.path.toLowerCase();
        if (seen.has(folded)) errors.push(`duplicate asset: ${a.path}`);
        seen.add(folded);
        if (a.path.split('/').some(part => part.startsWith('.')) || /(?:^|\/)(?:node_modules|private|secrets)(?:\/|$)/i.test(a.path) || /\.(?:pem|key|p12)$/i.test(a.path)) errors.push('private asset forbidden');
      }
      if (!Number.isSafeInteger(a.bytes) || (a.bytes as number) < 0 || (a.bytes as number) > 536870912) errors.push('invalid asset size');
      else total += a.bytes as number;
      if (typeof a.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(a.sha256)) errors.push('invalid asset checksum');
    }
    if (!x.assets.some(a => a && typeof a === 'object' && a.path === x.entry)) errors.push('entry missing from assets');
    if (total > 1073741824) errors.push('release exceeds draft 1 GiB limit');
  }
  return errors;
}
