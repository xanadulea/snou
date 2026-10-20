// ─────────────────────────────────────────────────────────────
//  snou — ZAPISKI: lekcije, ki razložijo, ne samo naštejejo.
//  Vsaka lekcija sledi listu z vajami.
//  Del lekcije: h (naslov), p (razlaga), pic (slika), zv (✎ v zvezek), ex (primer s koraki)
//  Naloge: q (naloga), a (rešitev), steps (postopek, neobvezno)
// ─────────────────────────────────────────────────────────────

// ── risbe za zapiske ──
function venn(sh, label, { u = true } = {}) {
  // sh: katera področja so pobarvana: a (samo A), ab (oboje), b (samo B), o (zunaj)
  const c = "#f2b84b", id = "v" + Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 220 150" style="width:100%;max-width:240px">
    <defs><clipPath id="${id}a"><circle cx="85" cy="72" r="46"/></clipPath><clipPath id="${id}b"><circle cx="135" cy="72" r="46"/></clipPath>
      <mask id="${id}na"><rect width="220" height="150" fill="#fff"/><circle cx="85" cy="72" r="46" fill="#000"/></mask>
      <mask id="${id}nb"><rect width="220" height="150" fill="#fff"/><circle cx="135" cy="72" r="46" fill="#000"/></mask></defs>
    ${u ? `<rect x="6" y="8" width="208" height="128" rx="8" fill="${sh.o ? c : "none"}" fill-opacity="${sh.o ? .55 : 0}" stroke="var(--muted)"/><text x="14" y="26" font-size="12" fill="var(--muted)">U</text>` : ""}
    ${sh.o ? `<circle cx="85" cy="72" r="46" fill="var(--bg)"/><circle cx="135" cy="72" r="46" fill="var(--bg)"/>` : ""}
    ${sh.a ? `<circle cx="85" cy="72" r="46" fill="${c}" fill-opacity=".55" mask="url(#${id}nb)"/>` : ""}
    ${sh.b ? `<circle cx="135" cy="72" r="46" fill="${c}" fill-opacity=".55" mask="url(#${id}na)"/>` : ""}
    ${sh.ab ? `<circle cx="135" cy="72" r="46" fill="${c}" fill-opacity=".55" clip-path="url(#${id}a)"/>` : ""}
    <circle cx="85" cy="72" r="46" fill="none" stroke="var(--text)" stroke-width="1.5"/><circle cx="135" cy="72" r="46" fill="none" stroke="var(--text)" stroke-width="1.5"/>
    <text x="58" y="76" font-size="15" fill="var(--text)">A</text><text x="154" y="76" font-size="15" fill="var(--text)">B</text>
    <text x="110" y="146" text-anchor="middle" font-size="13" fill="var(--text)">${label}</text></svg>`;
}
function ttable(vars, cols) {
  // vars: ["a","b"], cols: [[ime, funkcija(a, b) → bool], …]
  const rows = [];
  const n = vars.length;
  for (let i = 0; i < 2 ** n; i++) rows.push(vars.map((_, j) => !((i >> (n - 1 - j)) & 1)));
  const cell = v => `<td class="${v ? "t1" : "t0"}">${v ? 1 : 0}</td>`;
  return `<table class="tt"><tr>${vars.map(v => `<th>${v}</th>`).join("")}${cols.map(([h]) => `<th>${h}</th>`).join("")}</tr>
    ${rows.map(r => `<tr>${r.map(cell).join("")}${cols.map(([, f]) => cell(f(...r))).join("")}</tr>`).join("")}</table>`;
}
function grid(A, B, la = "A", lb = "B") {
  const W = 40 + A.length * 34, H = 30 + B.length * 30;
  let h = "";
  A.forEach((a, i) => h += `<text x="${50 + i * 34}" y="${H - 4}" text-anchor="middle" font-size="12" fill="var(--muted)">${a}</text>`);
  B.forEach((b, j) => h += `<text x="20" y="${H - 26 - j * 30 + 4}" text-anchor="end" font-size="12" fill="var(--muted)">${b}</text>`);
  A.forEach((a, i) => B.forEach((b, j) => h += `<circle cx="${50 + i * 34}" cy="${H - 26 - j * 30}" r="5" fill="#f2b84b"/>`));
  return `<svg viewBox="0 0 ${W + 30} ${H + 6}" style="width:100%;max-width:${W + 60}px">
    <line x1="30" y1="${H - 14}" x2="${W + 10}" y2="${H - 14}" stroke="var(--faint)"/><line x1="30" y1="${H - 14}" x2="30" y2="0" stroke="var(--faint)"/>
    <text x="${W + 14}" y="${H - 10}" font-size="12" fill="var(--text)">${la}</text><text x="34" y="12" font-size="12" fill="var(--text)">${lb}</text>${h}</svg>`;
}
function sqpic() {
  // (a + b)² kot ploščina kvadrata
  return `<svg viewBox="0 0 170 170" style="width:100%;max-width:190px">
    <rect x="10" y="10" width="100" height="100" fill="#f2b84b" fill-opacity=".55" stroke="var(--text)"/>
    <rect x="110" y="10" width="50" height="100" fill="#5ec2d6" fill-opacity=".45" stroke="var(--text)"/>
    <rect x="10" y="110" width="100" height="50" fill="#5ec2d6" fill-opacity=".45" stroke="var(--text)"/>
    <rect x="110" y="110" width="50" height="50" fill="#e8665a" fill-opacity=".55" stroke="var(--text)"/>
    <text x="60" y="64" text-anchor="middle" font-size="15" fill="var(--text)">a²</text><text x="135" y="64" text-anchor="middle" font-size="14" fill="var(--text)">ab</text>
    <text x="60" y="140" text-anchor="middle" font-size="14" fill="var(--text)">ab</text><text x="135" y="140" text-anchor="middle" font-size="14" fill="var(--text)">b²</text></svg>`;
}


function mapPic(a, b, c, d, label) {
  // slika enotskega kvadrata pri matriki [[a, b], [c, d]]: e1 → (a, c), e2 → (b, d)
  const S = 34, O = [120, 120], P = (x, y) => [O[0] + x * S, O[1] - y * S];
  let g = "";
  for (let i = -3; i <= 3; i++) g += `<line x1="${P(i, -3)[0]}" y1="${P(i, -3)[1]}" x2="${P(i, 3)[0]}" y2="${P(i, 3)[1]}" stroke="var(--line)"/><line x1="${P(-3, i)[0]}" y1="${P(-3, i)[1]}" x2="${P(3, i)[0]}" y2="${P(3, i)[1]}" stroke="var(--line)"/>`;
  const sq = [P(0, 0), P(1, 0), P(1, 1), P(0, 1)].map(p => p.join(",")).join(" ");
  const im = [P(0, 0), P(a, c), P(a + b, c + d), P(b, d)].map(p => p.join(",")).join(" ");
  const ar = (x, y, col, t) => { const [X, Y] = P(x, y); return `<line x1="${O[0]}" y1="${O[1]}" x2="${X}" y2="${Y}" stroke="${col}" stroke-width="3"/><circle cx="${X}" cy="${Y}" r="4" fill="${col}"/><text x="${X + 6}" y="${Y - 6}" font-size="12" fill="${col}">${t}</text>`; };
  return `<svg class="mp" viewBox="0 0 240 250" style="width:100%;max-width:250px">${g}
    <line x1="${P(-3, 0)[0]}" y1="${O[1]}" x2="${P(3, 0)[0]}" y2="${O[1]}" stroke="var(--faint)" stroke-width="1.5"/><line x1="${O[0]}" y1="${P(0, -3)[1]}" x2="${O[0]}" y2="${P(0, 3)[1]}" stroke="var(--faint)" stroke-width="1.5"/>
    <polygon points="${sq}" fill="none" stroke="var(--muted)" stroke-dasharray="4 3"/>
    <polygon points="${im}" fill="#5ec2d6" fill-opacity=".25" stroke="#5ec2d6"/>
    ${ar(a, c, "#f2b84b", "Ae₁")}${ar(b, d, "#e8665a", "Ae₂")}
    <text x="120" y="246" text-anchor="middle" font-size="13" fill="var(--text)">${label}</text></svg>`;
}
const M2 = (a, b, c, d) => mx([[a, b], [c, d]]);


function arrows(L, R, pairs, title) {
  const H = Math.max(L.length, R.length) * 30 + 20, ly = i => 22 + i * 30, ry = i => 22 + i * 30;
  let h = `<ellipse cx="45" cy="${H / 2}" rx="34" ry="${H / 2 - 4}" fill="none" stroke="var(--muted)"/><ellipse cx="175" cy="${H / 2}" rx="34" ry="${H / 2 - 4}" fill="none" stroke="var(--muted)"/>`;
  const off = (n) => (Math.max(L.length, R.length) - n) * 15;
  L.forEach((l, i) => h += `<circle cx="45" cy="${ly(i) + off(L.length)}" r="4" fill="#f2b84b"/><text x="30" y="${ly(i) + off(L.length) + 4}" text-anchor="end" font-size="11" fill="var(--text)">${l}</text>`);
  R.forEach((r, i) => h += `<circle cx="175" cy="${ry(i) + off(R.length)}" r="4" fill="#5ec2d6"/><text x="190" y="${ry(i) + off(R.length) + 4}" font-size="11" fill="var(--text)">${r}</text>`);
  pairs.forEach(([a, b]) => { const y1 = ly(a) + off(L.length), y2 = ry(b) + off(R.length);
    h += `<line x1="50" y1="${y1}" x2="167" y2="${y2}" stroke="var(--text)" stroke-width="1.3" marker-end="url(#ah)"/>`; });
  return `<svg viewBox="0 0 220 ${H + 22}" style="width:100%;max-width:230px"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--text)"/></marker></defs>${h}
    <text x="110" y="${H + 18}" text-anchor="middle" font-size="12.5" fill="var(--text)">${title}</text></svg>`;
}
function fdiag(up, down, label, v, dv) {
  // up/down: dolžini puščic (sila roke, teža); v, dv: "up" | "down" | "" (hitrost, sprememba hitrosti)
  const c = 85, y = 95, S = 14;
  const ar = (x1, y1, x2, y2, col, t, tx, ty) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="3" marker-end="url(#fa${col.slice(1)})"/><text x="${tx}" y="${ty}" font-size="11.5" fill="${col}">${t}</text>`;
  const mk = col => `<marker id="fa${col.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${col}"/></marker>`;
  let h = `<defs>${mk("#5ec2d6")}${mk("#e8665a")}${mk("#f2b84b")}${mk("#7fcf86")}</defs><circle cx="${c}" cy="${y}" r="6" fill="var(--text)"/>`;
  if (up) h += ar(c, y - 7, c, y - 7 - up * S, "#5ec2d6", "silomer", c + 8, y - up * S / 2 - 7);
  if (down) h += ar(c, y + 7, c, y + 7 + down * S, "#e8665a", "teža mg", c + 8, y + down * S / 2 + 10);
  if (v) h += ar(160, y + (v === "up" ? 25 : -25), 160, y + (v === "up" ? -25 : 25), "#f2b84b", "v", 168, y + 4);
  if (dv) h += ar(195, y + (dv === "up" ? 18 : -18), 195, y + (dv === "up" ? -18 : 18), "#7fcf86", "Δv", 203, y + 4);
  return `<svg viewBox="0 0 240 205" style="width:100%;max-width:220px">${h}<text x="120" y="200" text-anchor="middle" font-size="12" fill="var(--text)">${label}</text></svg>`;
}


