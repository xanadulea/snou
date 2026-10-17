// ─────────────────────────────────────────────────────────────
//  snou — podteme: kaj je znotraj vsake teme.
//  Vsako podtemo lahko označiš: znam / ne znam / vprašaj Claude.
// ─────────────────────────────────────────────────────────────

const SUB = {
  // ── Matematika 1 ──
  mnozice: ["Množice in podmnožice", "Unija, presek, razlika, komplement", "Kartezični produkt", "Izjave in logični vezniki ¬ ∧ ∨ ⇒ ⇔", "Resničnostne tabele", "Kvantifikatorja ∀ in ∃, negacija"],
  indukcija: ["Princip indukcije: baza in indukcijski korak", "Dokaz formule za vsoto", "Dokaz deljivosti (npr. 15ⁿ⁺¹ − 8ⁿ deljivo s 7)", "Dokaz neenakosti (npr. 4ⁿ⁻¹ > n²)", "Indukcija, ki se začne pri n₀ ≠ 1"],
  absolutna: ["Definicija |x| in lastnosti", "Trikotniška neenakost", "Enačbe z absolutno vrednostjo: razbijanje na primere", "Neenačbe z več absolutnimi vrednostmi", "Gnezdena absolutna vrednost ||…| − …|", "Neenačbe s kvadratnimi izrazi"],
  supinf: ["Zgornja in spodnja meja", "Supremum in infimum: definicija", "Kdaj obstajata max in min", "Množice {aₙ ; n ∈ ℕ}: monotonost", "Množice z (−1)ⁿ: sodi in lihi n posebej", "Dokaz, da je število res supremum (ε)"],
  kompleksna: ["Algebraična oblika z = a + bi, Re in Im", "Konjugirano število z̄ in |z|", "Deljenje kompleksnih števil", "Polarna oblika z = r(cos φ + i sin φ)", "Potence v polarni obliki (de Moivre)", "Koreni zⁿ = w in risanje v ravnini", "Enačbe z z, z̄ in |z| (z = x + iy)", "Enačbe, ki so kvadratne v z³"],
  funkcije: ["Naravno definicijsko območje", "Zaloga vrednosti", "Injektivnost, surjektivnost, bijektivnost", "Inverzna funkcija", "Kompozitum funkcij", "Elementarne funkcije: exp, ln, trig., arcus"],
  zaporedja: ["Omejenost in monotonost", "Limita zaporedja (definicija z ε)", "Pravila za računanje limit", "Posebne limite: ⁿ√n, (1 + 1/n)ⁿ → e", "Rekurzivna zaporedja: omejenost, monotonost, limita", "Stekališča", "Izrek o sendviču"],
  vrste: ["Delne vsote, konvergenca vrste", "Geometrijska vrsta", "Teleskopske vrste (parcialni ulomki)", "Primerjalni, kvocientni, korenski kriterij", "Leibnizov kriterij (alternirajoče vrste)", "Absolutna in pogojna konvergenca", "Vrste s parametrom x"],
  limita: ["Limita funkcije v točki", "Leva in desna limita", "Limite v ±∞, asimptote", "Posebne limite (sin x / x)"],
  zveznost: ["Definicija zveznosti", "Zveznost s parametroma a in b", "Izrek o vmesni vrednosti", "Odvedljivost v točki"],
  odvod: ["Definicija odvoda", "Pravila odvajanja, verižno pravilo", "Odvodi elementarnih funkcij", "Tangenta in normala", "Implicitno odvajanje", "Višji odvodi"],
  uporaba: ["Stacionarne točke, lokalni ekstremi", "Naraščanje in padanje", "Konveksnost, konkavnost, prevoji", "L'Hôpitalovo pravilo", "Optimizacijske naloge (valj, kapsula, palica)", "Potek funkcije in graf", "Največja in najmanjša vrednost na intervalu"],
  taylor: ["Taylorjev polinom", "Razvoji eˣ, sin x, cos x, ln(1 + x), (1 + x)ᵅ", "Ostanek", "Limite s Taylorjevo vrsto", "Potenčne vrste, konvergenčni polmer"],
  integral: ["Osnovni nedoločeni integrali", "Uvedba nove spremenljivke", "Integracija po delih (per partes)", "Racionalne funkcije: parcialni ulomki", "Določeni integral, osnovni izrek", "Ploščina lika med grafoma", "Posplošeni (izlimitirani) integral"],

  // ── Linearna algebra (po izpitnih vprašanjih) ──
  vektorji: ["Vektor in seštevanje po pravilu paralelograma", "Množenje s skalarjem", "Linearna kombinacija", "Standardna baza", "Kolinearnost", "Kdaj je množica vektorjev baza", "Dolžina vektorja", "Trikotniška neenakost"],
  skalarni: ["Skalarni produkt v koordinatah", "Lastnosti skalarnega produkta", "Kot med vektorjema", "Pravokotnost", "Pravokotna projekcija točke na premico"],
  premice: ["Parametrična enačba premice", "Normalna (implicitna) enačba", "Eksplicitna enačba y = kx + n", "Presečišče dveh premic", "Pravokotna premica skozi točko"],
  det2: ["2 × 2 matrika in njena determinanta", "Lastnosti det[u, v]", "Ploščina paralelograma in trikotnika"],
  matrike: ["m × n matrika", "Seštevanje, množenje s skalarjem", "Transponiranje", "Množenje matrik", "Obrnljivost 2 × 2 in formula za inverz"],
  preslikave: ["Definicija linearne preslikave", "Matrika preslikave", "Jedro in slika", "Injektivnost ⇔ surjektivnost (ravnina nase)", "Kompozitum ↔ produkt matrik", "Inverz preslikave"],
  lastne: ["Lastni vektor in lastna vrednost", "Karakteristični polinom", "Sled matrike", "Diagonalizacija A = PDP⁻¹", "Potence Aⁿ prek diagonalizacije", "Štiri oblike glede na ničle karakterističnega polinoma"],
  baza: ["Koordinate vektorja v bazi [v]_B", "Prehodna matrika", "Matrika preslikave v novi bazi [T]_B", "Ortogonalne matrike", "Simetrične matrike: kanonična oblika"],
  kvadratne: ["Kvadratna forma in njena matrika", "Elipsa, hiperbola, parabola: enačbe", "Preseki stožca x² + y² = z² z ravnino"],
  vektorski: ["Definicija vektorskega produkta", "Ploščina paralelograma v R³", "Razvoj 3 × 3 determinante po prvi vrstici"],
  mesani: ["Mešani produkt", "Prostornina paralelepipeda", "Prostornina tetraedra", "Višina na osnovno ploskev"],
  ravnine: ["Enačba premice v R³", "Enačba ravnine (normala)", "Ravnina skozi tri točke", "Presečišče premice in ravnine", "Ali premica leži v ravnini", "Pravokotnost premic in ravnin"],
  ploskve: ["Kvadratna forma v treh spremenljivkah", "Ploskve 2. reda in njihove enačbe", "Skice ploskev"],
  sistemi: ["Matrični zapis sistema Ax = b", "Gaussova eliminacija", "Rešljivost s parametrom λ", "Splošna rešitev s parametri"],
  determinante: ["Determinanta n × n", "Lastnosti determinante", "Gaussova eliminacija in determinanta", "Inverz z Gaussovo eliminacijo", "Matrične enačbe (AX = B + 2X)", "Kdaj matrika ni obrnljiva (parameter t)"],
  prostori: ["Rⁿ in Cⁿ, skalarni produkt", "Vektorski podprostor", "Linearna neodvisnost", "Baza in dimenzija", "Gram-Schmidtov postopek", "Metoda najmanjših kvadratov", "Splošni vektorski prostor, norma"],

  // ── Fizika 1 (po poglavjih knjige) ──
  uvod: ["Enote SI in pretvarjanje", "Znanstveni zapis, red velikosti", "Ocene (koliko približno?)", "Natančnost in negotovost rezultata"],
  kinematika: ["Koordinatni sistem in izhodišče", "Lega, premik, pot", "Diagram gibanja", "Grafa x(t) in v(t)", "Enakomerno gibanje x = x₀ + vt", "Povprečna in trenutna hitrost", "Pospešek, enakomerno pospešeno gibanje", "Prosti pad", "Srečanje dveh teles: kdaj in kje"],
  newton: ["Sile in diagram sil", "Sistem in okolica", "1. Newtonov zakon", "2. Newtonov zakon F = ma", "3. Newtonov zakon", "Teža in normalna sila"],
  newton2: ["Razstavljanje sil na komponente", "Klanec", "Trenje: lepenje in drsenje", "Povezana telesa (vrv, škripec)"],
  gravitacija: ["Enakomerno kroženje, centripetalni pospešek", "Sile pri kroženju", "Newtonov gravitacijski zakon", "Sateliti in orbite"],
  gibalna: ["Gibalna količina p = mv", "Sunek sile", "Ohranitev gibalne količine", "Prožni in neprožni trki"],
  delo: ["Delo sile", "Kinetična energija", "Potencialna energija (teža, vzmet)", "Ohranitev energije", "Moč"],
  statika: ["Navor", "Pogoji za ravnovesje", "Težišče", "Stabilnost"],
  vrtenje: ["Kotna hitrost in kotni pospešek", "Vztrajnostni moment", "Newtonov zakon za vrtenje", "Vrtilna količina in ohranitev", "Kinetična energija vrtenja"],
  nihanje: ["Harmonično nihanje", "Nihajni čas, frekvenca, amplituda", "Vzmetno nihalo", "Matematično nihalo", "Energija nihanja", "Dušenje in resonanca"],
  valovanje: ["Transverzalno in longitudinalno valovanje", "Valovna dolžina in hitrost", "Superpozicija, interferenca", "Stoječe valovanje", "Zvok, Dopplerjev pojav"],
  plini: ["Tlak plina, kinetična teorija", "Plinska enačba pV = nRT", "Temperatura in notranja energija", "Plinski procesi"],
  tekocine: ["Gostota in tlak", "Hidrostatski tlak", "Pascalov zakon", "Vzgon (Arhimedov zakon)"],
  tok: ["Kontinuitetna enačba", "Bernoullijeva enačba", "Viskoznost"],
  termo1: ["Notranja energija", "Toplota in delo", "1. zakon termodinamike", "Specifična toplota, fazni prehodi"],
  termo2: ["Obrnljivi in neobrnljivi procesi", "Entropija", "Toplotni stroji, izkoristek", "Hladilniki"],

  // ── Fizikalni praktikum ──
  napake: ["Absolutna in relativna napaka", "Povprečje in standardni odklon", "Propagacija napak"],
  grafi: ["Graf iz meritev", "Linearna regresija, naklon in odsek", "Linearizacija"],
  porocila: ["Zgradba poročila", "Tabele in opis meritev", "Sklep in diskusija napak"],

  // ── Računalniški praktikum ──
  terminal: ["cd, ls, mkdir, rm", "Absolutne in relativne poti"],
  git: ["init, add, commit", "push in pull", "Veje"],
  python: ["Spremenljivke in tipi", "Zanke in pogoji", "Funkcije", "Seznami"],
  numpy: ["NumPy tabele", "Računanje s tabelami", "Grafi z Matplotlib"],
  latex: ["Zgradba dokumenta", "Formule", "Slike in tabele"],
};
