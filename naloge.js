// ─────────────────────────────────────────────────────────────
//  snou — pretekli kolokviji in izpiti.
//  PAPERS: vsak kolokvij/izpit in katere teme so bile v nalogah
//  PROBLEMS: natančno prepisane naloge (zaenkrat 1. kolokviji)
// ─────────────────────────────────────────────────────────────

const fr = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;

const PAPERS = [
  // Matematika 1 — 1. kolokvij
  { id: "m-k1-20", s: "mat", k: 1, label: "K1", year: "2020/21", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-21", s: "mat", k: 1, label: "K1", year: "2021/22", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-22", s: "mat", k: 1, label: "K1", year: "2022/23", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-23", s: "mat", k: 1, label: "K1", year: "2023/24", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-24", s: "mat", k: 1, label: "K1", year: "2024/25", tasks: [["indukcija"], ["kompleksna"], ["absolutna"], ["supinf"]] },
  { id: "m-k1-25", s: "mat", k: 1, label: "K1", year: "2025/26", tasks: [["indukcija"], ["kompleksna"], ["absolutna"], ["funkcije"]] },
  // 2. kolokvij
  { id: "m-k2-20", s: "mat", k: 2, label: "K2", year: "2020/21", tasks: [["zaporedja"], ["zaporedja"], ["vrste"], ["uporaba", "funkcije"]] },
  { id: "m-k2-21", s: "mat", k: 2, label: "K2", year: "2021/22", tasks: [["funkcije"], ["zaporedja"], ["zaporedja"], ["vrste"]] },
  { id: "m-k2-22", s: "mat", k: 2, label: "K2", year: "2022/23", tasks: [["funkcije"], ["zaporedja"], ["zaporedja"], ["vrste"]] },
  { id: "m-k2-23", s: "mat", k: 2, label: "K2", year: "2023/24", tasks: [["funkcije"], ["zaporedja"], ["zaporedja"], ["vrste"]] },
  { id: "m-k2-24", s: "mat", k: 2, label: "K2", year: "2024/25", tasks: [["zaporedja"], ["zaporedja"], ["vrste"], ["limita"]] },
  // 3. kolokvij
  { id: "m-k3-20", s: "mat", k: 3, label: "K3", year: "2020/21", tasks: [["limita"], ["zveznost", "odvod"], ["uporaba"], ["uporaba"]] },
  { id: "m-k3-21", s: "mat", k: 3, label: "K3", year: "2021/22", tasks: [["zveznost", "odvod"], ["odvod"], ["limita", "uporaba"], ["uporaba"], ["uporaba"]] },
  // izpiti
  { id: "m-i1-20", s: "mat", k: 9, label: "Izpit", year: "2020/21", tasks: [["kompleksna"], ["uporaba", "funkcije"], ["uporaba"], ["taylor"]] },
  { id: "m-i1-22", s: "mat", k: 9, label: "Izpit", year: "2022/23", tasks: [["kompleksna", "limita"], ["zaporedja", "indukcija"], ["uporaba"], ["integral"]] },
  { id: "m-i2-25", s: "mat", k: 9, label: "Izpit", year: "avg 2026", tasks: [["zaporedja", "vrste"], ["uporaba"], ["taylor"], ["integral"]] },
  { id: "m-i3-25", s: "mat", k: 9, label: "Izpit", year: "sep 2026", tasks: [["taylor", "zaporedja"], ["uporaba", "odvod"], ["integral"], ["vrste"]] },
];

