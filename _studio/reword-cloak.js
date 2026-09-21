// one-shot: diner vocabulary -> cloak vocabulary in client/src/app.js (already applied; don't re-run)
const fs = require('fs'); const f = 'client/src/app.js'; let s = fs.readFileSync(f, 'utf8');
const R = [
  ["'Courier Prime'", "'Sora'"],
  ["toast('check opened')", "toast('vault opened')"],
  ["no regulars yet. pass the first envelope", "no relays yet. send the first drop"],
  ['<span class="ty burn">shred</span>', '<span class="ty burn">erase</span>'], ["✂ ${fmt(b.hush, 1)} HUSH", "− ${fmt(b.hush, 1)} HUSH"],
  ["the shredder is waiting on its first service charge…", "waiting on the first fees to erase…"],
  ["nothing rung up yet", "no signal yet"],
  ["<b>The Carbon Copy.</b> This view key opens a read-only duplicate", "<b>Mirror.</b> This view key opens a read-only mirror"],
  ["carbon copy ↗", "mirror ↗"],
  ["<b>Someone passed you an envelope.</b> Private hUSD is tucked behind this link.", "<b>You have a drop waiting.</b> Cloaked hUSD is locked behind this link."],
  ["Claim into my shielded balance", "Claim into my cloaked balance"],
  ["<b>The Back Room.</b> Put shielded hUSD on a stock.", "<b>Blind Desk.</b> Commit cloaked hUSD to a stock."],
  ["stay off the books. 30 bps each way to the Shredder.", "stay cloaked. 30 bps each way to Erase."],
  [">Open quietly<", ">Open cloaked<"], [", off the books`", ", cloaked`"],
  ["❄ THE FREEZER", "CRYO"], ["'❄ Freeze HUSH'", "'Cryo-lock HUSH'"],
  ["<b>The Freezer:</b> your USDG enters the coupon pool", "<b>Cryo:</b> your USDG enters the bond pool"],
  ["paid from Happy Hour's fixed pool", "paid from the Window's fixed pool"],
  ["<b>Clip a coupon: USDG for $HUSH at", "<b>Bond USDG for $HUSH at"], ["'<b>Coupons are closed.</b>'", "'<b>Bonds are closed.</b>'"],
  ["Plain coupon · −", "Standard bond · −"], ["'freezer' : 'coupon'} price", "'cryo' : 'bond'} price"], ["in the freezer · yield building", "in cryo · yield building"],
  [": 'Clip coupon'}", ": 'Bond USDG'}"], ["`froze ${fmt(r.bonded", "`cryo-locked ${fmt(r.bonded"], ["`coupon clipped: ${fmt(r.bonded, 2)} USDG", "`bonded ${fmt(r.bonded, 2)} USDG"],
  ["' freezer yield)'", "' cryo yield)'"], ["' on ice'", "' in cryo'"],
  ["during <b>Happy Hour</b>:", "in <b>the Window</b>:"], ["'<b>Happy Hour is '", "'<b>The Window is '"], ["<span>On the tab</span>", "<span>Staked</span>"], ["hUSD on the tab`", "hUSD staked`"],
  ["Pay with shielded hUSD. The <b>amount and both parties stay off the books</b>", "Send cloaked hUSD. The <b>amount and both parties never appear</b>"],
  [">Pay quietly<", ">Send cloaked<"], ["hUSD, quietly`", "hUSD, cloaked`"],
  ["<b>Or pass an envelope:</b> no address needed. Tuck the amount above behind a link", "<b>Or leave a drop:</b> no address needed. Lock the amount above behind a link"],
  [">Seal an envelope<", ">Create drop link<"], ["`envelope sealed with ${fmt(r.amt, 2)} hUSD. copy the link`", "`drop created with ${fmt(r.amt, 2)} hUSD. copy the link`"],
  ["service charge", "fee"],
];
for (const [a, b] of R) { if (!s.includes(a)) { console.log('MISSING:', a); continue; } s = s.split(a).join(b); }
fs.writeFileSync(f, s);
