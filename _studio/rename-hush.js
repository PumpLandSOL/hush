// one-shot: STYX -> HUSH identifier + vocabulary rename (already applied; don't re-run)
const fs = require('fs'), path = require('path');
const files = ['server/index.js', 'client/src/app.js', 'client/view.html', '_studio/dev.js', ...fs.readdirSync('_studio').filter((f) => /^e2e-.*\.cjs$/.test(f)).map((f) => '_studio/' + f)];
const R = [
  [/ferrymen/g, 'referrers'], [/ferryman/g, 'referrer'], [/FERRY/g, 'PUNCH'], [/Ferry/g, 'Punch'], [/ferry/g, 'punch'],
  [/souls/g, 'guests'], [/soul/g, 'guest'], [/Souls/g, 'Guests'],
  [/forging/g, 'freezing'], [/forged/g, 'frozen'], [/FORGE/g, 'FREEZER'], [/Forge/g, 'Freezer'], [/forge/g, 'freezer'],
  [/PYRE/g, 'SHRED'], [/Pyre/g, 'Shredder'], [/pyre/g, 'shred'],
  [/VIGIL/g, 'HAPPY'], [/The Vigil/g, 'Happy Hour'], [/Vigil/g, 'Happy Hour'], [/the vigil/g, 'happy hour'], [/vigil/g, 'happy'],
  [/sealKey/g, 'carbonKey'], [/\/api\/seal/g, '/api/carbon'], [/The Seal/g, 'The Carbon Copy'],
  [/TOLL/g, 'SVC'], [/tollUsd/g, 'svcUsd'], [/\btoll\(/g, 'svc('], [/\btolls\b/g, 'service charges'], [/\btoll\b/g, 'service charge'],
  [/STYX/g, 'HUSH'], [/Styx/g, 'Hush'], [/styx/g, 'hush'], [/sUSD/g, 'hUSD'], [/susd/g, 'husd'], [/SUSD/g, 'HUSD'],
];
for (const f of files) { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of R) s = s.replace(a, b); fs.writeFileSync(f, s); }
for (const f of fs.readdirSync('_studio')) { const m = /^e2e-(ferry|forge|seal|vigil)\.cjs$/.exec(f); if (m) fs.renameSync('_studio/' + f, '_studio/e2e-' + { ferry: 'punch', forge: 'freezer', seal: 'carbon', vigil: 'happy' }[m[1]] + '.cjs'); }
