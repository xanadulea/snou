// ─────────────────────────────────────────────────────────────
//  snou — rešitve preteklih kolokvijev, korak za korakom.
//  Ključ: "id kolokvija|številka naloge"
//  steps: [ korak, razlaga (zakaj), slika? ]   ans: končni odgovor
//  Vse rešitve so preverjene z računom.
// ─────────────────────────────────────────────────────────────

// ── risbe ──
function nl(min, max, segs, ticks, color = "#f2b84b") {
  // segs: [a, b, zaprtA, zaprtB]; a ali b = null pomeni ±∞
  const X = v => 20 + (v - min) / (max - min) * 300;
  let h = `<line x1="8" x2="332" y1="30" y2="30" stroke="var(--faint)" stroke-width="1.5"/>`;
  ticks.forEach(([v, l]) => h += `<line x1="${X(v)}" x2="${X(v)}" y1="25" y2="35" stroke="var(--muted)"/><text x="${X(v)}" y="52" text-anchor="middle" font-size="12" fill="var(--muted)">${l ?? v}</text>`);
  segs.forEach(([a, b, ca, cb]) => {
    const xa = a === null ? 8 : X(a), xb = b === null ? 332 : X(b);
    h += `<line x1="${xa}" x2="${xb}" y1="30" y2="30" stroke="${color}" stroke-width="5"/>`;
    if (a === null) h += `<path d="M14,24 L6,30 L14,36" fill="none" stroke="${color}" stroke-width="2.5"/>`;
    if (b === null) h += `<path d="M326,24 L334,30 L326,36" fill="none" stroke="${color}" stroke-width="2.5"/>`;
    [[a, ca], [b, cb]].forEach(([v, c]) => { if (v !== null && v !== undefined) h += `<circle cx="${X(v)}" cy="30" r="5" fill="${c ? color : "var(--panel)"}" stroke="${color}" stroke-width="2"/>`; });
  });
  return `<svg viewBox="0 0 340 60" style="width:100%;max-width:400px">${h}</svg>`;
}
function rootsMulti(rings) {
  const maxR = Math.max(...rings.map(r => r.r)), S = 80 / maxR, c = 100;
  let h = `<line x1="8" x2="192" y1="100" y2="100" stroke="var(--faint)"/><line x1="100" x2="100" y1="8" y2="192" stroke="var(--faint)"/>
    <text x="186" y="94" font-size="11" fill="var(--muted)">Re</text><text x="104" y="16" font-size="11" fill="var(--muted)">Im</text>`;
  rings.forEach(({ r, n, phase, color, label }) => {
    h += `<circle cx="100" cy="100" r="${r * S}" fill="none" stroke="${color}" stroke-opacity=".35" stroke-dasharray="4 4"/>`;
    const pts = [];
    for (let k = 0; k < n; k++) { const f = phase + 2 * Math.PI * k / n; pts.push([c + r * S * Math.cos(f), c - r * S * Math.sin(f)]); }
    h += `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${color}" fill-opacity=".08" stroke="${color}" stroke-opacity=".5"/>`;
    pts.forEach(([x, y]) => h += `<circle cx="${x}" cy="${y}" r="5" fill="${color}" style="filter:drop-shadow(0 0 4px ${color})"/>`);
    if (label) h += `<text x="${100 + r * S * .72 + 4}" y="${100 + r * S * .72 + 12}" font-size="11" fill="${color}">${label}</text>`;
  });
  return `<svg viewBox="0 0 200 200" style="width:100%;max-width:230px">${h}</svg>`;
}
function plane(pts, segs, [x0, x1, y0, y1], color = "#5ec2d6") {
  const W = 260, H = W * (y1 - y0) / (x1 - x0), X = x => 20 + (x - x0) / (x1 - x0) * W, Y = y => 10 + (y1 - y) / (y1 - y0) * H;
  let h = "";
  for (let x = Math.ceil(x0); x <= x1; x++) h += `<line x1="${X(x)}" x2="${X(x)}" y1="${Y(y0)}" y2="${Y(y1)}" stroke="var(--line)"/>`;
  for (let y = Math.ceil(y0); y <= y1; y++) h += `<line x1="${X(x0)}" x2="${X(x1)}" y1="${Y(y)}" y2="${Y(y)}" stroke="var(--line)"/>`;
  h += `<line x1="${X(x0)}" x2="${X(x1)}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--faint)" stroke-width="1.5"/><line x1="${X(0)}" x2="${X(0)}" y1="${Y(y0)}" y2="${Y(y1)}" stroke="var(--faint)" stroke-width="1.5"/>`;
  segs.forEach(([a, b, dash, col]) => h += `<line x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(b[0])}" y2="${Y(b[1])}" stroke="${col || color}" stroke-width="2.2" ${dash ? 'stroke-dasharray="5 4"' : ""}/>`);
  pts.forEach(([x, y, l, col]) => h += `<circle cx="${X(x)}" cy="${Y(y)}" r="4.5" fill="${col || color}"/><text x="${X(x) + 7}" y="${Y(y) - 7}" font-size="12.5" fill="var(--text)">${l}</text>`);
  return `<svg viewBox="0 0 ${W + 40} ${H + 20}" style="width:100%;max-width:340px">${h}</svg>`;
}
const M = (a, b) => mx([a, b]);

