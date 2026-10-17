// ─────────────────────────────────────────────────────────────
//  snou — vsebina. To datoteko urejaš ti.
//  • subjects: predmeti (barva, datumi kolokvijev)
//  • topics:   teme (id mora biti unikaten)
//  • links:    povezave [id1, id2, "zakaj sta povezani"]
// ─────────────────────────────────────────────────────────────

const SUBJECTS = [
  { id: "mat", name: "Matematika 1", color: "#f2b84b",
    exams: ["2026-11-16", "2027-01-19", "2027-04-06", "2027-05-31"] },
  { id: "la", name: "Linearna algebra", color: "#5ec2d6",
    exams: ["2026-11-26", "2027-01-11"] },
  { id: "fiz", name: "Fizika 1", color: "#e8665a",
    exams: ["2026-12-02", "2027-01-25", "2027-03-30", "2027-06-03"] },
  { id: "fp", name: "Fizikalni praktikum", color: "#b08ae6", exams: [] },
  { id: "rp", name: "Računalniški praktikum", color: "#7fcf86", exams: [] },
];

const TOPICS = [
  // Matematika 1
  { id: "mnozice",   s: "mat", name: "Množice in izjave",       note: "Logični vezniki, kvantifikatorji, operacije z množicami." },
  { id: "indukcija", s: "mat", name: "Naravna števila, indukcija", note: "Dokaz z matematično indukcijo." },
  { id: "realna",    s: "mat", name: "Realna števila",          note: "Supremum, infimum, absolutna vrednost, neenačbe." },
  { id: "kompleksna",s: "mat", name: "Kompleksna števila",      note: "Algebraična in polarna oblika, Eulerjeva formula." },
  { id: "zaporedja", s: "mat", name: "Zaporedja",               note: "Konvergenca, monotonost, omejenost." },
  { id: "vrste",     s: "mat", name: "Vrste",                   note: "Geometrijska vrsta, kriteriji konvergence." },
  { id: "limita",    s: "mat", name: "Limita funkcije",         note: "Limita v točki, enostranske limite." },
  { id: "zveznost",  s: "mat", name: "Zveznost",                note: "Zvezne funkcije, izrek o vmesni vrednosti." },
  { id: "odvod",     s: "mat", name: "Odvod",                   note: "Definicija, pravila odvajanja, verižno pravilo." },
  { id: "uporaba",   s: "mat", name: "Uporaba odvoda",          note: "Ekstremi, L'Hôpital, potek funkcije." },
  { id: "taylor",    s: "mat", name: "Taylorjeva vrsta",        note: "Aproksimacija funkcije s polinomom." },
  { id: "integral",  s: "mat", name: "Integral",                note: "Nedoločeni in določeni integral, ploščina." },

  // Linearna algebra
  { id: "vektorji",  s: "la", name: "Vektorji v R³",            note: "Seštevanje, množenje s skalarjem, koordinate." },
  { id: "skalarni",  s: "la", name: "Skalarni produkt",         note: "a·b = |a||b|cos φ, pravokotnost, projekcija." },
  { id: "vektorski", s: "la", name: "Vektorski produkt",        note: "a×b je pravokoten na oba, |a×b| = ploščina." },
  { id: "mesani",    s: "la", name: "Mešani produkt",           note: "(a×b)·c = prostornina paralelepipeda." },
  { id: "premice",   s: "la", name: "Premice in ravnine",       note: "Parametrična in normalna oblika, razdalje." },
  { id: "matrike",   s: "la", name: "Matrike",                  note: "Množenje, transponiranje, inverz." },
  { id: "sistemi",   s: "la", name: "Sistemi linearnih enačb",  note: "Gaussova eliminacija, rang, rešljivost." },
  { id: "determinante", s: "la", name: "Determinante",          note: "Razvoj po vrstici, lastnosti, Cramer." },
  { id: "prostori",  s: "la", name: "Vektorski prostori",       note: "Podprostori, baza, dimenzija." },
  { id: "preslikave",s: "la", name: "Linearne preslikave",      note: "Jedro, slika, matrika preslikave." },
  { id: "lastne",    s: "la", name: "Lastne vrednosti",         note: "Av = λv, karakteristični polinom." },

  // Fizika 1
  { id: "kinematika",s: "fiz", name: "Kinematika",              note: "Lega, hitrost, pospešek; v = dx/dt." },
  { id: "newton",    s: "fiz", name: "Newtonovi zakoni",        note: "F = ma, sile kot vektorji." },
  { id: "delo",      s: "fiz", name: "Delo in energija",        note: "A = ∫F·ds, kinetična in potencialna energija." },
  { id: "gibalna",   s: "fiz", name: "Gibalna količina",        note: "p = mv, ohranitev, trki." },
  { id: "vrtenje",   s: "fiz", name: "Vrtenje togega telesa",   note: "Navor M = r×F, vztrajnostni moment." },
  { id: "statika",   s: "fiz", name: "Statika",                 note: "Ravnovesje: vsota sil in navorov je nič." },
  { id: "gravitacija",s:"fiz", name: "Gravitacija",             note: "Newtonov gravitacijski zakon, orbite." },
  { id: "nihanje",   s: "fiz", name: "Nihanje",                 note: "Harmonično nihanje, dušenje, resonanca." },
  { id: "valovanje", s: "fiz", name: "Valovanje",               note: "Valovna enačba, interferenca." },
  { id: "tekocine",  s: "fiz", name: "Tekočine",                note: "Tlak, vzgon, Bernoullijeva enačba." },

  // Fizikalni praktikum
  { id: "napake",    s: "fp", name: "Merske napake",            note: "Absolutna, relativna napaka, propagacija." },
  { id: "grafi",     s: "fp", name: "Grafi in prilagajanje",    note: "Linearna regresija, naklon, odsek." },
  { id: "porocila",  s: "fp", name: "Poročila",                 note: "Struktura poročila, popravki." },

  // Računalniški praktikum
  { id: "terminal",  s: "rp", name: "Ukazna vrstica",           note: "Osnovni ukazi, datoteke, poti." },
  { id: "git",       s: "rp", name: "Git",                      note: "commit, push, pull, veje." },
  { id: "python",    s: "rp", name: "Python osnove",            note: "Spremenljivke, zanke, funkcije." },
  { id: "numpy",     s: "rp", name: "NumPy in Matplotlib",      note: "Tabele, računanje, risanje grafov." },
  { id: "latex",     s: "rp", name: "LaTeX",                    note: "Pisanje formul in dokumentov." },
];