const PROBLEMS = [
  // ── 2020/21 ──
  { paper: "m-k1-20", n: 1, t: "indukcija", text: `Dokaži, da za vsako naravno število n velja<br>2² + 5² + 8² + ⋯ + (3n − 1)² = ${fr(1, 2)} n(6n² + 3n − 1).` },
  { paper: "m-k1-20", n: 2, t: "absolutna", text: `Reši enačbo |2x² − 8| = |x² − x − 6|.` },
  { paper: "m-k1-20", n: 3, t: "kompleksna", text: `Določi vse kompleksne rešitve enačbe z⁶ + 7z³ = 8 in jih nariši v kompleksni ravnini.` },
  { paper: "m-k1-20", n: 4, t: "supinf", text: `Dana je množica A = { ${fr("3n + 2", "n + 1")} ; n ∈ ℕ }. Ugotovi, katere od količin min A, inf A, max A in sup A obstajajo, ter jih določi.` },
  // ── 2021/22 ──
  { paper: "m-k1-21", n: 1, t: "indukcija", text: `Dokaži, da je za vsako naravno število n izraz n³ + 11n deljiv s 6.` },
  { paper: "m-k1-21", n: 2, t: "absolutna", text: `Določi vsa realna števila x, ki zadoščajo pogoju |x² + 3x| − 2x ≤ |1 − 3x| + 4.` },
  { paper: "m-k1-21", n: 3, t: "kompleksna", text: `Dano je kompleksno število w = ${fr("a + i", "a − i")}, kjer je a realno število. Poišči realni in imaginarni del števila w ter njegovo absolutno vrednost. Nato za a = ${fr(1, "√3")} določi vse rešitve z enačbe z⁵ − 3z⁴w − zw + 3w² = 0.` },
  { paper: "m-k1-21", n: 4, t: "supinf", text: `Dana je množica A = { 1 + ${fr("2 + (−1)ⁿ", "n")} : n ∈ ℕ }. Ugotovi, katere od količin min A, inf A, max A in sup A obstajajo, ter jih določi.` },
  // ── 2022/23 ──
  { paper: "m-k1-22", n: 1, t: "indukcija", text: `Dokaži, da za vsak n ≥ 3 velja 4<sup>n−1</sup> > n².` },
  { paper: "m-k1-22", n: 2, t: "absolutna", text: `Določi vsa realna števila x, ki zadoščajo neenačbi ||3x − 1| − 2|x + 2|| + x > 1.` },
  { paper: "m-k1-22", n: 3, t: "kompleksna", text: `V kompleksnih številih reši enačbo (${fr("z − 1", "i")})³ − (−1 + i)⁶ = 0.` },
  { paper: "m-k1-22", n: 4, t: "supinf", text: `Dana je množica A = { −${fr(1, "n")} + 2${fr("n² − 1", "n²")} : n ∈ ℕ }. Ugotovi, katere od količin min A, inf A, max A in sup A obstajajo, ter jih določi.` },
  // ── 2023/24 ──
  { paper: "m-k1-23", n: 1, t: "indukcija", text: `Dokaži, da je za vsako število n ∈ ℕ izraz 2<sup>2n+1</sup> − 9n² + 3n − 2 deljiv s 27.` },
  { paper: "m-k1-23", n: 2, t: "absolutna", text: `Določi vsa realna števila x, ki zadoščajo neenačbi |x² + 3x + 2| + |x + 2| > 2x² + x.` },
  { paper: "m-k1-23", n: 3, t: "kompleksna", text: `V kompleksnih številih reši enačbo z⁶ + 2iz³ + 3 = 0. Rešitve nariši v kompleksni ravnini.` },
  { paper: "m-k1-23", n: 4, t: "supinf", text: `Dana je množica A = { ${fr("8n + 2", "4n − 1")} ; n ∈ ℕ }. Ugotovi, katere od količin min A, inf A, max A in sup A obstajajo, ter jih določi.` },
  // ── 2024/25 ──
  { paper: "m-k1-24", n: 1, t: "indukcija", text: `Dokaži, da je za vsako naravno število n število 15<sup>n+1</sup> − 8ⁿ deljivo s 7.` },
  { paper: "m-k1-24", n: 2, t: "kompleksna", text: `Poišči vsa kompleksna števila z, za katera je z² + 2z̄ = −1.` },
  { paper: "m-k1-24", n: 3, t: "absolutna", text: `Poišči vse rešitve neenačbe |1 + x − |1 − x|| ≥ 2.` },
  { paper: "m-k1-24", n: 4, t: "supinf", text: `Naj bo M = { 3 + (−1)ⁿ ${fr("n − 3", "5 + n")} ; n ∈ ℕ }. Določi sup(M), inf(M), max(M), min(M).` },
  // ── 2025/26 ──
  { paper: "m-k1-25", n: 1, t: "indukcija", text: `Dokaži, da je za vsako naravno število n število 23<sup>n+1</sup> − 12ⁿ deljivo z 11.` },
  { paper: "m-k1-25", n: 2, t: "kompleksna", text: `Poišči vsa kompleksna števila z, za katera je z² = |z|²(i + 1) − 8.` },
  { paper: "m-k1-25", n: 3, t: "absolutna", text: `Poišči vse rešitve neenačbe |x − 2|1 − x|| ≤ 1.` },
  { paper: "m-k1-25", n: 4, t: "funkcije", text: `Naj bo f(x) = ${fr("x + 2", "1 − 3x")}. Določi naravno definicijsko območje in zalogo vrednosti funkcije f ter zapiši njen inverz.` },
];

