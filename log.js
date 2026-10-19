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
  { date: "2026-10-19", items: [
      { s: "la", txt: "Predavanje: linearne preslikave in matrike" },
    ], status: {} },
  { date: "2026-10-17", items: [
      { s: "rp", txt: "Postavila snou — zemljevid vseh predmetov" },
    ], status: {} },
];

const TASKS = [];
