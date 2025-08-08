## 🔐 Sicurezza

Rust è stato progettato per garantire la **sicurezza del sistema** attraverso un sistema di tipi avanzato:

- **Proprietà e Possesso**: ogni valore ha un singolo proprietario. Il possesso può essere trasferito o condiviso tramite riferimenti, evitando *dangling pointers* e *double free*.
- **Controllo dei Puntatori**: l'accesso ai dati tramite puntatori è verificato a compile time, anche tra thread.
- **Sicurezza nei Thread**: il compilatore impedisce *race condition* verificando il trasferimento sicuro di dati tra thread.
- **Stato esplicito**: errori comuni come `null` sono trattati tramite tipi come `Option`, rendendo obbligatorio il controllo esplicito da parte del programmatore.

---

## ⚡ Prestazioni

Rust massimizza **velocità ed efficienza**:

- **Nessun Garbage Collector**: la memoria viene liberata automaticamente al termine del ciclo di vita della variabile.
- **Ottimizzazione del Codice**: il compilatore produce codice snello, cache-friendly e altamente ottimizzato.
- **System Calls e FFI**: Rust interagisce direttamente con il sistema operativo o con linguaggi esterni (es. C) tramite FFI.

---

## 🧠 Tipizzazione e Inferenza

- **Tipizzazione statica e forte**: ogni tipo è noto a compile time.
- **Inferenza intelligente**: il compilatore deduce i tipi, riducendo gli errori e migliorando la leggibilità.
- **Controllo della memoria**: la tipizzazione consente un uso rigoroso delle risorse.

---

## 🎯 Obiettivi Generali

- **Programmazione sicura e concorrente**
- **Astrazioni senza costi aggiuntivi**
- **Produttività**: grazie a Cargo, sistema di testing e tool integrati.

---

## 🧱 Concetti fondamentali

- **Crate**: unità di compilazione; può essere un binario (eseguibile) o una libreria.
- **Crate Root**: punto d’ingresso del crate (`main.rs` o `lib.rs`).
- **Modulo**: spazio di nomi logico, che può contenere funzioni, tipi e sottosistemi.
- **Package**: insieme di crate + `Cargo.toml`.

---

## 📂 Struttura di progetto

- Moduli in file accanto a `main.rs`, o in cartelle con `mod.rs`.
- Punto d’ingresso: `fn main()`.
- Output su stdout: `println!()`; su stderr: `eprintln!()`.

---

## 📝 Variabili

- Dichiarate con `let`.
- Tipi dedotti, ma possono essere espliciti: `let x: i32 = 13;`.
- Immutabili per default; mutabili con `let mut`.

---

## 🧰 Macro

- Espanse a compile time.
- Esempio: `println!()` genera codice prima della compilazione.

---

## 🔢 Tipi interi

- Fissi: `i8`, `u8`, `i32`, `u32`, ...
- Architettura-dipendenti: `isize`, `usize`.

---

## 🧾 Formattazione con `println!()`

- `println!("{:x}", num)` stampa un numero in esadecimale.
- `println!("{:p}", ptr)` stampa l'indirizzo di memoria di un puntatore.

---

## 📥 Input console

- Usa `std::io` e `.read_line()` con `.expect()` per gestire gli errori.

---

## 📂 I/O su file

- **Lettura**: `File::open()` + `BufReader` + `.lines()`.
- **Scrittura**: `File::create()` + `.write_all()`.

---

## 📁 Elenco directory

- Usa `fs::read_dir()` e un ciclo `for` per iterare i contenuti.
- `.display()` restituisce una stringa leggibile del path.

---

## 📚 Glossario

- **Type inference**: deduzione automatica dei tipi.
- **Cargo**: strumento di build e pacchettizzazione.
- **Paradigma imperativo**: modifiche di stato esplicite.
- **Crate**: unità compilabile.
- **Crate root**: file iniziale del crate.
- **Module**: unità logica del codice.
- **Package**: gruppo di crate.
- **Macro**: codice generato a compile time.

---
