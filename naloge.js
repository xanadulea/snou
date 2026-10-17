// ─────────────────────────────────────────────────────────────
//  snou — pretekli kolokviji in izpiti.
//  PAPERS: vsak kolokvij/izpit in katere teme so bile v nalogah
//  PROBLEMS: natančno prepisane naloge (zaenkrat 1. kolokviji)
// ─────────────────────────────────────────────────────────────

const fr = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;

const PAPERS = [
  // Matematika 1 — 1. kolokvij
  { id: "m-k1-20", s: "mat", pdf: "gradivo/matematika1/kolokvij1_2020_21.pdf", k: 1, label: "K1", year: "2020/21", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-21", s: "mat", pdf: "gradivo/matematika1/kolokvij1_2021_22.pdf", k: 1, label: "K1", year: "2021/22", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-22", s: "mat", pdf: "gradivo/matematika1/kolokvij1_2022_23.pdf", k: 1, label: "K1", year: "2022/23", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-23", s: "mat", pdf: "gradivo/matematika1/kolokvij1_2023_24.pdf", k: 1, label: "K1", year: "2023/24", tasks: [["indukcija"], ["absolutna"], ["kompleksna"], ["supinf"]] },
  { id: "m-k1-24", s: "mat", pdf: "gradivo/matematika1/kolokvij1_2024_25.pdf", k: 1, label: "K1", year: "2024/25", tasks: [["indukcija"], ["kompleksna"], ["absolutna"], ["supinf"]] },
  { id: "m-k1-25", s: "mat", pdf: "gradivo/matematika1/kolokvij1_2025_26.pdf", k: 1, label: "K1", year: "2025/26", tasks: [["indukcija"], ["kompleksna"], ["absolutna"], ["funkcije"]] },
  // 2. kolokvij
  { id: "m-k2-20", s: "mat", pdf: "gradivo/matematika1/kolokvij2_2020_21.pdf", k: 2, label: "K2", year: "2020/21", tasks: [["zaporedja"], ["zaporedja"], ["vrste"], ["uporaba", "funkcije"]] },
  { id: "m-k2-21", s: "mat", pdf: "gradivo/matematika1/kolokvij2_2021_22.pdf", k: 2, label: "K2", year: "2021/22", tasks: [["funkcije"], ["zaporedja"], ["zaporedja"], ["vrste"]] },
  { id: "m-k2-22", s: "mat", pdf: "gradivo/matematika1/kolokvij2_2022_23.pdf", k: 2, label: "K2", year: "2022/23", tasks: [["funkcije"], ["zaporedja"], ["zaporedja"], ["vrste"]] },
  { id: "m-k2-23", s: "mat", pdf: "gradivo/matematika1/kolokvij2_2023_24.pdf", k: 2, label: "K2", year: "2023/24", tasks: [["funkcije"], ["zaporedja"], ["zaporedja"], ["vrste"]] },
  { id: "m-k2-24", s: "mat", pdf: "gradivo/matematika1/kolokvij2_2024_25.pdf", k: 2, label: "K2", year: "2024/25", tasks: [["zaporedja"], ["zaporedja"], ["vrste"], ["limita"]] },
  // 3. kolokvij
  { id: "m-k3-20", s: "mat", pdf: "gradivo/matematika1/kolokvij3_2020_21.pdf", k: 3, label: "K3", year: "2020/21", tasks: [["limita"], ["zveznost", "odvod"], ["uporaba"], ["uporaba"]] },
  { id: "m-k3-21", s: "mat", pdf: "gradivo/matematika1/kolokvij3_2021_22.pdf", k: 3, label: "K3", year: "2021/22", tasks: [["zveznost", "odvod"], ["odvod"], ["limita", "uporaba"], ["uporaba"], ["uporaba"]] },
  // izpiti
  { id: "m-i1-20", s: "mat", pdf: "gradivo/matematika1/izpit1_2020_21.pdf", k: 9, label: "Izpit", year: "2020/21", tasks: [["kompleksna"], ["uporaba", "funkcije"], ["uporaba"], ["taylor"]] },
  { id: "m-i1-22", s: "mat", pdf: "gradivo/matematika1/izpit1_2022_23.pdf", k: 9, label: "Izpit", year: "2022/23", tasks: [["kompleksna", "limita"], ["zaporedja", "indukcija"], ["uporaba"], ["integral"]] },
  { id: "m-i2-25", s: "mat", pdf: "gradivo/matematika1/izpit2_2025_26.pdf", k: 9, label: "Izpit", year: "avg 2026", tasks: [["zaporedja", "vrste"], ["uporaba"], ["taylor"], ["integral"]] },
  { id: "m-i3-25", s: "mat", pdf: "gradivo/matematika1/izpit3_2025_26.pdf", k: 9, label: "Izpit", year: "sep 2026", tasks: [["taylor", "zaporedja"], ["uporaba", "odvod"], ["integral"], ["vrste"]] },
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
