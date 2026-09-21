// one-shot: QUIET YIELD — 40% of every real protocol fee streams to cloaked hUSD holders, pro-rata, paid in hUSD (already applied; don't re-run)
const fs = require('fs'), path = require('path');
const rep = (s, a, b, tag) => { if (!s.includes(a)) throw new Error('missing: ' + tag); return s.split(a).join(b); };

// ---------- server ----------
let f = path.join(__dirname, '..', 'server', 'index.js'); let s = fs.readFileSync(f, 'utf8');
s = rep(s, `function svc(kind, amt, w) {
  const f = amt * SVC[kind]; let cut = 0;`, `// ---------- QUIET YIELD: a share of every REAL fee streams to cloaked hUSD holders, pro-rata, paid in hUSD ----------
// Only fees paid by real wallets are shared. The fee is hUSD that is already collateral-backed, so paying it to holders prints nothing.
const QUIET_CUT = +(process.env.QUIET_CUT || 0.40);
if (!db.quiet) db.quiet = { paid: 0, n: 0, day: [] };
function quietPay(pool) {
  if (!(pool > 0)) return 0; const hs = Object.values(db.wallets).filter((x) => x.priv > 0.000001); const tot = hs.reduce((a, x) => a + x.priv, 0); if (!(tot > 0)) return 0;
  for (const x of hs) { const g = pool * x.priv / tot; x.priv += g; x.quietEarned = (x.quietEarned || 0) + g; }
  db.shielded.totalValue += pool; const now = Date.now(); db.quiet.paid += pool; db.quiet.n++; db.quiet.day.push([now, pool]); while (db.quiet.day.length && now - db.quiet.day[0][0] > 864e5) db.quiet.day.shift();
  return pool;
}
function quietView() { const hs = Object.values(db.wallets).filter((x) => x.priv > 0.000001); const tot = hs.reduce((a, x) => a + x.priv, 0); const now = Date.now(); const d = db.quiet.day.filter((e) => now - e[0] <= 864e5).reduce((a, e) => a + e[1], 0); return { cut: QUIET_CUT, paid: db.quiet.paid, payouts: db.quiet.n, paid24h: d, holders: hs.length, cloaked: tot, apr: tot > 0 ? d * 365 / tot : 0 }; }
function svc(kind, amt, w) {
  const f = amt * SVC[kind]; let cut = 0;`, 'svc head');
s = rep(s, `  shred.svcUsd += f - cut; return amt - f;`, `  const q = w ? quietPay((f - cut) * QUIET_CUT) : 0;
  shred.svcUsd += f - cut - q; return amt - f;`, 'svc tail');
s = rep(s, `w.priv += back; shred.svcUsd += fee; db.dark.fees += fee;`, `w.priv += back; shred.svcUsd += fee - quietPay(fee * QUIET_CUT); db.dark.fees += fee;`, 'dark close');
s = rep(s, `w.priv -= x; shred.svcUsd += fee; db.dark.fees += fee;`, `w.priv -= x; shred.svcUsd += fee - quietPay(fee * QUIET_CUT); db.dark.fees += fee;`, 'dark open');
s = rep(s, `    shielded: { totalValue: sh.totalValue,`, `    quiet: quietView(),\n    shielded: { totalValue: sh.totalValue,`, 'metrics');
s = rep(s, `deposited: w.deposited || 0, dark: darkView(w),`, `deposited: w.deposited || 0, quietEarned: w.quietEarned || 0, dark: darkView(w),`, 'account');
fs.writeFileSync(f, s);

// ---------- client app.js ----------
f = path.join(__dirname, '..', 'client', 'src', 'app.js'); s = fs.readFileSync(f, 'utf8');
s = rep(s, `  if (M.pyre) {`.replace('pyre', 'shred'), `  if (M.quiet) { const Q = M.quiet;
    $('q-cut').textContent = fmt(Q.cut * 100, 0) + '%'; $('q-paid').textContent = fmt(Q.paid, 2) + ' hUSD'; $('q-24h').textContent = fmt(Q.paid24h, 2) + ' hUSD'; $('q-apr').textContent = Q.cloaked > 0 && Q.paid24h > 0 ? fmt(Q.apr * 100, 1) + '%' : '—'; $('q-n').textContent = fmt(Q.payouts, 0); $('q-holders').textContent = fmt(Q.holders, 0);
  }
  if (M.shred) {`, 'app metrics');
