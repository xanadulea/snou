// ─────────────────────────────────────────────────────────────
//  snou — FIZIKA 1: gradivo iz fizika.zip
//  · vaje 2024/25 (8. 10. in 15. 10. 2024) z rešitvami
//  · stari 1. kolokviji (dr. Andreja Šarlah, FMF, Fizikalna merilna tehnika 2012/13, 2014/15)
//  · zapiski: merjenje, splošno gibanje, prosti pad
//  Vse številke so preverjene z računom.
// ─────────────────────────────────────────────────────────────

// ── kateri temi spadata na 1. kolokvij (2. 12.) — ocena po starih K1 ──
["uvod", "kinematika", "newton", "newton2", "gravitacija"].forEach(id => { const t = TOPICS.find(x => x.id === id); if (t) t.k = [1]; });

PAPERS.push(
  { id: "f-v24-1008", s: "fiz", k: 0, label: "Vaje ’24", year: "8. okt 2024", tasks: [["kinematika"], ["kinematika"], ["kinematika"]] },
  { id: "f-v24-1015", s: "fiz", k: 0, label: "Vaje ’24", year: "15. okt 2024", tasks: [["kinematika"], ["kinematika"], ["kinematika"], ["kinematika"], ["kinematika"], ["kinematika"]] },
  { id: "f-k1-12", s: "fiz", short: "’12", k: 1, label: "K1", year: "2012/13 · stari kolokvij FMT (drug program, ista snov)", tasks: [["newton2"], ["kinematika"], ["newton", "gravitacija"], ["newton2"]] },
  { id: "f-k1-14", s: "fiz", short: "’14", k: 1, label: "K1", year: "2014/15 · stari kolokvij FMT (drug program, ista snov)", tasks: [["kinematika"], ["gravitacija"], ["newton2", "kinematika"], ["newton2"]] },
);

PROBLEMS.push(
  // ── Vaje 8. 10. 2024 ──
  { paper: "f-v24-1008", n: 1, t: "kinematika", text: `<b>Osnove gibanja.</b> Nariši diagrame gibanja, grafe x(t) in v(t) za sledeče primere.<br>1. Fant začne v izhodišču koordinatnega sistema in teče v desno s hitrostjo 1,0 m/s.<br>2. Fant začne v izhodišču in teče v levo s hitrostjo 1,0 m/s.<br>3. Hkrati zaženemo dve krogli za balinanje po zelo gladki podlagi. Ena se giblje dvakrat hitreje od druge.<br>4. Krogla za balinanje med gibanjem prileti na kosmato preprogo.<br>5. Krogla se kotali, mi pa jo ves čas porivamo z metlo (kot pri curlingu).` },
  { paper: "f-v24-1008", n: 2, t: "kinematika", text: `<b>Enakomerno gibanje 1.</b> Otroci se igrajo vzdolž ravne črte (trkov ni, ker lahko stopijo s črte). Ob začetku opazovanja je Anica v izhodišču in teče desno z 1,0 m/s. Bor začne 15 m desno od izhodišča in teče levo z 2,1 m/s. Cene začne 25 m desno in teče levo z 2,5 m/s. Didi začne 8 m levo od izhodišča in teče levo z 1,0 m/s. Eva se pridruži 5 s po začetku, 3,0 m desno od izhodišča, in teče desno z 1,0 m/s.<br>1) Nariši grafa v(t) in x(t) za vse otroke. 2) Gibanje opiši z enačbami. 3) Kje in kdaj se srečata Anica in Bor? 4) Kdaj Cene ujame Bora? 5) Če je bilo gibanje pred začetkom nespremenjeno, kdaj sta bili Anica in Didi na isti točki? 6) Kdaj je Eva na isti točki kot Anica? Kaj pa kot Cene?` },
  { paper: "f-v24-1008", n: 3, t: "kinematika", text: `<b>Enakomerno gibanje 2.</b> Avtomobil vozi prve tri ure s stalno hitrostjo 50 km/h, nato 2 h s 70 km/h in nazadnje eno uro 40 km/h. Kolikšno pot opravi? Kolikšna je povprečna hitrost? Nariši graf v(t) in povprečno hitrost. Nariši graf poti v odvisnosti od časa.` },
  // ── Vaje 15. 10. 2024 ──
  { paper: "f-v24-1015", n: 1, t: "kinematika", text: `<b>Enakomerno gibanje 3.</b> Postaji A in B sta oddaljeni 4,0 km. Skozi postajo A pelje proti B tovorni vlak s stalno hitrostjo 60 km/h. Najmanj koliko časa kasneje lahko skozi A pelje za njim hitri vlak (100 km/h), da na poti do B ne trčita? (Skiciraj x(t) in v(t).)` },
  { paper: "f-v24-1015", n: 2, t: "kinematika", text: `<b>Kombi in tovornjak.</b> Mimo nas pripelje tovornjak s konstantno hitrostjo 50 km/h. Za njim pripelje kombi s 100 km/h, 30 m za tovornjakom.<br>a) Koliko časa od takrat, ko kombi pelje mimo nas, do trka, če obe vozili vozita enakomerno?<br>b) Skiciraj x(t) in v(t), če kombi začne zavirati, ko pelje mimo nas (dve možnosti: trk ali ne).<br>c) Ali pride do trka, če kombi zavira s pojemkom 5,0 m/s²?<br>d) Kaj je pravilo dveh sekund? Kolikšna je pravilna razdalja pri 100 km/h?<br>e) Kaj bi se zgodilo, če bi bila razdalja samo 15 m (spet pojemek 5,0 m/s²)? Kdaj in kje?` },
  { paper: "f-v24-1015", n: 3, t: "kinematika", code: "M2.28", text: `Kamen spustimo v vodo z mosta, ki je 40 m nad gladino. Po eni sekundi vržemo drug kamen za prvim navpično navzdol. Oba kamna padeta na gladino sočasno. Kolikšna je bila začetna hitrost drugega kamna?` },
  { paper: "f-v24-1015", n: 4, t: "kinematika", code: "M2.30", text: `Balon na topel zrak se dviga s hitrostjo 12 m/s. Na višini 80 m odvrže vrečo peska. Koliko časa pada vreča na tla? S kolikšno hitrostjo prileti na tla?` },
  { paper: "f-v24-1015", n: 5, t: "kinematika", code: "M2.18", text: `Ko se na semaforju prižge zelena, avtomobil odpelje s konstantnim pospeškom 1,5 m/s². V istem trenutku ga s konstantno hitrostjo 8,0 m/s prehiti tovornjak.<br>a) Kolikšno razdaljo prevozi tovornjak, preden ga avtomobil ujame, in koliko časa preteče?<br>b) Kolikšna je takrat hitrost avtomobila?` },
  { paper: "f-v24-1015", n: 6, t: "kinematika", code: "M2.26", text: `Raketa se eno minuto dviga s konstantnim pospeškom 20,0 m/s². Ko ji zmanjka goriva, se giblje kot prosto telo.<br>a) Koliko časa preteče med vzletom in padcem na tla?<br>b) Kolikšno največjo višino doseže?<br>c) Kolikšna je njena največja hitrost?` },
  // ── stari K1 2012/13 (26. 11. 2012) ──
  { paper: "f-k1-12", n: 1, t: "newton2", text: `Hokejski plošček, ki se giblje s hitrostjo 10 m/s, naleti na hrapavo podlago. Po kolikšnem času in kje se zaustavi? Koeficient trenja hrapave podlage je 0,1.` },
  { paper: "f-k1-12", n: 2, t: "kinematika", text: `Otrok z mostu čez reko hrani račke. S kolikšno hitrostjo naj vrže hrano, če bi jo rad vrgel k rački, ki v trenutku meta ravno priplava izpod mostu s hitrostjo 1,2 m/s? Otrok vrže hrano vodoravno, most je 3 m nad gladino. Kje je račka, ko hrana prileti k njej?` },
  { paper: "f-k1-12", n: 3, t: "newton", text: `Na lahko vzmet z ravnovesno dolžino 20 cm obesimo kroglico z maso 50 g. Vzmet se raztegne za 1 cm. Kolikšen je koeficient vzmeti? Ko sistem okrog zgornjega konca vzmeti zavrtimo v navpični ravnini, je v isti (najnižji) legi vzmet raztegnjena za 5 cm. S kolikšno frekvenco vrtimo vzmet s kroglico?` },
  { paper: "f-k1-12", n: 4, t: "newton2", text: `Opeko (2,6 kg) in blok ledu (3 kg) povežemo z lahko vrvico in ju postavimo na klanec z naklonom 30° (opeko za blokom ledu, led je spodaj). Koeficient trenja med opeko in podlago je 0,7, trenje med ledom in podlago je zanemarljivo. Telesi spustimo; vrvica se napne in obe se gibljeta. S kolikšnim pospeškom se giblje opeka? S kolikšno silo je napeta vrvica? Kolikšna pa je sila v vrvici, če postavimo blok ledu za opeko?` },
  // ── stari K1 2014/15 (28. 11. 2014) ──
  { paper: "f-k1-14", n: 1, t: "kinematika", text: `Vozilo se s hitrostjo 50 km/h približuje križišču. Ko je 50 m pred križiščem, zasveti rumena luč, zato začne voznik zavirati. Kolikšen mora biti pojemek, da se ustavi pred semaforjem? Ali bi voznik varno zapeljal v križišče, če bi nemoteno nadaljeval vožnjo? Rumena luč sveti 3 s.` },
  { paper: "f-k1-14", n: 2, t: "gravitacija", text: `Vagonček vlakca smrti naredi krožni zavoj v navpični ravnini (looping) s premerom 20 m s hitrostjo konstantne velikosti. Kolikšna sila podlage deluje na vagonček v najvišji in v najnižji točki pri hitrosti 15 m/s? Masa vagončka je 100 kg. Koliko časa potrebuje za zavoj?` },
  { paper: "f-k1-14", n: 3, t: "newton2", text: `Delavec odloži zaboj na 2 m dolgo drčo z naklonom 30°. Kolikšna je hitrost zaboja na koncu drče? Zaboj prileti na tla 60 cm od konca drče (vodoravno). Kako visoko nad tlemi je konec drče? Koeficient trenja je 0,1, zračni upor zanemarimo.` },
  { paper: "f-k1-14", n: 4, t: "newton2", text: `Na vodoravni mizi leži homogena veriga z maso m in dolžino l. Desetina verige visi z mize. Kolikšen mora biti vsaj koeficient lepenja, da ne zdrsne? S kolikšnim pospeškom začne padati veriga, če ni trenja? Kako se s časom spreminja dolžina visečega dela? (Namig: nastavek x(t) = Ce<sup>λt</sup>.) <i>Dodatno: koliko časa pada veriga z mize?</i>` },
);

