// ─────────────────────────────────────────────────────────────
//  snou — kviz: kratka vprašanja za vsako podtemo.
//  t = id teme, s = indeks podteme v SUB[t], a = indeks pravilnega odgovora
//  why = razlaga (lahko s sliko), pokaže se po odgovoru
// ─────────────────────────────────────────────────────────────

// ── majhne risbe ──
const _X = (v, min, max, w = 280) => 20 + (v - min) / (max - min) * w;
function numline(min, max, a, b, { openA = true, openB = true, ticks = [], color = "#f2b84b" } = {}) {
  const t = ticks.map(v => `<line x1="${_X(v, min, max)}" x2="${_X(v, min, max)}" y1="26" y2="34" stroke="var(--muted)"/><text x="${_X(v, min, max)}" y="50" text-anchor="middle" font-size="12" fill="var(--muted)">${v}</text>`).join("");
  const dot = (v, open) => `<circle cx="${_X(v, min, max)}" cy="30" r="5" fill="${open ? "var(--panel)" : color}" stroke="${color}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 320 60" style="width:100%;max-width:360px"><line x1="10" x2="310" y1="30" y2="30" stroke="var(--faint)" stroke-width="1.5"/>${t}
    <line x1="${_X(a, min, max)}" x2="${_X(b, min, max)}" y1="30" y2="30" stroke="${color}" stroke-width="5"/>${dot(a, openA)}${dot(b, openB)}</svg>`;
}
function roots(n, r, phase = 0, color = "#f2b84b", label = "") {
  const R = 70, c = 100;
  let pts = "";
  for (let k = 0; k < n; k++) {
    const f = phase + 2 * Math.PI * k / n;
    pts += `<line x1="${c}" y1="${c}" x2="${c + R * Math.cos(f)}" y2="${c - R * Math.sin(f)}" stroke="${color}" stroke-opacity=".35"/>
      <circle cx="${c + R * Math.cos(f)}" cy="${c - R * Math.sin(f)}" r="6" fill="${color}" style="filter:drop-shadow(0 0 4px ${color})"/>`;
  }
  return `<svg viewBox="0 0 200 200" style="width:100%;max-width:220px">
    <line x1="10" x2="190" y1="100" y2="100" stroke="var(--faint)"/><line x1="100" x2="100" y1="10" y2="190" stroke="var(--faint)"/>
    <text x="186" y="94" font-size="11" fill="var(--muted)">Re</text><text x="104" y="18" font-size="11" fill="var(--muted)">Im</text>
    <circle cx="100" cy="100" r="${R}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>${pts}
    <text x="${100 + R + 4}" y="116" font-size="12" fill="var(--muted)">${r}</text>${label}</svg>`;
}
function seqline(vals, min, max, marks) {
  const pts = vals.map(v => `<circle cx="${_X(v, min, max)}" cy="30" r="4" fill="#f2b84b"/>`).join("");
  const mk = marks.map(([v, txt, dashed]) => `<line x1="${_X(v, min, max)}" x2="${_X(v, min, max)}" y1="12" y2="44" stroke="#fff" ${dashed ? 'stroke-dasharray="3 3"' : ""}/><text x="${_X(v, min, max)}" y="58" text-anchor="middle" font-size="11.5" fill="var(--text)">${txt}</text>`).join("");
  return `<svg viewBox="0 0 320 64" style="width:100%;max-width:360px"><line x1="10" x2="310" y1="30" y2="30" stroke="var(--faint)" stroke-width="1.5"/>${pts}${mk}</svg>`;
}
function xtgraph() {
  const P = [[0, 80], [10, 40], [20, 0], [30, -40], [40, -80], [50, -120]];
  const X = t => 30 + t * 5, Y = x => 70 - x * 0.45;
  return `<svg viewBox="0 0 300 140" style="width:100%;max-width:340px">
    <line x1="30" x2="290" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--faint)"/><line x1="30" x2="30" y1="10" y2="135" stroke="var(--faint)"/>
    <text x="276" y="${Y(0) - 5}" font-size="11" fill="var(--muted)">t (s)</text><text x="34" y="18" font-size="11" fill="var(--muted)">x (m)</text>
    <polyline points="${P.map(([t, x]) => `${X(t)},${Y(x)}`).join(" ")}" fill="none" stroke="#e8665a" stroke-width="2.5"/>
    ${P.map(([t, x]) => `<circle cx="${X(t)}" cy="${Y(x)}" r="3.5" fill="#e8665a"/>`).join("")}
    <text x="${X(18)}" y="${Y(40)}" font-size="12" fill="var(--text)">naklon = −40 m / 10 s = −4 m/s</text></svg>`;
}

