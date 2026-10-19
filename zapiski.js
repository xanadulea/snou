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
];
