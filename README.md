# HUSH — private dollars on Robinhood Chain

**Cash only. No questions.** hUSD is a fractional-algorithmic dollar you can shield and pay with off the books; $HUSH is the share token.

Dependency-free Node. `npm start` (port 8212). Local dev with faucet: `node _studio/dev.js`.

Features: USDG deposits verified on-chain, Mint / Cash out, Shield / Pay quietly, Envelopes (pay links), Carbon Copy (view keys), Back Room (shielded stock positions), Coupons + the Freezer, Happy Hour staking, the Shredder (buyback & burn), Regulars (referrals).

Env: `HUSH_MINT`, `TREASURY`, `ADMIN_KEY`, `DATA_PATH`, `HAPPY_APY|POOL|CAP|START|END`, `HAPPY_BOOST_APY|END`, `BOND_*`, `FREEZER_DISCOUNT|LOCK_DAYS|APY`, `PUNCH_CUT`, `DARK_*`, `MIN_DEPOSIT`.

Tests: `_studio/e2e-*.cjs` (run each against a fresh `DATA_PATH`; freezer needs a tiny `FREEZER_LOCK_DAYS`).