Object.assign(GRADIVO, {
  kinematika: [{ z: "Predavanje: kinematika (tabla)" }, { z: "Zapiski: premo gibanje (m6–m8)" }, { z: "Zapiski: splošno gibanje (m10–m14)" }, { z: "Zapiski: prosti pad" },
               { v: "Vaje 6. okt" }, { v: "Vaje 8. okt" }, { v: "Vaje ’24: 8. in 15. okt" }],
  uvod:       [{ z: "Zapiski: merjenje fizikalnih količin (m1–m3)" }, { v: "Vaje 8. okt" }],
  newton:     [{ z: "Zapiski: dinamika (sile, Newtonovi zakoni)" }, { v: "Aktivnost 2 (silomer)" }],
});

// ── majhne risbe za rešitve ──
const P = (o) => plot(o);
const lbl = (X, Y, x, y, t, c) => `<text x="${X(x)}" y="${Y(y)}" font-size="11" fill="${c}">${t}</text>`;

Object.assign(SOL, {
  // ═════════════ VAJE 8. 10. 2024 ═════════════
  "f-v24-1008|1": { ans: "1, 2: enakomerno (premica x(t), vodoravna v(t)); 3: dve premici, ena 2× bolj strma; 4: pike vse bližje, v(t) pada; 5: enakomerno (vsota sil 0)", steps: [
    ["1: pike enako razmaknjene v desno; x(t) = (1,0 m/s) t je premica navzgor; v(t) = 1,0 m/s je vodoravna črta nad osjo.", "Enaki premiki v enakih časih ⇒ stalna hitrost.",
      P({ xmax: 4, ymin: -4, ymax: 4, xl: "t [s]", yl: "x [m]", series: [{ pts: [[0, 0], [4, 4]], col: "#f2b84b" }, { pts: [[0, 0], [4, -4]], col: "#5ec2d6" }], marks: (X, Y) => lbl(X, Y, 3, 3.6, "1: v = +1", "#f2b84b") + lbl(X, Y, 3, -2.4, "2: v = −1", "#5ec2d6") })],
    ["2: enako, le v levo: x(t) = −(1,0 m/s) t pada; v(t) = −1,0 m/s je pod osjo.", "Smer gibanja = predznak hitrosti v izbrani osi."],
    ["3: obe krogli enakomerno; na x(t) dve premici iz iste točke, ena dvakrat bolj strma. Na v(t) dve vodoravni črti, ena dvakrat višje.", "Gladka podlaga ⇒ (skoraj) brez trenja ⇒ hitrost se ne spreminja."],
    ["4: do preproge enakomerno, na preprogi pike vse bližje; x(t) se ukrivi in zravna (krogla obstane); v(t) pada proti 0.", "Preproga z trenjem zavira: Δv kaže nazaj."],
    ["5: če z metlo ravno izenačimo trenje, je gibanje enakomerno: x(t) premica, v(t) vodoravna.", "Vsota sil 0 ⇒ hitrost stalna (1. Newtonov zakon). Če porivamo močneje, krogla pospešuje."],
  ]},
  "f-v24-1008|2": { ans: "Anica–Bor: t ≈ 4,8 s pri x ≈ 4,8 m; Cene ujame Bora pri t = 25 s; Anica–Didi: 4 s pred začetkom (x = −4 m); Eva nikoli ne doseže Anice; Eva–Cene: t ≈ 7,7 s, x ≈ 5,7 m", steps: [
    [`Enačbe (os desno, t = 0 začetek): x<sub>A</sub> = t, &nbsp;x<sub>B</sub> = 15 − 2,1t, &nbsp;x<sub>C</sub> = 25 − 2,5t, &nbsp;x<sub>D</sub> = −8 − t, &nbsp;x<sub>E</sub> = 3 + (t − 5) za t ≥ 5 (vse v m in s)`, "Vsak otrok: x = x₀ + v(t − t₀). Levo pomeni negativno hitrost. Eva začne pri t₀ = 5 s.",
      P({ xmax: 10, ymin: -20, ymax: 26, xl: "t [s]", yl: "x [m]", ticks: true, series: [
        { pts: [[0, 0], [10, 10]], col: "#f2b84b" }, { pts: [[0, 15], [10, -6]], col: "#5ec2d6" }, { pts: [[0, 25], [10, 0]], col: "#e8665a" }, { pts: [[0, -8], [10, -18]], col: "#b08ae6" }, { pts: [[5, 3], [10, 8]], col: "#7fcf86" }],
        marks: (X, Y) => lbl(X, Y, 9, 12, "A", "#f2b84b") + lbl(X, Y, 9, -7, "B", "#5ec2d6") + lbl(X, Y, 9.3, 3, "C", "#e8665a") + lbl(X, Y, 9, -15, "D", "#b08ae6") + lbl(X, Y, 9.4, 9, "E", "#7fcf86") })],
    [`Anica in Bor: t = 15 − 2,1t ⇒ 3,1t = 15 ⇒ t = 4,84 s, x = 4,84 m`, "Srečanje = enaka lega = presečišče premic."],
    [`Cene ujame Bora: 25 − 2,5t = 15 − 2,1t ⇒ 10 = 0,4t ⇒ t = 25 s (pri x = −37,5 m)`, "Cene je za 10 m zadaj in je hitrejši za 0,4 m/s: 10 / 0,4 = 25 s."],
    [`Anica in Didi: t = −8 − t ⇒ t = −4 s, x = −4 m`, "Negativen čas pomeni PRED začetkom opazovanja. Smisel ima, ker se gibanje ni spreminjalo."],
    [`Eva in Anica: 3 + t − 5 = t ⇒ −2 = 0 ✗ ⇒ nikoli (Eva je vedno 2 m za Anico). Eva in Cene: t − 2 = 25 − 2,5t ⇒ t = 7,71 s, x = 5,71 m`, "Enaka hitrost ⇒ vzporedni premici ⇒ ni presečišča."],
  ]},
  "f-v24-1008|3": { ans: "s = 330 km; v̄ = 55 km/h", steps: [
    [`s = 50 · 3 + 70 · 2 + 40 · 1 = 150 + 140 + 40 = 330 km`, "Pot = ploščina pod v(t): trije pravokotniki.",
      P({ xmax: 6, ymax: 80, xl: "t [h]", yl: "v [km/h]", fills: [{ pts: [[0, 0], [0, 50], [3, 50], [3, 0]], col: "#e8665a" }, { pts: [[3, 0], [3, 70], [5, 70], [5, 0]], col: "#e8665a" }, { pts: [[5, 0], [5, 40], [6, 40], [6, 0]], col: "#e8665a" }],
        series: [{ pts: [[0, 50], [3, 50], [3, 70], [5, 70], [5, 40], [6, 40]], col: "#e8665a" }, { pts: [[0, 55], [6, 55]], col: "#7fcf86", dash: 1, w: 2 }], marks: (X, Y) => lbl(X, Y, 0.2, 60, "v̄ = 55", "#7fcf86") })],
    [`v̄ = ${fr("330 km", "6 h")} = 55 km/h`, "Povprečna hitrost = celotna pot / celoten čas. NI povprečje (50 + 70 + 40)/3, ker so časi različni."],
    ["Graf s(t): tri ravne daljice, vsaka z naklonom svoje hitrosti (najbolj strma 70 km/h), konča pri 330 km.", "Naklon s(t) = hitrost."],
  ]},
  // ═════════════ VAJE 15. 10. 2024 ═════════════
  "f-v24-1015|1": { ans: "Najmanj 96 s = 1,6 min", steps: [
    [`Tovorni do B: t<sub>t</sub> = ${fr("4,0 km", "60 km/h")} = 0,0667 h = 4,0 min`, ""],
    [`Hitri do B: t<sub>h</sub> = ${fr("4,0 km", "100 km/h")} = 0,04 h = 2,4 min`, ""],
    [`Hitri lahko odpelje najmanj 4,0 − 2,4 = 1,6 min = 96 s kasneje`, "Najhujši primer: hitri dohiti tovornega točno v B. Na grafu x(t) se premici sekata pri x = 4 km.",
      P({ xmax: 5, ymax: 4.5, xl: "t [min]", yl: "x [km]", series: [{ pts: [[0, 0], [4, 4]], col: "#e8665a" }, { pts: [[1.6, 0], [4, 4]], col: "#5ec2d6" }, { pts: [[0, 4], [5, 4]], col: "var(--faint)", dash: 1, w: 1 }], marks: (X, Y) => lbl(X, Y, 0.6, 1.9, "tovorni", "#e8665a") + lbl(X, Y, 2.9, 1.3, "hitri", "#5ec2d6") + lbl(X, Y, 0.1, 4.25, "B", "var(--muted)") })],
  ]},
  "f-v24-1015|2": { ans: "a) 2,16 s; c) ne: najmanjša razdalja ≈ 10,7 m; d) 2 s · v ≈ 56 m; e) trk po ≈ 1,47 s, ≈ 35 m od nas (razlika hitrosti ≈ 6,5 m/s)", steps: [
    [`Pretvori: v<sub>t</sub> = 50 km/h = 13,9 m/s, &nbsp;v<sub>k</sub> = 100 km/h = 27,8 m/s`, "km/h → m/s: deli s 3,6."],
    [`a) Kombi se približuje z razliko hitrosti 13,9 m/s: t = ${fr("30 m", "13,9 m/s")} = 2,16 s`, "Lahko tudi z enačbama: 27,8t = 30 + 13,9t."],
    [`c) Nevarno je, dokler je kombi hitrejši. Hitrosti se izenačita: 27,8 − 5t = 13,9 ⇒ t = 2,78 s`, "Po tem trenutku je kombi počasnejši in razdalja spet raste. Torej je tu razdalja najmanjša.",
      P({ xmax: 4, ymax: 80, xl: "t [s]", yl: "x [m]", series: [{ pts: [0, .5, 1, 1.5, 2, 2.5, 2.78, 3.5, 4].map(t => [t, 30 + 13.9 * t]), col: "#5ec2d6" }, { pts: [0, .5, 1, 1.5, 2, 2.5, 2.78, 3.5, 4].map(t => [t, t <= 2.78 ? 27.8 * t - 2.5 * t * t : 57.9 + 13.9 * (t - 2.78) - 0]), col: "#f2b84b" }],
        marks: (X, Y) => lbl(X, Y, .3, 50, "tovornjak", "#5ec2d6") + lbl(X, Y, 1.6, 22, "kombi", "#f2b84b") })],
    [`Takrat: x<sub>t</sub> = 30 + 13,9 · 2,78 = 68,6 m, &nbsp;x<sub>k</sub> = 27,8 · 2,78 − ½ · 5 · 2,78² = 57,9 m ⇒ razmik 10,7 m > 0 ⇒ ni trka`, "Izhodišče je pri nas, kjer je kombi ob t = 0."],
    [`d) Pravilo dveh sekund: razmik = razdalja, ki jo prevoziš v 2 s: 27,8 m/s · 2 s ≈ 56 m`, "Toliko časa rabiš, da opaziš nevarnost in začneš zavirati (reakcijski čas + rezerva)."],
    [`e) Razmik 15 m: 27,8t − 2,5t² = 15 + 13,9t ⇒ 2,5t² − 13,9t + 15 = 0 ⇒ t = 1,47 s (manjša rešitev)`, "Kvadratna enačba; prva rešitev je prvi dotik. Ker je 1,47 s < 2,78 s, kombi še ni upočasnil na 13,9 m/s."],
    [`Kje: x = 15 + 13,9 · 1,47 ≈ 35 m od nas. Kombi ima takrat 27,8 − 5 · 1,47 = 20,4 m/s, torej se zaleti z ≈ 6,5 m/s razlike.`, ""],
  ]},
  "f-v24-1015|3": { ans: "v₀ ≈ 12,5 m/s navzdol", steps: [
    [`Prvi kamen: 40 = ½ g t₁² ⇒ t₁ = √(2 · 40 / 9,81) = 2,86 s`, "Prosti pad iz mirovanja. Os usmerimo navzdol, da so vsi predznaki pozitivni."],
    [`Drugi pada 1 s manj: t₂ = 1,86 s`, "Pade sočasno, vržen pa je 1 s kasneje."],
    [`40 = v₀ t₂ + ½ g t₂² ⇒ v₀ = ${fr("40 − 4,905 · 1,86²", "1,86")} ≈ ${fr("40 − 16,9", "1,86")} ≈ 12,5 m/s`, "Navpični met navzdol: isto kot prosti pad, le da ima začetno hitrost."],
  ]},
  "f-v24-1015|4": { ans: "t ≈ 5,4 s; v ≈ 41 m/s navzdol", steps: [
    [`Vreča ob spustu NI v mirovanju: ima hitrost balona, 12 m/s navzgor. Os y navzgor, tla y = 0: y(t) = 80 + 12t − 4,905t²`, "Najpogostejša napaka: vzeti v₀ = 0. Vreča se najprej še dviga!"],
    [`Tla: 4,905t² − 12t − 80 = 0 ⇒ t = ${fr("12 + √(144 + 4 · 4,905 · 80)", "2 · 4,905")} = 5,44 s`, "Negativno rešitev zavržemo."],
    [`v = 12 − 9,81 · 5,44 = −41,4 m/s`, "Minus: hitrost kaže navzdol. Preverba brez časa: v² = 12² + 2 · 9,81 · 80 ⇒ |v| = 41,4 m/s ✓"],
  ]},
  "f-v24-1015|5": { ans: "a) 85 m, 10,7 s; b) 16 m/s", steps: [
    [`x<sub>tov</sub> = 8t, &nbsp;x<sub>avto</sub> = ½ · 1,5 · t² = 0,75t²`, "Oba začneta pri semaforju ob t = 0."],
    [`8t = 0,75t² ⇒ t = ${fr("8", "0,75")} = 10,7 s (t = 0 je začetek)`, "",
      P({ xmax: 12, ymax: 100, xl: "t [s]", yl: "x [m]", series: [{ pts: [[0, 0], [12, 96]], col: "#5ec2d6" }, { pts: [0, 2, 4, 6, 8, 10, 10.67, 11.5].map(t => [t, .75 * t * t]), col: "#f2b84b" }], marks: (X, Y) => lbl(X, Y, 2, 30, "tovornjak", "#5ec2d6") + lbl(X, Y, 7, 15, "avto", "#f2b84b") })],
    [`x = 8 · 10,7 = 85,3 m; &nbsp;v<sub>avto</sub> = 1,5 · 10,7 = 16 m/s`, "Zanimivo: ravno dvakratna hitrost tovornjaka. Ker je povprečna hitrost avta (0 + 16)/2 = 8 m/s, enaka tovornjakovi."],
  ]},
  "f-v24-1015|6": { ans: "a) ≈ 332 s; b) ≈ 109 km; c) ≈ 1,47 km/s (tik pred tlemi)", steps: [
    [`Pogon (60 s): v₁ = 20 · 60 = 1200 m/s, &nbsp;h₁ = ½ · 20 · 60² = 36 000 m`, "Enakomerno pospešeno iz mirovanja."],
    [`Brez goriva se še dviga: t₂ = ${fr("1200", "9,81")} = 122 s, &nbsp;Δh = ${fr("1200²", "2 · 9,81")} = 73 400 m ⇒ h<sub>max</sub> ≈ 109 400 m ≈ 109 km`, "Prosti met navzgor: ustavi se, ko v = 0. (Zanemarimo upor in to, da je g na tej višini malo manjši.)"],
    [`Padec z vrha: t₃ = √(2 · 109 400 / 9,81) = 149 s ⇒ skupaj 60 + 122 + 149 ≈ 332 s`, ""],
    [`Največja hitrost: tik pred tlemi, v = √(2 · 9,81 · 109 400) ≈ 1465 m/s`, "Več kot 1200 m/s ob koncu pogona, ker pade z večje višine, kot je bila pogonska."],
  ]},
  // ═════════════ K1 2012/13 ═════════════
  "f-k1-12|1": { ans: "t ≈ 10,2 s; s ≈ 51 m", steps: [
    [`Edina vodoravna sila je trenje F<sub>tr</sub> = k<sub>tr</sub> mg ⇒ pojemek a = k<sub>tr</sub> g = 0,1 · 9,81 = 0,981 m/s²`, "2. Newtonov zakon: ma = k<sub>tr</sub>mg, masa se pokrajša."],
    [`t = ${fr("v₀", "a")} = ${fr("10", "0,981")} = 10,2 s`, "Ustavi se, ko v = v₀ − at = 0."],
    [`s = ${fr("v₀²", "2a")} = ${fr("100", "1,962")} = 51 m`, "Enačba brez časa: 0 = v₀² − 2as."],
  ]},
  "f-k1-12|2": { ans: "1,2 m/s; račka je 0,94 m od mostu", steps: [
    [`Čas padanja: t = √(2h/g) = √(6 / 9,81) = 0,78 s`, "Vodoravni met: navpično je to prosti pad, neodvisno od vodoravne hitrosti."],
    [`Vodoravno se hrana giblje enakomerno, račka tudi. Da sta ves čas skupaj, mora biti v<sub>hrane</sub> = 1,2 m/s`, "Obe začneta pod mostom ob istem času in se gibljeta z enako vodoravno hitrostjo."],
    [`x = 1,2 · 0,78 = 0,94 m`, ""],
  ]},
  "f-k1-12|3": { ans: "k ≈ 49 N/m; ν ≈ 2 Hz", steps: [
    [`Mirovanje: kΔx = mg ⇒ k = ${fr("0,05 · 9,81", "0,01")} = 49 N/m`, "Vsota sil je 0: vzmet vleče gor, teža dol."],
    [`Vrtenje, najnižja lega: vzmet dolga r = 20 + 5 = 25 cm. Vsota sil kaže GOR (proti središču): kΔx − mg = mω²r`, "Pri kroženju je pospešek a = ω²r usmerjen v središče, tu navzgor."],
    [`ω² = ${fr("49 · 0,05 − 0,05 · 9,81", "0,05 · 0,25")} = 157 s⁻² ⇒ ω = 12,5 s⁻¹ ⇒ ν = ${fr("ω", "2π")} ≈ 2,0 Hz`, ""],
  ]},
  "f-k1-12|4": { ans: "a ≈ 2,1 m/s²; F ≈ 8,3 N; v obratni postavitvi 0 N", steps: [
    [`Opeka sama ne bi drsela: g(sin 30° − 0,7 cos 30°) < 0. Led spodaj jo vleče po vrvici.`, "Brez vrvice bi led pospeševal z g sin 30° = 4,9 m/s², opeka pa bi obstala."],
    [`Obe skupaj (vrvica je notranja sila): (m<sub>o</sub> + m<sub>l</sub>) a = (m<sub>o</sub> + m<sub>l</sub>) g sin 30° − k<sub>tr</sub> m<sub>o</sub> g cos 30°`, "Sistem = opeka + led. Teža vzdolž klanca vleče obe, trenje deluje le na opeko."],
    [`a = ${fr("5,6 · 4,905 − 0,7 · 2,6 · 9,81 · 0,866", "5,6")} = ${fr("27,5 − 15,5", "5,6")} = 2,14 m/s²`, ""],
    [`Vrvica (sistem = led): m<sub>l</sub> g sin 30° − F = m<sub>l</sub> a ⇒ F = 3 · (4,905 − 2,14) = 8,3 N`, "Led bi rad šel hitreje (4,9 m/s²), vrvica ga zadržuje."],
    [`Led zgoraj: led bi bil hitrejši kot opeka, zato vrvica ni napeta: F = 0 (led potiska opeko)`, "Vrvica lahko le vleče, ne more potiskati."],
  ]},
  // ═════════════ K1 2014/15 ═════════════
  "f-k1-14|1": { ans: "a ≥ 1,9 m/s²; ne (v 3 s prevozi le 42 m)", steps: [
    [`v₀ = 50 km/h = 13,9 m/s; brez časa: 0 = v₀² − 2as ⇒ a = ${fr("13,9²", "2 · 50")} = 1,93 m/s²`, ""],
    [`Brez zaviranja v 3 s: s = 13,9 · 3 = 41,7 m < 50 m ⇒ ko se prižge rdeča, je še 8 m pred križiščem ⇒ NE`, ""],
  ]},
  "f-k1-14|2": { ans: "Pri m = 100 kg: zgoraj ≈ 1,27 kN, spodaj ≈ 3,23 kN; t ≈ 4,2 s (rešitve v viru 2,5 kN in 6,5 kN ustrezajo m = 200 kg)", steps: [
    [`r = 10 m, centripetalni pospešek a<sub>r</sub> = ${fr("v²", "r")} = ${fr("225", "10")} = 22,5 m/s² (vedno proti središču)`, "Kroženje s stalno hitrostjo ima vseeno pospešek: smer hitrosti se spreminja."],
    [`Zgoraj (središče je spodaj): N + mg = m a<sub>r</sub> ⇒ N = 100 · (22,5 − 9,81) = 1269 N`, "Obe sili kažeta dol, proti središču."],
    [`Spodaj (središče je zgoraj): N − mg = m a<sub>r</sub> ⇒ N = 100 · (22,5 + 9,81) = 3231 N`, "Spodaj te tišči najbolj."],
    [`t = ${fr("2πr", "v")} = ${fr("62,8 m", "15 m/s")} = 4,2 s`, "Pozor: v uradnih rešitvah sta 2,5 kN in 6,5 kN, kar velja za 200 kg. S 100 kg iz besedila dobiš 1,27 kN in 3,23 kN."],
  ]},
  "f-k1-14|3": { ans: "v ≈ 4,0 m/s; h ≈ 49 cm", steps: [
    [`Po drči: a = g(sin 30° − k<sub>tr</sub> cos 30°) = 9,81 · (0,5 − 0,0866) = 4,06 m/s²`, "Vzdolž klanca: dinamična komponenta teže minus trenje."],
    [`v = √(2as) = √(2 · 4,06 · 2) = 4,03 m/s`, ""],
    [`Poševni met navzdol: v<sub>x</sub> = v cos 30° = 3,49 m/s, &nbsp;v<sub>y</sub> = v sin 30° = 2,01 m/s (navzdol)`, "Zaboj zapusti drčo v smeri drče, 30° pod vodoravnico."],
    [`Čas do tal: t = ${fr("0,6 m", "3,49 m/s")} = 0,172 s; &nbsp;h = v<sub>y</sub>t + ½gt² = 0,346 + 0,145 = 0,49 m`, "Vodoravno enakomerno, navpično pospešeno z g."],
  ]},
  "f-k1-14|4": { ans: "k<sub>l</sub> ≥ 1/9 ≈ 0,11; a₀ = g/10 ≈ 0,98 m/s²; x(t) = (l/10) ch(√(g/l) t); čas padanja ≈ 3,0 √(l/g)", steps: [
    [`Lepenje: teža visečega dela (m/10)g ≤ k<sub>l</sub> · (9m/10)g ⇒ k<sub>l</sub> ≥ 1/9 ≈ 0,11`, "Lepenje deluje le na del na mizi; pritisk na mizo daje 9/10 mase."],
    [`Brez trenja: cela veriga se giblje skupaj, vleče jo le teža visečega dela x: m a = (m x / l) g ⇒ a = ${fr("g x", "l")}`, "Na začetku x = l/10 ⇒ a₀ = g/10 = 0,98 m/s²."],
    [`Enačba gibanja: ẍ = (g/l) x. Nastavek x = Ce<sup>λt</sup> ⇒ λ² = g/l ⇒ λ = ±√(g/l)`, "Pospešek je sorazmeren z x, zato rešitev raste eksponentno."],
    [`Začetni pogoji x(0) = l/10, ẋ(0) = 0 ⇒ x(t) = ${fr("l", "20")}(e<sup>λt</sup> + e<sup>−λt</sup>) = ${fr("l", "10")} ch(λt)`, "Dodatno: veriga pade, ko x = l: ch(λt) = 10 ⇒ t = arch(10)·√(l/g) ≈ 3,0 √(l/g)."],
  ]},
});