function fgraph(kind, label) {
  // napoved F_silomer(t): 0–1 miruje, 1–2 pospešuje, 2–4 stalna v, 4–5 zavira, 5–6 miruje
  const X = t => 30 + t * 38, Y = f => 110 - f * 22, mg = 2.5;
  const H1 = [[0, mg], [1, mg], [1, 3.6], [5, 3.6], [5, mg], [6, mg]];
  const H2 = [[0, mg], [1, mg], [1, 3.6], [2, 3.6], [2, mg], [4, mg], [4, 1.4], [5, 1.4], [5, mg], [6, mg]];
  const P = (kind === 1 ? H1 : H2).map(([t, f]) => `${X(t)},${Y(f)}`).join(" ");
  const col = kind === 1 ? "#e8665a" : "#7fcf86";
  const zone = (a, b, t) => `<text x="${(X(a) + X(b)) / 2}" y="128" text-anchor="middle" font-size="9.5" fill="var(--muted)">${t}</text>`;
  return `<svg class="fg" viewBox="0 0 270 160" style="width:100%;max-width:330px">
    <line x1="30" y1="112" x2="262" y2="112" stroke="var(--faint)"/><line x1="30" y1="112" x2="30" y2="8" stroke="var(--faint)"/>
    <text x="34" y="14" font-size="11" fill="var(--muted)">F silomera</text><text x="248" y="108" font-size="11" fill="var(--muted)">t</text>
    <line x1="30" y1="${Y(mg)}" x2="262" y2="${Y(mg)}" stroke="var(--muted)" stroke-dasharray="4 4"/><text x="8" y="${Y(mg) + 4}" font-size="11" fill="var(--muted)">mg</text>
    ${[1, 2, 4, 5].map(t => `<line x1="${X(t)}" y1="112" x2="${X(t)}" y2="10" stroke="var(--line)"/>`).join("")}
    <polyline points="${P}" fill="none" stroke="${col}" stroke-width="3"/>
    ${zone(0, 1, "miruje")}${zone(1, 2, "pospeš.")}${zone(2, 4, "stalna v")}${zone(4, 5, "zavira")}${zone(5, 6, "miruje")}
    <text x="146" y="152" text-anchor="middle" font-size="12.5" fill="${col}">${label}</text></svg>`;
}
function motiondiag() {
  const ys = [0, 4, 14, 30, 46, 62, 76, 84, 86];
  let h = "";
  ys.forEach((y, i) => { const Y = 200 - y * 2; h += `<circle cx="60" cy="${Y}" r="5" fill="#e8665a"/>`; if (i < ys.length - 1) { const d = (ys[i + 1] - y) * 2; if (d > 4) h += `<line x1="80" y1="${Y}" x2="80" y2="${Y - d + 4}" stroke="#f2b84b" stroke-width="2.2" marker-end="url(#mdv)"/>`; } });
  return `<svg class="md" viewBox="0 0 200 225" style="width:100%;max-width:220px"><defs><marker id="mdv" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#f2b84b"/></marker></defs>${h}
    <text x="92" y="190" font-size="10.5" fill="var(--muted)">vse gostejše</text><text x="92" y="130" font-size="10.5" fill="var(--muted)">enake razdalje</text><text x="92" y="40" font-size="10.5" fill="var(--muted)">spet gostejše</text>
    <text x="100" y="220" text-anchor="middle" font-size="11" fill="var(--text)">diagram gibanja (od spodaj gor)</text></svg>`;
}

