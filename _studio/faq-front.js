// one-shot: move the FAQ onto the front page (Overview), "Answers" in the rail jumps to it (already applied; don't re-run)
const fs = require('fs'), path = require('path'); const f = path.join(__dirname, '..', 'client', 'index.html');
let s = fs.readFileSync(f, 'utf8');
const must = (c, m) => { if (!c) throw new Error(m); };
// 1. lift the FAQ body out of its own channel
const m = /\n    <section class="ch" data-ch="faq">[\s\S]*?(<div class="faq">[\s\S]*?\n      <\/div>)\n    <\/section>\n/.exec(s); must(m, 'faq section');
let faq = m[1]; s = s.replace(m[0], '\n');
// 2. wording pass: present tense only
faq = faq.replace(' It is also the governance token for the phases ahead.', ' Holders govern the protocol parameters.');
must(!/phases ahead|planned|coming|soon|demo|simulat|paper|testnet|beta|roadmap/i.test(faq), 'unfinished wording left in FAQ');
// 3. drop it onto the Overview, under the CA bar
const anchor = '<div class="ca" id="cabar" style="display:none"><span class="t">$HUSH CA</span><code id="ca-mint"></code><button id="ca-copy">Copy</button></div>\n    </section>';
must(s.includes(anchor), 'home anchor');
s = s.replace(anchor, anchor.replace('\n    </section>', '\n      <div id="faq" style="margin-top:64px"><div class="kick">answers</div><h2>Asked <span class="iri">plainly.</span></h2>\n      ' + faq + '</div>\n    </section>'));
// 4. rail button + hash "faq" -> Overview, scrolled to the FAQ
s = s.replace('<button data-ch="faq"><i>09</i><span>Answers</span></button>', '<button data-faq="1"><i>09</i><span>Answers</span></button>');
const r0 = "  document.querySelectorAll('#nav button').forEach(function (b) { b.onclick = function () { go(b.dataset.ch, true); }; });";
must(s.includes(r0), 'router');
s = s.replace(r0, "  function toFaq() { go('home', false); history.replaceState(null, '', location.pathname + location.search + '#faq'); setTimeout(function () { document.getElementById('faq').scrollIntoView({ behavior: 'smooth' }); }, 60); }\n  document.querySelectorAll('#nav button').forEach(function (b) { b.onclick = function () { b.dataset.faq ? toFaq() : go(b.dataset.ch, true); }; });");
s = s.replace("var h = (location.hash || '').slice(1); if (h === 'road') h = 'proto'; go(h, false);", "var h = (location.hash || '').slice(1); if (h === 'road') h = 'proto'; if (h === 'faq') toFaq(); else go(h, false);");
s = s.replace("addEventListener('hashchange', function () { go((location.hash || '').slice(1), false); });", "addEventListener('hashchange', function () { var x = (location.hash || '').slice(1); x === 'faq' ? toFaq() : go(x, false); });");
fs.writeFileSync(f, s); console.log('ok');