// ─────────────────────────────────────────────────────────────
//  ZAPISKI — iz profesorjevih zapiskov (m1–m3, m6–m8, m10–m14, prosti pad)
// ─────────────────────────────────────────────────────────────
const linkPic = `<svg viewBox="0 0 330 120" style="width:100%;max-width:360px">
  <defs><marker id="lkh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
  ${[["x(t)", 40, "#f2b84b"], ["v(t)", 165, "#5ec2d6"], ["a(t)", 290, "#e8665a"]].map(([t, x, c]) => `<circle cx="${x}" cy="60" r="27" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="2"/><text x="${x}" y="65" text-anchor="middle" font-size="15" fill="${c}">${t}</text>`).join("")}
  <g style="color:#7fcf86"><path d="M70,44 Q102,22 135,44" fill="none" stroke="#7fcf86" stroke-width="2" marker-end="url(#lkh)"/><path d="M195,44 Q227,22 260,44" fill="none" stroke="#7fcf86" stroke-width="2" marker-end="url(#lkh)"/></g>
  <g style="color:#b08ae6"><path d="M135,76 Q102,98 70,76" fill="none" stroke="#b08ae6" stroke-width="2" marker-end="url(#lkh)"/><path d="M260,76 Q227,98 195,76" fill="none" stroke="#b08ae6" stroke-width="2" marker-end="url(#lkh)"/></g>
  <text x="102" y="20" text-anchor="middle" font-size="11" fill="#7fcf86">odvajaj d/dt</text><text x="227" y="20" text-anchor="middle" font-size="11" fill="#7fcf86">odvajaj d/dt</text>
  <text x="102" y="112" text-anchor="middle" font-size="11" fill="#b08ae6">integriraj ∫ dt</text><text x="227" y="112" text-anchor="middle" font-size="11" fill="#b08ae6">integriraj ∫ dt</text></svg>`;

