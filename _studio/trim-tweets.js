// one-shot: rewrite tweets 3-8 in X-KIT.md to <= 245 chars, then print every count
const fs = require('fs'), path = require('path'); const f = path.join(__dirname, '..', 'X-KIT.md');
let s = fs.readFileSync(f, 'utf8').replace(/\r/g, '');
const T = {
  3: `20 seconds inside HUSH.

→ mint hUSD against USDG
→ cloak it, balance goes unreadable
→ send cloaked, or leave a Drop link
→ Blind Desk: stocks, fully cloaked
→ every fee buys $HUSH and erases it

One screen. Live now.
hushmoneyrh.xyz`,
  4: `Live in the HUSH console today:

Drop · cloaked pay links
Mirror · read-only view keys
Blind Desk · cloaked stock positions
Bonds −20% · Cryo −30% + 80% APY
The Window · staking with an end date
Erase · fees buy $HUSH and delete it`,
  5: `Three moves. No names.

01 Mint: USDG in. Most is collateral, the rest buys $HUSH and erases it.
02 Cloak: your hUSD becomes a note only you can read.
03 Send: amount and both parties never reach the ledger.`,
  6: `ZEC is private, but it isn't a dollar.
UST was a dollar, but public and 0% hard-backed.

hUSD:
· $1, ~90% USDG collateral
· no amount, sender or recipient shown
· minting erases $HUSH, never prints it

Private like ZEC. Stable like UST wasn't.`,
  7: `The $HUSH flywheel:

private dollars move → fees collect in USDG → protocol buys $HUSH → $HUSH is erased.

Every cloak, send and redeem feeds it. So does a slice of every mint.

Nothing printed. Public receipts.`,
  8: `Send private dollars as a link.

Lock cloaked hUSD behind a secret → share the link → whoever opens it claims into their own cloaked balance.

No address. No recipient on the ledger.

Text it. DM it. QR it.
hushmoneyrh.xyz`,
};
for (const n of Object.keys(T)) s = s.replace(new RegExp('(\\*\\*' + n + ' · [^\\n]*\\n```\\n)[\\s\\S]*?(\\n```)'), (m, a, b) => a + T[n] + b);
fs.writeFileSync(f, s);
[...s.matchAll(/\*\*(\d) · [^\n]*\n```\n([\s\S]*?)\n```/g)].forEach((x) => console.log(x[1], [...x[2]].length));