const SOL = {
  // ═════════════ MATEMATIKA 1 · 1. KOLOKVIJ ═════════════

  // ── 2020/21 ──
  "m-k1-20|1": { ans: "Formula velja za vse n ∈ ℕ.", steps: [
    [`<b>Baza</b> n = 1: levo 2² = 4, desno ${fr(1, 2)} · 1 · (6 + 3 − 1) = 4. ✓`, "Pri n = 1 je na levi samo prvi člen (3 · 1 − 1)² = 2²."],
    [`<b>Predpostavka:</b> 2² + 5² + ⋯ + (3n − 1)² = ${fr(1, 2)} n(6n² + 3n − 1).`, "Predpostavimo, da formula velja za nek n. Zdaj pokažemo, da potem velja tudi za n + 1."],
    [`<b>Korak:</b> prištejemo naslednji člen (3(n + 1) − 1)² = (3n + 2)²:<br>${fr(1, 2)} n(6n² + 3n − 1) + (3n + 2)² = ${fr(1, 2)} (6n³ + 3n² − n + 18n² + 24n + 8) = ${fr(1, 2)} (6n³ + 21n² + 23n + 8)`, "Levi strani za n + 1 manjka samo zadnji člen. Vse damo na skupni imenovalec 2 in zmnožimo."],
    [`Desna stran za n + 1: ${fr(1, 2)} (n + 1)(6(n + 1)² + 3(n + 1) − 1) = ${fr(1, 2)} (n + 1)(6n² + 15n + 8) = ${fr(1, 2)} (6n³ + 21n² + 23n + 8). ✓`, "Izračunamo, kaj bi morali dobiti, in vidimo, da je isto. S tem je korak dokazan."],
  ]},
  "m-k1-20|2": { ans: "x ∈ {−2, 1, 7/3}", steps: [
    [`|2x² − 8| = |x² − x − 6| &nbsp;⇔&nbsp; 2x² − 8 = x² − x − 6 &nbsp;ali&nbsp; 2x² − 8 = −(x² − x − 6)`, "Dve števili imata enako absolutno vrednost natanko takrat, ko sta enaki ali nasprotni. Ni treba razbijati na intervale."],
    [`1. primer: x² + x − 2 = 0 ⇒ (x + 2)(x − 1) = 0 ⇒ x = −2 ali x = 1`, "Vse prenesemo na levo in razstavimo."],
    [`2. primer: 3x² − x − 14 = 0 ⇒ x = ${fr("1 ± √(1 + 168)", 6)} = ${fr("1 ± 13", 6)} ⇒ x = ${fr(7, 3)} ali x = −2`, "Kvadratna formula. Diskriminanta 169 = 13²."],
    [`Preverba: x = 1: |−6| = |−6| ✓, x = 7/3: ${fr(26, 9)} = ${fr(26, 9)} ✓, x = −2: 0 = 0 ✓`, "Rešitev −2 se pojavi v obeh primerih, štejemo jo enkrat."],
  ]},
  "m-k1-20|3": { ans: "z ∈ {1, −½ ± i√3/2, −2, 1 ± i√3}", steps: [
    [`Uvedemo u = z³: u² + 7u − 8 = 0 ⇒ (u + 8)(u − 1) = 0 ⇒ u = 1 ali u = −8`, "z⁶ = (z³)², zato je to kvadratna enačba v u."],
    [`z³ = 1 = 1 · e<sup>i·0</sup> ⇒ z = e<sup>i·2kπ/3</sup>: &nbsp;1, &nbsp;−½ + i√3/2, &nbsp;−½ − i√3/2`, "Tretji koreni: polmer ∛1 = 1, koti 0, 2π/3, 4π/3 (vsakih 120°)."],
    [`z³ = −8 = 8 · e<sup>iπ</sup> ⇒ z = 2e<sup>i(π/3 + 2kπ/3)</sup>: &nbsp;1 + i√3, &nbsp;−2, &nbsp;1 − i√3`, "Polmer ∛8 = 2, prvi kot π/3, nato vsakih 120°.", rootsMulti([{ r: 1, n: 3, phase: 0, color: "#f2b84b", label: "1" }, { r: 2, n: 3, phase: Math.PI / 3, color: "#5ec2d6", label: "2" }])],
  ]},
  "m-k1-20|4": { ans: "min A = inf A = 5/2, sup A = 3, max A ne obstaja", steps: [
    [`${fr("3n + 2", "n + 1")} = ${fr("3(n + 1) − 1", "n + 1")} = 3 − ${fr(1, "n + 1")}`, "Ulomek preoblikujemo, da vidimo, kako se obnaša. Ta trik se uporabi skoraj pri vsaki taki nalogi."],
    [`Ko n raste, ${fr(1, "n + 1")} pada, zato elementi naraščajo: ${fr(5, 2)}, ${fr(8, 3)}, ${fr(11, 4)}, …`, "Odštevamo vedno manj, torej je zaporedje naraščajoče.", seqline([2.5, 8 / 3, 2.75, 2.8, 17 / 6, 20 / 7, 2.875, 26 / 9, 2.9, 2.92, 2.94, 2.96], 2.3, 3.15, [[2.5, "min = 5/2"], [3, "sup = 3", true]])],
    [`Najmanjši je prvi: min A = inf A = ${fr(5, 2)} (pri n = 1).`, "Naraščajoče zaporedje ima najmanjši element na začetku."],
    [`3 je zgornja meja (ker ${fr(1, "n + 1")} > 0). Je najmanjša: za vsak ε > 0 obstaja n z ${fr(1, "n + 1")} < ε, torej 3 − ε ni meja. sup A = 3.`, "Dokaz, da je 3 res supremum: nobeno manjše število ni več zgornja meja."],
    [`3 ni element A (${fr(1, "n + 1")} ≠ 0), zato max A ne obstaja.`, "Max obstaja samo, če supremum pripada množici."],
  ]},

  // ── 2021/22 ──
  "m-k1-21|1": { ans: "n³ + 11n je deljivo s 6 za vse n ∈ ℕ.", steps: [
    [`<b>Baza</b> n = 1: 1 + 11 = 12 = 6 · 2 ✓`, ""],
    [`<b>Korak:</b> (n + 1)³ + 11(n + 1) = n³ + 3n² + 3n + 1 + 11n + 11 = (n³ + 11n) + 3n(n + 1) + 12`, "Razvijemo in poiščemo stari izraz n³ + 11n, ki je po predpostavki deljiv s 6."],
    [`n³ + 11n je deljivo s 6 (predpostavka), 12 je deljivo s 6, n(n + 1) je sodo ⇒ 3n(n + 1) je deljivo s 6. ✓`, "Od dveh zaporednih števil n in n + 1 je eno vedno sodo, zato je produkt sod. 3 · sodo = deljivo s 6."],
  ]},
  "m-k1-21|2": { ans: "x ∈ [−5, 3]", steps: [
    [`Meje: x² + 3x = x(x + 3) = 0 pri x = −3, 0; &nbsp;1 − 3x = 0 pri x = ${fr(1, 3)}`, "Absolutne vrednosti »odstranimo« tako, da ločimo intervale, kjer so izrazi notri pozitivni ali negativni.", nl(-6, 4, [], [[-3], [0], [1 / 3, "⅓"]])],
    [`x ≤ −3 ali 0 ≤ x ≤ ⅓ (oba izraza ≥ 0): x² + x ≤ 5 − 3x ⇒ (x + 5)(x − 1) ≤ 0 ⇒ −5 ≤ x ≤ 1 ⇒ [−5, −3] ∪ [0, ⅓]`, "Na teh intervalih je |x² + 3x| = x² + 3x in |1 − 3x| = 1 − 3x."],
    [`−3 < x < 0: −x² − 5x ≤ 5 − 3x ⇒ x² + 2x + 5 ≥ 0, kar velja vedno ⇒ (−3, 0)`, "Tu je x² + 3x < 0, zato |x² + 3x| = −(x² + 3x). Diskriminanta 4 − 20 < 0, parabola je vedno nad osjo."],
    [`x > ⅓: x² + x ≤ 3x − 1 + 4 ⇒ (x − 3)(x + 1) ≤ 0 ⇒ ⅓ < x ≤ 3`, "Tu je 1 − 3x < 0, zato |1 − 3x| = 3x − 1."],
    [`Unija: [−5, −3] ∪ (−3, 0) ∪ [0, ⅓] ∪ (⅓, 3] = [−5, 3]`, "Kosi se lepo stikajo.", nl(-6, 4, [[-5, 3, true, true]], [[-5], [-3], [0], [3]])],
  ]},
  "m-k1-21|3": { ans: "w = (a² − 1)/(a² + 1) + i · 2a/(a² + 1), |w| = 1; rešitve: z = 3w in z⁴ = w", steps: [
    [`w = ${fr("a + i", "a − i")} · ${fr("a + i", "a + i")} = ${fr("(a + i)²", "a² + 1")} = ${fr("a² − 1", "a² + 1")} + i ${fr("2a", "a² + 1")}`, "Ulomek razširimo s konjugiranim imenovalcem, da imenovalec postane realen: (a − i)(a + i) = a² + 1."],
    [`|w| = ${fr("|a + i|", "|a − i|")} = ${fr("√(a² + 1)", "√(a² + 1)")} = 1`, "Absolutna vrednost kvocienta je kvocient absolutnih vrednosti. Hitreje kot iz Re in Im."],
    [`a = ${fr(1, "√3")}: a² = ⅓ ⇒ w = −½ + i ${fr("√3", 2)} = e<sup>i·2π/3</sup>`, "Vstavimo v formuli za Re in Im."],
    [`z⁵ − 3z⁴w − zw + 3w² = z⁴(z − 3w) − w(z − 3w) = (z − 3w)(z⁴ − w) = 0`, "Združimo po dva člena in izpostavimo. Ključ naloge: opaziti skupni faktor z − 3w."],
    [`z = 3w = −${fr(3, 2)} + i ${fr("3√3", 2)} &nbsp;ali&nbsp; z⁴ = e<sup>i·2π/3</sup> ⇒ z = e<sup>i(π/6 + kπ/2)</sup>: &nbsp;${fr("√3", 2)} + ½i, &nbsp;−½ + ${fr("√3", 2)}i, &nbsp;−${fr("√3", 2)} − ½i, &nbsp;½ − ${fr("√3", 2)}i`, "Četrti koreni: polmer 1, prvi kot (2π/3)/4 = π/6, nato vsakih 90°.", rootsMulti([{ r: 1, n: 4, phase: Math.PI / 6, color: "#f2b84b" }, { r: 3, n: 1, phase: 2 * Math.PI / 3, color: "#5ec2d6", label: "3w" }])],
  ]},
  "m-k1-21|4": { ans: "max A = sup A = 5/2, inf A = 1, min A ne obstaja", steps: [
    [`Lihi n: (−1)ⁿ = −1 ⇒ 1 + ${fr(1, "n")}: &nbsp;2, ${fr(4, 3)}, ${fr(6, 5)}, … → 1`, "Pri (−1)ⁿ vedno ločimo sode in lihe n."],
    [`Sodi n: (−1)ⁿ = 1 ⇒ 1 + ${fr(3, "n")}: &nbsp;${fr(5, 2)}, ${fr(7, 4)}, ${fr(3, 2)}, … → 1`, "", seqline([2, 4 / 3, 1.2, 8 / 7, 10 / 9, 2.5, 1.75, 1.5, 1.375, 1.3, 1.25, 1.05, 1.02], 0.8, 2.75, [[2.5, "max = 5/2"], [1, "inf = 1", true]])],
    [`Največji element je ${fr(5, 2)} (n = 2), ker je večji od 2 (največji lihi). max A = sup A = ${fr(5, 2)}.`, "Oba podzaporedja padata, zato sta njuna največja člena prva: 2 in 5/2."],
    [`Vsi elementi so > 1 in se 1 poljubno približajo ⇒ inf A = 1. Ker 1 ni dosežena, min A ne obstaja.`, ""],
  ]},

  // ── 2022/23 ──
  "m-k1-22|1": { ans: "4ⁿ⁻¹ > n² za vse n ≥ 3.", steps: [
    [`<b>Baza</b> n = 3: 4² = 16 > 9 ✓`, "Začnemo pri 3, ker pri n = 1, 2 neenakost ne velja (1 > 1 in 4 > 4 sta napačni)."],
    [`<b>Korak:</b> 4ⁿ = 4 · 4ⁿ⁻¹ > 4n²`, "Uporabimo predpostavko 4ⁿ⁻¹ > n² in pomnožimo s 4."],
    [`4n² ≥ (n + 1)² ⇔ 2n ≥ n + 1 ⇔ n ≥ 1 ✓ &nbsp;⇒&nbsp; 4ⁿ > 4n² ≥ (n + 1)²`, "Pokazati moramo samo, da 4n² ni manjši od (n + 1)². Korenimo obe (pozitivni) strani."],
  ]},
  "m-k1-22|2": { ans: "x ∈ (−∞, −1) ∪ (−⅓, ∞)", steps: [
    [`Notranji izraz g(x) = |3x − 1| − 2|x + 2|, meji x = −2 in x = ⅓:<br>x < −2: g = 5 − x; &nbsp;−2 ≤ x < ⅓: g = −5x − 3; &nbsp;x ≥ ⅓: g = x − 5`, "Najprej odstranimo notranji absolutni vrednosti, nato rešujemo |g(x)| > 1 − x."],
    [`x < −2: |5 − x| = 5 − x > 1 − x ⇒ 5 > 1, velja vedno ✓`, ""],
    [`−2 ≤ x < ⅓: |5x + 3| > 1 − x ⇒ 5x + 3 > 1 − x (x > −⅓) ali 5x + 3 < x − 1 (x < −1) ⇒ [−2, −1) ∪ (−⅓, ⅓)`, "|A| > B pomeni A > B ali A < −B."],
    [`x ≥ ⅓: |x − 5| > 1 − x velja vedno (za x < 1 je 5 − x > 1 − x, za x ≥ 1 je desna stran ≤ 0, leva > desna).`, ""],
    [`Unija: (−∞, −1) ∪ (−⅓, ∞)`, "Preverba robov: x = −1 da 1 > 1 (ne), x = −⅓ da 1 > 1 (ne). Zato odprta.", nl(-4, 3, [[null, -1, false, false], [-1 / 3, null, false, false]], [[-2], [-1], [-1 / 3, "−⅓"], [1 / 3, "⅓"]])],
  ]},
  "m-k1-22|3": { ans: "z ∈ {3, i√3, −i√3}", steps: [
    [`(−1 + i)² = 1 − 2i − 1 = −2i ⇒ (−1 + i)⁶ = (−2i)³ = −8i³ = 8i`, "Potenco računamo po korakih. i³ = −i."],
    [`w = ${fr("z − 1", "i")}: w³ = 8i = 8e<sup>iπ/2</sup> ⇒ w = 2e<sup>i(π/6 + 2kπ/3)</sup>: &nbsp;√3 + i, &nbsp;−√3 + i, &nbsp;−2i`, "Uvedemo novo spremenljivko in poiščemo tretje korene. Polmer ∛8 = 2."],
    [`z = 1 + iw: &nbsp;1 + i(√3 + i) = i√3, &nbsp;1 + i(−√3 + i) = −i√3, &nbsp;1 + i(−2i) = 3`, "Iz w = (z − 1)/i sledi z = 1 + iw. Množenje z i zavrti za 90°, +1 premakne v desno.", rootsMulti([{ r: 2, n: 3, phase: Math.PI / 6, color: "#f2b84b", label: "w" }])],
  ]},
  "m-k1-22|4": { ans: "min A = inf A = −1, sup A = 2, max A ne obstaja", steps: [
    [`−${fr(1, "n")} + 2 ${fr("n² − 1", "n²")} = 2 − ${fr(1, "n")} − ${fr(2, "n²")}`, "Ulomek razbijemo: 2(n² − 1)/n² = 2 − 2/n²."],
    [`${fr(1, "n")} in ${fr(2, "n²")} padata ⇒ elementi naraščajo: −1, ${fr(1, 2)}, ${fr(11, 9)}, …`, "Od 2 odštevamo vedno manj.", seqline([-1, .5, 11 / 9, 1.625, 1.72, 1.778, 1.816, 1.844, 1.864, 1.88, 1.93, 1.96], -1.3, 2.2, [[-1, "min = −1"], [2, "sup = 2", true]])],
    [`min A = inf A = −1 (n = 1), sup A = 2 (ni dosežen) ⇒ max A ne obstaja.`, "Za vsak ε > 0 je 1/n + 2/n² < ε za dovolj velik n, zato je 2 najmanjša zgornja meja."],
  ]},

  // ── 2023/24 ──
  "m-k1-23|1": { ans: "2²ⁿ⁺¹ − 9n² + 3n − 2 je deljivo s 27 za vse n ∈ ℕ.", steps: [
    [`<b>Baza</b> n = 1: 8 − 9 + 3 − 2 = 0 = 27 · 0 ✓`, "0 je deljiva z vsakim številom."],
    [`Označimo f(n) = 2²ⁿ⁺¹ − 9n² + 3n − 2. Potem f(n + 1) = 4 · 2²ⁿ⁺¹ − 9n² − 15n − 8.`, "2²⁽ⁿ⁺¹⁾⁺¹ = 2²ⁿ⁺³ = 4 · 2²ⁿ⁺¹. Razvijemo −9(n + 1)² + 3(n + 1) − 2."],
    [`f(n + 1) − 4f(n) = (−9n² − 15n − 8) − (−36n² + 12n − 8) = 27n² − 27n = 27n(n − 1)`, "Trik: odštejemo 4f(n), da se potenca 2²ⁿ⁺¹ pokrajša."],
    [`f(n + 1) = 4f(n) + 27n(n − 1): oba člena sta deljiva s 27 ✓`, "f(n) je deljiv s 27 po predpostavki."],
  ]},
  "m-k1-23|2": { ans: "x ∈ (−1, 4)", steps: [
    [`x² + 3x + 2 = (x + 1)(x + 2), meji x = −2 in x = −1`, "Razstavimo, da vidimo, kje je izraz negativen: med −2 in −1."],
    [`x < −2: x² + 2x > 2x² + x ⇒ x(x − 1) < 0 ⇒ 0 < x < 1. Presek z x < −2 je prazen.`, ""],
    [`−2 ≤ x ≤ −1: −x² − 2x > 2x² + x ⇒ x(x + 1) < 0 ⇒ −1 < x < 0. Presek je prazen.`, "Tu je (x + 1)(x + 2) ≤ 0, zato pred njim minus."],
    [`x > −1: x² + 4x + 4 > 2x² + x ⇒ (x − 4)(x + 1) < 0 ⇒ −1 < x < 4`, "Oba izraza pozitivna, absolutni vrednosti preprosto odpademo.", nl(-3, 5, [[-1, 4, false, false]], [[-2], [-1], [4]])],
  ]},
  "m-k1-23|3": { ans: "z ∈ {±√3/2 + i/2, −i} ∪ {∛3 i, ∛3(±√3/2 − i/2)}", steps: [
    [`u = z³: u² + 2iu + 3 = 0 ⇒ u = ${fr("−2i ± √(−4 − 12)", 2)} = ${fr("−2i ± 4i", 2)} ⇒ u = i ali u = −3i`, "√(−16) = 4i."],
    [`z³ = i = e<sup>iπ/2</sup> ⇒ z = e<sup>i(π/6 + 2kπ/3)</sup>: &nbsp;${fr("√3", 2)} + ${fr("i", 2)}, &nbsp;−${fr("√3", 2)} + ${fr("i", 2)}, &nbsp;−i`, "Polmer 1, prvi kot π/6."],
    [`z³ = −3i = 3e<sup>i3π/2</sup> ⇒ z = ∛3 e<sup>i(π/2 + 2kπ/3)</sup>: &nbsp;∛3 i, &nbsp;∛3(−${fr("√3", 2)} − ${fr("i", 2)}), &nbsp;∛3(${fr("√3", 2)} − ${fr("i", 2)})`, "Polmer ∛3 ≈ 1,44, prvi kot π/2.", rootsMulti([{ r: 1, n: 3, phase: Math.PI / 6, color: "#f2b84b", label: "1" }, { r: 1.442, n: 3, phase: Math.PI / 2, color: "#5ec2d6", label: "∛3" }])],
  ]},
  "m-k1-23|4": { ans: "max A = sup A = 10/3, inf A = 2, min A ne obstaja", steps: [
    [`${fr("8n + 2", "4n − 1")} = ${fr("2(4n − 1) + 4", "4n − 1")} = 2 + ${fr(4, "4n − 1")}`, ""],
    [`${fr(4, "4n − 1")} pada ⇒ elementi padajo: ${fr(10, 3)}, ${fr(18, 7)}, ${fr(26, 11)}, … → 2`, "", seqline([10 / 3, 18 / 7, 26 / 11, 34 / 15, 42 / 19, 50 / 23, 58 / 27, 2.1, 2.07, 2.05, 2.03], 1.8, 3.5, [[10 / 3, "max = 10/3"], [2, "inf = 2", true]])],
    [`max A = sup A = ${fr(10, 3)} (n = 1); inf A = 2, ni dosežen ⇒ min A ne obstaja.`, ""],
  ]},

  // ── 2024/25 ──
  "m-k1-24|1": { ans: "15ⁿ⁺¹ − 8ⁿ je deljivo s 7 za vse n ∈ ℕ.", steps: [
    [`<b>Baza</b> n = 1: 15² − 8 = 217 = 7 · 31 ✓`, ""],
    [`<b>Korak:</b> 15ⁿ⁺² − 8ⁿ⁺¹ = 15 · 15ⁿ⁺¹ − 8 · 8ⁿ = (8 + 7) · 15ⁿ⁺¹ − 8 · 8ⁿ = 8(15ⁿ⁺¹ − 8ⁿ) + 7 · 15ⁿ⁺¹`, "Trik: razbijemo 15 = 8 + 7, da dobimo stari izraz pomnožen z 8."],
    [`8(15ⁿ⁺¹ − 8ⁿ) je deljivo s 7 po predpostavki, 7 · 15ⁿ⁺¹ očitno ✓`, ""],
  ]},
  "m-k1-24|2": { ans: "z ∈ {−1, 1 + 2i, 1 − 2i}", steps: [
    [`z = x + iy: &nbsp;x² − y² + 2ixy + 2x − 2iy = −1`, "Ker se pojavi z̄, vstavimo z = x + iy (z̄ = x − iy)."],
    [`Re: x² − y² + 2x = −1; &nbsp;Im: 2xy − 2y = 0 ⇒ 2y(x − 1) = 0`, "Dve kompleksni števili sta enaki, če imata enaka realna in enaka imaginarna dela. Desno: Re = −1, Im = 0."],
    [`y = 0: x² + 2x + 1 = 0 ⇒ x = −1 ⇒ z = −1`, ""],
    [`x = 1: 3 − y² = −1 ⇒ y = ±2 ⇒ z = 1 ± 2i`, "Preverba z = 1 + 2i: z² = −3 + 4i, 2z̄ = 2 − 4i, vsota −1 ✓"],
  ]},
  "m-k1-24|3": { ans: "x ∈ (−∞, −1] ∪ [1, ∞)", steps: [
    [`Meja x = 1 (kjer je 1 − x = 0).`, ""],
    [`x ≤ 1: |1 + x − (1 − x)| = |2x| ≥ 2 ⇒ |x| ≥ 1 ⇒ x ≤ −1 ali x = 1`, "Na tem intervalu je |1 − x| = 1 − x."],
    [`x > 1: |1 + x − (x − 1)| = |2| = 2 ≥ 2 ✓ velja vedno`, "", nl(-3, 3, [[null, -1, false, true], [1, null, true, false]], [[-1], [0], [1]])],
  ]},
  "m-k1-24|4": { ans: "sup M = 4, inf M = 2, max M in min M ne obstajata", steps: [
    [`aₙ = ${fr("n − 3", "n + 5")} = 1 − ${fr(8, "n + 5")}: narašča od −⅓ proti 1`, "Isti trik kot vedno: ulomek zapišemo kot konstanta minus nekaj."],
    [`Sodi n: 3 + aₙ: ${fr(20, 7)}, 3 + ${fr(1, 9)}, … narašča proti 4`, ""],
    [`Lihi n: 3 − aₙ: ${fr(10, 3)}, 3, ${fr(14, 5)}, ${fr(8, 3)}, … pada proti 2`, "", seqline([10 / 3, 3, 2.8, 8 / 3, 18 / 7, 2.5, 2.4, 20 / 7, 28 / 9, 36 / 11, 3.4, 3.5, 3.6, 3.7], 1.8, 4.2, [[2, "inf = 2", true], [4, "sup = 4", true]])],
    [`sup M = 4 (sodi, ni dosežen), inf M = 2 (lihi, ni dosežen) ⇒ max in min ne obstajata.`, "Največji lihi (10/3) je manjši od 4, najmanjši sodi (20/7) je večji od 2, zato robove določata limiti."],
  ]},

  // ── 2025/26 ──
  "m-k1-25|1": { ans: "23ⁿ⁺¹ − 12ⁿ je deljivo z 11 za vse n ∈ ℕ.", steps: [
    [`<b>Baza</b> n = 1: 23² − 12 = 529 − 12 = 517 = 11 · 47 ✓`, ""],
    [`<b>Korak:</b> 23ⁿ⁺² − 12ⁿ⁺¹ = (12 + 11) · 23ⁿ⁺¹ − 12 · 12ⁿ = 12(23ⁿ⁺¹ − 12ⁿ) + 11 · 23ⁿ⁺¹`, "Razbijemo 23 = 12 + 11. Ista ideja kot 2024 (15 = 8 + 7)."],
    [`Oba člena sta deljiva z 11 ✓`, ""],
  ]},
  "m-k1-25|2": { ans: "z ∈ {2 + 2i, −2 − 2i}", steps: [
    [`z = x + iy: &nbsp;x² − y² + 2ixy = (x² + y²) + i(x² + y²) − 8`, "|z|² = x² + y² je realno."],
    [`Re: x² − y² = x² + y² − 8 ⇒ y² = 4 ⇒ y = ±2`, ""],
    [`Im: 2xy = x² + y² ⇒ (x − y)² = 0 ⇒ x = y`, ""],
    [`z = 2 + 2i ali z = −2 − 2i`, "Preverba z = 2 + 2i: z² = 8i, |z|² = 8, 8(1 + i) − 8 = 8i ✓"],
  ]},
  "m-k1-25|3": { ans: "x ∈ [⅓, 3]", steps: [
    [`x ≤ 1: |x − 2(1 − x)| = |3x − 2| ≤ 1 ⇒ ⅓ ≤ x ≤ 1`, "−1 ≤ 3x − 2 ≤ 1."],
    [`x > 1: |x − 2(x − 1)| = |2 − x| ≤ 1 ⇒ 1 ≤ x ≤ 3 ⇒ (1, 3]`, "", nl(-1, 4, [[1 / 3, 3, true, true]], [[1 / 3, "⅓"], [1], [3]])],
  ]},
  "m-k1-25|4": { ans: "D<sub>f</sub> = ℝ \\ {⅓}, Z<sub>f</sub> = ℝ \\ {−⅓}, f⁻¹(x) = (x − 2)/(3x + 1)", steps: [
    [`Imenovalec 1 − 3x ≠ 0 ⇒ D<sub>f</sub> = ℝ \\ {${fr(1, 3)}}`, ""],
    [`y = ${fr("x + 2", "1 − 3x")} ⇒ y − 3xy = x + 2 ⇒ y − 2 = x(3y + 1) ⇒ x = ${fr("y − 2", "3y + 1")}`, "Izrazimo x z y. To da hkrati inverz in zalogo vrednosti."],
    [`To gre za vsak y ≠ −⅓ ⇒ Z<sub>f</sub> = ℝ \\ {−${fr(1, 3)}}`, "Vrednost −⅓ ni dosežena: (x + 2)/(1 − 3x) = −⅓ da 6 = −1, protislovje."],
    [`f⁻¹(x) = ${fr("x − 2", "3x + 1")}`, ""],
  ]},

  // ═════════════ LINEARNA ALGEBRA · 1. KOLOKVIJ ═════════════
  "la-k1-24|1": { ans: "P(−9/5, 8/5)", steps: [
    [`Smer premice: d = B − A = (2, 1); &nbsp;${vec("AC")} = (−2, 2)`, ""],
    [`t = ${fr(`${vec("AC")} · d`, "d · d")} = ${fr("−4 + 2", 5)} = −${fr(2, 5)}`, "Projekcija je točka A + t·d, kjer je t razmerje skalarnih produktov."],
    [`P = A + t·d = (−1, 2) − ${fr(2, 5)}(2, 1) = (−${fr(9, 5)}, ${fr(8, 5)})`, "Preverba: C − P = (−6/5, 12/5) in (−6/5)·2 + (12/5)·1 = 0, torej CP ⊥ AB ✓",
      plane([[-1, 2, "A"], [1, 3, "B"], [-3, 4, "C"], [-1.8, 1.6, "P", "#f2b84b"]], [[[-4, .5], [2, 3.5]], [[-3, 4], [-1.8, 1.6], true, "#f2b84b"]], [-4, 2, 0, 5])],
  ]},
  "la-k1-24|2": { ans: "C(−2, 5); kota ≈ 71,57° (pri A, C) in ≈ 108,43° (pri B, D)", steps: [
    [`C = B + D − A = (0 − 5 + 3, 1 + 2 + 2) = (−2, 5)`, `V paralelogramu ABCD je ${vec("AB")} = ${vec("DC")}, zato C = D + (B − A).`],
    [`${vec("AB")} = (3, 3), ${vec("AD")} = (−2, 4); &nbsp;cos α = ${fr("−6 + 12", "3√2 · 2√5")} = ${fr(1, "√10")}`, "Kot pri A je kot med vektorjema iz A."],
    [`α = arccos ${fr(1, "√10")} ≈ 71,57°, &nbsp;β = 180° − α ≈ 108,43°`, "Sosednja kota v paralelogramu se seštejeta v 180°.",
      plane([[-3, -2, "A"], [0, 1, "B"], [-2, 5, "C"], [-5, 2, "D"]], [[[-3, -2], [0, 1]], [[0, 1], [-2, 5]], [[-2, 5], [-5, 2]], [[-5, 2], [-3, -2]]], [-6, 1, -3, 6])],
  ]},
  "la-k1-24|3": { ans: "(a): E⁻¹ ne obstaja, zato tudi FE⁻¹ ne; E + F⁻¹ in F⁻¹E obstajata", steps: [
    [`(a) det E = 0 ⇒ E⁻¹ ne obstaja ⇒ FE⁻¹ ne obstaja. &nbsp;det F = −2 − 20 = −22 ≠ 0`, "Matrika je obrnljiva natanko tedaj, ko ima neničelno determinanto."],
    [`F⁻¹ = ${fr(1, "−22")} ${M([-2, -4], [-5, 1])} = ${M(["1/11", "2/11"], ["5/22", "−1/22"])}`, "Za [[a, b], [c, d]] je inverz (1/det) [[d, −b], [−c, a]]."],
    [`E + F⁻¹ = ${M(["23/11", "−9/11"], ["5/22", "−1/22"])}, &nbsp; F⁻¹E = ${M(["2/11", "−1/11"], ["5/11", "−5/22"])}`, "Seštevamo po elementih, množimo vrstica × stolpec."],
    [`(b) F = ${M([0, 0], [2, 4])}, det F = 0 ⇒ F⁻¹ ne obstaja. E⁻¹ = ${M(["1/3", 0], ["1/3", 1])}, FE⁻¹ = ${M([0, 0], [2, 4])}`, "Če si izbrala (b): obstaja samo FE⁻¹."],
  ]},
  "la-k1-24|4": { ans: "λ = 4: v = t(1, −1); λ = −2: v = t(1, 1), t ≠ 0", steps: [
    [`det(A − λI) = (1 − λ)² − 9 = 0 ⇒ 1 − λ = ±3 ⇒ λ₁ = 4, λ₂ = −2`, "Preverba: λ₁ + λ₂ = 2 = sled, λ₁λ₂ = −8 = det A."],
    [`λ = 4: (A − 4I)v = ${M([-3, -3], [-3, -3])}v = 0 ⇒ x + y = 0 ⇒ v = t(1, −1)`, ""],
    [`λ = −2: (A + 2I)v = ${M([3, -3], [-3, 3])}v = 0 ⇒ x = y ⇒ v = t(1, 1)`, "Lastni vektorji ležijo na premicah y = −x in y = x. A prvo raztegne 4×, drugo obrne in raztegne 2×.",
      plane([[1, -1, "λ = 4"], [1, 1, "λ = −2", "#f2b84b"]], [[[-2, 2], [2, -2]], [[-2, -2], [2, 2], false, "#f2b84b"]], [-2.5, 2.5, -2.5, 2.5])],
  ]},
  "la-k1-25|1": { ans: "|3AB − AC| = 4√10; D(−5, 0), ploščina 24; p: x − 3y = 7", steps: [
    [`${vec("AB")} = (3, 3), ${vec("AC")} = (−3, 5) ⇒ 3${vec("AB")} − ${vec("AC")} = (12, 4), &nbsp;|(12, 4)| = √160 = 4√10`, ""],
    [`D = A + C − B = (−5, 0); &nbsp;${vec("AD")} = (−6, 2)`, `Paralelogram ABCD: ${vec("AB")} = ${vec("DC")}.`],
    [`p = |det[${vec("AB")}, ${vec("AD")}]| = |3 · 2 − (−6) · 3| = 24`, "Ploščina paralelograma je absolutna vrednost determinante iz dveh stranic."],
    [`p: (x, y) = (1, −2) + t(3, 1), &nbsp;oz. x − 3y = 7`, "Smer (12, 4) lahko skrajšamo na (3, 1). Normala je (1, −3), vstavimo A: 1 + 6 = 7.",
      plane([[1, -2, "A"], [4, 1, "B"], [-2, 3, "C"], [-5, 0, "D"]], [[[1, -2], [4, 1]], [[4, 1], [-2, 3]], [[-2, 3], [-5, 0]], [[-5, 0], [1, -2]]], [-6, 5, -3, 4])],
  ]},
  "la-k1-25|2": { ans: "A = PDP⁻¹, P = [[1, 2], [2, 1]], D = diag(2, −1); A³ − 3A − 2I = 0", steps: [
    [`sled = 1, det = −6 + 4 = −2 ⇒ λ² − λ − 2 = 0 ⇒ λ₁ = 2, λ₂ = −1`, "Za 2 × 2: karakteristični polinom je λ² − (sled)λ + det."],
    [`λ = 2: ${M([-4, 2], [-2, 1])}v = 0 ⇒ y = 2x ⇒ v₁ = (1, 2); &nbsp;λ = −1: ${M([-1, 2], [-2, 4])}v = 0 ⇒ x = 2y ⇒ v₂ = (2, 1)`, ""],
    [`P = ${M([1, 2], [2, 1])}, D = ${M([2, 0], [0, -1])}, A = PDP⁻¹`, "Lastni vektorji v stolpcih P, lastne vrednosti v istem vrstnem redu na diagonali D."],
    [`A³ − 3A − 2I = P(D³ − 3D − 2I)P⁻¹; &nbsp;λ³ − 3λ − 2: pri 2 je 8 − 6 − 2 = 0, pri −1 je −1 + 3 − 2 = 0 ⇒ rezultat je ničelna matrika`, "Polinom matrike izračunamo na diagonali: vsako lastno vrednost vstavimo posebej."],
  ]},
  "la-k1-25|3": { ans: "T je linearna; ker T = {0}, slika = ℝ²; T⁻¹(x, y) = ((x + 2y)/6, (−x + 4y)/6)", steps: [
    [`T(x, y) = ${M([4, -2], [1, 1])}${M(["x"], ["y"])}, zato T(u + v) = T(u) + T(v) in T(αu) = αT(u)`, "Vsaka preslikava, ki jo zapišemo kot množenje z matriko, je linearna."],
    [`det = 4 + 2 = 6 ≠ 0 ⇒ ker T = {(0, 0)}, im T = ℝ²`, "Neničelna determinanta: preslikava je injektivna in surjektivna."],
    [`T⁻¹ = ${fr(1, 6)} ${M([1, 2], [-1, 4])} ⇒ T⁻¹(x, y) = (${fr("x + 2y", 6)}, ${fr("−x + 4y", 6)})`, "Preverba: T(T⁻¹(x, y)) = (x, y) ✓"],
  ]},
  "la-k1-25|4": { ans: "[v]<sub>B</sub> = (17/3, −4/3), [T(v)]<sub>B</sub> = (59/3, −22/3), [T]<sub>B</sub> = ⅓[[13, 11], [−2, 8]]", steps: [
    [`[v]<sub>B</sub>: a(1, 1) + b(2, −1) = (3, 7) ⇒ a + 2b = 3, a − b = 7 ⇒ b = −${fr(4, 3)}, a = ${fr(17, 3)}`, "Koordinate v bazi so koeficienti linearne kombinacije baznih vektorjev."],
    [`T(v) = (12 − 7, 6 + 21) = (5, 27) ⇒ [T(v)]<sub>B</sub> = (${fr(59, 3)}, −${fr(22, 3)})`, "Isti postopek: a + 2b = 5, a − b = 27."],
    [`[P]<sup>S</sup><sub>B</sub> = ${M([1, 2], [1, -1])} &nbsp;(bazni vektorji v stolpcih), &nbsp;([P]<sup>S</sup><sub>B</sub>)⁻¹ = ${fr(1, 3)} ${M([1, 2], [1, -1])}`, ""],
    [`[T]<sub>B</sub> = P⁻¹ [T]<sub>S</sub> P = ${fr(1, 3)} ${M([1, 2], [1, -1])} ${M([4, -1], [2, 3])} ${M([1, 2], [1, -1])} = ${fr(1, 3)} ${M([13, 11], [-2, 8])}`, "Najprej P (iz B v S), nato T v standardni bazi, nato P⁻¹ (nazaj v B)."],
    [`Preverba: ${fr(1, 3)} ${M([13, 11], [-2, 8])}${M(["17/3"], ["−4/3"])} = ${M(["59/3"], ["−22/3"])} ✓`, ""],
  ]},

  // ═════════════ FIZIKA · VAJE ═════════════
  "f-v-1006|1": { ans: "Enakomerno gibanje, v = −4 m/s; x(t) = 80 m − (4 m/s) t", steps: [
    [`Vsakih 10 s se lega zmanjša za 40 m ⇒ enakomerno gibanje, v = ${fr("−40 m", "10 s")} = −4 m/s`, "Enake spremembe v enakih časih pomenijo konstantno hitrost. Minus: hodimo v negativni smeri osi."],
    [`Koordinatni sistem: izhodišče je tam, kjer smo bili pri t = 20 s; pozitivna smer je nasprotna smeri hoje. Začnemo 80 m od izhodišča.`, "Koordinatni sistem izberemo sami, podatki pa nam ga že določajo."],
    [`x(t) = 80 m − (4 m/s) · t; &nbsp;v 50 s prehodimo 200 m.`, "Splošno x(t) = x₀ + vt.", xtgraph()],
  ]},
  "f-v-1006|2": { ans: "x₁ = 30 m − (8 m/s)t, x₂ = −10 m, x₃ ≈ −10 m + (5,5 m/s)t, x₄ ≈ −10 m − (3,5 m/s)t", steps: [
    [`Vse štiri so premice ⇒ vse so enakomerna gibanja: x(t) = x₀ + vt. Iz grafa odčitamo x₀ (pri t = 0) in naklon v.`, "Naklon = sprememba x / sprememba t med dvema točkama na premici."],
    [`1: x₀ = 30 m, pri 5 s je −10 m ⇒ v = −40/5 = −8 m/s; &nbsp;2: miruje pri −10 m (v = 0)`, ""],
    [`3: x₀ = −10 m, pri ≈ 7,3 s je 30 m ⇒ v ≈ 5,5 m/s; &nbsp;4: x₀ = −10 m, pri 8 s ≈ −38 m ⇒ v ≈ −3,5 m/s`, "Pri 3 in 4 odčitavamo približno, zato ≈."],
    [`Več količin: 2, 3, 4 začnejo na istem mestu; 1 in 3 se srečata pri t ≈ 3 s, x ≈ 6 m; 1 dohiti 2 pri t = 5 s; 1 prečka izhodišče pri t = 3,75 s.`, "Srečanje = presečišče premic."],
  ]},
  "f-v-1006|3": { ans: "Po 4 s, 2,4 m od Ane (1,6 m od Bojana)", steps: [
    [`Izhodišče pri Ani, pozitivna smer proti Bojanu: x<sub>A</sub> = (0,6 m/s) t, &nbsp;x<sub>B</sub> = 4 m − (0,4 m/s) t`, "Bojan se giblje proti Ani, zato ima negativno hitrost."],
    [`Srečanje: x<sub>A</sub> = x<sub>B</sub> ⇒ 0,6t = 4 − 0,4t ⇒ t = 4 s`, "Ali hitreje: razdalja se zmanjšuje z 0,6 + 0,4 = 1 m/s."],
    [`x = 0,6 · 4 = 2,4 m`, "Na grafu x(t) je to presečišče dveh premic."],
  ]},
  "f-v-1008|1": { ans: "Da, kopanje bo: ona pride do luže po 3 s, ti bi jo dohitel šele po 3,3 s.", steps: [
    [`Izhodišče pri tebi: x<sub>ti</sub> = (5 m/s) t, &nbsp;x<sub>sestra</sub> = 10 m + (2 m/s) t, &nbsp;luža pri 16 m`, ""],
    [`Sestra pride do luže: 10 + 2t = 16 ⇒ t = 3 s`, ""],
    [`Dohitiš jo: 5t = 10 + 2t ⇒ t = ${fr(10, 3)} s ≈ 3,3 s (pri x ≈ 16,7 m, že za lužo)`, "3,3 s > 3 s, zato prepozno."],
  ]},
  "f-v-1008|2": { ans: "v ≈ 20 m/s ≈ 70 km/h; x(t) = (20 m/s) t", steps: [
    [`Srce v mirovanju ≈ 1 utrip/s ⇒ 80 utripov ≈ 80 s`, "Ocena. Prestrašena bankirka ima verjetno hitrejši utrip (≈ 60 s), zato je hitrost morda bližje 27 m/s."],
    [`v ≈ ${fr("1600 m", "80 s")} = 20 m/s ≈ 72 km/h`, ""],
    [`Izhodišče pri prvem izvozu, pozitivna smer vožnje: x(t) = (20 m/s) t, premica skozi izhodišče.`, ""],
  ]},
  "f-v-1008|3": { ans: "t ≈ 500 s ≈ 8,3 min (približno 490–510 s)", steps: [
    [`s = 150 · 10⁶ km = 1,5 · 10¹¹ m`, "Najprej enote: km → m pomeni · 10³."],
    [`t = ${fr("s", "c")} = ${fr("1,5 · 10¹¹ m", "3,0 · 10⁸ m/s")} = 5,0 · 10² s ≈ 8,3 min`, ""],
    [`Meje: razdalja je »približna« in se čez leto spreminja (≈ 147–152 · 10⁶ km), zato t ≈ 490–510 s.`, "Rezultat ima toliko natančnih mest kot najmanj natančen podatek (2)."],
  ]},
};