const siTable = `<table class="dt"><tr><th>količina</th><th>enota</th><th>oznaka</th></tr>${[["čas", "sekunda", "s"], ["dolžina", "meter", "m"], ["masa", "kilogram", "kg"], ["električni tok", "amper", "A"], ["temperatura", "kelvin", "K"], ["množina snovi", "mol", "mol"], ["svetilnost", "kandela", "cd"]].map(r => `<tr>${r.map(x => `<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;

const NEW_FIZ = [
  // ═══════════════════════════════════════════════
  { id: "z-fiz-merjenje", s: "fiz", t: "uvod", title: "Merjenje fizikalnih količin: enote, predpone, natančnost", vaje: "Profesorjevi zapiski m1–m3 · Etkina, 1. poglavje",
    intro: "Preden računaš karkoli, moraš znati zapisati količino: število, enota, koliko mest je zanesljivih. Na kolokviju se največ točk izgubi pri enotah (km/h namesto m/s, cm namesto m). Ta lekcija je kratka, a jo rabiš povsod.",
    parts: [
      { h: "Fizikalna količina = število × enota",
        p: ["Vsaka izmerjena količina ima <b>mersko število</b> in <b>enoto</b>: l = 10,7 m pomeni 10,7 × (en meter). Med številom in enoto je presledek.",
            "Ves svet uporablja sistem <b>SI</b> s sedmimi osnovnimi enotami (dogovor 1971). V mehaniki rabiš le prve tri: s, m, kg. Vse druge enote se dajo izraziti z njimi: to so <b>izpeljane enote</b>, npr. newton 1 N = 1 kg m/s², joule 1 J = 1 kg m²/s².",
            "Enote po osebah (amper, kelvin, newton) pišemo z malo začetnico, njihove oznake pa z veliko (A, K, N)."],
        pic: siTable,
        zv: "fizikalna količina = mersko število · enota<br>osnovne SI: s, m, kg, A, K, mol, cd<br>1 N = 1 kg·m/s² &nbsp;&nbsp; 1 J = 1 kg·m²/s²" },
      { h: "Od kod pridejo sekunda, meter, kilogram",
        p: ["<b>Nekoč:</b> sekunda = 1/(24 · 60 · 60) dneva; meter = 1/10 000 000 razdalje od ekvatorja do severnega pola; kilogram = masa 1 dm³ (litra) vode.",
            "<b>Danes (2019):</b> sekunda je 9 192 631 770 »tiktakov« atomske ure s cezijem ¹³³Cs. Meter je razdalja, ki jo svetloba prepotuje v 1/299 792 458 s, ker je hitrost svetlobe dogovorjena: c = 299 792 458 m/s. Kilogram je določen s Planckovo konstanto h = 6,626 070 15 · 10⁻³⁴ J s.",
            "Ideja: z uro umerimo meter, z uro in metrom pa kilogram. Vse sloni na konstantah narave, ne na predmetih."],
        zv: "s ← atomska ura (Cs) &nbsp; m ← s + c &nbsp; kg ← s + m + h" },
      { h: "Znanstveni zapis in predpone",
        p: ["Zelo velika ali majhna števila pišemo z desetiškimi potencami, tako da je pred decimalno vejico ena neničelna števka: 0,000 000 037 5 = 3,75 · 10⁻⁸ in 3 750 000 = 3,75 · 10⁶.",
            "Namesto potenc pogosto uporabimo predpone: 3,75 · 10⁻⁸ m = 37,5 nm, 3,75 · 10⁶ m = 3750 km."],
        zv: "T 10¹² · G 10⁹ · M 10⁶ · k 10³ · h 10² · da 10¹<br>d 10⁻¹ · c 10⁻² · m 10⁻³ · μ 10⁻⁶ · n 10⁻⁹ · p 10⁻¹²",
        ex: { q: "Zapiši 0,000 52 s in 4 800 000 m z ustrezno predpono.", steps: ["0,000 52 s = 5,2 · 10⁻⁴ s = 520 · 10⁻⁶ s = 520 μs", "4 800 000 m = 4,8 · 10⁶ m = 4,8 · 10³ km = 4800 km"] } },
      { h: "km/h ↔ m/s",
        p: ["1 km/h = 1000 m / 3600 s = 1/3,6 m/s. Torej: iz km/h v m/s <b>deliš s 3,6</b>, iz m/s v km/h <b>množiš s 3,6</b>.",
            "Občutek: pešec 1,4 m/s ≈ 5 km/h, kolo 5,5 m/s ≈ 20 km/h, avto 27,8 m/s ≈ 100 km/h, zvok 340 m/s, letalo 270 m/s, svetloba 3 · 10⁸ m/s."],
        zv: "km/h ÷ 3,6 = m/s &nbsp;&nbsp; m/s · 3,6 = km/h<br>100 km/h ≈ 27,8 m/s &nbsp;&nbsp; 50 km/h ≈ 13,9 m/s",
        warn: "V enačbe vedno vstavljaj v osnovnih enotah (m, s, kg). Pospešek je v m/s², zato hitrost mora biti v m/s, ne v km/h." },
      { h: "Natančnost meritve",
        p: ["Brez napake zapišemo le tista mesta, ki smo jih zanesljivo izmerili. Pravilo pri računanju: <b>rezultat ima toliko decimalnih mest kot najmanj natančen podatek</b>.",
            "Primer: l₁ = 5,82 m, l₂ = 0,5384 m. Kalkulator da l₁ − l₂ = 5,2816 m, zapišemo pa <b>5,28 m</b>, ker je l₁ znan le na dve decimalki."],
        zv: "rezultat zaokroži na natančnost najmanj natančnega podatka<br>5,82 m − 0,5384 m = 5,28 m" },
      { h: "Opazovalni sistem in dimenzijska analiza",
        p: ["<b>Opazovalni sistem = koordinatni sistem + ure.</b> Izhodišče, smer osi in t = 0 izbereš sama; izberi tako, da je račun najlažji. Fizikalni izidi (npr. ali pride do trka) so od te izbire neodvisni.",
            "<b>Dimenzijska analiza:</b> na obeh straneh enačbe morajo biti enake enote. Na koncu vsakega računa preveri enote: če dobiš maso v m/s, si se zmotila."],
        zv: "opazovalni sistem = koordinatni sistem + ure<br>enote levo = enote desno (preveri vedno!)",
        ex: { q: "Ali je lahko x = v · t² pravilna enačba?", steps: ["desno: m/s · s² = m · s", "levo: m", "m ≠ m · s ⇒ enačba je napačna (prava je x = v · t)"] } },
    ],
    tasks: [
      { q: "Pretvori 72 km/h v m/s in 15 m/s v km/h.", a: "20 m/s; 54 km/h." },
      { q: "Zapiši 2,5 · 10⁻⁷ m s predpono.", a: "250 nm (ali 0,25 μm)." },
      { q: "12,3 m + 0,456 m = ?", a: "12,8 m (12,756 → ena decimalka, ker ima 12,3 eno)." },
      { q: "Izrazi joule z osnovnimi enotami, če veš, da je delo = sila · pot.", a: "1 J = 1 N · m = 1 kg m²/s²." },
      { q: "Preveri enote v enačbi v² = v₀² + 2as.", a: "levo m²/s²; desno m²/s² + m/s² · m = m²/s² ✓" },
      { q: "Koliko je 1 miljá v km in 1 čevelj v cm?", a: "1 milja = 1609 m ≈ 1,61 km; 1 čevelj = 30,48 cm." },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-fiz-prostipad", s: "fiz", t: "kinematika", title: "Prosti pad in navpični met", vaje: "Profesorjevi zapiski: prosti pad · vaje ’24 M2.28, M2.30, M2.26",
    intro: "Prosti pad je enakomerno pospešeno gibanje, kjer je pospešek vedno g ≈ 9,81 m/s² navzdol. Ni nobene nove formule: uporabiš tri enačbe iz kinematike, samo predznake moraš postaviti pravilno.",
    parts: [
      { h: "Kaj je prosti pad",
        p: ["Telo pada prosto, ko nanj deluje samo teža (zračni upor zanemarimo). Vsa telesa takrat padajo z enakim pospeškom <b>g = 9,81 m/s²</b>, ne glede na maso.",
            "Os y usmerimo <b>navzgor</b>, izhodišče na tla. Pospešek kaže dol, zato a = −g."],
        zv: "prosti pad: a = −g (os y gor), g = 9,81 m/s²<br>masa ne vpliva na gibanje" },
      { h: "Spust z višine H (v₀ = 0)",
        p: ["Vstaviš v enačbe enakomerno pospešenega gibanja: y₀ = H, v₀ = 0, a = −g.",
            "Na tla pade, ko je y = 0: H = ½gt², torej t = √(2H/g). Hitrost ob padcu je v = −gt = −√(2gH)."],
        pic: plot({ xmax: 2, ymin: -1, ymax: 5, xl: "t", yl: "y", ticks: false, series: [{ pts: [0, .25, .5, .75, 1, 1.25, 1.5, 1.75, 2].map(t => [t, 4 - t * t]), col: "#e8665a" }], marks: (X, Y) => lbl(X, Y, .05, 4.35, "H", "#e8665a") + lbl(X, Y, 1.05, 1.6, "y = H − ½gt²", "var(--text)") }),
        zv: "v = −gt &nbsp;&nbsp; y = H − ½gt²<br>čas padca: t = √(2H/g) &nbsp;&nbsp; hitrost: |v| = √(2gH)",
        ex: { q: "Žogica pade z višine 2 m. Koliko časa pada? (zapiski)", steps: ["0 = 2 − ½ · 9,81 · t²", "t = √(2 · 2 / 9,81) = 0,64 s"] } },
      { h: "Navpični met: začetna hitrost v₀",
        p: ["Če telo vržeš, ima začetno hitrost. Navzdol: v₀ < 0, navzgor: v₀ > 0. Pospešek je v obeh primerih −g.",
            "Pri metu navzgor se telo dviga, dokler ni v = 0 (vrh), nato pada. Na vrhu je hitrost 0, pospešek pa še vedno −g!",
            "Enako velja za vse, kar »odvržeš« iz gibajočega telesa: vreča iz balona, ki se dviga z 12 m/s, ima ob spustu v₀ = +12 m/s, ne 0."],
        pic: `<div class="vrow">${plot({ xmax: 4, ymin: 0, ymax: 5, xl: "t", yl: "y", ticks: false, series: [{ pts: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5].map(t => [t, 1 + 2.4 * t - .75 * t * t]), col: "#5ec2d6" }], marks: (X, Y) => lbl(X, Y, 1.3, 4.6, "vrh: v = 0", "#5ec2d6") })}${plot({ xmax: 4, ymin: -3, ymax: 3, xl: "t", yl: "v", ticks: false, series: [{ pts: [[0, 2.4], [3.5, -2.85]], col: "#5ec2d6" }], marks: (X, Y) => lbl(X, Y, 2, 1.8, "naklon = −g", "var(--text)") })}</div>`,
        zv: "v = v₀ − gt &nbsp;&nbsp; y = y₀ + v₀t − ½gt²<br>v² = v₀² − 2g(y − y₀)<br>vrh: v = 0 ⇒ t = v₀/g, h = v₀²/(2g)",
        ex: { q: "Kamen vržeš navzdol z 5 m/s z višine 2 m. Koliko časa pada? (zapiski)", steps: ["0 = 2 − 5t − 4,905t²", "4,905t² + 5t − 2 = 0", "t = (−5 + √(25 + 39,2)) / 9,81 = 0,31 s"] } },
      { h: "Dva načina s predznaki",
        p: ["Asistent na vajah je pokazal: s predznaki lahko delaš na dva načina.",
            "<b>a) Predznaki v podatkih</b> (boljše na dolgi rok): formula je vedno x = x₀ + v(t − t₀), v pa je lahko negativen, npr. v = −5,0 m/s.",
            "<b>b) Improvizacija</b>: v = 5,0 m/s, formulo prilagodiš: x = x₀ − v(t − t₀). Deluje pri preprostih nalogah, pri težjih pa hitro zafrknemo: če napišeš v = v₀ − at, moraš potem pisati tudi v² = v₀² − 2a(x − x₀)!"],
        zv: "predznake drži v PODATKIH, formule pusti vedno enake:<br>v = v₀ + at, x = x₀ + v₀t + ½at², v² = v₀² + 2a(x − x₀)",
        warn: "Najpogostejša napaka: pri metu navzgor vzameš a = +g ali pozabiš, da ima odvrženo telo hitrost tistega, iz česar pade." },
    ],
    tasks: [
      { q: "Kamen spustiš z 45 m. Čas padanja in hitrost ob tleh? (g = 10 m/s² za lažji račun)", a: "t = 3 s; v = 30 m/s navzdol." },
      { q: "Žogo vržeš navpično gor z 15 m/s. Kako visoko pride in kdaj?", a: "t = 15/9,81 = 1,53 s; h = 15²/(2 · 9,81) = 11,5 m." },
      { q: "Ista žoga: kdaj se vrne v roko in s kolikšno hitrostjo?", a: "Po 3,06 s (dvakrat čas do vrha), s 15 m/s navzdol." },
      { q: "Balon se dviga z 12 m/s; na višini 80 m spusti vrečo. Koliko časa pada? (vaje M2.30)", a: "5,44 s; prileti z 41,4 m/s.", steps: ["0 = 80 + 12t − 4,905t²", "t = (12 + √(144 + 1569,6)) / 9,81"] },
      { q: "Iz višine 40 m spustiš kamen, 1 s kasneje vržeš drugega navzdol. Kolikšna mora biti v₀, da padeta skupaj? (vaje M2.28)", a: "≈ 12,5 m/s", steps: ["prvi: t = √(80/9,81) = 2,86 s", "drugi: 40 = v₀ · 1,86 + 4,905 · 1,86²"] },
    ] },

  // ═══════════════════════════════════════════════
  { id: "z-fiz-splosno", s: "fiz", t: "kinematika", title: "Splošno gibanje: hitrost je odvod, premik je integral", vaje: "Profesorjevi zapiski m10–m14 · Matematika: odvod in integral",
    intro: "Doslej sta bila hitrost ali pospešek stalna. Kaj pa, ko x(t) ni ne premica ne parabola? Potem rabiš odvod in integral, ki ju delaš pri matematiki. Fizika in matematika se tu prvič srečata: to ni nova snov, le stara snov, povedana splošno.",
    parts: [
      { h: "Hitrost = odvod lege",
        p: ["Pri splošnem gibanju je x(t) poljubna zvezna funkcija časa. <b>Povprečna hitrost</b> na intervalu [t₀, t₁] je v̄ = Δx/Δt, naklon daljice.",
            "<b>Trenutna hitrost</b> je odvod: v(t) = dx/dt = ẋ(t). Grafično je to naklon tangente na x(t): tg φ = dx/dt.",
            "Pika nad črko (ẋ) je fizikalni zapis za odvod po času."],
        pic: plot({ xmax: 5, ymin: -1, ymax: 5, xl: "t", yl: "x", ticks: false, series: [{ pts: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map(t => [t, 2 + 1.6 * Math.sin(t * 1.2)]), col: "#e8665a" }, { pts: [[0.2, 1.6], [2.2, 4.6]], col: "#7fcf86", w: 2, dash: 1 }], marks: (X, Y) => lbl(X, Y, 2.2, 4.75, "tangenta: v = dx/dt", "#7fcf86") }),
        zv: "v̄ = Δx/Δt &nbsp;&nbsp; v(t) = dx/dt = ẋ(t) (naklon tangente)" },
      { h: "Premik = integral hitrosti",
        p: ["Obratno: v kratkem času dt se telo premakne za dx = v(t) dt. Vse kratke premike sešteješ in dobiš integral: <b>x(t₁) = x₀ + ∫ v(t) dt</b> od t₀ do t₁.",
            "Grafično je integral ploščina pod v(t). Kjer je v < 0, ploščino štejemo negativno.",
            "<b>Pot</b> s (kar pokaže števec kilometrov) pa šteje vse pozitivno: s = ∫|v(t)| dt. Zato je pot vedno ≥ 0, premik pa ima lahko predznak."],
        pic: plot({ xmax: 5, ymax: 4, xl: "t", yl: "v", ticks: false, fills: [{ pts: [[1, 0], ...[1, 1.5, 2, 2.5, 3, 3.5, 4].map(t => [t, .8 + .15 * t * t]), [4, 0]], col: "#5ec2d6" }], series: [{ pts: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map(t => [t, .8 + .15 * t * t]), col: "#5ec2d6" }], marks: (X, Y) => lbl(X, Y, 1.9, .9, "Δx = ∫v dt", "var(--text)") }),
        zv: "x(t₁) = x₀ + ∫<sub>t₀</sub><sup>t₁</sup> v(t) dt (ploščina pod v(t))<br>pot: s = ∫|v(t)| dt ≥ 0 &nbsp;&nbsp; velikost hitrosti |v| (speed)" },
      { h: "Pospešek in zemljevid povezav",
        p: ["Enako kot hitrost iz lege dobiš pospešek iz hitrosti: <b>a(t) = dv/dt = d²x/dt²</b>, drugi odvod lege. Obratno: v(t₁) = v₀ + ∫ a(t) dt.",
            "Če imata a in v enak predznak, telo pospešuje (|v| raste). Če imata nasprotna predznaka, zavira.",
            "Desno gre z odvajanjem, levo z integriranjem. Pri integriranju rabiš še začetno vrednost (x₀ ali v₀): to je »+ C« iz matematike."],
        pic: linkPic,
        zv: "a = dv/dt = d²x/dt² = ẍ<br>x —(d/dt)→ v —(d/dt)→ a &nbsp;&nbsp; a —(∫ + v₀)→ v —(∫ + x₀)→ x<br>a, v enak predznak ⇒ pospešuje; nasproten ⇒ zavira" },
      { h: "Primer 1: trajekt, x(t) je dan",
        p: ["Oddaljenost trajekta od pomola je x(t) = x₀ + At³ + Bt, x₀ = 20 m, A = 5 · 10⁻⁴ m/s³, B = 2 m/s. Kje je čez 1 min in kako hitro pluje?",
            "Najprej odvajaj splošno, šele nato vstavi čas!"],
        zv: "x(t) dan ⇒ v = dx/dt (odvajaj, nato vstavi t)",
        ex: { q: "Trajekt: x(60 s), v(60 s) in povprečna hitrost.", steps: [
          "x(60) = 20 + 5 · 10⁻⁴ · 216 000 + 2 · 60 = 20 + 108 + 120 = 248 m",
          "v(t) = 3At² + B ⇒ v(60) = 3 · 5 · 10⁻⁴ · 3600 + 2 = 5,4 + 2 = 7,4 m/s",
          "v̄ = (248 − 20) / 60 = 3,8 m/s"] } },
      { h: "Primer 2: trajekt, v(t) je dan",
        p: ["Drugi dan merimo hitrost: v(t) = Ct + Dt², C = 3 · 10⁻² m/s², D = 4 · 10⁻⁴ m/s³, x₀ = 20 m. Zdaj hitrost dobiš z vstavljanjem, lego pa z integriranjem."],
        zv: "v(t) dan ⇒ x = x₀ + ∫v dt (integriraj)",
        ex: { q: "Trajekt: v(60 s) in x(60 s).", steps: [
          "v(60) = 0,03 · 60 + 4 · 10⁻⁴ · 3600 = 1,8 + 1,44 = 3,24 m/s",
          "x(t) = x₀ + Ct²/2 + Dt³/3",
          "x(60) = 20 + 54 + 28,8 = 102,8 m; v̄ = 82,8 / 60 = 1,38 m/s"] } },
      { h: "Primer 3: lokomotiva, a(t) = A e<sup>−t/τ</sup>",
        p: ["Miniaturna lokomotiva zavira s pojemkom, ki s časom pojema: a = −A e<sup>−t/τ</sup>, A = 2 m/s², τ = 5 s, v₀ = 0,8 m/s. Kdaj pade hitrost na 1 % začetne?",
            "Integriraš: v(t) = v₀ − A ∫ e<sup>−t/τ</sup> dt = v₀ + Aτ(e<sup>−t/τ</sup> − 1)."],
        pic: plot({ xmax: 5, ymax: 2.2, xl: "t", yl: "|a|", ticks: false, series: [{ pts: [0, .25, .5, 1, 1.5, 2, 3, 4, 5].map(t => [t, 2 * Math.exp(-t / 1.5)]), col: "#e8665a" }] }),
        zv: "v(t) = v₀ + ∫a dt &nbsp;&nbsp; ∫e<sup>−t/τ</sup>dt = −τe<sup>−t/τ</sup>",
        ex: { q: "Kdaj je v = v₀/100?", steps: [
          "v₀/100 = v₀ + Aτ(e<sup>−t/τ</sup> − 1)",
          "e<sup>−t/τ</sup> = 1 − 0,99 · v₀/(Aτ) = 1 − 0,0792 = 0,9208",
          "t = −τ ln 0,9208 = −5 s · (−0,0825) = 0,41 s"] } },
      { h: "Gibanje v 3D: vse po komponentah",
        p: ["Lega je vektor r(t) = (x(t), y(t), z(t)). Vse zgoraj velja za vsako komponento posebej: v = (ẋ, ẏ, ż), a = (v̇<sub>x</sub>, v̇<sub>y</sub>, v̇<sub>z</sub>).",
            "Velikosti dobiš s Pitagoro: |v| = √(v<sub>x</sub>² + v<sub>y</sub>² + v<sub>z</sub>²). Kot med v in a dobiš s <b>skalarnim produktom</b> (linearna algebra!): cos γ = (a · v)/(a v).",
            "V ravnini (2D): če poznaš velikost v in kot φ z osjo x, je v<sub>x</sub> = v cos φ, v<sub>y</sub> = v sin φ.",
            "Če sta a in v vzporedna, je gibanje premo. Če je a pravokoten na v, telo kroži (velikost hitrosti se ne spreminja)."],
        zv: "r = (x, y, z), v = dr/dt, a = dv/dt (po komponentah)<br>|v| = √(v<sub>x</sub>² + v<sub>y</sub>² + v<sub>z</sub>²) &nbsp;&nbsp; cos γ = a·v/(a v)<br>2D: v<sub>x</sub> = v cos φ, v<sub>y</sub> = v sin φ" },
    ],
    tasks: [
      { q: "x(t) = 3t² − 2t + 1 (m, s). Določi v(t) in a(t). Kdaj telo miruje?", a: "v = 6t − 2, a = 6 m/s²; miruje pri t = 1/3 s." },
      { q: "v(t) = 4 − 2t (m/s), x₀ = 0. Premik in pot v prvih 4 s?", a: "Premik ∫(4 − 2t)dt = 16 − 16 = 0 m; pot = 4 + 4 = 8 m (pri t = 2 s se obrne).", steps: ["x(t) = 4t − t²", "obrat pri v = 0 ⇒ t = 2 s, x(2) = 4 m", "nazaj do x(4) = 0"] },
      { q: "a(t) = 6t (m/s²), v₀ = 0, x₀ = 0. Kje je telo pri t = 2 s?", a: "v = 3t², x = t³ ⇒ x(2) = 8 m." },
      { q: "r(t) = (2t, t², 0) m. Velikost hitrosti pri t = 1 s? Kot med v in a?", a: "v = (2, 2t, 0) ⇒ |v(1)| = 2√2 ≈ 2,83 m/s; a = (0, 2, 0); cos γ = 4/(2 · 2√2) = 1/√2 ⇒ γ = 45°." },
      { q: "Ali je lahko hitrost 0, pospešek pa ne?", a: "Da: na vrhu navpičnega meta je v = 0, a = −g." },
    ] },
];

// vstavi v pravilnem vrstnem redu: merjenje pred kinematiko, ostalo za njo
(() => {
  const iK = NOTES.findIndex(n => n.id === "z-fiz-kinematika");
  if (iK < 0) { NOTES.push(...NEW_FIZ); return; }
  NOTES.splice(iK + 1, 0, NEW_FIZ[1], NEW_FIZ[2]);
  NOTES.splice(iK, 0, NEW_FIZ[0]);
})();