s = rep(s, `  $('b-usdg').textContent = A ? fmt(A.usdg, 0) : '—';`, `  $('q-me').textContent = A ? '+' + fmt(A.quietEarned, 4) + ' hUSD' : '—'; $('q-me2').textContent = A ? '+' + fmt(A.quietEarned, 4) + ' hUSD' : '—';
  $('b-usdg').textContent = A ? fmt(A.usdg, 0) : '—';`, 'app account');
fs.writeFileSync(f, s);

// ---------- page ----------
f = path.join(__dirname, '..', 'client', 'index.html'); s = fs.readFileSync(f, 'utf8');
s = rep(s, `      <button data-ch="signal"><i>01</i><span>Signal</span></button>`, `      <button data-ch="quiet"><i>★</i><span>Quiet Yield</span></button>\n      <button data-ch="signal"><i>01</i><span>Signal</span></button>`, 'nav');
s = rep(s, `    <div class="tabs">`, `    <div class="kv" style="margin-top:12px;border:none"><span>Quiet Yield · earned while cloaked</span><b id="q-me" style="color:var(--a)">—</b></div>\n    <div class="tabs">`, 'vault kv');
s = rep(s, `.tabs{display:flex;flex-wrap:wrap;gap:6px;margin:18px 0 16px}`, `.tabs{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 16px}`, 'tabs css');
s = rep(s, `<button class="btn ghost" data-go="proto">How it works</button></div>`, `<button class="btn ghost" data-go="quiet">Quiet Yield · earn 40% of all fees</button></div>`, 'hero cta');
s = rep(s, `    <section class="ch" data-ch="signal">`, `    <section class="ch" data-ch="quiet">
      <div class="kick">quiet yield</div>
      <h2>Get paid to <span class="iri">stay silent.</span><span class="tag">LIVE</span></h2>
      <div class="read">
        <div class="stat"><div class="l">share of every fee</div><div class="v g" id="q-cut">—</div></div>
        <div class="stat"><div class="l">paid to cloaked holders</div><div class="v" id="q-paid">—</div></div>
        <div class="stat"><div class="l">last 24h</div><div class="v" id="q-24h">—</div></div>
        <div class="stat"><div class="l">running APR · from fees</div><div class="v g" id="q-apr">—</div></div>
        <div class="stat"><div class="l">payouts streamed</div><div class="v" id="q-n">—</div></div>
        <div class="stat"><div class="l">wallets earning</div><div class="v" id="q-holders">—</div></div>
        <div class="stat"><div class="l">you have earned</div><div class="v g" id="q-me2">—</div></div>
      </div>
      <p class="fine"><b>40% of every protocol fee is paid to the people holding cloaked hUSD.</b> Every cloak, send, uncloak, redeem and Blind Desk trade pays a fee. The moment it is paid, 40% of it is split across all cloaked balances, pro-rata, and lands <b>inside your cloaked balance as hUSD</b>. The rest still buys $HUSH and erases it.</p>
      <p class="fine"><b>No staking. No lock. No claim button.</b> Cloak hUSD and your balance grows every time anyone uses the protocol. Uncloak whenever you like and keep everything you earned.</p>
      <p class="fine"><b>Nothing is printed to pay for it.</b> The fee is hUSD that is already backed by USDG collateral, so Quiet Yield is revenue, paid in dollars. It has no pool to run dry and no end date, because it is funded by usage. The more private money moves, the more the silent side earns.</p>
      <div class="cta"><button class="btn fill" data-tabgo="shield">Cloak hUSD and start earning</button></div>
    </section>

    <section class="ch" data-ch="signal">`, 'channel');
s = rep(s, `<details><summary>What is a Drop?</summary>`, `<details><summary>What is Quiet Yield?</summary><div class="a"><b>40% of every protocol fee, paid to cloaked hUSD holders.</b> Each time anyone cloaks, sends, uncloaks, redeems or trades on the Blind Desk, 40% of the fee is split pro-rata across every cloaked balance and credited as hUSD, inside the cloak, in the same instant. There is no staking, no lock and nothing to claim. It is paid from fees that are already collateral-backed hUSD, so nothing is printed and it has no end date. The remaining fee still buys $HUSH and erases it.</div></details>\n        <details><summary>What is a Drop?</summary>`, 'faq');
s = rep(s, `  document.querySelectorAll('[data-go]').forEach(`, `  document.querySelectorAll('[data-tabgo]').forEach(function (b) { b.onclick = function () { var t = document.querySelector('.tabs button[data-tab=' + b.dataset.tabgo + ']'); if (t) t.click(); document.getElementById('demo').scrollIntoView(); }; });\n  document.querySelectorAll('[data-go]').forEach(`, 'router');
fs.writeFileSync(f, s);
console.log('quiet yield patched');
