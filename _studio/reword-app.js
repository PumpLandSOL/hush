// one-shot: HUSH vocabulary for client/src/app.js (already applied; don't re-run)
const fs = require('fs'); const f = 'client/src/app.js'; let s = fs.readFileSync(f, 'utf8');
const R = [
  ["$('p-service charge')", "$('p-svc')"], ["$('b-seal')", "$('b-carbon')"],
  ["'JetBrains Mono'", "'Courier Prime'"],
  ["toast('file opened')", "toast('check opened')"],
  ["no referrals yet — write the first Note", "no regulars yet. pass the first envelope"],
  ["<span class=\"ty burn\">burn</span>", "<span class=\"ty burn\">shred</span>"], ["🔥 ${fmt(b.hush, 1)} HUSH", "✂ ${fmt(b.hush, 1)} HUSH"],
  ["the shred is gathering its first service charge…", "the shredder is waiting on its first service charge…"],
  ["no entries yet", "nothing rung up yet"],
  ["<b>The Carbon Copy.</b> This view key opens a read-only statement", "<b>The Carbon Copy.</b> This view key opens a read-only duplicate"],
  ["sealed statement ↗", "carbon copy ↗"],
  ["<b>Someone sent you a Note.</b> Private hUSD is locked behind this link.", "<b>Someone passed you an envelope.</b> Private hUSD is tucked behind this link."],
  ["<b>The Dark Pool.</b> Commit shielded hUSD to a stock.", "<b>The Back Room.</b> Put shielded hUSD on a stock."],
  ["stay in the shield. 30 bps each way.", "stay off the books. 30 bps each way to the Shredder."],
  [">Open unseen<", ">Open quietly<"], ["— unseen`", ", off the books`"],
  ["🔥 THE FREEZER", "❄ THE FREEZER"], ["'🔥 Freezer HUSH'", "'❄ Freeze HUSH'"],
  ["<b>The Freezer:</b> your USDG enters the bond pool", "<b>The Freezer:</b> your USDG enters the coupon pool"],
  ["paid from the Happy Hour's fixed pool", "paid from Happy Hour's fixed pool"],
  ["<b>Bond USDG for $HUSH at", "<b>Clip a coupon: USDG for $HUSH at"], ["'<b>Bonds are closed.</b>'", "'<b>Coupons are closed.</b>'"],
  ["Plain bond · −", "Plain coupon · −"], ["'freezer' : 'bond'} price", "'freezer' : 'coupon'} price"], ["in the freezer · yield freezing", "in the freezer · yield building"],
  [": 'Bond USDG'}", ": 'Clip coupon'}"], ["`frozen ${fmt(r.bonded", "`froze ${fmt(r.bonded"], ["`bonded ${fmt(r.bonded, 2)} USDG", "`coupon clipped: ${fmt(r.bonded, 2)} USDG"],
  ["' frozen yield)'", "' freezer yield)'"], ["' HUSH · ' + Bd.freezer.n + ' frozen'", "' HUSH · ' + Bd.freezer.n + ' on ice'"],
  ["in <b>Happy Hour</b>:", "during <b>Happy Hour</b>:"], ["'<b>The happy is '", "'<b>Happy Hour is '"], ["<span>Keeping happy</span>", "<span>On the tab</span>"], ["hUSD keeps happy`", "hUSD on the tab`"],
  ["Send shielded hUSD. The <b>amount and both parties are hidden</b>", "Pay with shielded hUSD. The <b>amount and both parties stay off the books</b>"],
  [">Send privately<", ">Pay quietly<"], ["hUSD — privately`", "hUSD, quietly`"],
  ["<b>Or write a Note:</b> no address needed. Lock the amount above behind a link", "<b>Or pass an envelope:</b> no address needed. Tuck the amount above behind a link"],
  [">Create pay link<", ">Seal an envelope<"], ["`note written for ${fmt(r.amt, 2)} hUSD — copy the link`", "`envelope sealed with ${fmt(r.amt, 2)} hUSD. copy the link`"],
  ["see the on-chain balance in the Treasury bar below", "check it on the explorer any time"],
];
for (const [a, b] of R) { if (!s.includes(a)) throw new Error('missing: ' + a); s = s.split(a).join(b); }
fs.writeFileSync(f, s);
