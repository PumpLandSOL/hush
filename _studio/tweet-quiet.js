// appends the Quiet Yield tweet to X-KIT.md and prints its length (must be <= 245)
const fs = require('fs'), path = require('path'); const f = path.join(__dirname, '..', 'X-KIT.md');
const T = `QUIET YIELD is live on HUSH.

40% of every protocol fee now streams to cloaked hUSD holders. Real revenue, paid in dollars.

No staking. No lock. No emissions.

Get paid to stay silent.

$HUSH 0x9556664b35d0b77d7ec0f2bdfed787b7e4abb48b
hushmoneyrh.xyz`;
const n = [...T].length; console.log('chars:', n); if (n > 245) process.exit(1);
let s = fs.readFileSync(f, 'utf8'); if (!s.includes('QUIET YIELD is live')) { s += '\n## Update 01 · Quiet Yield\n\n**10 · Quiet Yield** (`hush-quietyield-10s.mp4`)\n```\n' + T + '\n```\n'; fs.writeFileSync(f, s); }