// ─────────────────────────────────────────────────────────────
//  GRADIVO: kje je tema v zapiskih (z) in na katerih vajah (v) — samo za orientacijo
// ─────────────────────────────────────────────────────────────
const GRADIVO = {
  mnozice:   [{ z: "1. Množice in izjave"}, { v: "Množice"}, { v: "Logika in izjavni račun"}],
  indukcija: [{ z: "2.1 Naravna števila"}, { v: "Matematična indukcija"}],
  absolutna: [{ z: "2.4 Realna števila"}, { v: "Števila (absolutna vrednost)"}, { v: "Ponavljanje"}, { v: "Ponavljanje (krajše)"}],
  supinf:    [{ z: "2.4 Realna števila"}, { v: "Števila (sup, inf)"}],
  kompleksna:[{ z: "2.5 Kompleksna števila"}, { v: "Kompleksna števila"}],
  funkcije:  [{ z: "3. Preslikave"}, { z: "6. Realne funkcije"}, { v: "Funkcije"}, { v: "Elementarne funkcije"}],
  zaporedja: [{ z: "4. Zaporedja"}, { v: "Zaporedja"}, { v: "Zaporedja, dodatno"}],
  vrste:     [{ z: "5. Številske vrste"}, { v: "Številske vrste"}],
  limita:    [{ z: "7.1 Limita funkcije"}, { v: "Limite in zveznost"}],
  zveznost:  [{ z: "7.4 Zveznost"}, { v: "Limite in zveznost"}],
  odvod:     [{ z: "8. Odvod"}, { v: "Odvod"}],
  uporaba:   [{ z: "8.6 Ekstremi"}, { z: "8.9 Risanje grafov"}, { v: "Odvod"}],
  integral:  [{ z: "9. Nedoločeni integral"}, { z: "10. Določeni integral"}, { v: "Nedoločeni integral"}, { v: "Določeni integral"}],
  taylor:    [{ z: "11.4 Taylorjeva vrsta"}, { v: "Taylorjeva vrsta"}],
};

// ─────────────────────────────────────────────────────────────
//  FIZIKA 1 — knjiga: Etkina, Planinšič, Van Heuvelen, College Physics: Explore and Apply (2. izd.)
//  Oznake nalog: CP-CH2/P24 = poglavje 2, problem 24 · CP/E2.5 = primer 2.5
// ─────────────────────────────────────────────────────────────
PAPERS.push(
  { id: "f-v-1006", s: "fiz", k: 0, label: "Vaje", year: "6. okt", tasks: [["kinematika"], ["kinematika"], ["kinematika"]] },
  { id: "f-v-1008", s: "fiz", k: 0, label: "Vaje", year: "8. okt", tasks: [["kinematika"], ["kinematika"], ["uvod"]] },
);