const QUIZ = [
  // ── Matematična indukcija ──
  { t: "indukcija", s: 0, q: "Kaj dokažeš v indukcijskem koraku?", opts: ["Da trditev velja za n = 1", "Če trditev velja za n, velja tudi za n + 1", "Da trditev velja za vse n hkrati", "Če trditev velja za n + 1, velja tudi za n"], a: 1,
    why: "Baza pokaže prvo domino (n = 1). Korak pokaže, da vsaka domina podre naslednjo: iz »velja za n« sledi »velja za n + 1«. Skupaj padejo vse." },
  { t: "indukcija", s: 1, q: "Dokazuješ 1 + 2 + … + n = n(n + 1)/2. Kaj narediš v koraku?", opts: ["Obe strani pomnožiš z n + 1", "Na obeh straneh prišteješ n + 1 in preveriš, da desno dobiš (n + 1)(n + 2)/2", "Vstaviš n = 1", "Odšteješ n od obeh strani"], a: 1,
    why: "n(n + 1)/2 + (n + 1) = (n + 1)(n/2 + 1) = (n + 1)(n + 2)/2. To je ista formula, le z n + 1 namesto n." },
  { t: "indukcija", s: 2, q: "Baza za »15ⁿ⁺¹ − 8ⁿ je deljivo s 7«: koliko je izraz pri n = 1?", opts: ["210", "217 = 7 · 31", "218", "225"], a: 1,
    why: "15² − 8¹ = 225 − 8 = 217 = 7 · 31. Deljivo s 7, baza drži." },
  { t: "indukcija", s: 2, q: "Korak za 15ⁿ⁺¹ − 8ⁿ (deljivo s 7). Katero preoblikovanje 15ⁿ⁺² − 8ⁿ⁺¹ je pravilno?", opts: ["8(15ⁿ⁺¹ − 8ⁿ) + 15ⁿ⁺¹", "8(15ⁿ⁺¹ − 8ⁿ) + 7 · 15ⁿ⁺¹", "15(15ⁿ⁺¹ − 8ⁿ) − 7 · 8ⁿ", "15ⁿ⁺¹ · 8ⁿ"], a: 1,
    why: "8(15ⁿ⁺¹ − 8ⁿ) + 7 · 15ⁿ⁺¹ = 8 · 15ⁿ⁺¹ − 8ⁿ⁺¹ + 7 · 15ⁿ⁺¹ = 15 · 15ⁿ⁺¹ − 8ⁿ⁺¹ = 15ⁿ⁺² − 8ⁿ⁺¹. Prvi del je deljiv s 7 po predpostavki, drugi zaradi faktorja 7. Trik: razbij 15 = 8 + 7." },
  { t: "indukcija", s: 4, q: "Zakaj dokaz za 4ⁿ⁻¹ > n² začnemo pri n = 3?", opts: ["Ker je tako lepše", "Ker pri n = 1 in n = 2 neenakost ne velja (1 > 1 in 4 > 4 sta napačni)", "Ker indukcija vedno začne pri 3", "Ker je 3 praštevilo"], a: 1,
    why: "n = 1: 4⁰ = 1 > 1? Ne. n = 2: 4¹ = 4 > 4? Ne. n = 3: 4² = 16 > 9? Da. Baza je prvi n, kjer trditev drži." },

  // ── Absolutna vrednost ──
  { t: "absolutna", s: 0, q: "Koliko sta |−3| in |3 − π|?", opts: ["−3 in 3 − π", "3 in π − 3", "3 in 3 − π", "−3 in π − 3"], a: 1,
    why: "|x| je razdalja od 0, zato nikoli negativna. 3 − π < 0, torej |3 − π| = −(3 − π) = π − 3." },
  { t: "absolutna", s: 2, q: "Rešitve enačbe |x − 2| = 5 so:", opts: ["x = 7", "x = 7 in x = −3", "x = −7 in x = 3", "x = 3"], a: 1,
    why: "x − 2 = 5 ali x − 2 = −5, torej x = 7 ali x = −3. Na številski premici: točke, ki so od 2 oddaljene 5." },
  { t: "absolutna", s: 2, q: "|a| = |b| je enakovredno:", opts: ["a = b", "a = b ali a = −b", "a = −b", "a² = −b²"], a: 1,
    why: "Enaki razdalji od 0 imata ali isti ali nasprotni števili. Tako začneš 1. nalogo K1 2020: |2x² − 8| = |x² − x − 6|." },
  { t: "absolutna", s: 3, q: "Rešitev neenačbe |x − 1| < 3 je:", opts: ["x < 4", "−2 < x < 4", "x < −2 ali x > 4", "−4 < x < 2"], a: 1,
    why: `Vse točke, ki so od 1 oddaljene manj kot 3:<br>${numline(-4, 6, -2, 4, { ticks: [-2, 1, 4] })}` },
  { t: "absolutna", s: 3, q: "Pri |x| + |x − 2| moraš ločiti primere. Kje so meje?", opts: ["x = 1", "x = 0 in x = 2", "x = −2 in x = 2", "Nikjer"], a: 1,
    why: "Meje so tam, kjer je izraz v absolutni vrednosti 0: x = 0 in x − 2 = 0. Primeri so x < 0, 0 ≤ x < 2 in x ≥ 2." },
  { t: "absolutna", s: 1, q: "Trikotniška neenakost pravi:", opts: ["|a + b| = |a| + |b|", "|a + b| ≤ |a| + |b|", "|a + b| ≥ |a| + |b|", "|a · b| ≤ |a| + |b|"], a: 1,
    why: "Enakost velja samo, ko sta a in b istega predznaka. Npr. |3 + (−5)| = 2 ≤ 3 + 5 = 8." },

  // ── Supremum in infimum ──
  { t: "supinf", s: 1, q: "Supremum množice A je:", opts: ["Največji element A", "Najmanjša zgornja meja A", "Katerakoli zgornja meja A", "Povprečje A"], a: 1,
    why: "Zgornjih mej je neskončno (vsako večje število je tudi meja). Supremum je najmanjša med njimi. Ni nujno v A." },
  { t: "supinf", s: 2, q: "Kdaj max A obstaja?", opts: ["Vedno", "Ko sup A pripada množici A", "Ko je A neskončna", "Ko je A omejena"], a: 1,
    why: "Max je supremum, ki je hkrati element množice. Če sup ni v A, max ne obstaja." },
  { t: "supinf", s: 3, q: "A = { 1/n ; n ∈ ℕ }. Kaj velja?", opts: ["max = 1, min = 0", "sup = max = 1, inf = 0, min ne obstaja", "sup = 0, inf = 1", "max ne obstaja"], a: 1,
    why: `Elementi 1, 1/2, 1/3, … se kopičijo pri 0, a je nikoli ne dosežejo.<br>${seqline([1, .5, 1 / 3, .25, .2, 1 / 6, 1 / 7, .125, 1 / 9, .1, 1 / 12, 1 / 15, 1 / 20], -0.05, 1.1, [[0, "inf = 0", true], [1, "max = 1"]])}` },
  { t: "supinf", s: 3, q: "A = { (3n + 2)/(n + 1) ; n ∈ ℕ } (K1 2020). Kaj velja?", opts: ["min = 5/2, sup = 3, max ne obstaja", "min = 2, sup = 3", "max = 3, min = 5/2", "inf = 0, sup = 3"], a: 0,
    why: `Trik: (3n + 2)/(n + 1) = 3 − 1/(n + 1). Zaporedje narašča: n = 1 da 5/2, nato se bliža 3, a je ne doseže.<br>${seqline([2.5, 8 / 3, 2.75, 2.8, 2.8333, 2.857, 2.875, 2.889, 2.9, 2.92, 2.94, 2.96], 2.3, 3.15, [[2.5, "min = 5/2"], [3, "sup = 3", true]])}` },
  { t: "supinf", s: 4, q: "A = { 1 + (−1)ⁿ/n ; n ∈ ℕ }. Katera vrednost je max?", opts: ["2", "3/2 (pri n = 2)", "1", "Max ne obstaja"], a: 1,
    why: "Lihi n: 1 − 1/n = 0, 2/3, 4/5, … (narašča proti 1). Sodi n: 1 + 1/n = 3/2, 5/4, 7/6, … (pada proti 1). Največji je 3/2, najmanjši 0. Pri (−1)ⁿ vedno loči sode in lihe n." },

  // ── Kompleksna števila ──
  { t: "kompleksna", s: 0, q: "(2 + 3i)(1 − i) = ?", opts: ["2 − 3i", "5 + i", "−1 + i", "5 − i"], a: 1,
    why: "2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i (ker i² = −1)." },
  { t: "kompleksna", s: 1, q: "Za z = 3 + 4i: koliko sta z̄ in |z|?", opts: ["3 − 4i in 5", "−3 + 4i in 7", "3 − 4i in 25", "4 + 3i in 5"], a: 0,
    why: "Konjugirano: zamenjaš predznak imaginarnega dela. |z| = √(3² + 4²) = √25 = 5." },
  { t: "kompleksna", s: 2, q: "1/i = ?", opts: ["i", "−i", "1", "−1"], a: 1,
    why: "Pomnoži z i/i: 1/i = i/i² = i/(−1) = −i." },
  { t: "kompleksna", s: 3, q: "Polarna oblika števila 1 + i:", opts: ["√2 (cos π/4 + i sin π/4)", "2 (cos π/4 + i sin π/4)", "√2 (cos π/2 + i sin π/2)", "1 (cos π/4 + i sin π/4)"], a: 0,
    why: "r = |1 + i| = √2, kot φ = π/4 (točka (1, 1) leži na diagonali)." },
  { t: "kompleksna", s: 4, q: "(1 + i)⁴ = ?", opts: ["4", "−4", "4i", "1 + 4i"], a: 1,
    why: "(1 + i)² = 1 + 2i + i² = 2i, nato (2i)² = 4i² = −4. Ali polarno: (√2)⁴ = 4, kot 4 · π/4 = π, torej −4." },
  { t: "kompleksna", s: 5, q: "Koliko rešitev ima z³ = 8 in kako ležijo?", opts: ["Ena: z = 2", "Tri, oglišča enakostraničnega trikotnika na krožnici s polmerom 2", "Tri, vse realne", "Šest, na krožnici s polmerom 8"], a: 1,
    why: `z = 2, −1 + i√3, −1 − i√3. Koreni zⁿ = w so vedno n točk, enakomerno razporejenih po krožnici s polmerom ⁿ√|w|.<br>${roots(3, "2", 0)}` },
  { t: "kompleksna", s: 5, q: "Rešitve z⁶ = w (w ≠ 0) v kompleksni ravnini tvorijo:", opts: ["Premico", "Pravilni šestkotnik na krožnici s polmerom ⁶√|w|", "Dve točki", "Krožnico s polmerom |w|"], a: 1,
    why: `Šest točk, med sosednjima je kot 2π/6 = 60°.<br>${roots(6, "⁶√|w|", Math.PI / 12)}` },
  { t: "kompleksna", s: 7, q: "z⁶ + 7z³ = 8 (K1 2020). Kako začneš?", opts: ["Vstaviš z = x + iy", "Uvedeš u = z³: u² + 7u − 8 = 0, torej u = 1 ali u = −8", "Logaritmiraš", "Deliš z z³"], a: 1,
    why: "Kvadratna enačba v u = z³. Potem rešiš z³ = 1 in z³ = −8: skupaj 6 rešitev, dva trikotnika na krožnicah s polmeroma 1 in 2." },
  { t: "kompleksna", s: 6, q: "z² + 2z̄ = −1 (K1 2024). Kako začneš?", opts: ["Uvedeš u = z²", "Vstaviš z = x + iy in ločiš realni in imaginarni del", "Polarna oblika", "Kvadratna formula"], a: 1,
    why: "Ko se v enačbi pojavi z̄ ali |z|, je najlažje z = x + iy. Dobiš dve realni enačbi (Re = Re, Im = Im)." },

  // ── Funkcije ──
  { t: "funkcije", s: 0, q: "Naravno definicijsko območje f(x) = (x + 2)/(1 − 3x) (K1 2025):", opts: ["ℝ", "ℝ \\ {1/3}", "ℝ \\ {−2}", "x > 1/3"], a: 1,
    why: "Imenovalec ne sme biti 0: 1 − 3x = 0 pri x = 1/3." },
  { t: "funkcije", s: 3, q: "Inverz f(x) = (x + 2)/(1 − 3x):", opts: ["(1 − 3x)/(x + 2)", "(x − 2)/(3x + 1)", "(x + 2)/(3x − 1)", "−(x + 2)/(1 − 3x)"], a: 1,
    why: "y = (x + 2)/(1 − 3x) ⇒ y − 3xy = x + 2 ⇒ y − 2 = x(1 + 3y) ⇒ x = (y − 2)/(3y + 1). Zato je tudi zaloga vrednosti ℝ \\ {−1/3}." },
  { t: "funkcije", s: 4, q: "f(x) = x², g(x) = x + 1. Koliko je (f ∘ g)(x)?", opts: ["x² + 1", "(x + 1)²", "x³ + x²", "x² + x + 1"], a: 1,
    why: "f ∘ g pomeni najprej g, potem f: f(g(x)) = f(x + 1) = (x + 1)²." },

  // ── LA: vektorji, skalarni, premice, det ──
  { t: "vektorji", s: 0, q: "ABCD je paralelogram. Kje je D?", opts: ["D = B + C − A", "D = A + C − B", "D = A + B − C", "D = (A + C)/2"], a: 1,
    why: "V paralelogramu je AB = DC, torej B − A = C − D, D = A + C − B. Primer K1 2025: A(1, −2), B(4, 1), C(−2, 3) ⇒ D = (−5, 0)." },
  { t: "vektorji", s: 6, q: "Dolžina vektorja (3, 4):", opts: ["7", "5", "25", "√7"], a: 1, why: "√(3² + 4²) = √25 = 5." },
  { t: "vektorji", s: 4, q: "Sta (2, −4) in (−1, 2) kolinearna?", opts: ["Da, (2, −4) = −2 · (−1, 2)", "Ne", "Samo če sta enako dolga", "Ne da se ugotoviti"], a: 0,
    why: "Kolinearna pomeni, da je eden večkratnik drugega. Ekvivalentno: det = 2 · 2 − (−4)(−1) = 0." },
  { t: "skalarni", s: 0, q: "(1, 2) · (3, −1) = ?", opts: ["(3, −2)", "1", "5", "−1"], a: 1, why: "1 · 3 + 2 · (−1) = 3 − 2 = 1. Skalarni produkt je število, ne vektor." },
  { t: "skalarni", s: 3, q: "Kdaj sta vektorja u in v pravokotna?", opts: ["Ko je u · v = 1", "Ko je u · v = 0", "Ko je |u| = |v|", "Ko je det[u, v] = 0"], a: 1, why: "u · v = |u||v| cos φ, in cos 90° = 0." },
  { t: "skalarni", s: 4, q: "Pravokotna projekcija v na u:", opts: ["(u · v) u", "((u · v)/|u|²) u", "((u · v)/|v|²) v", "u × v"], a: 1,
    why: "Projekcija leži na u, dolga je (u · v)/|u|. Primer: v = (3, 4), u = (1, 0) ⇒ projekcija (3, 0)." },
  { t: "premice", s: 0, q: "Premica skozi (1, 1) s smernim vektorjem (2, 1):", opts: ["(x, y) = (2, 1) + t(1, 1)", "(x, y) = (1, 1) + t(2, 1)", "2x + y = 1", "y = 2x + 1"], a: 1, why: "Parametrična oblika: točka + t · smer." },
  { t: "premice", s: 1, q: "Normalni vektor premice 2x − 3y = 5:", opts: ["(2, −3)", "(3, 2)", "(−3, 2)", "(2, 3)"], a: 0, why: "V obliki ax + by = c je (a, b) normala. Smerni vektor je pravokoten nanjo: (3, 2)." },
  { t: "det2", s: 2, q: "Ploščina paralelograma, ki ga napenjata u = (3, 0) in v = (1, 2):", opts: ["3", "6", "5", "9"], a: 1, why: "|det[u, v]| = |3 · 2 − 0 · 1| = 6." },
  { t: "det2", s: 1, q: "Če v matriki [u, v] zamenjaš stolpca, determinanta:", opts: ["Ostane enaka", "Spremeni predznak", "Postane 0", "Se podvoji"], a: 1, why: "det[v, u] = −det[u, v]. Ploščina ostane ista, spremeni se orientacija." },

  // ── LA: matrike, preslikave, lastne, baza ──
  { t: "matrike", s: 3, q: "[[1, 2], [0, 1]] · [[1, 0], [3, 1]] = ?", opts: ["[[7, 2], [3, 1]]", "[[1, 0], [0, 1]]", "[[1, 2], [3, 1]]", "[[7, 2], [0, 1]]"], a: 0,
    why: "Vrstica × stolpec: (1·1 + 2·3, 1·0 + 2·1) = (7, 2); (0·1 + 1·3, 0·0 + 1·1) = (3, 1)." },
  { t: "matrike", s: 4, q: "Inverz [[2, 1], [1, 1]]:", opts: ["[[1, −1], [−1, 2]]", "[[1, 1], [1, 2]]", "[[−2, 1], [1, −1]]", "Ne obstaja"], a: 0,
    why: "det = 2 − 1 = 1. Za [[a, b], [c, d]]: inverz = (1/det) [[d, −b], [−c, a]]." },
  { t: "preslikave", s: 0, q: "Je T(x, y) = (x + 1, y) linearna?", opts: ["Da", "Ne, ker T(0, 0) = (1, 0) ≠ (0, 0)", "Samo za x > 0", "Ne da se ugotoviti"], a: 1, why: "Linearna preslikava vedno slika 0 v 0. Hiter test, preden začneš preverjati aditivnost." },
  { t: "preslikave", s: 2, q: "T(x, y) = (4x − 2y, x + y) (K1 2025). Jedro T je:", opts: ["Premica", "Samo {(0, 0)}, ker je det = 4 + 2 = 6 ≠ 0", "Cela ravnina", "Prazno"], a: 1, why: "Matrika [[4, −2], [1, 1]] ima det 6 ≠ 0, zato je T obrnljiva, jedro je {0}, slika je ℝ²." },
  { t: "lastne", s: 1, q: "Lastne vrednosti A = [[1, −3], [−3, 1]] (K1 2024):", opts: ["1 in −3", "4 in −2", "−4 in 2", "3 in 1"], a: 1,
    why: "det(A − λI) = (1 − λ)² − 9 = 0 ⇒ 1 − λ = ±3 ⇒ λ = −2 ali λ = 4. Preverba: vsota = sled = 2, produkt = det = −8." },
  { t: "lastne", s: 0, q: "Lastni vektor za λ = 4 pri A = [[1, −3], [−3, 1]]:", opts: ["(1, 1)", "(1, −1)", "(4, 0)", "(0, 1)"], a: 1,
    why: "A(1, −1) = (1 + 3, −3 − 1) = (4, −4) = 4 · (1, −1). Lastni vektor preslikava samo raztegne." },
  { t: "lastne", s: 2, q: "Sled matrike je:", opts: ["Produkt lastnih vrednosti", "Vsota diagonalnih elementov (= vsota lastnih vrednosti)", "Determinanta", "Največja lastna vrednost"], a: 1, why: "sled = a₁₁ + a₂₂ = λ₁ + λ₂, det = λ₁ · λ₂. Odlična hitra preverba." },
  { t: "lastne", s: 4, q: "A = PDP⁻¹. Kako izračunaš A³?", opts: ["P³D³P⁻³", "PD³P⁻¹", "3PDP⁻¹", "D³"], a: 1, why: "A³ = PDP⁻¹ · PDP⁻¹ · PDP⁻¹ = PD³P⁻¹, ker se P⁻¹P pokrajšajo. D³ je preprost: vsak diagonalni element na tretjo." },
  { t: "baza", s: 1, q: "Prehodna matrika iz baze B v standardno bazo ima v stolpcih:", opts: ["Vektorje standardne baze", "Vektorje baze B", "Lastne vrednosti", "Koordinate [v]_B"], a: 1, why: "[P]ˢ_B = [b₁ b₂]. Iz koordinat v B dobiš standardne: v = [P]ˢ_B [v]_B." },
  { t: "baza", s: 3, q: "Matrika Q je ortogonalna, ko:", opts: ["det Q = 0", "QᵀQ = I", "Q = Qᵀ", "Q ima same ničle"], a: 1, why: "Stolpci so enotski in pravokotni. Zato Q⁻¹ = Qᵀ, kar je zelo hitro." },

  // ── Fizika: kinematika ──
  { t: "kinematika", s: 3, q: "Sprehod: t = 0, 10, 20, … s; x = 80, 40, 0, −40 m. Kolikšna je hitrost?", opts: ["4 m/s", "−4 m/s", "40 m/s", "−40 m/s"], a: 1,
    why: `Naklon grafa x(t) je hitrost: Δx/Δt = −40 m / 10 s = −4 m/s. Minus: gibanje v negativni smeri. x(t) = 80 m − 4 m/s · t.<br>${xtgraph()}` },
  { t: "kinematika", s: 8, q: "Avtomobilčka sta 4 m narazen in se gibljeta drug proti drugemu s 0,6 m/s in 0,4 m/s. Kdaj se zaletita?", opts: ["Po 10 s", "Po 4 s", "Po 6,7 s", "Po 1 s"], a: 1,
    why: "Razdalja se zmanjšuje s 0,6 + 0,4 = 1,0 m/s, torej 4 m / 1 m/s = 4 s. Anin avtomobilček do tedaj prevozi 0,6 · 4 = 2,4 m." },
  { t: "kinematika", s: 8, q: "Sestra (2 m/s) je 6 m pred lužo, ti (5 m/s) 10 m za njo. Jo ujameš?", opts: ["Da, po 2 s", "Ne: ona pride v lužo po 3 s, ti bi jo ujel šele po 3,3 s", "Da, po 3 s", "Ne, nikoli je ne dohitiš"], a: 1,
    why: "Ona: 6 m / 2 m/s = 3 s. Ti jo dohitevaš s 5 − 2 = 3 m/s in moraš zapreti 10 m: 10/3 ≈ 3,3 s. Prepozno, kopanje bo." },
  { t: "kinematika", s: 3, q: "Kaj je ploščina pod grafom v(t)?", opts: ["Pospešek", "Premik", "Hitrost", "Čas"], a: 1, why: "Δx = v · Δt, pri spremenljivi v pa vsota takih pravokotnikov, torej ploščina (integral). Naklon v(t) pa je pospešek." },
  { t: "uvod", s: 2, q: "Svetloba (3,0 · 10⁸ m/s) do Zemlje (150 · 10⁶ km). Koliko časa?", opts: ["5 s", "≈ 500 s ≈ 8 min", "≈ 50 min", "≈ 5 h"], a: 1,
    why: "150 · 10⁶ km = 1,5 · 10¹¹ m. t = 1,5 · 10¹¹ / 3 · 10⁸ = 500 s ≈ 8,3 min. Pazi na pretvorbo km → m." },
  { t: "uvod", s: 2, q: "Kombi prevozi 1,6 km v 80 srčnih utripih. Približna hitrost?", opts: ["≈ 2 m/s", "≈ 20 m/s ≈ 70 km/h", "≈ 200 m/s", "≈ 1600 m/s"], a: 1,
    why: "Srce v mirovanju ≈ 1 utrip na sekundo (bankirka je prestrašena, morda hitreje), torej ≈ 80 s. 1600 m / 80 s = 20 m/s ≈ 72 km/h. Ocena, ne natančen rezultat." },
];
