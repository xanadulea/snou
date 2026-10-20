// ─────────────────────────────────────────────────────────────
//  snou — dnevnik in roki.
//  To datoteko posodablja Claude, ko mu poveš, kaj si naredila.
//
//  LOG:   en vnos na dan
//         items:  kaj si naredila  { s: id predmeta, txt: "…" }
//         status: nova ocena tem   { id_teme: 0 | 1 | 2 }  (ne znam | vadim | znam)
//  TASKS: roki — poročila, naloge, oddaje
//         { date: "LLLL-MM-DD", s: id predmeta, txt: "…", done: false }
// ─────────────────────────────────────────────────────────────

const LOG = [
  { date: "2026-10-20", items: [
      { s: "la", txt: "Injektivnost, surjektivnost, linearne preslikave, matrike" },
      { s: "mat", txt: "Dedekindov aksiom, gostota ℚ in iracionalnih, decimalni zapis" },
      { s: "mat", txt: "Absolutna vrednost, intervali" },
      { s: "fiz", txt: "Hipotezi 1 in 2: sile na žogo, ko jo dvigneš" },
    ], status: {} },
  { date: "2026-10-19", items: [
      { s: "la", txt: "Predavanje: linearne preslikave in matrike" },
    ], status: {} },
  { date: "2026-10-17", items: [
      { s: "rp", txt: "Postavila snou — zemljevid vseh predmetov" },
    ], status: {} },
];

const TASKS = [];
