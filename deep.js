// ─────────────────────────────────────────────────────────────
//  snou — globlja razlaga tem.
//  Ključ = id teme iz data.js. Vsa polja so neobvezna.
//  • izvor:      časovnica — od kod je ideja prišla
//  • ideja:      odstavki z razlago v navadnih besedah
//  • slika:      SVG risba (niz)
//  • definicija: uradna definicija + primer
// ─────────────────────────────────────────────────────────────

const DEEP = {
  vektorji: {
    izvor: [
      { leto: "~1586", txt: "Simon Stevin ugotovi, da se dve sili na isto telo sestavita po <b>pravilu paralelograma</b>. Sila ima torej velikost <i>in</i> smer." },
      { leto: "1687", txt: "Newton v <i>Principii</i> isto pravilo uporabi za gibanje: dve hkratni sili premakneta telo po diagonali paralelograma." },
      { leto: "1799", txt: "Caspar Wessel nariše kompleksna števila kot <b>puščice v ravnini</b>. Seštevanje števil postane seštevanje puščic." },
      { leto: "1843", txt: "William Rowan Hamilton odkrije kvaternione. Njihov del s tremi komponentami poimenuje <b>vektor</b>, iz latinskega <i>vehere</i> = nositi, prenašati." },
      { leto: "1844", txt: "Hermann Grassmann razvije račun s takimi količinami v poljubnem številu dimenzij. Iz tega kasneje zrastejo vektorski prostori." },
      { leto: "1880-ih", txt: "Josiah Gibbs in Oliver Heaviside kvaternione poenostavita v današnji vektorski račun s skalarnim in vektorskim produktom, da bi lažje zapisala Maxwellove enačbe elektromagnetizma." },
    ],
    ideja: [
      "Nekatere količine povesta samo <b>koliko</b>: temperatura 20 °C, masa 3 kg. To so <b>skalarji</b>, ena številka in konec.",
      "Pri drugih pa »koliko« ni dovolj, treba je vedeti tudi <b>kam</b>. Če prehodiš 3 km, ni vseeno, ali greš proti severu ali proti vzhodu. Hitrost, sila, premik: vse imajo velikost <i>in</i> smer. Tako stvar narišemo kot <b>puščico</b>.",
      "Glavni trik je, da puščico opišemo s številkami: koliko gre v smeri x, koliko v smeri y in koliko v smeri z. Puščica postane trojica števil, s katero lahko <b>računamo</b>.",
      "In zakaj vse to? Zaradi prvotnega vprašanja: če dve sili hkrati vlečeta isto telo, kam se premakne? Odgovor dobiš tako, da puščici <b>sešteješ</b>, kot kaže slika.",
    ],
    slika: `
<svg viewBox="-20 -20 300 250" style="width:100%;max-width:340px">
  <g stroke="var(--line)" stroke-width="1">
    ${Array.from({length: 7}, (_, i) => `<line x1="${i*40}" y1="0" x2="${i*40}" y2="200"/>`).join("")}
    ${Array.from({length: 6}, (_, i) => `<line x1="0" y1="${i*40}" x2="240" y2="${i*40}"/>`).join("")}
  </g>
  <line x1="0" y1="200" x2="250" y2="200" stroke="var(--faint)" stroke-width="1.5"/>
  <line x1="0" y1="200" x2="0" y2="-5" stroke="var(--faint)" stroke-width="1.5"/>
  <text x="252" y="204" font-size="12" fill="var(--muted)">x</text>
  <text x="-4" y="-10" font-size="12" fill="var(--muted)">y</text>
  <defs>
    <marker id="ah-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5ec2d6"/></marker>
    <marker id="ah-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#e8665a"/></marker>
    <marker id="ah-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#f2b84b"/></marker>
  </defs>
  <!-- paralelogram -->
  <line x1="120" y1="120" x2="160" y2="0" stroke="#e8665a" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>
  <line x1="40" y1="80" x2="160" y2="0" stroke="#5ec2d6" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>
  <!-- a, b, a+b -->
  <line x1="0" y1="200" x2="117" y2="122" stroke="#5ec2d6" stroke-width="3" marker-end="url(#ah-a)"/>
  <line x1="0" y1="200" x2="39" y2="83" stroke="#e8665a" stroke-width="3" marker-end="url(#ah-b)"/>
  <line x1="0" y1="200" x2="157" y2="4" stroke="#f2b84b" stroke-width="3" marker-end="url(#ah-s)"/>
  <text x="80" y="170" font-size="14" fill="#5ec2d6" font-weight="600">a = (3, 2)</text>
  <text x="-2" y="70" font-size="14" fill="#e8665a" font-weight="600">b = (1, 3)</text>
  <text x="168" y="8" font-size="14" fill="#f2b84b" font-weight="600">a + b = (4, 5)</text>
</svg>`,
    definicija: `
<p><b>Vektor</b> v R³ je urejena trojica realnih števil:</p>
<p class="math">a = (a₁, a₂, a₃)</p>
<p><b>Dolžina</b> (velikost) vektorja:</p>
<p class="math">|a| = √(a₁² + a₂² + a₃²)</p>
<p><b>Seštevanje</b> in <b>množenje s skalarjem</b> gresta po komponentah:</p>
<p class="math">a + b = (a₁ + b₁, a₂ + b₂, a₃ + b₃) &nbsp;&nbsp; λa = (λa₁, λa₂, λa₃)</p>
<p class="ex"><b>Primer.</b> a = (3, 2, 0), b = (1, 3, 0).<br>
a + b = (3 + 1, 2 + 3, 0 + 0) = (4, 5, 0)<br>
|a| = √(3² + 2² + 0²) = √13 ≈ 3,61<br>
2a = (6, 4, 0)</p>`,
  },
};
