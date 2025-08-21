import { Chapter, Flashcard } from "@/types/rust-learning";

// Increment this when you update `rustChapters` so clients invalidate localStorage
export const RUST_CHAPTERS_VERSION = 1;

// Sample flashcards for demonstration - in a real app these would be more comprehensive
const createSampleFlashcards = (
  chapterTitle: string,
  count: number
): Flashcard[] => {
  const flashcards: Flashcard[] = [];

  for (let i = 1; i <= count; i++) {
    flashcards.push({
      id: `${chapterTitle.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      rule: `Regola ${i} - ${chapterTitle}`,
      explanation: `Spiegazione concisa della regola ${i} per ${chapterTitle}. Questa è una spiegazione di esempio che illustra i concetti fondamentali.`,
      codeExample: `// Esempio di codice per ${chapterTitle} - Regola ${i}
fn main() {
    println!("Hello, Rust!");
    // Codice di esempio specifico per questa regola
    let variable = "esempio";
}`,
      status: "not-started",
    });
  }

  return flashcards;
};

export const rustChapters: Chapter[] = [
  {
    id: "intro",
    title: "Introduzione al linguaggio",
    description:
      "Concetti base di Rust: sintassi, variabili, funzioni e principi fondamentali",
    icon: "🦀",
    flashcards: [
      {
        id: "intro-1",
        rule: "Proprietà e Possesso",
        explanation:
          "Ogni valore ha un solo proprietario. Il possesso può essere trasferito o condiviso tramite riferimenti, evitando errori di memoria.",
        codeExample: `let s = String::from("ciao");
let t = s; // possesso trasferito
// println!("{}", s); // ❌ errore: s non è più valido
println!("{}", t);`,
        status: "not-started",
      },
      {
        id: "intro-2",
        rule: "Sicurezza dei puntatori",
        explanation:
          "I riferimenti vengono verificati dal compilatore per garantire accesso sicuro ai dati.",
        codeExample: `let v = vec![1, 2, 3];
let r = &v[0]; // riferimento sicuro
println!("Primo elemento: {}", r);`,
        status: "not-started",
      },
      {
        id: "intro-3",
        rule: "Race condition evitate",
        explanation:
          "Rust impedisce accessi concorrenti non sicuri alla stessa variabile mutabile.",
        codeExample: `use std::thread;

let mut x = 0;
let handle = thread::spawn(move || {
    // variabile spostata nel thread
    println!("x = {}", x);
});
handle.join().unwrap();`,
        status: "not-started",
      },
      {
        id: "intro-4",
        rule: "Assenza di null",
        explanation:
          "Al posto dei puntatori nulli, Rust usa Option che obbliga il controllo esplicito.",
        codeExample: `fn divide(a: i32, b: i32) -> Option<i32> {
    if b == 0 { None } else { Some(a / b) }
}

match divide(10, 0) {
    Some(val) => println!("Risultato: {}", val),
    None => println!("Divisione per zero!"),
}`,
        status: "not-started",
      },
      {
        id: "intro-5",
        rule: "Nessun Garbage Collector",
        explanation:
          "La memoria viene liberata automaticamente quando la variabile esce dallo scope.",
        codeExample: `{
    let s = String::from("ciao");
    // s valido
} // ✅ s viene automaticamente deallocato`,
        status: "not-started",
      },
      {
        id: "intro-6",
        rule: "Dichiarazione variabili",
        explanation:
          "Per default le variabili sono immutabili, diventano mutabili con mut.",
        codeExample: `let x = 5;
// x = 6; // ❌ errore
let mut y = 5;
y = 6; // ✅ mutabile`,
        status: "not-started",
      },
      {
        id: "intro-7",
        rule: "Tipizzazione statica con inferenza",
        explanation:
          "Il compilatore conosce i tipi a compile time e spesso li deduce automaticamente.",
        codeExample: `let a = 10;        // dedotto come i32
let b: u64 = 20;   // specificato`,
        status: "not-started",
      },
      {
        id: "intro-8",
        rule: "Macro espanse a compile time",
        explanation: "Le macro generano codice prima della compilazione.",
        codeExample: `println!("Il risultato è: {}", 2 + 3);`,
        status: "not-started",
      },
      {
        id: "intro-9",
        rule: "I/O su file",
        explanation:
          "Lettura e scrittura si fanno con File e i metodi di std::fs.",
        codeExample: `use std::fs::File;
use std::io::Write;

let mut f = File::create("test.txt").unwrap();
f.write_all(b"Hello Rust!").unwrap();`,
        status: "not-started",
      },
      {
        id: "intro-10",
        rule: "Moduli e crate",
        explanation:
          "Un crate è l'unità di compilazione; i moduli organizzano il codice in spazi logici.",
        codeExample: `// main.rs
mod util;

fn main() {
    util::saluta();
}

// util.rs
pub fn saluta() {
    println!("Ciao dal modulo!");
}`,
        status: "not-started",
      },
    ],
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "ownership",
    title: "Possesso e prestiti",
    description: "Sistema di ownership, borrowing e lifetime di Rust",
    icon: "🔒",
    flashcards: createSampleFlashcards("Possesso e prestiti", 12),
    totalCards: 12,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "compound-types",
    title: "Tipi Composti",
    description: "Struct, enum, tuple e pattern matching",
    icon: "🧩",
    flashcards: createSampleFlashcards("Tipi Composti", 10),
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "polymorphism",
    title: "Polimorfismo",
    description: "Traits, generics e implementazioni polimorfiche",
    icon: "🔄",
    flashcards: createSampleFlashcards("Polimorfismo", 9),
    totalCards: 9,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "lifetime",
    title: "Lifetime",
    description: "Gestione avanzata dei lifetime e annotazioni",
    icon: "⏱️",
    flashcards: createSampleFlashcards("Lifetime", 8),
    totalCards: 8,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "closures",
    title: "Closures",
    description: "Funzioni anonime e cattura di variabili",
    icon: "📦",
    flashcards: createSampleFlashcards("Closures", 7),
    totalCards: 7,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "error-handling",
    title: "Gestione degli errori",
    description: "Result, Option e pattern di gestione degli errori",
    icon: "⚠️",
    flashcards: createSampleFlashcards("Gestione degli errori", 10),
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "iterators",
    title: "Iteratori",
    description: "Iterator trait, lazy evaluation e functional programming",
    icon: "🔄",
    flashcards: createSampleFlashcards("Iteratori", 8),
    totalCards: 8,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "collections",
    title: "Collezioni",
    description: "Vec, HashMap, HashSet e altre strutture dati",
    icon: "📚",
    flashcards: createSampleFlashcards("Collezioni", 9),
    totalCards: 9,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "io",
    title: "Input / Output",
    description: "File I/O, networking e gestione dei flussi di dati",
    icon: "💾",
    flashcards: createSampleFlashcards("Input / Output", 8),
    totalCards: 8,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "smart-pointers",
    title: "Smart pointers",
    description: "Box, Rc, RefCell e gestione avanzata della memoria",
    icon: "🎯",
    flashcards: createSampleFlashcards("Smart pointers", 10),
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "modules",
    title: "Moduli",
    description: "Organizzazione del codice, crate e sistema di moduli",
    icon: "📂",
    flashcards: createSampleFlashcards("Moduli", 7),
    totalCards: 7,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "testing",
    title: "Test",
    description: "Unit test, integration test e testing patterns",
    icon: "🧪",
    flashcards: createSampleFlashcards("Test", 6),
    totalCards: 6,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "channels",
    title: "Canali",
    description: "Comunicazione tra thread con canali e message passing",
    icon: "📡",
    flashcards: createSampleFlashcards("Canali", 8),
    totalCards: 8,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "concurrency",
    title: "Concorrenza",
    description: "Thread, sincronizzazione e programmazione concorrente",
    icon: "🔀",
    flashcards: createSampleFlashcards("Concorrenza", 10),
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "processes",
    title: "Processi",
    description: "Gestione di processi esterni e system programming",
    icon: "⚙️",
    flashcards: createSampleFlashcards("Processi", 7),
    totalCards: 7,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "async",
    title: "Programmazione asincrona",
    description: "Async/await, Future trait e runtime asincroni",
    icon: "🚀",
    flashcards: createSampleFlashcards("Programmazione asincrona", 12),
    totalCards: 12,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    description: "Pattern e tecniche per risolvere problemi complessi",
    icon: "💡",
    flashcards: createSampleFlashcards("Problem Solving", 15),
    totalCards: 15,
    completedCards: 0,
    reviewCards: 0,
  },
];