const LINKS = [
  // znotraj matematike
  ["mnozice", "indukcija", "Logika je osnova dokazov"],
  ["realna", "zaporedja", "Supremum ↔ konvergenca monotonih zaporedij"],
  ["zaporedja", "vrste", "Vrsta je zaporedje delnih vsot"],
  ["zaporedja", "limita", "Limita funkcije prek zaporedij"],
  ["limita", "zveznost", "Zveznost = limita je enaka vrednosti"],
  ["limita", "odvod", "Odvod je limita diferenčnega kvocienta"],
  ["odvod", "uporaba", "Ekstremi iz ničel odvoda"],
  ["odvod", "taylor", "Koeficienti so odvodi"],
  ["vrste", "taylor", "Taylorjeva vrsta je vrsta"],
  ["odvod", "integral", "Osnovni izrek analize"],
  // znotraj LA
  ["vektorji", "skalarni", ""],
  ["vektorji", "vektorski", ""],
  ["skalarni", "mesani", ""],
  ["vektorski", "mesani", ""],
  ["skalarni", "premice", "Normala ravnine"],
  ["matrike", "sistemi", "Sistem zapišemo kot Ax = b"],
  ["sistemi", "determinante", "det ≠ 0 ⇔ enolična rešitev"],
  ["mesani", "determinante", "Mešani produkt je determinanta 3×3"],
  ["prostori", "preslikave", ""],
  ["matrike", "preslikave", "Vsaka linearna preslikava je matrika"],
  ["determinante", "lastne", "det(A − λI) = 0"],
  // matematika ↔ LA
  ["kompleksna", "lastne", "Lastne vrednosti so lahko kompleksne"],
  ["mnozice", "prostori", "Podprostor je množica z lastnostmi"],
  // matematika ↔ fizika
  ["odvod", "kinematika", "v = dx/dt, a = dv/dt"],
  ["integral", "kinematika", "x = ∫v dt"],
  ["integral", "delo", "A = ∫F ds"],
  ["taylor", "nihanje", "Majhni odmiki: sin x ≈ x"],
  ["kompleksna", "nihanje", "Nihanje kot e^{iωt}"],
  ["uporaba", "statika", "Stabilno ravnovesje = minimum energije"],
  ["integral", "vrtenje", "Vztrajnostni moment J = ∫r² dm"],
  ["odvod", "valovanje", "Valovna enačba z odvodi"],
  // LA ↔ fizika
  ["vektorji", "kinematika", "Lega in hitrost sta vektorja"],
  ["vektorji", "newton", "Sile seštevamo kot vektorje"],
  ["skalarni", "delo", "A = F·s"],
  ["vektorski", "vrtenje", "Navor M = r × F"],
  ["sistemi", "statika", "Ravnovesje sil = sistem enačb"],
  ["lastne", "nihanje", "Sklopljena nihanja → lastni načini"],
  ["vektorji", "gibalna", "p = mv je vektor"],
  // fizika znotraj
  ["kinematika", "newton", ""],
  ["newton", "delo", ""],
  ["newton", "gibalna", "F = dp/dt"],
  ["delo", "gibalna", "Trki: ohranitev energije in gibalne količine"],
  ["newton", "gravitacija", ""],
  ["newton", "nihanje", "F = −kx"],
  ["nihanje", "valovanje", ""],
  ["vrtenje", "statika", ""],
  ["delo", "tekocine", "Bernoulli je ohranitev energije"],
  // praktikum
  ["odvod", "napake", "Propagacija napak z odvodi"],
  ["napake", "grafi", ""],
  ["grafi", "porocila", ""],
  ["napake", "porocila", ""],
  ["sistemi", "grafi", "Linearna regresija = sistem enačb"],
  ["numpy", "grafi", "Grafi za poročila"],
  ["latex", "porocila", "Poročilo v LaTeX-u"],
  ["numpy", "matrike", "Matrike v NumPy"],
  ["terminal", "git", ""],
  ["python", "numpy", ""],
  ["kinematika", "grafi", "x(t) graf iz meritev"],
  ["nihanje", "grafi", "Merjenje nihajnega časa"],
];