const NOTES = [
  // ═══════════════════════════════════════════════
  { id: "z-ponavljanje", s: "mat", t: null, title: "Ponavljanje: potence, koreni, ulomki", vaje: "Vaje 1 · Naloge za ponavljanje",
    intro: "To je srednješolska algebra, ampak na vajah gre hitro. Če tukaj nisi gladka, se zatakneš pri VSEH kasnejših nalogah, ker so to orodja, ne snov. Zato najprej to.",
    parts: [
      { h: "Potence: vse izhaja iz enega pravila",
        p: ["a³ pomeni a · a · a. Iz tega sledi vse ostalo. Če pomnožiš a³ · a² = (a · a · a)(a · a), imaš pet a-jev, torej a⁵. Eksponenta se <b>seštejeta</b>.",
            "Negativni eksponent pomeni »obrni v ulomek«: a⁻² = 1/a². Ničti eksponent je vedno 1: a⁰ = 1. To ni dogovor iz zraka: a³/a³ = 1, po pravilu pa je a³⁻³ = a⁰."],
        zv: `aⁿ · aᵐ = aⁿ⁺ᵐ &nbsp;&nbsp; aⁿ / aᵐ = aⁿ⁻ᵐ &nbsp;&nbsp; (aⁿ)ᵐ = aⁿᵐ<br>(ab)ⁿ = aⁿbⁿ &nbsp;&nbsp; a⁻ⁿ = ${fr(1, "aⁿ")} &nbsp;&nbsp; a⁰ = 1 &nbsp;&nbsp; a<sup>1/n</sup> = ⁿ√a`,
        ex: { q: "Poenostavi (3x)⁴ · (9x⁻²)⁻⁴. &nbsp;(vaje 1, 1a)", steps: [
          "(3x)⁴ = 3⁴x⁴ = 81x⁴ &nbsp;&nbsp;(potenca produkta)",
          "(9x⁻²)⁻⁴ = 9⁻⁴ · x⁸ = x⁸ / 6561 &nbsp;&nbsp;(−2 · (−4) = 8)",
          `81x⁴ · ${fr("x⁸", 6561)} = ${fr("x¹²", 81)} &nbsp;&nbsp;(6561 = 81 · 81)`] } },
      { h: "Izpostavljanje: poišči, kar je skupno",
        p: ["Ko v vsakem členu vidiš isto stvar, jo »potegneš ven pred oklepaj«. To je obratno od množenja oklepaja.",
            "Pri potencah izpostaviš <b>najmanjšo</b> potenco, ki se pojavi. Ostale zapišeš kot to potenco krat nekaj."],
        zv: "ab + ac = a(b + c) &nbsp;&nbsp; 2ˣ⁺⁴ = 2ˣ⁺¹ · 2³",
        ex: { q: "2ˣ⁺⁴ − 2ˣ⁺³ − 3 · 2ˣ⁺² + 5 · 2ˣ⁺¹ &nbsp;(vaje 1, 2)", steps: [
          "Najmanjša potenca je 2ˣ⁺¹. Vsako drugo zapišem z njo: 2ˣ⁺⁴ = 8 · 2ˣ⁺¹, 2ˣ⁺³ = 4 · 2ˣ⁺¹, 2ˣ⁺² = 2 · 2ˣ⁺¹",
          "= 2ˣ⁺¹(8 − 4 − 3 · 2 + 5) = 2ˣ⁺¹ · 3 = 3 · 2ˣ⁺¹"] } },
      { h: "Razstavljanje: trije vzorci, ki jih moraš prepoznati na pogled",
        p: ["Večina krajšanja ulomkov je v resnici razstavljanje. Ko izraz razstaviš na faktorje, lahko enake faktorje v števcu in imenovalcu pokrajšaš.",
            "(a + b)² si najlažje predstavljaš kot kvadrat s stranico a + b: razpade na kvadrat a², kvadrat b² in DVA pravokotnika ab. Zato je v sredini 2ab, ne ab."],
        pic: sqpic(),
        zv: "(a ± b)² = a² ± 2ab + b² &nbsp;&nbsp; a² − b² = (a − b)(a + b)<br>ax² + bx + c = a(x − x₁)(x − x₂), &nbsp;x₁,₂ = (−b ± √(b² − 4ac)) / 2a",
        ex: { q: `Okrajšaj ${fr("x² − 8x + 12", "2x² − 5x + 2")}. &nbsp;(vaje 1, 4a)`, steps: [
          "Števec: ničli 2 in 6 ⇒ (x − 2)(x − 6)",
          "Imenovalec: ničli 2 in ½ ⇒ 2(x − 2)(x − ½) = (x − 2)(2x − 1)",
          `${fr("(x − 2)(x − 6)", "(x − 2)(2x − 1)")} = ${fr("x − 6", "2x − 1")}`] },
        warn: "Krajšaš samo FAKTORJE (stvari, ki se množijo), nikoli členov (stvari, ki se seštevajo). (x + 2)/(x + 5) ne gre okrajšati v 2/5." },
      { h: "Koreni in racionalizacija",
        p: ["Koren je samo potenca: √a = a<sup>1/2</sup>, ∛a = a<sup>1/3</sup>. Zato veljajo ista pravila: √a · √b = √(ab).",
            "<b>Racionalizacija</b> pomeni: odstrani koren iz imenovalca. Zakaj? Ker 1/(√3 − 1) ne vidiš, koliko je, (√3 + 1)/2 pa takoj. Trik je formula (a − b)(a + b) = a² − b²: če imenovalec pomnožiš s »parom« (isti izraz z nasprotnim predznakom), kvadrat korene pobije."],
        zv: `√a · √b = √(ab) &nbsp;&nbsp; ${fr(1, "√a − b")} = ${fr("√a + b", "a − b²")} &nbsp;(pomnoži s parom √a + b)`,
        ex: { q: `Racionaliziraj ${fr(1, "√3 − 1")}. &nbsp;(vaje 1, 6a)`, steps: [
          `Par imenovalca je √3 + 1. Razširim: ${fr("1 · (√3 + 1)", "(√3 − 1)(√3 + 1)")}`,
          "Imenovalec: (√3)² − 1² = 3 − 1 = 2",
          `= ${fr("√3 + 1", 2)}`] } },
    ],
    tasks: [
      { q: "Poenostavi (25a⁻²b³)⁻¹ · (0,2ab⁻¹)⁻². &nbsp;(1b)", a: "1/b", steps: ["(25a⁻²b³)⁻¹ = a²b⁻³ / 25", "(0,2ab⁻¹)⁻² = 0,2⁻² · a⁻²b² = 25a⁻²b²", "skupaj: (1/25) · 25 · a⁰ · b⁻¹ = 1/b"] },
      { q: `Okrajšaj ${fr("16x² − 1", "16x² − 8x + 1")}. &nbsp;(4b)`, a: "(4x + 1)/(4x − 1)", steps: ["števec: (4x − 1)(4x + 1)", "imenovalec: (4x − 1)²", "pokrajšam en (4x − 1)"] },
      { q: "Poenostavi (√3 + √6)². &nbsp;(5a)", a: "9 + 6√2", steps: ["3 + 2√18 + 6", "√18 = √(9 · 2) = 3√2", "= 9 + 6√2"] },
      { q: "Poenostavi √(5 + √17) · √(5 − √17). &nbsp;(5b)", a: "2√2", steps: ["√((5 + √17)(5 − √17)) = √(25 − 17) = √8 = 2√2"] },
      { q: `Racionaliziraj ${fr("3√2 + 2√3", "3√2 − 2√3")}. &nbsp;(6b)`, a: "5 + 2√6", steps: ["pomnoži s parom 3√2 + 2√3", "števec: (3√2 + 2√3)² = 18 + 12√6 + 12 = 30 + 12√6", "imenovalec: 18 − 12 = 6", "(30 + 12√6)/6 = 5 + 2√6"] },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-mnozice", s: "mat", t: "mnozice", title: "Množice", vaje: "Vaje 2 · Množice",
    intro: "Množica je samo »vreča« stvari. Vsa matematika, ki pride, govori v jeziku množic (»za vse x iz ℝ«, »množica rešitev«), zato tukaj spoznaš ta jezik.",
    parts: [
      { h: "Kaj je množica in kako jo zapišemo",
        p: ["Množica je zbirka elementov. Vrstni red ni pomemben in ponavljanje ne šteje: {1, 2, 3} = {3, 1, 2} = {1, 1, 2, 3}.",
            "Lahko jo zapišeš na dva načina. <b>Naštevanje:</b> {2, 4, 6}. <b>S pogojem:</b> {x ∈ ℕ ; x je sod in x < 7}. Beri: »množica vseh x iz ℕ, za katere velja, da je x sod in manjši od 7«.",
            "Pozor na zapis {2n − 3 : n ∈ ℤ}: tu levo NI pogoj, ampak »kalup«. Beri: »vsa števila oblike 2n − 3, kjer n preteče cela števila«. Za n = 0, 1, 2, −1 … dobiš −3, −1, 1, −5 … torej vsa liha števila."],
        zv: "x ∈ A: x je element A &nbsp;&nbsp; x ∉ A: x ni element A<br>{ x ∈ A ; pogoj } = vsi x iz A, ki izpolnjujejo pogoj<br>{ f(n) ; n ∈ A } = vsa števila oblike f(n)<br>ℕ = {1, 2, 3, …} ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ",
        ex: { q: "Zapiši eksplicitno: {x ∈ ℕ : x² − 10x + 16 < 0}. &nbsp;(vaje 2, 1b)", steps: [
          "x² − 10x + 16 = (x − 2)(x − 8)",
          "Parabola je negativna med ničlama: 2 < x < 8",
          "x mora biti naravno: {3, 4, 5, 6, 7}"] } },
      { h: "Podmnožica",
        p: ["A ⊆ B pomeni: vsak element A je tudi v B. Kot da bi bila A vreča znotraj vreče B.",
            "Da DOKAŽEŠ A ⊆ B, vzameš poljuben element iz A in pokažeš, da je v B. Da OVRŽEŠ, najdeš en element A, ki ni v B (protiprimer)."],
        zv: "A ⊆ B ⇔ (∀x: x ∈ A ⇒ x ∈ B) &nbsp;&nbsp; A = B ⇔ A ⊆ B in B ⊆ A",
        ex: { q: "A = {(2n)² − 1 ; n ∈ ℕ}, B = {4n + 3 ; n ∈ ℕ ∪ {0}}. Je A ⊆ B? &nbsp;(vaje 2, 3b)", steps: [
          "Vzamem poljuben element A: (2n)² − 1 = 4n² − 1",
          "Zapišem ga v obliki 4m + 3: 4n² − 1 = 4(n² − 1) + 3",
          "m = n² − 1 ≥ 0 je celo število ⇒ element je v B. Torej A ⊆ B."] } },
      { h: "Operacije: unija, presek, razlika, komplement",
        p: ["Najlažje jih vidiš na Vennovem diagramu: krog A, krog B, okoli pa univerzalna množica U (vse, o čemer govorimo).",
            "<b>Unija</b> A ∪ B = »v A ALI v B« (vse, kar je vsaj v enem). <b>Presek</b> A ∩ B = »v A IN v B« (samo skupni del). <b>Razlika</b> A \\ B = »v A, ampak ne v B«. <b>Komplement</b> Aᶜ = »vse iz U, kar ni v A«."],
        pic: `<div class="vrow">${venn({ a: 1, ab: 1, b: 1 }, "A ∪ B")}${venn({ ab: 1 }, "A ∩ B")}${venn({ a: 1 }, "A \\ B")}${venn({ b: 1, o: 1 }, "Aᶜ")}</div>`,
        zv: "A ∪ B = {x ; x ∈ A ∨ x ∈ B} &nbsp;&nbsp; A ∩ B = {x ; x ∈ A ∧ x ∈ B}<br>A \\ B = {x ; x ∈ A ∧ x ∉ B} &nbsp;&nbsp; Aᶜ = U \\ A",
        ex: { q: "U = {1, …, 12}, A = {1, 2, 4, 7, 9, 11}, B = {2, 4, 5, 8, 9, 12}. Določi A ∪ B, A ∩ B, A \\ B, Aᶜ. &nbsp;(vaje 2, 5)", steps: [
          "A ∪ B: vse, kar je v vsaj eni = {1, 2, 4, 5, 7, 8, 9, 11, 12}",
          "A ∩ B: kar je v obeh = {2, 4, 9}",
          "A \\ B: iz A odstranim, kar je v B = {1, 7, 11}",
          "Aᶜ: kar od 1 do 12 manjka v A = {3, 5, 6, 8, 10, 12}"] } },
      { h: "Intervali so tudi množice",
        p: ["[0, 2] je množica vseh realnih števil od 0 do 2, vključno z robovoma. (−1, 1) brez robov. Operacije delaš enako, le da si jih narišeš na številski premici in pogledaš, kaj se prekriva."],
        pic: nl(-2, 3, [[0, 2, true, true]], [[-1], [0], [1], [2]], "#f2b84b") + nl(-2, 3, [[-1, 1, false, false]], [[-1], [0], [1], [2]], "#5ec2d6"),
        zv: "[a, b]: robova vključena (polna pika) &nbsp;&nbsp; (a, b): robova nista vključena (prazna pika)",
        ex: { q: "A = [0, 2], B = (−1, 1). Določi A ∪ B, A ∩ B, A \\ B, Aᶜ. &nbsp;(vaje 2, 4)", steps: [
          "A ∪ B: od −1 (ni vključen) do 2 (je) = (−1, 2]",
          "A ∩ B: kjer se prekrivata: od 0 (je v obeh) do 1 (ni v B) = [0, 1)",
          "A \\ B: iz [0, 2] odstranim (−1, 1); ostane [1, 2] (1 ni v B, zato ostane)",
          "Aᶜ = (−∞, 0) ∪ (2, ∞)"] } },
      { h: "De Morganova zakona",
        p: ["»Ni v (A ali B)« pomeni »ni v A IN ni v B«. Komplement obrne ∪ v ∩ in obratno. Na diagramih spodaj vidiš, da sta obarvana ista dela."],
        pic: `<div class="vrow">${venn({ o: 1 }, "(A ∪ B)ᶜ")}${venn({ o: 1 }, "Aᶜ ∩ Bᶜ")}</div>`,
        zv: "(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ &nbsp;&nbsp; (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ" },
      { h: "Kartezični produkt",
        p: ["A × B je množica vseh <b>parov</b> (a, b), kjer je a iz A in b iz B. Predstavljaj si mrežo: A na vodoravni osi, B na navpični, vsaka pika je en par. Če ima A 3 elemente in B 3, je pik 3 · 3 = 9.",
            "Vrstni red v paru JE pomemben: (1, 6) ≠ (6, 1)."],
        pic: grid([1, 3, 5], [6, 8, 12], "A \\ C", "D"),
        zv: "A × B = {(a, b) ; a ∈ A, b ∈ B} &nbsp;&nbsp; ℝ × ℝ = ℝ² (ravnina)",
        ex: { q: "A = {1, 2, 3, 4, 5}, C = {2, 4}, D = {6, 8, 12}. Zapiši (A \\ C) × D. &nbsp;(vaje 2, 7a)", steps: [
          "A \\ C = {1, 3, 5}",
          "Vsak element {1, 3, 5} sparim z vsakim iz D: (1, 6), (1, 8), (1, 12), (3, 6), (3, 8), (3, 12), (5, 6), (5, 8), (5, 12)"] } },
    ],
    tasks: [
      { q: "Zapiši eksplicitno: {2n − 3 : n ∈ ℤ}. &nbsp;(1a)", a: "{…, −3, −1, 1, 3, …} = vsa liha cela števila", steps: ["n = 0, 1, 2, −1, −2 … da −3, −1, 1, −5, −7 …"] },
      { q: "Zapiši eksplicitno: {n ∈ ℕ : n > 4 ⇒ 3n + 1 ≤ 20}. &nbsp;(1c)", a: "{1, 2, 3, 4, 5, 6}", steps: ["Implikacija je resnična, ko je levo napačno (n ≤ 4: 1, 2, 3, 4) ali desno resnično (3n + 1 ≤ 20 ⇒ n ≤ 6)", "skupaj n ≤ 6"] },
      { q: "Isti U, A, B kot zgoraj in C = {3, 7, 9, 10}. Določi (A ∩ Bᶜ) ∪ Cᶜ. &nbsp;(5)", a: "{1, 2, 4, 5, 6, 7, 8, 11, 12}", steps: ["Bᶜ = {1, 3, 6, 7, 10, 11}", "A ∩ Bᶜ = {1, 7, 11}", "Cᶜ = {1, 2, 4, 5, 6, 8, 11, 12}", "unija = {1, 2, 4, 5, 6, 7, 8, 11, 12}"] },
      { q: "U = ℕ, A = deljiva s 3, B = deljiva z 2, C = deljiva s 5. Določi A ∩ B in A \\ C. &nbsp;(6)", a: "A ∩ B = deljiva s 6 = {6, 12, 18, …}; A \\ C = deljiva s 3, ne s 5 = {3, 6, 9, 12, 18, …}", steps: ["deljivo z 2 IN s 3 ⇔ deljivo s 6", "pri A \\ C odstraniš 15, 30, 45 …"] },
      { q: "Z Vennovim diagramom pokaži (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.", a: "Obe strani pobarvata vse razen sredinskega dela.", steps: ["(A ∩ B)ᶜ: vse razen preseka", "Aᶜ ∪ Bᶜ: kar ni v A (vključno s »samo B«) + kar ni v B (vključno s »samo A«) = vse razen preseka"] },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-izjave", s: "mat", t: "mnozice", title: "Izjave in resničnostne tabele", vaje: "Vaje 3 · Logika (1. del)",
    intro: "Logika je slovnica matematike. Vsak »če … potem«, »za vsak«, »obstaja« v izrekih je logični veznik. Ko ga razumeš, »hieroglifi« postanejo navadni stavki.",
    parts: [
      { h: "Izjava ima vrednost 1 ali 0",
        p: ["Izjava je stavek, ki je resničen ali neresničen, nič vmes. »3 > 2« je izjava (resnična, 1). »5 je sodo« je izjava (neresnična, 0). »Zapri okno« NI izjava.",
            "Izjave označujemo s črkami a, b, c. Iz njih z vezniki gradimo večje izjave, kot iz kock."],
        zv: "1 = resnično &nbsp;&nbsp; 0 = neresnično &nbsp;&nbsp; P = izjava, ki je vedno resnična (tavtologija)" },
      { h: "Vezniki ¬, ∧, ∨, ⇔",
        p: ["<b>¬a</b> (ne a): obrne vrednost.",
            "<b>a ∧ b</b> (a in b): resnična samo, ko sta OBE resnični.",
            "<b>a ∨ b</b> (a ali b): resnična, ko je VSAJ ENA resnična. Pozor: v matematiki »ali« pomeni »ena ali druga ali obe«.",
            "<b>a ⇔ b</b> (a natanko tedaj, ko b): resnična, ko imata ENAKO vrednost."],
        pic: ttable(["a", "b"], [["¬a", a => !a], ["a ∧ b", (a, b) => a && b], ["a ∨ b", (a, b) => a || b], ["a ⇔ b", (a, b) => a === b]]),
        zv: "¬a: obrne &nbsp;&nbsp; a ∧ b: obe 1 &nbsp;&nbsp; a ∨ b: vsaj ena 1 &nbsp;&nbsp; a ⇔ b: enaki" },
      { h: "Implikacija ⇒: obljuba",
        p: ["a ⇒ b beri »če a, potem b«. Najlažje si jo predstavljaš kot <b>obljubo</b>: »Če bo sonce (a), grem na izlet (b).«",
            "Kdaj si obljubo PRELOMIL? Samo, če je bilo sonce in nisi šel. Če ni bilo sonca, nisi obljubil ničesar, karkoli narediš, je v redu. Zato je a ⇒ b napačna SAMO v vrstici a = 1, b = 0.",
            "To se zdi čudno (»iz napačnega sledi karkoli«), ampak je ključno: izrek »če je n deljiv s 4, je sod« velja za vse n, tudi za n = 7, kjer je levo napačno."],
        pic: ttable(["a", "b"], [["a ⇒ b", (a, b) => !a || b]]),
        zv: "a ⇒ b je 0 samo pri a = 1, b = 0 &nbsp;&nbsp; a ⇒ b ≡ ¬a ∨ b ≡ ¬b ⇒ ¬a",
        warn: "a ⇒ b NI isto kot b ⇒ a. »Če je deljivo s 4, je sodo« drži, »če je sodo, je deljivo s 4« ne (6)." },
      { h: "Resničnostna tabela: kako jo sestaviš",
        p: ["1. Za n spremenljivk je 2ⁿ vrstic (za a, b: 4 vrstice). Vrednosti napiši sistematično: 11, 10, 01, 00.",
            "2. Sestavljeno izjavo razbij na koščke in za vsak košček dodaj svoj stolpec, od najmanjšega do celote.",
            "3. Dve izjavi sta <b>enakovredni</b> (≡), če imata v zadnjem stolpcu enake vrednosti v vseh vrsticah."],
        zv: "2ⁿ vrstic &nbsp;&nbsp; stolpec za vsak košček &nbsp;&nbsp; enakovredni = enak zadnji stolpec",
        ex: { q: "Pokaži, da je (¬a ∨ b) ⇔ (a ⇒ b) vedno resnična. &nbsp;(vaje 3, 1e)", steps: [
          "Stolpci: ¬a, potem ¬a ∨ b, potem a ⇒ b, na koncu ⇔ med njima",
          ttable(["a", "b"], [["¬a", a => !a], ["¬a ∨ b", (a, b) => !a || b], ["a ⇒ b", (a, b) => !a || b], ["(¬a ∨ b) ⇔ (a ⇒ b)", () => true]]),
          "Zadnji stolpec so same 1 ⇒ tavtologija. Torej a ⇒ b ≡ ¬a ∨ b."] } },
      { h: "De Morgan za izjave",
        p: ["Enako kot pri množicah: ¬ obrne ∧ v ∨. »Ni res, da sem lačen IN utrujen« = »nisem lačen ALI nisem utrujen«."],
        zv: "¬(a ∧ b) ≡ ¬a ∨ ¬b &nbsp;&nbsp; ¬(a ∨ b) ≡ ¬a ∧ ¬b &nbsp;&nbsp; ¬(a ⇒ b) ≡ a ∧ ¬b" },
    ],
    tasks: [
      { q: "Resničnostna tabela za ¬b ⇒ ¬a. &nbsp;(1c)", a: ttable(["a", "b"], [["¬b ⇒ ¬a", (a, b) => b || !a]]) + "Enaka kot a ⇒ b (kontrapozicija)." },
      { q: "Resničnostna tabela za a ∧ (a ∧ b). &nbsp;(1d)", a: ttable(["a", "b"], [["a ∧ (a ∧ b)", (a, b) => a && b]]) + "Enaka kot a ∧ b." },
      { q: "Resničnostna tabela za (a ⇒ b) ⇒ (b ⇒ a) in poišči enostavnejšo enakovredno izjavo. &nbsp;(1f, 2)", a: ttable(["a", "b"], [["a ⇒ b", (a, b) => !a || b], ["b ⇒ a", (a, b) => !b || a], ["(a ⇒ b) ⇒ (b ⇒ a)", (a, b) => !(!a || b) || (!b || a)]]) + "Enaka kot b ⇒ a (ali a ∨ ¬b)." },
      { q: "Pokaži, da sta a ∨ b in ¬a ⇒ b enakovredni. &nbsp;(3a)", a: ttable(["a", "b"], [["a ∨ b", (a, b) => a || b], ["¬a ⇒ b", (a, b) => a || b]]) + "Stolpca sta enaka." },
      { q: "Pokaži, da je a ⇒ a ∨ b tavtologija (P). &nbsp;(3b)", a: ttable(["a", "b"], [["a ∨ b", (a, b) => a || b], ["a ⇒ a ∨ b", () => true]]) + "Same enice." },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-kvantifikatorji", s: "mat", t: "mnozice", title: "Kvantifikatorja ∀ in ∃", vaje: "Vaje 3 · Logika (2. del)",
    intro: "∀ in ∃ boš srečala v vsaki definiciji (limita, supremum, zveznost). Najtežji del je zanikanje, ki ga potrebuješ pri dokazih s protislovjem.",
    parts: [
      { h: "Za vsak in obstaja",
        p: ["<b>∀x: P(x)</b> beri »za vsak x velja P(x)«. Resnična je, ko P velja za ČISTO VSAK x. En sam protiprimer jo podre.",
            "<b>∃x: P(x)</b> beri »obstaja x, da velja P(x)«. Resnična je, ko najdeš VSAJ EN x. Ni pomembno, koliko jih je.",
            "Navadno povemo tudi, od kod je x: ∀x ∈ ℝ, ∃n ∈ ℕ."],
        zv: "∀x ∈ A: P(x) — vsak element A ima lastnost P<br>∃x ∈ A: P(x) — vsaj en element A ima lastnost P",
        ex: { q: "Z besedami: ∀x ∈ ℝ ∃y ∈ ℝ : y > x. &nbsp;(vaje 3, 5b)", steps: [
          "»Za vsako realno število x obstaja realno število y, ki je večje od x.«",
          "Drugače povedano: ne obstaja največje realno število."] } },
      { h: "Vrstni red je pomemben",
        p: ["∀x ∃y: y > x pravi »za vsak x si lahko izbereš SVOJ y« (y je odvisen od x). Resnično: vzami y = x + 1.",
            "∃y ∀x: y > x pravi »obstaja EN y, ki je večji od vseh x«, torej največje realno število. Neresnično.",
            "Ista simbola, zamenjan vrstni red, popolnoma drug pomen."],
        zv: "∀x ∃y ≠ ∃y ∀x",
        warn: "Kvantifikatorjev različnih vrst ne smeš zamenjati. Enaka (∀∀ ali ∃∃) lahko." },
      { h: "Zanikanje: obrni kvantifikator, zanikaj notranjost",
        p: ["»Ni res, da so VSI labodi beli« pomeni »OBSTAJA labod, ki ni bel«. Ni treba, da so vsi črni, dovolj je en protiprimer.",
            "»Ni res, da OBSTAJA zelen labod« pomeni »VSI labodi so nezeleni«.",
            "Pravilo: zamenjaš ∀ ↔ ∃ in zanikaš, kar je za dvopičjem. Če je notri implikacija, uporabiš ¬(a ⇒ b) ≡ a ∧ ¬b."],
        zv: "¬(∀x: P(x)) ≡ ∃x: ¬P(x) &nbsp;&nbsp; ¬(∃x: P(x)) ≡ ∀x: ¬P(x)<br>¬(a ⇒ b) ≡ a ∧ ¬b",
        ex: { q: "Zapiši in zanikaj: »Vsi ljudje, ki ne nosijo očal, nosijo kape.« &nbsp;(vaje 3, 4a)", steps: [
          "O(x) = x nosi očala, K(x) = x nosi kapo. Izjava: ∀x: ¬O(x) ⇒ K(x)",
          "Zanikanje: ∃x: ¬(¬O(x) ⇒ K(x))",
          "¬(a ⇒ b) ≡ a ∧ ¬b ⇒ ∃x: ¬O(x) ∧ ¬K(x)",
          "»Obstaja človek, ki ne nosi niti očal niti kape.«"] } },
    ],
    tasks: [
      { q: "Zapiši in zanikaj: »Za vsak x ∈ ℝ obstaja tak y ∈ ℝ, da je x = 2y.« &nbsp;(4e)", a: "∀x ∈ ℝ ∃y ∈ ℝ: x = 2y. &nbsp;Zanikanje: ∃x ∈ ℝ ∀y ∈ ℝ: x ≠ 2y. (Prvotna je resnična: y = x/2.)" },
      { q: "Zapiši in zanikaj: »Za vsaj eno število a iz A velja, da je a² v B.« &nbsp;(4c)", a: "∃a ∈ A: a² ∈ B. &nbsp;Zanikanje: ∀a ∈ A: a² ∉ B." },
      { q: "Zapiši in zanikaj: »Za vsako celo število velja: če je deljivo s 6, je deljivo z 2 in s 3.« &nbsp;(4d)", a: "∀n ∈ ℤ: (6 | n ⇒ 2 | n ∧ 3 | n). &nbsp;Zanikanje: ∃n ∈ ℤ: 6 | n ∧ (2 ∤ n ∨ 3 ∤ n).", steps: ["¬(a ⇒ b) ≡ a ∧ ¬b", "¬(2 | n ∧ 3 | n) ≡ 2 ∤ n ∨ 3 ∤ n (De Morgan)"] },
      { q: "Zapiši: »Za vsak ε > 0 obstaja N ∈ ℕ, da za vsak n > N velja 1/n < ε.« &nbsp;(4f) &nbsp;To je definicija limite 1/n → 0!", a: "∀ε > 0 ∃N ∈ ℕ ∀n ∈ ℕ: (n > N ⇒ 1/n < ε). &nbsp;Zanikanje: ∃ε > 0 ∀N ∈ ℕ ∃n ∈ ℕ: n > N ∧ 1/n ≥ ε." },
      { q: "Z besedami: ∀x ∈ ℝ ∀y ∈ ℝ: (xy = 0 ⇒ x = 0 ∨ y = 0). &nbsp;(5c)", a: "Če je produkt dveh realnih števil 0, je vsaj eno od njiju 0." },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-la-matrike", s: "la", t: "preslikave", title: "Matrike in linearne preslikave ℝ² → ℝ²", vaje: "Predavanje 19. 10. · izpitno vprašanje 2",
    intro: "Linearna preslikava je pravilo, ki ravnino »preoblikuje«: zavrti, raztegne, zrcali, nagne. Matrika je samo zapis tega pravila v štirih številih. Ko to enkrat vidiš na sliki, je vse ostalo (množenje, inverz, determinanta) logično.",
    parts: [
      { h: "Kaj je matrika in kako računamo z njo",
        p: ["m × n matrika je tabela števil z m vrsticami in n stolpci. Najprej vedno povemo vrstice, potem stolpce.",
            "<b>Seštevanje</b> in <b>množenje s skalarjem</b> gresta po elementih, kot pri vektorjih. Seštevaš lahko samo matriki enakih dimenzij.",
            "<b>Transponirana</b> matrika Aᵀ: vrstice postanejo stolpci. Prva vrstica postane prvi stolpec."],
        zv: `A = ${M2("a₁₁", "a₁₂", "a₂₁", "a₂₂")} &nbsp;&nbsp; aᵢⱼ = element v i-ti vrstici, j-tem stolpcu<br>(A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ &nbsp;&nbsp; (λA)ᵢⱼ = λaᵢⱼ &nbsp;&nbsp; (Aᵀ)ᵢⱼ = aⱼᵢ`,
        ex: { q: `Aᵀ za A = ${mx([[1, 2, 3], [4, 5, 6]])}`, steps: [`A je 2 × 3, Aᵀ je 3 × 2: ${mx([[1, 4], [2, 5], [3, 6]])}`] } },
      { h: "Množenje matrik: vrstica × stolpec",
        p: ["Element produkta AB v i-ti vrstici in j-tem stolpcu dobiš tako, da vzameš <b>i-to vrstico A</b> in <b>j-ti stolpec B</b>, zmnožiš istoležne in sešteješ. Tako kot skalarni produkt.",
            "Zato mora biti vrstica A enako dolga kot stolpec B: (m × <b>n</b>) · (<b>n</b> × p) = m × p. Notranji števili se morata ujemati."],
        zv: "(AB)ᵢⱼ = i-ta vrstica A · j-ti stolpec B &nbsp;&nbsp; (m × n)(n × p) = m × p<br>AB ≠ BA (v splošnem) &nbsp;&nbsp; AI = IA = A",
        ex: { q: `${M2(1, 2, 0, 1)} · ${M2(3, 0, 1, 2)}`, steps: [
          "1. vrstica × 1. stolpec: 1 · 3 + 2 · 1 = 5; &nbsp;1. vrstica × 2. stolpec: 1 · 0 + 2 · 2 = 4",
          "2. vrstica × 1. stolpec: 0 · 3 + 1 · 1 = 1; &nbsp;2. vrstica × 2. stolpec: 0 · 0 + 1 · 2 = 2",
          `AB = ${M2(5, 4, 1, 2)}. &nbsp;Obratno BA = ${M2(3, 6, 1, 4)}, torej AB ≠ BA.`] },
        warn: "Vrstni red pri množenju je pomemben: AB in BA sta navadno različni." },
      { h: "Linearna preslikava",
        p: ["Preslikava T: ℝ² → ℝ² vsaki točki (vektorju) priredi novo točko. <b>Linearna</b> je, če »spoštuje« seštevanje in množenje s skalarjem: slika vsote je vsota slik, slika dvakrat daljšega vektorja je dvakrat daljša.",
            "Posledica: T(0) = 0, saj T(0) = T(0 · v) = 0 · T(v) = 0. Če preslikava premakne izhodišče, ni linearna. To je najhitrejši test.",
            "Geometrijsko: premice ostanejo premice, vzporedne ostanejo vzporedne, izhodišče ostane na mestu. Mreža se le nagne, raztegne ali zavrti."],
        zv: "T je linearna ⇔ T(u + v) = T(u) + T(v) in T(λv) = λT(v)<br>posledica: T(0) = 0",
        ex: { q: "Je T(x, y) = (x + 1, y) linearna?", steps: ["T(0, 0) = (1, 0) ≠ (0, 0) ⇒ NI linearna (premakne izhodišče)."] } },
      { h: "Matrika preslikave: kam gresta e₁ in e₂",
        p: ["To je najpomembnejša ideja. Vsak vektor je (x, y) = x · e₁ + y · e₂, kjer e₁ = (1, 0) in e₂ = (0, 1). Zaradi linearnosti je T(x, y) = x · T(e₁) + y · T(e₂). Torej: <b>če veš, kam gresta e₁ in e₂, veš vse.</b>",
            "Zato matriko preslikave sestaviš tako, da v <b>prvi stolpec</b> zapišeš T(e₁), v <b>drugi stolpec</b> T(e₂). Na sliki: črtkani kvadrat se preslika v modri paralelogram, njegovi stranici sta ravno stolpca matrike."],
        pic: `<div class="vrow">${mapPic(2, 1, 0, 1, "A = [[2, 1], [0, 1]] · nagib")}${mapPic(0, -1, 1, 0, "[[0, −1], [1, 0]] · rotacija 90°")}${mapPic(1, 0, 0, -1, "[[1, 0], [0, −1]] · zrcaljenje čez x")}${mapPic(1, 0, 0, 0, "[[1, 0], [0, 0]] · projekcija na x")}</div>`,
        zv: `[T] = [ T(e₁) &nbsp;T(e₂) ] (stolpca!) &nbsp;&nbsp; T(x, y) = [T] ${mx([["x"], ["y"]])}<br>v izbrani bazi ima T natanko eno matriko; v drugi bazi drugo`,
        ex: { q: "Matrika preslikave T(x, y) = (2x − y, x + 3y)", steps: [
          "T(e₁) = T(1, 0) = (2, 1) → prvi stolpec",
          "T(e₂) = T(0, 1) = (−1, 3) → drugi stolpec",
          `[T] = ${M2(2, -1, 1, 3)}. Hitreje: koeficienti pri x v prvi stolpec, pri y v drugi.`] } },
      { h: "Kompozitum = produkt matrik",
        p: ["Če najprej narediš T in nato S, je skupna preslikava S ∘ T. Njena matrika je [S] · [T]. Pozor na vrstni red: kar narediš <b>prvo</b>, je <b>desno</b>, ker matrika deluje na vektor z leve: S(T(v)) = [S][T]v.",
            "Zato množenje matrik ni komutativno: »najprej zavrti, potem zrcali« ni isto kot »najprej zrcali, potem zavrti«."],
        zv: "[S ∘ T] = [S] · [T] &nbsp;&nbsp; (najprej T, zato je T desno)",
        ex: { q: "Najprej rotacija za 90°, nato zrcaljenje čez os x.", steps: [
          `[S][T] = ${M2(1, 0, 0, -1)} · ${M2(0, -1, 1, 0)} = ${M2(0, -1, -1, 0)}`,
          "Preverba: e₁ = (1, 0) → rotacija → (0, 1) → zrcaljenje → (0, −1). To je prvi stolpec ✓"] } },
      { h: "Obrnljivost in determinanta",
        p: ["Preslikava je <b>obrnljiva</b>, če jo lahko »razveljaviš«. Projekcija na x os ni obrnljiva: točki (3, 1) in (3, 5) se preslikata v isto (3, 0), in iz (3, 0) ne veš, od kod si prišel.",
            "<b>Determinanta</b> pove, kolikokrat se poveča ploščina: enotski kvadrat (ploščina 1) se preslika v paralelogram s ploščino |det A|. Če je det A = 0, se ravnina sploščí v premico ali točko, in tega ne moreš razveljaviti.",
            "Za T: ℝ² → ℝ² so naslednje trditve enakovredne: T je injektivna ⇔ T je surjektivna ⇔ ker T = {0} ⇔ det A ≠ 0 ⇔ A je obrnljiva. Pri preslikavi ravnine nase je torej dovolj preveriti eno."],
        zv: `det ${M2("a", "b", "c", "d")} = ad − bc &nbsp;&nbsp; A⁻¹ = ${fr(1, "ad − bc")} ${M2("d", "−b", "−c", "a")} (obstaja ⇔ det ≠ 0)<br>T: ℝ² → ℝ²: injektivna ⇔ surjektivna ⇔ det ≠ 0<br>ker T = {v ; T(v) = 0}, &nbsp;im T = {T(v)}`,
        ex: { q: `Inverz ${M2(3, 1, 5, 2)}`, steps: [
          "det = 3 · 2 − 1 · 5 = 1 ≠ 0 ⇒ obrnljiva",
          `zamenjaj diagonalo, spremeni predznak izven nje, deli z det: ${M2(2, -1, -5, 3)}`,
          `Preverba: ${M2(3, 1, 5, 2)} · ${M2(2, -1, -5, 3)} = ${M2(1, 0, 0, 1)} ✓`] } },
    ],
    tasks: [
      { q: `Izračunaj ${M2(1, 2, 3, 4)} · ${M2(0, 1, 1, 0)}. Kaj desna matrika naredi s stolpci?`, a: `${M2(2, 1, 4, 3)}: zamenja stolpca.` },
      { q: `Je ${M2(2, 4, 1, 2)} obrnljiva?`, a: "Ne: det = 4 − 4 = 0. Stolpca (2, 1) in (4, 2) sta kolinearna, ravnina se sploščí v premico." },
      { q: "Matrika projekcije na os x. Kaj sta jedro in slika?", a: `${M2(1, 0, 0, 0)}; ker = os y (vse točke (0, y) gredo v 0), im = os x. det = 0, ni obrnljiva.` },
      { q: "Teoretično: zakaj ima vsaka linearna preslikava T(0) = 0?", a: "T(0) = T(0 · v) = 0 · T(v) = 0 (linearnost za skalar 0)." },
      { q: "Teoretično: koliko matrik lahko priredimo dani linearni preslikavi?", a: "V vsaki izbrani bazi natanko eno. Ker baz je neskončno, je matrik neskončno, vse pa so med seboj povezane s prehodno matriko: B = P⁻¹AP." },
      { q: "T(x, y) = (4x − 2y, x + y) (K1 2025): matrika, je obrnljiva, inverz?", a: `[T] = ${M2(4, -2, 1, 1)}, det = 6 ≠ 0 ⇒ obrnljiva, T⁻¹ = ${fr(1, 6)} ${M2(1, 2, -1, 4)}`, steps: ["koeficienti pri x: (4, 1), pri y: (−2, 1)", "det = 4 · 1 − (−2) · 1 = 6"] },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-realna", s: "mat", t: "supinf", title: "Realna števila: Dedekindov aksiom, gostota, absolutna vrednost", vaje: "Predavanje 20. 10. · zapiski 2.4 · vaje 5",
    intro: "Zakaj sploh rabimo realna števila, če imamo ulomke? Ker imajo ulomki »luknje«: √2 ni ulomek. Realna števila so ulomki z zakrpanimi luknjami. Dedekindov aksiom je točno ta zakrpanost, zapisana z eno poved.",
    parts: [
      { h: "Luknje v ℚ: √2 ni ulomek",
        p: ["Diagonala kvadrata s stranico 1 je dolga √2 (Pitagora). Če to dolžino preneseš na številsko premico, pristaneš na točki, ki ni noben ulomek.",
            "Dokaz s protislovjem: recimo √2 = m/n, okrajšan ulomek. Potem 2n² = m², zato je m sod, m = 2k. Vstavimo: 2n² = 4k², n² = 2k², zato je tudi n sod. Ampak okrajšan ulomek ne more imeti sodega števca IN sodega imenovalca. Protislovje."],
        zv: "√2 ∉ ℚ (dokaz: m/n okrajšan ⇒ m in n soda ⇒ protislovje)<br>iracionalna števila = realna števila, ki niso ulomki (√2, π, e …)" },
      { h: "Dedekindov aksiom",
        p: ["Spomni se: <b>supremum</b> množice je najmanjša zgornja meja. Za množico {1/2, 2/3, 3/4, …} je to 1.",
            "<b>Dedekindov aksiom:</b> vsaka neprazna, navzgor omejena množica realnih števil ima supremum v ℝ. Povedano preprosto: v ℝ ni lukenj, vsaka »stena«, h kateri se množica približuje, je realno število.",
            "V ℚ to NE velja. Množica A = {q ∈ ℚ ; q² ≤ 2} vsebuje ulomke 1, 1,4, 1,41, 1,414 … ki se plazijo proti √2. Njena najmanjša zgornja meja je √2, ki pa ni ulomek. V ℚ torej A nima supremuma."],
        pic: seqline([1, 1.4, 1.41, 1.414, 1.3, 1.2, 1.38, 1.4142], 0.9, 1.6, [[Math.SQRT2, "√2 ∉ ℚ", true]]),
        zv: "Dedekindov aksiom: vsaka neprazna navzgor omejena A ⊂ ℝ ima sup A ∈ ℝ<br>(isto za navzdol omejeno in inf)<br>v ℚ ne velja: A = {q ∈ ℚ ; q² ≤ 2}, sup A = √2 ∉ ℚ",
        ex: { q: "Posledica: ℕ ni navzgor omejena (Arhimedova lastnost).", steps: [
          "Recimo, da je. Po Dedekindu ima supremum M = sup ℕ.",
          "M − 1 ni več zgornja meja, zato obstaja m ∈ ℕ z m > M − 1.",
          "Potem m + 1 > M, a m + 1 ∈ ℕ. Protislovje z M = zgornja meja."] } },
      { h: "Gostota: ulomki in iracionalna števila so povsod",
        p: ["<b>Gostota ℚ:</b> v vsakem intervalu (a, b), pa naj bo še tako majhen, je racionalno število. Ideja dokaza: izberi n tako velik, da je korak 1/n manjši od dolžine intervala. Ko po premici skačeš s koraki 1/n (0, 1/n, 2/n, …), ne moreš preskočiti intervala, ker je korak krajši od njega.",
            "<b>Gostota iracionalnih:</b> tudi iracionalno število je v vsakem intervalu. Ključ: racionalno + iracionalno = iracionalno. Zato če najdeš ulomek q v (a − √2, b − √2), je q + √2 iracionalen in leži v (a, b).",
            "Posledica: v vsakem intervalu je NESKONČNO obojih (interval razdeliš na pol in ponoviš)."],
        zv: "V vsakem (a, b) obstaja racionalno IN iracionalno število<br>q ∈ ℚ, x ∉ ℚ ⇒ q + x ∉ ℚ in qx ∉ ℚ (q ≠ 0)<br>iracionalno + iracionalno je lahko racionalno: √2 + (−√2) = 0",
        ex: { q: "Najdi racionalno in iracionalno število med 0 in 1/100.", steps: [
          "racionalno: 1/200 (sredina)",
          "iracionalno: √2/200 ≈ 0,00707 (racionalno × iracionalno je iracionalno)"] } },
      { h: "Decimalni zapis",
        p: ["Vsako realno število ima decimalni zapis. Ulomki so natanko tista števila, katerih zapis je <b>končen</b> (1/4 = 0,25) ali <b>periodičen</b> (1/3 = 0,333…). Iracionalna števila imajo neskončen neperiodičen zapis (√2 = 1,41421356…).",
            "Periodično decimalno število spremeniš v ulomek s trikom: pomnoži z 10ᵏ, da se perioda poravna, in odštej, da perioda izgine.",
            "Presenečenje: 0,999… = 1. Če x = 0,999…, je 10x = 9,999…, odštejemo: 9x = 9, x = 1. Ni »malo manj kot 1«, je natanko 1."],
        zv: "ℚ ⇔ končen ali periodičen decimalni zapis<br>periodično → ulomek: 10ᵏx − x odstrani periodo &nbsp;&nbsp; 0,999… = 1",
        ex: { q: "Zapiši 0,121212… kot ulomek.", steps: [
          "x = 0,1212…, perioda ima 2 števki ⇒ 100x = 12,1212…",
          "100x − x = 12 ⇒ 99x = 12",
          `x = ${fr(12, 99)} = ${fr(4, 33)}`] } },
      { h: "Intervali in okolica",
        p: ["Interval je množica vseh realnih števil med dvema mejama. Oglati oklepaj [ pomeni »meja je vključena«, okrogli ( pomeni »ni«. Pri ∞ je oklepaj vedno okrogel, ker ∞ ni število.",
            "<b>ε-okolica</b> točke a je interval (a − ε, a + ε): vse točke, ki so od a oddaljene manj kot ε. To boš rabila pri limitah."],
        pic: nl(-1, 5, [[0.5, 3.5, false, false]], [[0.5, "a − ε"], [2, "a"], [3.5, "a + ε"]], "#5ec2d6"),
        zv: "[a, b] = {x ; a ≤ x ≤ b} &nbsp; (a, b) = {x ; a < x < b} &nbsp; [a, ∞) = {x ; x ≥ a}<br>ε-okolica: (a − ε, a + ε) = {x ; |x − a| < ε}" },
      { h: "Absolutna vrednost = razdalja",
        p: ["|x| je razdalja števila x od 0. Zato nikoli ni negativna. Formalno: |x| = x, če je x ≥ 0, in |x| = −x, če je x < 0 (minus negativnega števila je pozitivno).",
            "Ključni pogled: <b>|x − a| je razdalja med x in a</b>. Potem neenačbe postanejo slike: |x − 2| < 3 pomeni »x je od 2 oddaljen manj kot 3«, torej −1 < x < 5. Brez računanja.",
            "Trikotniška neenakost |x + y| ≤ |x| + |y|: ko seštevaš števila z različnima predznakoma, se deloma pokrajšata, zato je rezultat manjši."],
        pic: nl(-3, 7, [[-1, 5, false, false]], [[-1], [2, "2"], [5]], "#f2b84b"),
        zv: `|x| = x (x ≥ 0), −x (x < 0) &nbsp;&nbsp; |x − a| = razdalja med x in a<br>|xy| = |x||y| &nbsp; |−x| = |x| &nbsp; |x + y| ≤ |x| + |y|<br>|x − a| < r ⇔ a − r < x < a + r`,
        ex: { q: "Reši |x − 1| > 1/4. &nbsp;(vaje 5, 9a)", steps: [
          "»x je od 1 oddaljen VEČ kot 1/4«",
          "levo od 1 − 1/4 = 3/4 ali desno od 1 + 1/4 = 5/4",
          "x ∈ (−∞, 3/4) ∪ (5/4, ∞)"] } },
    ],
    tasks: [
      { q: "Naj bo q ≠ 0 racionalno in x iracionalno. Dokaži, da je q + x iracionalno. &nbsp;(vaje 5, 1)", a: "Če bi bil q + x = r racionalen, bi bil x = r − q racionalen (razlika ulomkov je ulomek). Protislovje.", steps: ["dokaz s protislovjem", "predpostavi nasprotno in pridi do x ∈ ℚ"] },
      { q: "A = {(2n − 1)/(2n + 1) ; n ∈ ℕ}: sup, inf, max, min. &nbsp;(vaje 5, 4a)", a: "inf A = min A = 1/3, sup A = 1, max A ne obstaja.", steps: [`${fr("2n − 1", "2n + 1")} = 1 − ${fr(2, "2n + 1")}: narašča`, "n = 1 da 1/3, nato se bliža 1"] },
      { q: "B = {1 + x² ; x ∈ (−1, 3]}: sup, inf, max, min. &nbsp;(vaje 5, 5)", a: "B = [1, 10]: min = inf = 1 (x = 0), max = sup = 10 (x = 3).", steps: ["x² na (−1, 3] zavzame vse vrednosti od 0 (pri x = 0) do 9 (pri x = 3)"] },
      { q: "Reši |x + 1| = 3. &nbsp;(7a)", a: "x ∈ {−4, 2}", steps: ["»razdalja od −1 je 3«: −1 − 3 = −4 ali −1 + 3 = 2"] },
      { q: "Reši |x − 1| = |2x + 2|. &nbsp;(7b)", a: "x ∈ {−3, −1/3}", steps: ["x − 1 = 2x + 2 ⇒ x = −3", "x − 1 = −(2x + 2) ⇒ 3x = −1 ⇒ x = −1/3"] },
      { q: "Zapiši 0,272727… kot ulomek.", a: "3/11", steps: ["100x − x = 27 ⇒ x = 27/99 = 3/11"] },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-la-injsurj", s: "la", t: "preslikave", title: "Injektivnost, surjektivnost, jedro in slika", vaje: "Predavanje 20. 10. · izpitno vprašanje 2",
    intro: "Danes ste veliko delali injektivnost in surjektivnost. To sta samo dve vprašanji o preslikavi: »ali kdaj dve točki zadeneta isto?« in »ali zadenem vse?«. Pri linearnih preslikavah na to odgovori jedro in slika.",
    parts: [
      { h: "Injektivna, surjektivna, bijektivna: na puščicah",
        p: ["Predstavljaj si preslikavo kot puščice iz leve množice v desno. Vsaka točka levo ima natanko eno puščico.",
            "<b>Injektivna</b>: nobeni dve puščici ne zadeneta iste točke. Različne točke gredo na različna mesta.",
            "<b>Surjektivna</b>: vsaka točka desno je zadeta (vsaj enkrat).",
            "<b>Bijektivna</b>: oboje. Takrat lahko puščice obrneš: to je inverz."],
        pic: `<div class="vrow">${arrows(["1", "2", "3"], ["a", "b", "c", "d"], [[0, 0], [1, 1], [2, 3]], "injektivna, ne surjektivna")}${arrows(["1", "2", "3"], ["a", "b"], [[0, 0], [1, 1], [2, 1]], "surjektivna, ne injektivna")}${arrows(["1", "2", "3"], ["a", "b", "c"], [[0, 1], [1, 2], [2, 0]], "bijektivna")}</div>`,
        zv: "injektivna: T(u) = T(v) ⇒ u = v (različni gredo v različne)<br>surjektivna: vsak w ima neki v, da T(v) = w<br>bijektivna = injektivna + surjektivna ⇔ obstaja inverz" },
      { h: "Jedro in slika",
        p: ["<b>Jedro</b> ker T so vsi vektorji, ki se preslikajo v 0. Iščeš ga tako, da rešiš T(v) = 0, torej sistem Av = 0.",
            "<b>Slika</b> im T so vsi vektorji, ki jih T zadene. Napenjajo jo stolpci matrike (vsak T(v) je kombinacija stolpcev).",
            "Primer projekcije na os x: vsa os y se zmečka v 0 (jedro = os y), zadene pa samo os x (slika = os x)."],
        zv: "ker T = {v ; T(v) = 0} → reši Av = 0<br>im T = {T(v)} = napenjajo jo stolpci A",
        ex: { q: `Jedro in slika za A = ${M2(1, 2, 2, 4)}`, steps: [
          "ker: x + 2y = 0 (druga vrstica je dvakratnik prve) ⇒ v = t(−2, 1): premica",
          "im: stolpca (1, 2) in (2, 4) sta kolinearna ⇒ im = premica skozi (1, 2)",
          "det = 4 − 4 = 0: ravnina se zmečka v premico"] } },
      { h: "Ključ: injektivna ⇔ jedro je samo 0",
        p: ["Pri linearnih preslikavah ni treba preverjati vseh parov točk. Dovolj je pogledati, kaj gre v 0.",
            "Zakaj: T(u) = T(v) ⇔ T(u) − T(v) = 0 ⇔ T(u − v) = 0 ⇔ u − v ∈ ker T. Če je v jedru samo 0, mora biti u − v = 0, torej u = v."],
        zv: "T linearna: T injektivna ⇔ ker T = {0}<br>dokaz: T(u) = T(v) ⇔ T(u − v) = 0",
        warn: "To velja samo za LINEARNE preslikave. Za f(x) = x² je f⁻¹(0) = {0}, pa vseeno ni injektivna (f(−1) = f(1))." },
      { h: "Za ℝ² → ℝ²: vse je eno",
        p: ["Velja dim ker T + dim im T = 2 (toliko, kot je dimenzija začetnega prostora). Kar se »izgubi« v jedru, manjka v sliki.",
            "Če je jedro samo {0} (dimenzija 0), je slika dimenzije 2, torej cela ravnina. Zato pri preslikavi ravnine nase injektivna ⇔ surjektivna ⇔ det ≠ 0. Preveriš eno, dobiš vse."],
        zv: "dim ker T + dim im T = dim začetnega prostora<br>T: ℝ² → ℝ²: injektivna ⇔ surjektivna ⇔ ker T = {0} ⇔ det A ≠ 0 ⇔ obrnljiva" },
      { h: "Ko dimenziji nista enaki",
        p: ["ℝ² → ℝ³: ravnino ne moreš raztegniti čez cel prostor, zato <b>nikoli ni surjektivna</b>, lahko pa je injektivna. Primer: T(x, y) = (x, y, x + y).",
            "ℝ³ → ℝ²: prostor stlačiš v ravnino, nekaj se mora zmečkati, zato <b>nikoli ni injektivna</b>, lahko pa je surjektivna. Primer: T(x, y, z) = (x, y), jedro je os z."],
        zv: "ℝⁿ → ℝᵐ, n < m: ni surjektivna &nbsp;&nbsp; n > m: ni injektivna" },
    ],
    tasks: [
      { q: "Je T(x, y) = (x + y, x − y) bijektivna?", a: "Da: det = −1 − 1 = −2 ≠ 0.", steps: [`A = ${M2(1, 1, 1, -1)}`] },
      { q: "T(x, y) = (x − y, 2y − 2x): jedro in slika.", a: "ker T = {t(1, 1)}, im T = {s(1, −2)}. Ni ne injektivna ne surjektivna.", steps: ["T(x, y) = (x − y) · (1, −2)", "v 0 gre natanko, ko x = y"] },
      { q: "T(x, y) = (x, y, x + y): injektivna? surjektivna?", a: "Injektivna (T(x, y) = 0 ⇒ x = y = 0), ne surjektivna (npr. (0, 0, 1) ni zadet: ker iz prvih dveh x = y = 0 sledi tretja 0)." },
      { q: "T(x, y, z) = (x, y): jedro? surjektivna?", a: "ker T = os z = {(0, 0, t)}, surjektivna (vsak (a, b) je T(a, b, 0)), ni injektivna." },
      { q: "Teoretično: zakaj je linearna T injektivna natanko tedaj, ko je ker T = {0}?", a: "T(u) = T(v) ⇔ T(u − v) = 0 ⇔ u − v ∈ ker T. Če je ker T = {0}, sledi u = v. Obratno: če bi bil v ≠ 0 v jedru, bi bil T(v) = T(0), torej ne injektivna." },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-fiz-sile", s: "fiz", t: "newton", title: "Aktivnost 2: kam kaže vsota sil? (žogica na silomeru)", vaje: "Vaje 20. 10. · Aktivnost 2 · Etkina, 3. poglavje",
    intro: "Testiramo, kako so sile povezane z gibanjem. Večina ljudi intuitivno misli »sila kaže tja, kamor se telo giblje« (hipoteza 1). Poskus s silomerom pokaže, da to ni res, in iz tega dobiš 2. Newtonov zakon.",
    parts: [
      { h: "Hipotezi, ki ju testiramo",
        p: ["<b>Hipoteza 1:</b> smer hitrosti telesa vedno kaže v smeri vsote sil na telo.",
            "<b>Hipoteza 2:</b> smer spremembe hitrosti vedno kaže v smeri vsote sil na telo.",
            "Ena trdi, da sila »vleče« telo v smeri gibanja. Druga, da sila <i>spreminja</i> gibanje: pospešuje, zavira ali obrača."],
        zv: "H1: v ∥ ΣF &nbsp;&nbsp; H2: Δv ∥ ΣF" },
      { h: "Poskus in sile na žogico",
        p: ["Žogico obesimo na silomer. Silomer z žogico iz mirovanja dvignemo navpično navzgor in ga spet ustavimo. Silomer meri, s kolikšno silo vleče žogico, v odvisnosti od časa.",
            "<b>Sistem</b> je žogica. Nanjo delujeta dve sili: <b>teža</b> mg (Zemlja, navzdol) in <b>sila silomera</b> F<sub>S na Ž</sub> (navzgor). Vsota sil je F<sub>S na Ž</sub> − mg (os y navzgor).",
            "Zato: če je F<sub>S</sub> > mg, vsota sil kaže GOR; če je F<sub>S</sub> = mg, je vsota 0; če je F<sub>S</sub> < mg, kaže DOL."],
        zv: "sistem: žogica &nbsp;&nbsp; sili: teža mg (dol), F<sub>S na Ž</sub> (gor)<br>ΣF<sub>y</sub> = F<sub>S na Ž</sub> − mg" },
      { h: "Diagram gibanja",
        p: ["Žogica gre od mirovanja gor in se spet ustavi. Zato so pike na diagramu gibanja najprej vse bolj narazen (pospešuje), potem enako narazen (stalna hitrost), na koncu spet vse bližje (zavira). Hitrost ves čas kaže GOR.",
            "Sprememba hitrosti Δv pa kaže GOR samo na začetku, na sredini je 0, na koncu kaže DOL (hitrost se zmanjšuje)."],
        pic: motiondiag(),
        zv: "pospeševanje: Δv gor &nbsp;&nbsp; stalna v: Δv = 0 &nbsp;&nbsp; zaviranje: Δv dol<br>hitrost v ves čas gor" },
      { h: "Diagram sil v treh fazah",
        p: ["Dolžina puščice = velikost sile. Zraven sta hitrost v in sprememba hitrosti Δv. Primerjaj smer vsote sil z obema."],
        pic: `<div class="vrow">${fdiag(5, 3.5, "pospešuje gor", "up", "up")}${fdiag(3.5, 3.5, "stalna hitrost", "up", "")}${fdiag(2, 3.5, "zavira (še gre gor)", "up", "down")}</div>`,
        zv: "ΣF gor → F<sub>S</sub> > mg &nbsp; ΣF = 0 → F<sub>S</sub> = mg &nbsp; ΣF dol → F<sub>S</sub> < mg" },
      { h: "Napoved grafov F(t) iz obeh hipotez",
        p: ["<b>Po hipotezi 1:</b> dokler se žogica giblje, hitrost kaže gor, zato bi morala vsota sil kazati gor, torej F<sub>S</sub> > mg <i>ves čas gibanja</i>. Ko miruje, F<sub>S</sub> = mg.",
            "<b>Po hipotezi 2:</b> vsota sil sledi Δv: pri pospeševanju F<sub>S</sub> > mg, pri stalni hitrosti F<sub>S</sub> = mg, pri zaviranju F<sub>S</sub> <b>< mg</b>.",
            "Razlika je na koncu: H2 napove <b>padec pod mg</b>, medtem ko se žogica še giblje gor. H1 tega padca ne napove."],
        pic: `<div class="vrow">${fgraph(1, "napoved hipoteze 1")}${fgraph(2, "napoved hipoteze 2")}</div>`,
        zv: "H1: F > mg ves čas gibanja &nbsp;&nbsp; H2: F > mg, nato = mg, nato < mg<br>meritev pokaže padec pod mg ⇒ H1 ovržena, H2 preživi" },
      { h: "Rezultat in kaj iz tega sledi",
        p: ["Silomer na koncu res pokaže manj kot mg, čeprav se žogica še dviga. Hipoteza 1 je s tem <b>ovržena</b> (en nasproten poskus je dovolj). Hipoteza 2 je <b>preživela</b> test.",
            "Iz H2 sledi <b>2. Newtonov zakon:</b> a = ΣF/m, pospešek (v smeri Δv) kaže v smeri vsote sil.",
            "Iz srednje faze sledi <b>1. Newtonov zakon:</b> ΣF = 0 pomeni »hitrost se ne spreminja«, ne pa »telo miruje«."],
        zv: "ΣF = ma (a v smeri Δv in ΣF)<br>ΣF = 0 ⇔ v = konst",
        warn: "Hipotezo ovrže en sam poskus, ki ji nasprotuje. Potrdi je ne more noben: preživi samo vse teste doslej.",
        ex: { q: "Žogica 0,5 kg, pospešek pri dvigu 2 m/s² navzgor. Kaj kaže silomer? (g = 9,8 m/s²)", steps: [
          "F<sub>S</sub> − mg = ma",
          "F<sub>S</sub> = m(g + a) = 0,5 · 11,8 = 5,9 N",
          "pri stalni hitrosti 4,9 N; pri zaviranju z 2 m/s²: 0,5 · (9,8 − 2) = 3,9 N"] } },
    ],
    tasks: [
      { q: "Žogica visi na silomeru pri miru. Kaj kaže silomer?", a: "mg (vsota sil 0, ker se hitrost ne spreminja)." },
      { q: "Žogico na silomeru spuščaš navzdol in jo na koncu ustaviš. Nariši napoved F(t) po H2.", a: "Začetek (pospešuje dol, Δv dol): F < mg. Stalna hitrost: F = mg. Zaviranje (Δv gor): F > mg." },
      { q: "Žogico vržeš navzgor. Katere sile delujejo nanjo, ko je že v zraku?", a: "Samo teža mg navzdol. Hitrost gor, Δv dol: to je še en poskus, ki ovrže H1." },
      { q: "Dvigalo se giblje navzgor in se ustavlja. Je tvoja »teža« na tehtnici večja ali manjša od mg?", a: "Manjša: enako kot konec poskusa s silomerom (Δv dol ⇒ N < mg)." },
      { q: "Pri dvigu silomer pokaže največ 5,9 N in najmanj 3,9 N, v mirovanju 4,9 N. Kolikšna sta pospešek in pojemek? (g = 9,8 m/s²)", a: "m = 0,5 kg; a = (5,9 − 4,9)/0,5 = 2 m/s² gor; pri zaviranju (4,9 − 3,9)/0,5 = 2 m/s² dol.", steps: ["m = 4,9 N / 9,8 m/s² = 0,5 kg", "a = (F − mg)/m"] },
    ] },
];