const tbl = rows => `<table class="dt"><tr><th>čas (s)</th><th>lega (m)</th></tr>${rows.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</table>`;

PROBLEMS.push(
  { paper: "f-v-1006", n: 1, t: "kinematika", code: "CP-CH2/P24", text: `Tabela prikazuje podatke o položaju in času vašega sprehoda po ravni poti.${tbl([[0, 80], [10, 40], [20, 0], [30, -40], [40, -80], [50, -120]])}(a) Povejte vse, kar lahko o sprehodu. Določite koordinatni sistem.<br>(b) Narišite diagram gibanja, narišite graf x(t) in zapišite funkcijo x(t), ki je skladna s podatki in izbranim koordinatnim sistemom.` },
  { paper: "f-v-1006", n: 2, t: "kinematika", code: "CP-CH2/P33", text: `Graf predstavlja štiri različna gibanja <i>(graf je v PDF)</i>.<br>(a) Zapišite funkcijo x(t) za vsako gibanje.<br>(b) Uporabite informacije z grafa, da določite čim več količin, povezanih z gibanjem predmetov.<br>(c) Z dvema prijateljema uprizorite ta gibanja. <i>Namig: pomislite, kaj je vsak predmet počel pri t = 0.</i>` },
  { paper: "f-v-1006", n: 3, t: "kinematika", text: `Ana in Bojan se igrata z avtomobilčkoma, ki se gibljeta s konstantno hitrostjo: Anin s hitrostjo 0,6 m/s, Bojanov s 0,4 m/s. Sta vsak na svojem koncu sobe, med sabo oddaljena 4 m, ko izpustita avtomobilčka po isti progi tako, da se zaletita. Kje in kdaj bo prišlo do »nesreče«?<br>a) Določi izhodišče koordinatnega sistema in nariši skico.<br>b) Z diagramom gibanja in grafom x(t) predstavi gibanje obeh avtomobilčkov.<br>c) Nalogo reši še računsko.` },
  { paper: "f-v-1008", n: 1, t: "kinematika", code: "CP/E2.5", text: `Mlajša sestra teče s hitrostjo 2,0 m/s proti blatni luži, ki je 6,0 m pred njo. Ti tečeš s hitrostjo 5,0 m/s, da jo ujameš, preden skoči v blato. Si 10 m za njo. Ali jo bo treba okopati?<br>a) Določi izhodišče koordinatnega sistema in nariši skico.<br>b) Z diagramom gibanja in grafom x(t) predstavi gibanje tebe in tvoje mlajše sestre.<br>c) Nalogo reši še računsko.` },
  { paper: "f-v-1008", n: 2, t: "kinematika", code: "CP-CH2/P15", text: `Ugrabljena bankirka, ki gleda skozi režo v oknu kombija, šteje svoje srčne utripe in opazi, da dva izvoza avtoceste prevozijo v 80 utripih. Ve, da je razdalja med izvozoma 1,6 km (1 milja).<br>(a) Ocenite hitrost kombija.<br>(b) Izberite in opišite koordinatni sistem ter narišite graf lege v odvisnosti od časa za kombi.` },
  { paper: "f-v-1008", n: 3, t: "uvod", code: "CP-CH2/P20", text: `Svetloba v vakuumu potuje s hitrostjo 3,0 · 10⁸ m/s. Približna razdalja med Zemljo in Soncem je 150 · 10⁶ km. Koliko časa potrebuje svetloba, da pripotuje od Sonca do Zemlje? Kakšne so meje, znotraj katerih poznate odgovor?` },
);

// knjiga: poglavje za vsako temo fizike + zapiski in vaje
Object.assign(GRADIVO, {
  kinematika: [{ z: "Predavanje: kinematika (tabla)"},
               { v: "Vaje 6. okt"}, { v: "Vaje 8. okt"}],
  uvod:       [{ v: "Vaje 8. okt"}],
});
