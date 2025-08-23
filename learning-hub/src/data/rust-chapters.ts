import { Chapter, Flashcard } from "@/types/rust-learning";

// Increment this when you update `rustChapters` so clients invalidate localStorage
export const RUST_CHAPTERS_VERSION = 2;

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
    id: "memory-management",
    title: "Gestione della memoria",
    description: "Stack, heap, allocazione e deallocazione automatica in Rust",
    icon: "🧠",
    flashcards: [
      {
        id: "memory-1",
        rule: "Variabili globali",
        explanation:
          "In Rust possono essere dichiarate con static o const. Sono inizializzate all'avvio e restano valide per tutto il programma.",
        codeExample: `static G: i32 = 42;

fn main() {
    println!("Globale: {}", G);
}`,
        status: "not-started",
      },
      {
        id: "memory-2",
        rule: "Variabili locali",
        explanation:
          "Sono allocate nello stack e vivono solo finché dura la funzione o il blocco.",
        codeExample: `fn main() {
    let x = 10; // locale nello stack
    println!("x = {}", x);
} // x deallocata automaticamente qui`,
        status: "not-started",
      },
      {
        id: "memory-3",
        rule: "Allocazione dinamica",
        explanation:
          "In Rust lo heap si gestisce con tipi come Box, Vec, String.",
        codeExample: `fn main() {
    let p = Box::new(5); // allocato nello heap
    println!("Valore: {}", p);
} // p viene liberato automaticamente`,
        status: "not-started",
      },
      {
        id: "memory-4",
        rule: "Allocazione vettori dinamici",
        explanation:
          "Vec<T> permette di gestire memoria dinamica per array ridimensionabili.",
        codeExample: `fn main() {
    let mut v = Vec::new();
    v.push(10);
    v.push(20);
    println!("{:?}", v);
}`,
        status: "not-started",
      },
      {
        id: "memory-5",
        rule: "Ridimensionamento dinamico",
        explanation:
          "Con Vec lo heap cresce automaticamente al bisogno, senza realloc manuali.",
        codeExample: `fn main() {
    let mut v = vec![1, 2, 3];
    v.extend_from_slice(&[4, 5, 6]);
    println!("{:?}", v); // [1,2,3,4,5,6]
}`,
        status: "not-started",
      },
      {
        id: "memory-6",
        rule: "Memory leak",
        explanation:
          "In Rust i leak sono rari, ma possono accadere con std::mem::forget.",
        codeExample: `fn main() {
    let v = vec![1, 2, 3];
    std::mem::forget(v); // leak: memoria non liberata
}`,
        status: "not-started",
      },
      {
        id: "memory-7",
        rule: "Double free evitato",
        explanation:
          "In Rust il sistema di possesso garantisce che un valore venga liberato una sola volta.",
        codeExample: `fn main() {
    let s = String::from("ciao");
    let t = s; // possesso trasferito
    // println!("{}", s); // ❌ errore: s non più valido
    println!("{}", t);
}`,
        status: "not-started",
      },
      {
        id: "memory-8",
        rule: "Dangling pointer evitato",
        explanation: "Rust non permette riferimenti a memoria invalidata.",
        codeExample: `fn dangling() -> &String {
    let s = String::from("ciao");
    &s // ❌ errore a compile time
}`,
        status: "not-started",
      },
      {
        id: "memory-9",
        rule: "Gestione di valori opzionali (Option)",
        explanation:
          "In Rust non esiste null; si usa Option e si controlla prima di dereferenziare.",
        codeExample: `fn main() {
    let x: Option<i32> = None;
    if let Some(val) = x {
        println!("{}", val);
    } else {
        println!("Nessun valore");
    }
}`,
        status: "not-started",
      },
      {
        id: "memory-10",
        rule: "Buona pratica con Box e puntatori",
        explanation:
          "Dopo l'uso di memoria nello heap, Rust dealloca automaticamente; non serve delete.",
        codeExample: `fn main() {
    let buf = Box::new([0; 100]); // heap
    println!("Len = {}", buf.len());
} // buf liberato in automatico`,
        status: "not-started",
      },
    ],
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "variables-pointers",
    title: "Variabili e Puntatori",
    description:
      "Dichiarazione, tipizzazione, shadowing e fondamentali di puntatori/heap in Rust",
    icon: "🧰",
    flashcards: [
      {
        id: "vp-1",
        rule: "Dichiarazione e mutabilità",
        explanation:
          "Le variabili si dichiarano con let. Sono immutabili di default; con mut diventano modificabili.",
        codeExample:
          "let x = 10;     // immutabile\nlet mut y = 5;  // mutabile\ny = y + 1;",
        status: "not-started",
      },
      {
        id: "vp-2",
        rule: "Tipizzazione statica e inferenza",
        explanation:
          "Ogni variabile ha un tipo noto a compile-time, dedotto o esplicito. I numeri possono usare _ per leggibilità.",
        codeExample:
          "let a: i32 = 123;\nlet b = 3.14; // f64\nlet big = 1_000_000;",
        status: "not-started",
      },
      {
        id: "vp-3",
        rule: "Macro di stampa",
        explanation:
          "println! e print! scrivono su stdout; eprintln! ed eprint! su stderr. Sono macro, non funzioni.",
        codeExample:
          'println!("Hello, {}!", "world");\neprintln!("Errore critico");',
        status: "not-started",
      },
      {
        id: "vp-4",
        rule: "Shadowing e scope",
        explanation:
          "Lo shadowing ridefinisce una variabile anche con tipo diverso; con mut cambi solo il valore, non il tipo.",
        codeExample:
          'let n = 5;\nlet n = "ciao"; // shadowing\nprintln!("{}", n);',
        status: "not-started",
      },
      {
        id: "vp-5",
        rule: "Espressioni, tipo Never e char",
        explanation:
          "Blocchi e if sono espressioni che producono valori. Il tipo ! rappresenta funzioni che non ritornano. char è Unicode a 32 bit.",
        codeExample:
          "let z = { 2 + 3 };\nfn errore() -> ! { panic!(\"Errore\"); }\nlet emoji = '😻';",
        status: "not-started",
      },
      {
        id: "vp-6",
        rule: "Riferimenti e restrizioni",
        explanation:
          "I riferimenti (&T, &mut T) permettono accesso condiviso o mutabile. Non puoi avere un riferimento mutabile mentre esistono riferimenti immutabili. Non si può creare un riferimento mutabile a una costante.",
        codeExample:
          'fn main() {\n    let mut x = 10;\n    let r1 = &x;          // ref immutabile\n    // let r2 = &mut x;   // ❌ errore borrow\n    println!("r1 = {}", r1);\n}',
        status: "not-started",
      },
      {
        id: "vp-7",
        rule: "Stack, heap e Box",
        explanation:
          "Le variabili locali vivono nello stack e si liberano a fine scope. Per valori grandi o con vita più lunga si usa l’heap. Box<T> alloca nello heap e dà possesso semplice (unico proprietario).",
        codeExample:
          'fn main() {\n    let b = Box::new((5, 2));\n    println!("Secondo: {}", b.1);\n} // `b` liberato automaticamente',
        status: "not-started",
      },
      {
        id: "vp-8",
        rule: "Ownership, lifetimes e unsafe",
        explanation:
          "Ogni valore ha un solo proprietario. I lifetimes evitano dangling reference. unsafe = il programmatore si assume la responsabilità per operazioni non garantite sicure (es. dereferenziare raw pointer).",
        codeExample:
          'fn main() {\n    let x = 42;\n    let r: *const i32 = &x;\n    unsafe {\n        println!("x = {}", *r); // responsabilità del programmatore\n    }\n}',
        status: "not-started",
      },
      {
        id: "vp-9",
        rule: "Array e slice",
        explanation:
          "Gli array [T; N] hanno lunghezza fissa e vivono nello stack. Le slice (&[T], &mut [T]) sono fat pointer: indirizzo base + lunghezza, così il compilatore sa quanti elementi sono accessibili. Accesso sicuro con .get() restituisce Option.",
        codeExample:
          'fn main() {\n    let a = [1, 2, 3, 4];\n    let s = &a[1..3]; // fat pointer = (indirizzo, lunghezza)\n    if let Some(val) = a.get(2) {\n        println!("Elemento: {}", val);\n    }\n    println!("slice = {:?}", s);\n}',
        status: "not-started",
      },
      {
        id: "vp-10",
        rule: "Borrow checker e gestione mutabilità",
        explanation:
          "Non puoi usare una variabile mentre è attivo un borrow mutabile. Soluzioni: racchiudere il borrow in un blocco o chiamare drop().",
        codeExample:
          'fn main() {\n    let mut a = [1, 2, 3, 4];\n    {\n        let s2 = &mut a[0..2];\n        s2[0] = 10;\n    } // borrow rilasciato\n    println!("array {:?}", a); // ✅ ora funziona\n}',
        status: "not-started",
      },
    ],
    totalCards: 10,
    completedCards: 0,
    reviewCards: 0,
  },

  {
    id: "review-1",
    title: "Ripasso #1",
    description:
      "Sfide di verifica su borrowing, slice e mutabilità in Rust (con soluzioni spiegate).",
    icon: "🧩",
    challenges: [
      {
        id: "ch-1",
        prompt: "Per quale motivo non compila?",
        code: 'fn main() {\n    let mut a = [1, 2, 3, 4];\n    let s2 = &mut a[0..2];\n    s2[0] = 10;\n    println!("array {:?}", a);\n    println!("slice {:?}", s2);\n}',
        solution:
          'Il borrow checker segnala un conflitto: s2 è un riferimento mutabile all\'array e rimane attivo fino alla sua ultima utilizzazione. La chiamata a println!("array {:?}", a) tenta di accedere a in lettura mentre il prestito mutabile è ancora vivo, violando le regole di esclusività dei borrow.',
        fixes: [
          {
            label: "Chiudi il borrow prima di stampare a",
            code: 'fn main() {\n    let mut a = [1, 2, 3, 4];\n    {\n        let s2 = &mut a[0..2];\n        s2[0] = 10;\n        println!("slice {:?}", s2);\n    } // borrow rilasciato\n    println!("array {:?}", a);\n}',
          },
          {
            label: "Stampa array solo dopo la chiusura dello slice",
            code: 'fn main() {\n    let mut a = [1, 2, 3, 4];\n    {\n        let s2 = &mut a[0..2];\n        s2[0] = 10;\n    } // borrow rilasciato\n    println!("array {:?}", a);\n}',
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-2",
        prompt: "Il codice compila correttamente?",
        code: 'fn main() {\n    let mut i = 32;\n    let r = &i;\n    println!("{}", *r);\n    i = i + 1;\n    let r = &i;\n    println!("{}", *r);\n}',
        solution:
          "Il programma compila ed esegue correttamente. Il primo riferimento r è usato solo fino alla println della riga 4, quindi il borrow termina lì. Successivamente, i viene aggiornato e viene creato un nuovo riferimento r, che non entra in conflitto con il precedente. Output: 32 e poi 33.",
        fixes: [
          {
            label: "Nessuna modifica necessaria",
            code: 'fn main() {\n    let mut i = 32;\n    let r = &i;\n    println!("{}", *r);\n    i = i + 1;\n    let r = &i;\n    println!("{}", *r);\n}',
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-3",
        prompt: "Per quale motivo non compila?",
        code: 'fn main() {\n    let mut v = vec![ 1, 2, 3, 4 ];\n    let slice = &mut v[0..2];\n    v.push(5);\n    println!("slice {:?}", slice);\n}',
        solution:
          "Lo slice mutabile su v mantiene un borrow mutabile attivo sull'intero Vec. La chiamata v.push(5) richiede un altro borrow mutabile e può riallocare, invalidando lo slice: conflitto di borrow + rischio di dangling.",
        fixes: [
          {
            label: "Chiudi il borrow prima di push",
            code: 'fn main() {\n    let mut v = vec![1, 2, 3, 4];\n    {\n        let slice = &mut v[0..2];\n        println!("slice {:?}", slice);\n    } // borrow rilasciato\n    v.push(5);\n}',
          },
          {
            label: "Esegui push prima di creare lo slice",
            code: 'fn main() {\n    let mut v = vec![1, 2, 3, 4];\n    v.push(5);\n    let slice = &mut v[0..2];\n    println!("slice {:?}", slice);\n}',
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-4",
        prompt: "Questo codice è corretto? Spiega perché.",
        code: 'fn main() {\n    let mut a = [ 1, 2, 3, 4 ];\n    let s2 = &mut a[0..2];\n    s2[0] = 10;\n    println!("array {:?}", a);\n    println!("slice {:?}", s2);\n}',
        solution:
          "Non è corretto. Finché esiste il borrow mutabile s2 su a, non puoi usare a (neanche in lettura) perché violeresti la regola: un solo riferimento mutabile OR più riferimenti immutabili, ma non entrambi contemporaneamente.",
        fixes: [
          {
            label: "Limita lo scope del borrow mutabile",
            code: 'fn main() {\n    let mut a = [1, 2, 3, 4];\n    {\n        let s2 = &mut a[0..2];\n        s2[0] = 10;\n        println!("slice {:?}", s2);\n    } // s2 rilasciato\n    println!("array {:?}", a);\n}',
          },
          {
            label: "Rilascia esplicitamente il borrow prima di usare a",
            code: 'fn main() {\n    let mut a = [1, 2, 3, 4];\n    let s2 = &mut a[0..2];\n    s2[0] = 10;\n    std::mem::drop(s2);\n    println!("array {:?}", a);\n}',
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-5",
        prompt: "Questo codice è corretto? Spiega perché.",
        code: 'fn main() {\n    let mut i = 32;\n    let r = &i;\n    println!("{}", *r);\n    i = i+1;\n    let r = &i;\n    println!("{}", *r);\n}',
        solution:
          "Sì, è corretto con NLL (Non-Lexical Lifetimes). Il riferimento r viene usato per l'ultima volta nella println!; dopo quell'uso, il borrow immutabile termina, dunque è lecito modificare i e poi creare un nuovo riferimento.",
        notes:
          "Se si riutilizzasse r dopo l'assegnazione a i, allora fallirebbe.",
        status: "not-started",
      },
      {
        id: "ch-6",
        prompt: "Per quale motivo non compila?",
        filename: "vec3.rs",
        code: 'fn main() {\n    let mut v = vec![ 1, 2, 3, 4 ];\n    let slice = &mut v[0..2];\n    v.push(5);\n    println!("slice {:?}", slice);\n}',
        solution:
          "Stesso motivo della ch-1: lo slice mutabile tiene un borrow attivo sull'intero Vec; v.push(5) necessita un nuovo borrow mutabile e può riallocare la memoria, potenzialmente invalidando lo slice.",
        fixes: [
          {
            label: "Chiudi il borrow prima di push",
            code: 'fn main() {\n    let mut v = vec![1, 2, 3, 4];\n    {\n        let slice = &mut v[0..2];\n        println!("slice {:?}", slice);\n    }\n    v.push(5);\n}',
          },
        ],
        status: "not-started",
      },
    ],
    totalCards: 6,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "ownership",
    title: "Possesso e prestiti",
    description: "Sistema di ownership, borrowing e lifetime di Rust",
    icon: "🔒",
    flashcards: [
      {
        id: "pp-1",
        rule: "Ownership: le 3 regole + ruolo del borrow checker",
        explanation:
          "Ogni valore ha un solo owner; l’ownership si sposta (move) su assegnamento/passaggio a funzione; a fine scope dell’owner avviene il drop. Il borrow checker verifica staticamente queste regole e blocca qualunque violazione (es. due owner contemporanei).",
        codeExample: `let s = String::from("hi");
let t = s;        // move: s non è più utilizzabile
// println!("{}", s); // ❌ value borrowed after move
println!("{}", t);    // ok`,
        status: "not-started",
      },
      {
        id: "pp-2",
        rule: "Vec, heap e riallocazione: cosa possiede davvero la variabile",
        explanation:
          "Un Vec possiede un buffer su heap (ptr, len, cap sullo stack). Crescendo oltre la capacità, rialloca e copia gli elementi. Finché la variabile è in scope, le risorse restano accessibili; all’uscita di scope il drop rilascia buffer e contenuti.",
        codeExample: `let mut v = Vec::with_capacity(4);
for i in 1..=5 { v.push(i); }  // può innescare riallocazione
println!("{:?}", v);           // [1,2,3,4,5]`,
        status: "not-started",
      },
      {
        id: "pp-3",
        rule: "Move per assegnamento: lettura vietata, ma scrittura riabilita",
        explanation:
          "Assegnare una variabile a un’altra muove il valore: la sorgente è ‘consumata’ e non è più leggibile. Tuttavia si può riassegnare un nuovo valore alla variabile originaria (diventa di nuovo valida in scrittura e poi in lettura sul nuovo contenuto).",
        codeExample: `let mut s1 = "hello".to_string();
let s2 = s1;                  // move
s1 = "world".to_string();     // riassegnazione: s1 torna valido
println!("{} / {}", s1, s2);  // world / hello`,
        status: "not-started",
      },
      {
        id: "pp-4",
        rule: "Assegnare un NUOVO valore rilascia il precedente (Drop personalizzabile)",
        explanation:
          "Quando assegni un nuovo valore a una variabile posseduta, il precedente viene droppato prima di essere sovrascritto. Con impl Drop puoi osservare/gestire azioni custom pre-rilascio; shadowing (nuovo binding) e riassegnazione hanno effetti diversi sul ciclo di vita visibile.",
        codeExample: `#[derive(Debug)]
struct P(i32);
impl Drop for P { fn drop(&mut self){ println!("Drop {:?}", self.0); } }
let mut p = P(1);
p = P(10); // stampa: Drop 1
// fine scope: Drop 10`,
        status: "not-started",
      },
      {
        id: "pp-5",
        rule: "Move via funzione: consumare in ingresso, restituire in uscita",
        explanation:
          "Passare per valore a una funzione trasferisce l’ownership al parametro (il chiamante non può più usare il valore). Per mantenerlo, o si restituisce il valore (move di ritorno), o si passa per riferimento, oppure si esegue clone() se serve una copia profonda.",
        codeExample: `fn take(v: Vec<i32>) { println!("{:?}", v); }
fn make(n: usize) -> Vec<i32> { 
    let mut v = Vec::with_capacity(n); 
    for _ in 0..n { v.push(0); } 
    v 
}
let v = vec![1,2,3];
take(v);          // v mosso
let w = make(5);  // move di ritorno`,
        status: "not-started",
      },
      {
        id: "pp-6",
        rule: "Copy vs Move vs Clone: quali tipi, quali costi",
        explanation:
          "I tipi Copy (primitivi, tuple/array di soli Copy, riferimenti immutabili) si duplicano bit-a-bit e restano utilizzabili dopo l’assegnamento. I tipi non-Copy (es. String, Box) si muovono; per duplicarli serve Clone, che può fare copie profonde e costa di più. Copy e Drop sono mutuamente esclusivi.",
        codeExample: `let x: i32 = 3; let y = x;           // Copy: x ancora valido
let b = Box::new(84); let c = b;     // Move: b non più valido
// let d = b;                         // ❌
let s1 = String::from("hi"); 
let s2 = s1.clone();                 // Clone profondo`,
        status: "not-started",
      },
      {
        id: "pp-7",
        rule: "Riferimenti e prestiti: molti & immut., al più un &mut esclusivo",
        explanation:
          "Un riferimento (&T) prende in prestito, senza possedere. Puoi avere molti prestiti immutabili oppure un solo prestito mutabile esclusivo: mentre esiste &mut, niente letture/scritture tramite l’owner; mentre esiste almeno un &, l’owner non può mutare/muovere.",
        codeExample: `let mut s = String::from("hello");
let r1 = &s; let r2 = &s; // ok: più lettori
// let r3 = &mut s;       // ❌ non finché esistono lettori
println!("{} {}", r1, r2); // dopo uso dei lettori…
let r3 = &mut s; *r3 = "hi".into();`,
        status: "not-started",
      },
      {
        id: "pp-8",
        rule: "Prestiti avanzati: muovere un &mut, ‘downgrade’ a & e fine prestiti",
        explanation:
          "Un &mut può essere passato/ritornato (si muove il prestito). Puoi ‘downgradarlo’ temporaneamente a & (referenza immutabile) finendo poi i prestiti nell’ordine giusto. Usare & o accedere all’owner mentre un &mut è vivo viola l’esclusività.",
        codeExample: `fn cambia(r: &mut Box<i32>) -> &mut Box<i32> { *r = Box::new(200); r }
let mut b = Box::new(150);
let mut z = &mut b;         // prende il borrow mutabile
z = cambia(z);              // move del &mut
let r = &*z;                // downgrade a &
println!("{:?}", r);        // fine di r
println!("{:?}", z);        // usa ancora &mut`,
        status: "not-started",
      },
      {
        id: "pp-9",
        rule: "Layout dei riferimenti: thin pointer, fat pointer, trait object",
        explanation:
          "I riferimenti a tipi Sized sono puntatori semplici (thin). Le slice e str sono ‘fat pointer’ (ptr + len). I trait object (&dyn Trait) sono doppi puntatori: uno ai dati, uno alla vtable in memoria statica (metodi, size, align, drop).",
        codeExample: `let a = [1,2,3];
let s: &[i32] = &a[1..];   // fat pointer (&[T] = {ptr,len})
use std::io::{self, Write};
let f = std::fs::File::create("t.txt").unwrap();
let w: &dyn Write = &f;    // double pointer: data + vtable`,
        status: "not-started",
      },
      {
        id: "pp-10",
        rule: "Lifetimes: vincolo di inclusione e annotazioni",
        explanation:
          "Il lifetime di un riferimento deve essere incluso nel lifetime del valore referenziato (niente dangling). Il compilatore spesso inferisce; quando si restituisce un riferimento legato a più input, servono annotazioni per esprimere relazioni. &'static vale per tutto il programma (es. string literal).",
        codeExample: `// Esempio di violazione classica
let r: &i32;
{
  let x = 1;
  r = &x;    // ❌ x non vive abbastanza
}
// println!("{}", r);

// Annotazione minima
fn first<'a>(x: &'a str, _y: &'a str) -> &'a str { x }`,
        status: "not-started",
      },
      {
        id: "pp-11",
        rule: "Lifetimes in pratica: prestito di parti e interazione con mutazione",
        explanation:
          "Prestare un elemento di una struttura (&v[i] o &mut v[i]) mantiene vivo e non mutabile/riassegnabile il contenitore per l’intero periodo di validità del riferimento; push/mutazioni mentre un riferimento è attivo sono vietate proprio per evitare invalidazioni.",
        codeExample: `let mut v = vec![1,2,3];
let r = &v[1];           // prestito immutabile a un elemento
// v.push(4);            // ❌ non si può mutare mentre r è vivo
println!("{}", r);       // fine di r ⇒ da qui si potrà mutare`,
        status: "not-started",
      },
      {
        id: "pp-12",
        rule: "Slice e conversioni: viste non possedute, Boxed slice, Vec⇆Box<[T]>",
        explanation:
          "Una slice è una vista contigua non posseduta (&[T]): ptr+len. Da Vec<T> puoi ottenere &[T] senza costi; puoi convertire in Box<[T]> (boxed slice) per avere dimensione fissa su heap e poi tornare a Vec<T> quando serve capacità dinamica.",
        codeExample: `let v = vec![1,2,3,4,5];
let s: &[i32] = &v[1..3];        // slice vista
let b: Box<[i32]> = v.into_boxed_slice();
let v2: Vec<i32> = b.into_vec(); // ritorno a Vec`,
        status: "not-started",
      },
    ],
    totalCards: 12,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "compound-types",
    title: "Tipi Composti",
    description: "Struct, enum, tuple e pattern matching",
    icon: "🧩",
    flashcards: [
      {
        id: "se-1",
        rule: "Struct vs Tupla: semantica, ordine dei campi, accesso",
        explanation:
          "Una struct introduce un nuovo tipo con campi nominati (accesso via .campo) e semantica esplicita; l’ordine di inizializzazione è libero purché tutti i campi siano presenti. La tupla è anonima, l’ordine è parte del significato e l’accesso è posizionale.",
        codeExample: `#[derive(Debug)]
struct Player { name: String, health: i32, level: u8 }
fn main() {
  let p = Player { level: 1, health: 127, name: "Mario".to_string() };
  let t: (i32, f64, &str) = (42, 3.14, "ciao");
  println!("{:?} {:?}", p, t);
}`,
        status: "not-started",
      },
      {
        id: "se-2",
        rule: "Struct update, Default e shorthand dei campi",
        explanation:
          "Puoi creare istanze copiando campi da un’altra (`..s`), usare valori di default se i campi implementano `Default`, e abbreviare quando variabile e campo hanno lo stesso nome (field init shorthand).",
        codeExample: `#[derive(Debug, Default)]
struct Player { name: String, health: i32, level: u8 }
fn main() {
  let base = Player::default();
  let name = "Mario".to_string(); let health = 25; let level = 1;
  let p1 = Player { name, health, level };         // shorthand
  let p2 = Player { name: "Paolo".to_string(), ..p1 };
  let p3 = Player { name: "Luigi".to_string(), ..Player::default() };
  println!("{:?} {:?} {:?}", base, p2, p3);
}`,
        status: "not-started",
      },
      {
        id: "se-3",
        rule: "Tuple struct e Unit struct (zero-sized, marker types)",
        explanation:
          "Le tuple struct hanno campi senza nome e si usano come tipi nominali con accesso posizionale. Le unit struct non hanno campi (spesso zero-sized) e fungono da marker/parametri di tipo a costo zero.",
        codeExample: `#[derive(Debug, Copy, Clone)]
struct Empty;
struct Point(i32, i32, i32);
struct Metric; struct Imperial;
fn main() {
  let p = Point(0,0,0); let z = Empty;
  // Marker per disambiguare API
  fn speed_kmh(dist:f64, _u:Metric)->f64 { dist/1.0 }
  fn speed_mph(dist:f64, _u:Imperial)->f64 { dist*0.621_371 }
  println!("{:?} {} {}", p, speed_kmh(120.0, Metric), speed_mph(120.0, Imperial));
}`,
        status: "not-started",
      },
      {
        id: "se-4",
        rule: "Destrutturazione di struct (binding e rinomina)",
        explanation:
          "Puoi destrutturare una struct in variabili, rinominando i campi per chiarezza. La destrutturazione è utile anche nei pattern di `match`/`if let`.",
        codeExample: `struct Point { x:f32, y:f32 }
fn main() {
  let p = Point { x: 5.0, y: 10.0 };
  let Point { x: ascissa, y: ordinata } = p;
  println!("({},{})", ascissa, ordinata);
}`,
        status: "not-started",
      },
      {
        id: "se-5",
        rule: "Layout, allineamento e #[repr(C)]",
        explanation:
          "Il compilatore può riordinare i campi per ottimizzare padding/allineamento; `align_of_val`/`size_of_val` ispezionano requisiti e dimensioni. Usa `#[repr(C)]` per layout stabile compatibile C (FFI).",
        codeExample: `use std::mem::{size_of_val, align_of_val};
#[repr(C)]
struct Player { name:String, health:i32, level:u8 }
fn main() {
  let p = Player { name:"Mario".into(), health:25, level:1 };
  println!("size={} align={}", size_of_val(&p), align_of_val(&p));
}`,
        status: "not-started",
      },
      {
        id: "se-6",
        rule: "Moduli e visibilità: pub su tipo e campi",
        explanation:
          "Di default i tipi e i campi sono visibili solo nel modulo corrente. `pub` rende visibile il simbolo; per costruire un’istanza dall’esterno servono anche i campi pubblici (o un costruttore pubblico).",
        codeExample: `mod m1 {
  pub struct Test { pub a:i32, pub b:bool } // senza pub sui campi non potresti settarli dall'esterno
}
use m1::Test;
fn main() { let t = Test { a:12, b:false }; let _ = t; }`,
        status: "not-started",
      },
      {
        id: "se-7",
        rule: "Incapsulamento: campi privati + funzione/constructor pubblico",
        explanation:
          "Mantieni i campi privati e offri funzioni/associated methods per creare/validare lo stato. L’interfaccia pubblica resta stabile anche se l’implementazione cambia.",
        codeExample: `mod domain {
  #[derive(Debug)] pub struct Test { a:i32, b:bool }
  pub fn new_test(a:i32, b:bool) -> Test { Test { a, b } }
}
fn main() {
  let t = domain::new_test(100, true);
  println!("{:?}", t);
}`,
        status: "not-started",
      },
      {
        id: "se-8",
        rule: "Metodi e ‘receiver’: self / &self / &mut self",
        explanation:
          "`self` consuma e muove l’istanza; `&self` legge senza mutare; `&mut self` muta in-place. `Self` nella `impl` è un alias del tipo implementato.",
        codeExample: `struct Point { x:i32, y:i32 }
impl Point {
  fn mirror(self) -> Self { Self { x:self.y, y:self.x } }      // move
  fn length(&self) -> f64 { ((self.x*self.x + self.y*self.y) as f64).sqrt() } // read
  fn scale(&mut self, s:i32) { self.x*=s; self.y*=s; }          // write
}
fn main() {
  let p1 = Point{ x:3, y:4 };
  let mut p2 = p1.mirror();      // p1 mosso
  let _ = p2.length();
  p2.scale(2);
}`,
        status: "not-started",
      },
      {
        id: "se-9",
        rule: "Associated functions (static): new/with_* al posto dei costruttori",
        explanation:
          "Rust non ha costruttori linguistici; usa funzioni associate (senza receiver) per inizializzare. Convenzioni: `new()` per default valido, `with_*` per varianti parametriche.",
        codeExample: `#[derive(Debug)]
struct Rectangle { width:u32, height:u32 }
impl Rectangle {
  fn new(w:u32, h:u32) -> Self { Self { width:w, height:h } }
  fn with_square(size:u32) -> Self { Self { width:size, height:size } }
  fn area(&self) -> u32 { self.width * self.height }
}
fn main() {
  let r = Rectangle::new(5,10); let s = Rectangle::with_square(10);
  println!("{} {}", r.area(), s.area());
}`,
        status: "not-started",
      },
      {
        id: "se-10",
        rule: "Drop e RAII: rilascio deterministico e Copy esclusivo",
        explanation:
          "`Drop` è chiamato automaticamente a fine scope o su riassegnazione; puoi forzare con `std::mem::drop`. RAII permette di legare acquisizione/rilascio a durata di una variabile. `Drop` e `Copy` sono mutuamente esclusivi.",
        codeExample: `struct Guard(&'static str);
impl Drop for Guard { fn drop(&mut self){ println!("drop {}", self.0); } }
fn main() {
  let mut g = Guard("A");
  g = Guard("B"); // stampa "drop A"
} // fine scope: "drop B"`,
        status: "not-started",
      },
      {
        id: "se-11",
        rule: "Enum come ‘sum type’: varianti con o senza dati, metodi, match",
        explanation:
          "Un `enum` rappresenta alternative esclusive; può essere ‘C-like’ (solo tag) o contenere dati (tuple/struct). `match` è esaustivo e abilita destrutturazione; si possono definire metodi su enum.",
        codeExample: `#[derive(Debug)]
enum Shape { Square{ s:f64 }, Circle{ r:f64 }, Rectangle{ w:f64, h:f64 } }
fn area(sh: Shape) -> f64 {
  match sh { Shape::Square{ s } => s*s, Shape::Circle{ r } => r*r*3.1415926, Shape::Rectangle{ w, h } => w*h }
}
fn main() {
  println!("{}", area(Shape::Square{ s:1.0 }));
}`,
        status: "not-started",
      },
      {
        id: "se-12",
        rule: "Rappresentazione in memoria degli enum (tag + max variante)",
        explanation:
          "Un enum usa un tag per la variante + spazio sufficiente per la variante più grande; il tag può essere ‘implicito’ quando esiste una nicchia (es. valori impossibili). La dimensione/allineamento dipendono dai dati delle varianti.",
        codeExample: `enum MyEnum { Unit, Tup(i32,i32,i32), Point{ x:i32, y:i32 } }
fn main() {
  use std::mem::size_of;
  println!("size={}", size_of::<MyEnum>()); // include tag + variante più grande
}`,
        status: "not-started",
      },
      {
        id: "se-13",
        rule: "Pattern matching ridotto: if let / while let e mutazione in-place",
        explanation:
          "`if let`/`while let` applicano un pattern senza esaustività. Con un pattern su `&mut` puoi aggiornare selettivamente lo stato contenuto in un enum.",
        codeExample: `#[derive(Debug)]
enum Shape { Square{ s:f64 }, Circle{ r:f64 } }
fn double_if_square(sh: &mut Shape) {
  if let Shape::Square{ s } = sh { *s *= 2.0; }
}
fn main() {
  let mut sq = Shape::Square{ s:4.0 };
  double_if_square(&mut sq);
  println!("{:?}", sq);
}`,
        status: "not-started",
      },
      {
        id: "se-14",
        rule: "Option<T> e Result<T,E>: alternative a null ed errori espliciti",
        explanation:
          "`Option<T>` (Some/None) esprime presenza/assenza; `Result<T,E>` (Ok/Err) esprime successo/fallimento. Evitano i ‘null reference’ e integrano con `match`, `?`, e combinatori.",
        codeExample: `fn divide_opt(x:f64, y:f64) -> Option<f64> { if y==0.0 { None } else { Some(x/y) } }
fn divide_res(x:f64, y:f64) -> Result<f64, &'static str> { if y==0.0 { Err("Division by zero!") } else { Ok(x/y) } }
fn main() {
  match divide_opt(820.0, 15.2) { Some(v)=>println!("{}", v), None=>println!("nope") }
  match divide_res(10.0, 2.0) { Ok(v)=>println!("{}", v), Err(e)=>println!("{}", e) }
}`,
        status: "not-started",
      },
    ],
    totalCards: 0,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "polymorphism",
    title: "Polimorfismo",
    description: "Traits, generics e implementazioni polimorfiche",
    icon: "🔄",
    flashcards: [
      {
        id: "pg-1",
        rule: "Polimorfismo in Rust: tratti, generici e zero-cost (vs dyn)",
        explanation:
          "Rust offre polimorfismo tramite tratti (interfacce), generici e oggetti-tratto. Con generici/impl Trait il dispatch è statico e senza costi extra; col dynamic dispatch (&dyn Trait) c’è un passaggio via VTABLE (costo tempo/spazio).",
        codeExample: `use std::fmt::Debug;
// static dispatch (monomorfizzazione)
fn show<T: Debug>(x: T) { println!("{:?}", x); }
// dynamic dispatch
fn process(x: &dyn Debug) { println!("{:?}", x); }`,
        status: "not-started",
      },
      {
        id: "pg-2",
        rule: "Tratti: definizione, implementazione, import e metodi su self",
        explanation:
          "Un tratto è una collezione di metodi (eventualmente con default). Si implementa con 'impl Trait for Tipo'. I metodi possono prendere self, &self, &mut self o forme avanzate (Box<Self>, Rc<Self>...). Per usare i metodi serve il tratto in scope (tranne quelli del preludio).",
        codeExample: `trait Summarizable { fn summary(&self) -> String; }
impl Summarizable for f64 { fn summary(&self)->String{ format!("{:.4}", self) } }
impl Summarizable for &str {
  fn summary(&self)->String{ if self.len()>5 { format!("{} ...", &self[..=5]) } else { self.to_string() } }
}`,
        status: "not-started",
      },
      {
        id: "pg-3",
        rule: "Self e default methods: override selettivo",
        explanation:
          "In un tratto, 'Self' indica il tipo implementatore. I metodi possono avere un’implementazione di default, che i tipi possono usare o sovrascrivere (override) rispettando la firma.",
        codeExample: `trait Moltiplicabile {
  fn moltiplica(&self, k: i32) -> i32;
  fn moltiplica_per_due(&self) -> i32 { self.moltiplica(2) } // default
}
struct Numero{i:i32}
impl Moltiplicabile for Numero{
  fn moltiplica(&self,k:i32)->i32{ self.i*k }
  fn moltiplica_per_due(&self)->i32{ println!("x2"); self.moltiplica(2) } // override
}`,
        status: "not-started",
      },
      {
        id: "pg-4",
        rule: "Tipi associati: firma astratta, concretezza per-implementazione",
        explanation:
          "Un tratto può dichiarare tipi associati riusati nelle firme. Ogni implementazione li concretizza, evitando parametri di tipo rumoreggianti sulle funzioni dell’interfaccia.",
        codeExample: `trait Convertibile { type Output; fn converti(&self) -> Self::Output; }
struct Intero{i:i32}  ; impl Convertibile for Intero  { type Output=f64; fn converti(&self)->f64{ self.i as f64 } }
struct Reale{r:f64} ; impl Convertibile for Reale   { type Output=i32; fn converti(&self)->i32{ self.r as i32 } }`,
        status: "not-started",
      },
      {
        id: "pg-5",
        rule: "Super-tratti e ambiguità: eredito API, disambiguo con FQS",
        explanation:
          "Un sottotratto richiede l’implementazione del supertratto e ne eredita i metodi. Se più tratti definiscono lo stesso nome, la chiamata è ambigua: si usa la Fully Qualified Syntax <Tipo as Trait>::metodo(&x).",
        codeExample: `trait Super { fn f(&self){ println!("super"); } }
trait Sub: Super { fn f(&self){ println!("sub"); } }
struct S; impl Super for S {} impl Sub for S {}
let s=S; // <S as Super>::f(&s); <S as Sub>::f(&s);`,
        status: "not-started",
      },
      {
        id: "pg-6",
        rule: "Oggetti-tratto (&dyn Trait): VTABLE, double pointer e object safety",
        explanation:
          "Un riferimento a dyn Trait abilita dispatch dinamico via VTABLE (dato + tabella metodi). Un tratto è ‘object safe’ se i suoi metodi non richiedono Self: Sized, non usano Self by-value in firma/ritorno e non hanno parametri di tipo generici.",
        codeExample: `trait Print { fn print(&self); }
struct S(i32); impl Print for S{ fn print(&self){ println!("S {}", self.0); } }
fn process(p:&dyn Print){ p.print(); }`,
        status: "not-started",
      },
      {
        id: "pg-7",
        rule: "impl Trait vs generics: astrazione del parametro e monomorfizzazione",
        explanation:
          "Un parametro 'impl Trait' genera una funzione generica; per ogni tipo usato, il compilatore crea una versione specializzata (monomorfizzazione). Alternativa runtime: accettare &dyn Trait.",
        codeExample: `use std::fmt::Debug;
fn mostra_debug(val: impl Debug){ println!("Debug: {:?}", val); } // static dispatch
fn mostra_dyn(val: &dyn Debug){ println!("Debug: {:?}", val); }   // dynamic dispatch`,
        status: "not-started",
      },
      {
        id: "pg-8",
        rule: "Sized e ?Sized: lavorare con tipi a dimensione ignota",
        explanation:
          "Per default i parametri di tipo sono 'Sized'. Per accettare anche tipi unsized (es. [T], str, dyn Trait) si usa '?Sized' e si passa sempre tramite un puntatore/reference.",
        codeExample: `fn print_maybe_unsized<T: ?Sized>(v: &T){ let _ = v; }
struct Boxed<T: ?Sized>{ data: Box<T> }`,
        status: "not-started",
      },
      {
        id: "pg-9",
        rule: "Operator overloading: Add, PartialEq/Eq, PartialOrd/Ord",
        explanation:
          "Gli operatori sono tratti: Add per '+', PartialEq/Eq per uguaglianza (Eq esige riflessività; i float non implementano Eq), PartialOrd/Ord per ordini parziale/totale. RHS può essere diverso da Self.",
        codeExample: `use std::ops::Add;
#[derive(Debug,PartialEq,Eq)] struct Point{i:i32,j:i32}
impl Add for Point{ type Output=Self; fn add(self,o:Self)->Self{ Self{i:self.i+o.i,j:self.j+o.j} } }
// epsilon equality per floating wrapper
struct F64(f64); impl PartialEq for F64{
  fn eq(&self, o:&Self)->bool{ (self.0 - o.0).abs() <= 1e-6 }
}`,
        status: "not-started",
      },
      {
        id: "pg-10",
        rule: "Index/IndexMut: usare t[i] e t[a..b] su tipi custom",
        explanation:
          "Implementando Index/IndexMut puoi leggere/scrivere con la sintassi d’indicizzazione. L’Output può essere un elemento o una slice; si possono supportare più indici (usize, Range…).",
        codeExample: `use std::ops::{Index,IndexMut,Range};
struct StringSet{ data: Vec<String> }
impl Index<usize> for StringSet{ type Output=String; fn index(&self,i:usize)->&Self::Output{ &self.data[i] } }
impl IndexMut<usize> for StringSet{ fn index_mut(&mut self,i:usize)->&mut Self::Output{ &mut self.data[i] } }
impl Index<Range<usize>> for StringSet{ type Output=[String]; fn index(&self,r:Range<usize>)->&Self::Output{ &self.data[r] } }`,
        status: "not-started",
      },
      {
        id: "pg-11",
        rule: "Conversioni: From/Into, TryFrom/TryInto e FromStr/parse",
        explanation:
          "From possiede e converte restituendo Self; Into è auto-derivato da From. Versioni fallibili TryFrom/TryInto restituiscono Result. FromStr abilita parse() da &str.",
        codeExample: `use std::convert::TryFrom;
struct Even(i32);
impl TryFrom<i32> for Even{
  type Error=&'static str;
  fn try_from(v:i32)->Result<Self,Self::Error>{ if v%2==0 { Ok(Even(v)) } else { Err("non pari") } }
}
let n = "42".parse::<i32>(); // FromStr`,
        status: "not-started",
      },
      {
        id: "pg-12",
        rule: "Deref/DerefMut e deref coercion",
        explanation:
          "Implementando Deref/DerefMut puoi trattare un wrapper come il suo Target. La deref coercion converte automaticamente &T in &U se T: Deref<Target=U> (es. &String → &str).",
        codeExample: `use std::ops::Deref;
struct Selector{ elements: Vec<String>, current: usize }
impl Deref for Selector { type Target=String; fn deref(&self)->&Self::Target{ &self.elements[self.current] } }
// let s = Selector{elements: vec!["a".into(),"b".into()], current:0}; assert_eq!(&*s, "a");`,
        status: "not-started",
      },
      {
        id: "pg-13",
        rule: "Display/Debug: formattazione per utenti e per sviluppatori",
        explanation:
          "Display ({}), non derivabile, richiede fmt che scrive su fmt::Formatter; Debug ({:?}) è per output diagnostico ed è derivabile. Le macro println!/format!/write! usano questi tratti.",
        codeExample: `use std::fmt;
#[derive(Debug)] struct Libro{ titolo:String, autore:String, anno:u32 }
impl fmt::Display for Libro{
  fn fmt(&self,f:&mut fmt::Formatter<'_>)->fmt::Result{
    write!(f, "Libro: "{}" di {} ({})", self.titolo, self.autore, self.anno)
  }
}`,
        status: "not-started",
      },
      {
        id: "pg-14",
        rule: "Clone/Copy e Drop (RAII): semantica di possesso",
        explanation:
          "Clone duplica in modo esplicito; Copy abilita copia bit-a-bit implicita su assegnamento (mutuamente esclusivo con Drop). Drop è il distruttore deterministico chiamato a fine scope o prima di riassegnare.",
        codeExample: `#[derive(Clone,Copy)] struct P(i32);
// #[derive(Copy,Drop)] // vietato: Copy e Drop sono esclusivi
struct R(i32); impl Drop for R{ fn drop(&mut self){ println!("Drop {}", self.0); } }
let mut r = R(1); r = R(2); // stampa "Drop 1" prima della riassegnazione`,
        status: "not-started",
      },
      {
        id: "pg-15",
        rule: "RangeBounds e Bound: intervalli e contains",
        explanation:
          "I range standard implementano RangeBounds; puoi crearne di custom. Bound definisce Inclusi/Esclusi/Unbounded. Il metodo contains verifica appartenenza rispettando gli estremi.",
        codeExample: `use std::ops::{RangeBounds,Bound};
let r = 0..10; assert!(r.contains(&5)); assert!(!(r.contains(&10)));
let rincl = 0..=10; assert!(rincl.contains(&10));`,
        status: "not-started",
      },
      {
        id: "pg-16",
        rule: "Error: propagare fallimenti con Result e oggetti-errore",
        explanation:
          "Il tratto Error (Debug+Display) abilita errori composabili; spesso si usa Result<T, Box<dyn Error>> per funzioni che possono fallire in modi diversi.",
        codeExample: `use std::{error::Error,fmt};
#[derive(Debug)] struct Custom{ msg:String }
impl fmt::Display for Custom{ fn fmt(&self,f:&mut fmt::Formatter<'_>)->fmt::Result{ write!(f,"{}",self.msg) } }
impl Error for Custom{}
fn do_something()->Result<(),Box<dyn Error>>{ Err(Box::new(Custom{msg:"boom".into()})) }`,
        status: "not-started",
      },
    ],
    totalCards: 16,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "lifetime",
    title: "Lifetime",
    description: "Gestione avanzata dei lifetime e annotazioni",
    icon: "⏱️",
    flashcards: [
      {
        id: "lt-1",
        rule: "Lifetimes: cosa sono e cosa NON fanno",
        explanation:
          "Gli identificatori di lifetime sono etichette applicate ai riferimenti per descrivere relazioni di durata (chi deve vivere almeno quanto chi). Non prolungano la vita di nessun valore: servono al compilatore per prevenire dangling references e incoerenze nelle funzioni/strutture.",
        codeExample: `fn f<'a>(p: &'a i32) { let _ = p; } // annota la relazione, non allunga la vita di p`,
        status: "not-started",
      },
      {
        id: "lt-2",
        rule: "Elisione: le 3 regole pratiche",
        explanation:
          "Regole: (1) se c'è un solo riferimento in input, il suo lifetime va a tutti gli output; (2) se non ci sono riferimenti in output, niente annotazioni; (3) nei metodi, il lifetime di &self/&mut self si propaga a tutti gli output. Queste coprono la maggior parte dei casi comuni.",
        codeExample: `fn get_first_element(arr: &[i32]) -> &i32 { &arr[0] } // elisione: fn <'a>(&'a [i32]) -> &'a i32
struct Example { data: i32 }
impl Example {
  fn get_data_ref(&self) -> &i32 { &self.data } // regola (3)
}`,
        status: "not-started",
      },
      {
        id: "lt-3",
        rule: "Restituire riferimenti: ambiguità e annotazioni",
        explanation:
          "Se una funzione ha più riferimenti in ingresso e ne restituisce uno, il compilatore non può sapere da quale input provenga l'output: serve un lifetime nominato comune. Se dipende da un solo parametro, annoti solo quello.",
        codeExample: `fn confronta<'a>(str1: &'a str, str2: &'a str) -> &'a str { if str1.len()>str2.len() { str1 } else { str2 } }
fn stampa<'a>(s1: &'a str, s2: &str) -> &'a str { println!("{}", s2); s1 }`,
        status: "not-started",
      },
      {
        id: "lt-4",
        rule: "Metodi con più input: perché può fallire l’elisione",
        explanation:
          "Se un metodo può restituire alternativamente un riferimento legato a self o a un parametro esterno, l’elisione non basta: i lifetime non coincidono e il compilatore segnala che l’output potrebbe riferirsi a dati troppo ‘corti’.",
        codeExample: `struct Example { data1: i32, data2: i32 }
impl Example {
  // Caso problematico: potrebbe restituire &other (lifetime diverso da &self)
  fn get_data_ref(&self, other: &i32) -> &i32 {
    if self.data1 > *other { &self.data1 } else { /* &other */ &self.data2 }
  }
} // Variante corretta più sotto`,
        status: "not-started",
      },
      {
        id: "lt-5",
        rule: "Soluzione: vincolare gli input allo stesso 'a",
        explanation:
          "Quando l’output può provenire da self O da un altro riferimento, rendi esplicito che i due input condividono lo stesso lifetime: il compilatore può così garantire che qualunque scelta produca un riferimento valido.",
        codeExample: `struct Example { data1: i32, data2: i32 }
impl Example {
  fn get_data_ref<'a>(&'a self, other: &'a i32) -> &'a i32 {
    if self.data1 > *other { &self.data1 } else { other }
  }
}`,
        status: "not-started",
      },
      {
        id: "lt-6",
        rule: "Lifetimes indipendenti: quando NON c’è relazione",
        explanation:
          "Se il valore restituito non dipende dall’altro parametro, usa lifetimes distinti per esprimere assenza di relazione (utile anche per funzioni che usano s solo per side-effects).",
        codeExample: `fn insert<'a, 'b>(vet: &mut Vec<&'a str>, s: &'b str) { vet.push("fixed"); println!("{}", s); } // s non finisce nel vettore`,
        status: "not-started",
      },
      {
        id: "lt-7",
        rule: "Vec<&str> e temporanei: perché può fallire",
        explanation:
          "Spingere riferimenti in un Vec richiede che ogni &str viva almeno quanto il Vec. Riferirsi a una String temporanea o a una locale che finisce lo scope crea dangling. Soluzioni: usare string literals (&'static), tenere viva la String, o memorizzare String (possesso) nel Vec.",
        codeExample: `fn insert<'a>(v: &mut Vec<&'a str>, s: &'a str) { v.push(s); }
let mut v: Vec<&str> = Vec::new();
// insert(&mut v, &"Ciao".to_string()); // NON va: temporaneo
let s = "Ciao".to_string(); insert(&mut v, &s); // ok finché s vive
// Alternativa: Vec<String> + push di s.to_string()`,
        status: "not-started",
      },
      {
        id: "lt-8",
        rule: "Prestiti in conflitto: r tenuto vivo e riassegnazione",
        explanation:
          "Se tieni vivo un riferimento a y e poi provi a riassegnare y (o una variabile collegata) prima che r esca di scope, violi le regole: il compilatore blocca l’assegnazione finché il prestito è attivo. Ordina le operazioni per far scadere i borrow prima della mutazione.",
        codeExample: `struct S(u8);
fn f<'a>(_x: &S, y: &'a S) -> &'a u8 { &y.0 }
fn print_byte(b: &u8){ println!("{}", b); }
let v1 = S(1); let mut v2 = S(2);
let r = f(&v1, &v2);
print_byte(r);           // usa e poi lascia vivere r
v2 = v1;                 // ok: r non è più usato dopo`,
        status: "not-started",
      },
      {
        id: "lt-9",
        rule: "Lifetime 'static: string literals e ritorni sicuri",
        explanation:
          "Un literal stringa ha lifetime 'static (dura per tutto il programma). Funzioni che restituiscono riferimenti a tali letterali possono annotare &'static str. Non confondere con riferimenti a locali, che NON sono 'static.",
        codeExample: `fn crea_stringa() -> &'static str { let s = "hello"; s }
let s = crea_stringa(); println!("{}", s); // valido per tutta l’esecuzione`,
        status: "not-started",
      },
      {
        id: "lt-10",
        rule: "Struct con riferimenti: annotare il lifetime e ripeterlo su impl",
        explanation:
          "Se una struct contiene riferimenti, deve dichiarare il lifetime del campo; i metodi su tale struct ripetono le annotazioni nel blocco impl. Le dipendenze si propagano anche in struct annidate.",
        codeExample: `struct TextWindow<'a> { content: &'a str }
impl<'a> TextWindow<'a> {
  fn new(content: &'a str) -> Self { TextWindow{ content } }
  fn display(&self){ println!("{}", self.content); }
}
let text = "Hello".to_string(); let tw = TextWindow::new(&text); tw.display();`,
        status: "not-started",
      },
      {
        id: "lt-11",
        rule: "Anonymous lifetime su impl: quando basta <'_>",
        explanation:
          "Se dal metodo è ricostruibile in modo implicito la relazione tra parametri/ritorno, puoi usare impl con anonymous lifetime <'_>. Il compilatore inferisce la dipendenza senza nominare esplicitamente i parametri di lifetime.",
        codeExample: `struct Worker<'a>{ name: &'a str, id: u32 }
impl Worker<'_> {
  fn new(name: &str, id: u32) -> Worker { Worker{ name, id } }
  fn get_name(&self) -> &str { self.name }
}
let w = Worker::new("Alice", 1001); println!("{}", w.get_name());`,
        status: "not-started",
      },
      {
        id: "lt-12",
        rule: "Generici + lifetimes + bound: combinazione tipica",
        explanation:
          "Con funzioni generiche, lifetimes e trait bound convivono: dichiari i lifetime prima dei parametri di tipo. I bound (es. Display, Copy) vincolano il comportamento mentre i lifetime esprimono la provenienza dei riferimenti.",
        codeExample: `use std::fmt::Display;
fn merge_slices<'a, T: Copy>(a: &'a [T], b: &'a [T]) -> Vec<&'a T> {
  let mut out = Vec::new(); for x in a.iter().chain(b.iter()) { out.push(x); } out
}
fn longest_with_announcement<'a, T: Display>(x: &'a str, y: &'a str, ann: T) -> &'a str {
  println!("Announcement! {}", ann); if x.len()>y.len(){ x } else { y }
}`,
        status: "not-started",
      },
      {
        id: "lt-13",
        rule: "Trova prefisso con Option<&str>: lifetimes su slice di &str",
        explanation:
          "Restituire una slice (&str) da una &String/&str mantiene il lifetime collegato all’input. Il compilatore infila automaticamente il lifetime (elisione) quando la dipendenza è univoca.",
        codeExample: `fn trova_primo(s: &str, target: char) -> Option<&str> {
  for (i, c) in s.chars().enumerate() { if c==target { return Some(&s[..i]); } } None
}
let s = String::from("hello"); let r = trova_primo(&s, 'l'); println!("{:?}", r);`,
        status: "not-started",
      },
      {
        id: "lt-14",
        rule: "Per il chiamante e per la funzione: bloccare mutazioni illegali",
        explanation:
          "Gli identificatori di lifetime informano il chiamante su quale input ‘sostiene’ l’output, e vincolano la funzione a restituire solo riferimenti leciti. Durante il lifetime dedotto, il valore sorgente resta ‘bloccato’: mutazioni/riassegnazioni anticipate causano errore.",
        codeExample: `fn first<'a>(x: &'a str, _y: &str) -> &'a str { x }
let mut s = String::from("ciao");
let r = first(&s, "altro");
println!("{}", r); // finché r è vivo, s non può essere mosso
// drop(r); // dopo il rilascio, s torna libero`,
        status: "not-started",
      },
    ],
    totalCards: 8,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "closures",
    title: "Closures",
    description: "Funzioni anonime e cattura di variabili",
    icon: "📦",
    flashcards: [
      {
        id: "cl-1",
        rule: "Programmazione funzionale in Rust: concetti chiave e perché conta",
        explanation:
          "Rust non è puramente funzionale, ma incorpora strumenti FP: funzioni come valori, immutabilità, funzioni di ordine superiore, iteratori, closures e tipi algebrici (Option/Result). Questo stile incoraggia composizione, assenza di effetti indesiderati e ragionamento locale.",
        codeExample: `let nums = [1,2,3,4,5];
let sum_of_squares_even: i32 = nums.iter().filter(|&&x| x%2==0).map(|&x| x*x).sum();
assert_eq!(sum_of_squares_even, 20);`,
        status: "not-started",
      },
      {
        id: "cl-2",
        rule: "Funzioni come valori: puntatori a funzione vs closures",
        explanation:
          "Un puntatore a funzione ha tipo fn(T1,..,Tn)->U; le closures sono funzioni anonime che possono catturare variabili dell’ambiente. Le HOF possono accettare sia fn sia chiusure.",
        codeExample: `fn add_one(x: i32) -> i32 { x + 1 }
fn do_twice(f: fn(i32)->i32, a: i32) -> i32 { f(a) + f(a) }
let answer = do_twice(add_one, 5);
assert_eq!(answer, 12);
let add = |x, y| x + y; 
let r = add(2, 3); 
assert_eq!(r, 5);`,
        status: "not-started",
      },
      {
        id: "cl-3",
        rule: "Lambda/Closure: sintassi, inferenza tipi e variabili libere",
        explanation:
          "Le lambda si definiscono con |args| { body }. Il compilatore inferisce tipi di argomenti e ritorno. Una chiusura che usa variabili libere diventa una struct che le memorizza.",
        codeExample: `let factor = 2;
let multiply = |n| n * factor;  // cattura per riferimento
assert_eq!(multiply(5), 10);`,
        status: "not-started",
      },
      {
        id: "cl-4",
        rule: "Modalità di cattura: & (default), &mut con closure mut, e move",
        explanation:
          "Per default la cattura è per riferimento immutabile. Se la chiusura modifica lo stato catturato, serve let mut c = || {...} (prestito esclusivo). Con move trasferisci il possesso dei valori nella chiusura.",
        codeExample: `let mut x = 0;
let mut add = || { x += 1; x };   // cattura mutabile (&mut)
assert_eq!(add(), 1);
let v = vec![1,2,3];
let print = move || println!("{:?}", v); // possesso
print(); // v non è più usabile qui`,
        status: "not-started",
      },
      {
        id: "cl-5",
        rule: "Effetto di move: Copy vs non-Copy",
        explanation:
          "Con move, i tipi Copy (es. i32) vengono copiati: la chiusura lavora su una copia interna, l’originale resta intatto. I tipi non-Copy (String, Vec, Box) vengono mossi nella chiusura: l’originale non è più usabile.",
        codeExample: `let mut count = 0;
let mut inc = move || { count += 1; count }; // copia interna (Copy)
assert_eq!(inc(), 1);
assert_eq!(count, 0); // esterno resta 0
// Con Box (non-Copy):
// let mut b = Box::new(42);
// let c = move || { *b += 1; };
// println!("{}", *b); // errore: b è stato mosso nella closure`,
        status: "not-started",
      },
      {
        id: "cl-6",
        rule: "Rappresentazione in memoria: la closure è una struct",
        explanation:
          "Ogni chiusura diventa una struct con un campo per ogni cattura. Le catture by-move spostano i valori nella struct; le catture per riferimento memorizzano riferimenti, vincolando i lifetimes.",
        codeExample: `let y = 10; 
let z = 20;
let f1 = |x| x + y + z;        // struct con riferimenti
let f2 = move |x| x + y + z;   // struct con copie/move dei valori
assert_eq!(f1(1), 31);
assert_eq!(f2(1), 31);`,
        status: "not-started",
      },
      {
        id: "cl-7",
        rule: "Gerarchia dei tratti: Fn, FnMut, FnOnce",
        explanation:
          "Rust assegna i tratti in base all’uso: sola lettura ⇒ Fn (richiamabile molte volte); modifica tramite &mut ⇒ FnMut; consumo/move dei catturati ⇒ FnOnce (una sola chiamata). Le funzioni fn implementano Fn, FnMut e FnOnce.",
        codeExample: `let x = 10;           
let f: &dyn Fn(i32)->i32 = &|y| x + y;    // Fn
let mut counter = 0;  
let mut g = || { counter += 1; counter }; // FnMut
let s = String::from("ciao"); 
let h = move || s;                         // FnOnce
assert_eq!(f(5), 15); 
assert_eq!(g(), 1);
// h(); h(); // la seconda chiamata fallirebbe: FnOnce`,
        status: "not-started",
      },
      {
        id: "cl-8",
        rule: "HOF generiche: vincoli Fn*/fn",
        explanation:
          "Scegli il vincolo più debole necessario: FnOnce accetta tutto ma limita a una chiamata; FnMut per stato modificabile; Fn per lettura pura. I puntatori a funzione (fn) soddisfano tutti e tre.",
        codeExample: `fn call_twice<F: FnMut()>(mut f: F) { f(); f(); }
let mut i = 0; 
call_twice(|| i += 1); 
assert_eq!(i, 2);

fn apply<F: Fn(i32)->i32>(x: i32, f: F)->i32 { f(x) }
fn raddoppia(n: i32)->i32 { n * 2 }
assert_eq!(apply(5, raddoppia), 10);
assert_eq!(apply(5, |n| n * 3), 15);`,
        status: "not-started",
      },
      {
        id: "cl-9",
        rule: "Restituire chiusure: impl Trait, move e lifetimes",
        explanation:
          "Una factory può restituire impl Fn/impl FnMut. Se la chiusura cattura riferimenti a locali, servono lifetimes: si preferisce move per portare i dati dentro. Se deve essere richiamabile e consumerebbe dati, prevedere Clone interno.",
        codeExample: `fn generator(prefix: &str) -> impl FnMut()->String {
    let mut i = 0; 
    let b = prefix.to_string();
    move || { i += 1; format!("{}{}", b, i) }
}
let mut g = generator("id_");
assert_eq!(g(), "id_1"); 
assert_eq!(g(), "id_2");

fn function_generator<T: Clone>(v: T) -> impl Fn()->T { move || v.clone() }
let get42 = function_generator(42); 
assert_eq!(get42(), 42);`,
        status: "not-started",
      },
      {
        id: "cl-10",
        rule: "FnOnce nascosto: quando l’ambiente viene consumato",
        explanation:
          "Se una chiusura chiama metodi che consumano l’ambiente (es. un iteratore passato per valore: range.count()), diventa FnOnce e può essere invocata una sola volta. Ricrea l’iteratore ogni volta o catturalo per riferimento.",
        codeExample: `let f = || (1..10).count();  // ricrea il Range ogni volta ⇒ riusabile
assert_eq!(f(), 9);
// let range = 1..10; 
// let g = || range.count(); 
// g(); g(); // errore: la chiusura è FnOnce`,
        status: "not-started",
      },
      {
        id: "cl-11",
        rule: "Composizione e trait objects funzionali",
        explanation:
          "Puoi comporre chiusure restituendone un’altra. Se vuoi restituire varianti non unificabili, usa un oggetto tratto Box<dyn Fn(_)->_> per il dispatch a runtime.",
        codeExample: `fn compose<F, G>(f: F, g: G) -> impl Fn(i32)->i32 
where F: Fn(i32)->i32, G: Fn(i32)->i32 {
  move |x| g(f(x))
}
let add_then_double = compose(|n| n + 1, |n| n * 2);
assert_eq!(add_then_double(5), 12);

fn crea_operazione(t: &str) -> Box<dyn Fn(i32)->i32> {
  match t {
    "raddoppia" => Box::new(|x| x * 2),
    "quadrato"  => Box::new(|x| x * x),
    _           => Box::new(|x| x),
  }
}
assert_eq!(crea_operazione("quadrato")(4), 16);`,
        status: "not-started",
      },
      {
        id: "cl-12",
        rule: "Pattern pratici: richiamabilità, consumo esplicito e stato condiviso",
        explanation:
          "Una chiusura che solo legge può essere richiamata n volte. Se vuoi degradarla a FnOnce, consuma deliberatamente lo stato (drop). Se vuoi stato mutabile usato anche fuori, evita move su non-Copy o incapsula in smart pointer adeguati.",
        codeExample: `let data = vec![1,2,3,4,5];
let process = || { let s: i32 = data.iter().sum(); s }; // Fn (riusabile)
assert_eq!(process(), 15); 
assert_eq!(process(), 15);

let mut data = vec![1,2,3];
let consume_once = || { drop(data) }; 
consume_once(); // FnOnce
// consume_once(); // seconda volta impossibile`,
        status: "not-started",
      },
    ],
    totalCards: 12,
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
    flashcards: [
      {
        id: "it-1",
        rule: "Cos’è un iteratore in Rust (stato, next, Option)",
        explanation:
          "Un iteratore è una struttura con stato che produce elementi uno alla volta. Implementa il trait Iterator con un tipo associato Item e un metodo next(&mut self) -> Option<Self::Item>. La fine della sequenza è segnalata con None; ogni next ‘avanza’ lo stato.",
        codeExample: `trait Iterator {
  type Item;
  fn next(&mut self) -> Option<Self::Item>;
}
let mut it = (1..4); // Range è un Iterator
assert_eq!(it.next(), Some(1));
assert_eq!(it.next(), Some(2));
assert_eq!(it.next(), Some(3));
assert_eq!(it.next(), None);`,
        status: "not-started",
      },
      {
        id: "it-2",
        rule: "Possesso: iter() vs iter_mut() vs into_iter() e il for",
        explanation:
          "iter() presta &T e non consuma; iter_mut() presta &mut T e consente modifiche in-place; into_iter() consuma la collezione e produce T. Un ciclo for su Vec<T> equivale a for x in v.into_iter(), quindi ‘sposta’ gli elementi.",
        codeExample: `let mut v = vec![1,2,3];
for r in v.iter() { /* r: &i32, v resta usabile */ }
for m in v.iter_mut() { *m *= 10; } // v modificato in-place
for x in v.into_iter() { /* x: i32, v consumato */ }`,
        status: "not-started",
      },
      {
        id: "it-3",
        rule: "Lazy pipeline e consumatore terminale",
        explanation:
          "Gli adattatori (map/filter/...) sono lazy: non eseguono nulla finché un consumatore terminale (es. collect/sum/for_each) non tira gli elementi. La pipeline è reattiva e calcola elemento per elemento.",
        codeExample: `let odds_squared: Vec<i32> = (1..=10)
  .filter(|n| n % 2 == 1)
  .map(|n| n * n)
  .collect(); // senza collect nulla parte`,
        status: "not-started",
      },
      {
        id: "it-4",
        rule: "Fonti dei dati: collezioni e generatori",
        explanation:
          "Gli iteratori possono leggere da contenitori (Vec, array, mappe, file) oppure generare valori (range, stream pseudo-casuali, generatori custom). Il codice che consuma l’iteratore ignora la ‘fonte’.",
        codeExample: `let from_vec = vec![1,2,3].into_iter(); // da collezione
let from_range = (10..15);                  // generatore
let both: Vec<_> = from_vec.chain(from_range).collect();`,
        status: "not-started",
      },
      {
        id: "it-5",
        rule: "Implementare Iterator (next) e creare iteratori custom",
        explanation:
          "Per un iteratore custom definisci lo stato e implementa next modificando lo stato e restituendo Some(item) o None. Puoi modellare contatori, intervalli direzionali, persino Fibonacci.",
        codeExample: `struct Fib { a: u64, b: u64, max: u64 }
impl Iterator for Fib {
  type Item = u64;
  fn next(&mut self) -> Option<u64> {
    if self.a > self.max { return None; }
    let out = self.a;
    self.a = self.b;
    self.b = out + self.a;
    Some(out)
  }
}
let v: Vec<u64> = Fib{a:0,b:1,max:50}.collect();`,
        status: "not-started",
      },
      {
        id: "it-6",
        rule: "IntoIterator: rendere ‘iterabile’ un tipo (for ... in ...)",
        explanation:
          "Un tipo è ‘iterable’ se implementa IntoIterator: for x in value chiama value.into_iter(). Si può restituire l’iteratore di un campo interno (es. Vec) o costruirne uno ad hoc; valido anche con const generics.",
        codeExample: `struct Pixel { r:i8, g:i8, b:i8 }
impl IntoIterator for Pixel {
  type Item = i8;
  type IntoIter = std::array::IntoIter<i8,3>;
  fn into_iter(self) -> Self::IntoIter { [self.r,self.g,self.b].into_iter() }
}
for c in Pixel{r:1,g:2,b:3} { /* 1,2,3 */ }`,
        status: "not-started",
      },
      {
        id: "it-7",
        rule: "Adattatori I: map, filter, filter_map, flatten, flat_map",
        explanation:
          "map trasforma ogni item; filter tiene solo quelli che soddisfano un predicato; filter_map combina filtro e mappatura restituendo Some/None; flatten appiattisce iteratori annidati; flat_map = map + flatten.",
        codeExample: `let nested = vec![vec![1,2], vec![3]];
let out: Vec<i32> = nested.into_iter().flatten().collect();
let evens: Vec<i32> = (0..10).filter(|n| n%2==0).collect();
let parsed: Vec<i32> = ["10","x","20"].into_iter()
  .filter_map(|s| s.parse().ok())
  .collect();
let triplicate: Vec<i32> = [1,2,3].into_iter()
  .flat_map(|x| [x, x*x, x*x*x])
  .collect();`,
        status: "not-started",
      },
      {
        id: "it-8",
        rule: "Adattatori II: take/skip e varianti *while",
        explanation:
          "take(n) limita ai primi n elementi; skip(n) salta i primi n. take_while/skip_while usano un predicato: interrompono/iniziano in base alla prima transizione booleana.",
        codeExample: `let a: Vec<_> = (1..).take(3).collect();          // [1,2,3]
let b: Vec<_> = (1..10).skip(5).collect();      // [6..9]
let c: Vec<_> = [5,10,15,20,22,30].iter()
  .take_while(|x| **x % 5 == 0).cloned().collect();`,
        status: "not-started",
      },
      {
        id: "it-9",
        rule: "Adattatori III: peekable, fuse, rev, inspect",
        explanation:
          "peekable consente di ‘sbirciare’ il prossimo elemento senza consumarlo; fuse fa sì che dopo il primo None l’iteratore resti sempre vuoto; rev inverte (se DoubleEndedIterator); inspect permette side-effect di debug senza alterare il flusso.",
        codeExample: `let mut it = [1,2,3].iter().peekable();
assert_eq!(it.peek(), Some(&&1)); assert_eq!(it.next(), Some(&1));
let mut f = [1].iter().fuse(); assert_eq!(f.next(), Some(&1)); assert_eq!(f.next(), None); assert_eq!(f.next(), None);
let back: Vec<_> = (1..=4).rev().collect();    // [4,3,2,1]`,
        status: "not-started",
      },
      {
        id: "it-10",
        rule: "Adattatori IV: chain, enumerate, zip, by_ref, cloned/copied, cycle, chars",
        explanation:
          "chain concatena sequenze; enumerate produce (indice,val); zip accoppia due iteratori; by_ref presta l’iteratore per consumo parziale; cloned/copied trasformano &T → T; cycle ripete all’infinito; chars itera sui char di una stringa.",
        codeExample: `let a = [1,2].iter().chain([3,4].iter());
let z: Vec<_> = [10,20].iter().zip(['a','b'].iter()).collect();
let mut it = (1..=5);
let first2: Vec<_> = it.by_ref().take(2).collect();
let rest: Vec<_> = it.collect();
let words = ["hi","rust"]; let chars: Vec<char> = words.iter().flat_map(|w| w.chars()).collect();`,
        status: "not-started",
      },
      {
        id: "it-11",
        rule: "Consumatori I: collect, for_each, try_for_each, nth, all/any, find, count",
        explanation:
          "collect materializza in una collezione; for_each applica una chiusura con side-effects; try_for_each propaga errori; nth salta avanti e prende il n-esimo; all/any testano proprietà; find ritorna il primo match; count conta gli elementi.",
        codeExample: `let evens: Vec<_> = (0..10).filter(|n| n%2==0).collect();
(1..=3).for_each(|x| { let _ = x; });
let ok: Result<(),()> = ["xx","aaaa"].iter().try_for_each(|s| if s.len()>2 {Ok(())} else {Err(())});
assert_eq!((10..).nth(2), Some(12));
assert!((2..6).all(|x| x>1));
assert!((0..10).any(|x| x==7));
assert_eq!((0..5).find(|x| x%2==1), Some(1));
assert_eq!((0..5).count(), 5);`,
        status: "not-started",
      },
      {
        id: "it-12",
        rule: "Consumatori II: sum/product, position/rposition, last, fold/try_fold, find_map, partition",
        explanation:
          "sum/product aggregano numericamente; position/rposition danno l’indice da sinistra/destra; last prende l’ultimo; fold/try_fold accumulano con (possibile) errore; find_map combina ricerca+mapping; partition divide in due collezioni.",
        codeExample: `let s: i32 = [1,2,3].iter().sum(); let p: i32 = [1,2,3].iter().product();
assert_eq!([1,4,6].iter().position(|x| *x==4), Some(1));
assert_eq!([1,2,3,4].iter().rposition(|x| *x%2==0), Some(3));
assert_eq!([1,2,3].iter().last(), Some(&3));
let acc = (1..=4).fold(0, |a,x| a+x);
let res = (1..=4).try_fold(1, |a,x| if x!=0 { Ok(a*x) } else { Err("zero") });
let fm = ["10","x","20"].iter().find_map(|s| s.parse::<i32>().ok());
let (ev,od):(Vec<_>,Vec<_>) = (0..6).partition(|x| x%2==0);`,
        status: "not-started",
      },
      {
        id: "it-13",
        rule: "Confronti tra iteratori: cmp/eq/ne/lt/le/gt/ge",
        explanation:
          "È possibile confrontare sequenze elemento-per-elemento e in ordine: cmp produce un Ordering; metodi booleans (`eq/ne/lt/le/gt/ge`) verificano relazioni lessicografiche tra due stream finiti.",
        codeExample: `use std::cmp::Ordering;
let c = [1,3,2].iter().cmp([1,2,4].iter());
assert!(matches!(c, Ordering::Greater | Ordering::Less | Ordering::Equal));
assert!( [1,2,3].iter().lt([4,5,6].iter()) );`,
        status: "not-started",
      },
      {
        id: "it-14",
        rule: "Caso ‘challenge’: for v { break } — cosa succede al Vec?",
        explanation:
          "Nel for su Vec<T>, il compilatore usa into_iter(): gli elementi vengono mossi fuori dal vettore. Se esci con break, l’iteratore viene droppato; gli elementi residui (non iterati) vengono rilasciati assieme al buffer, e il Vec originale non è più utilizzabile perché mosso.",
        codeExample: `#[derive(Debug)]
struct S(u8);
impl Drop for S { fn drop(&mut self){ println!("Drop {}", self.0); } }
let v = vec![S(1),S(2),S(3),S(4)];
for s in v { // v è consumato
  if s.0 == 2 { break; } // dopo il break l'iteratore droppa il resto
}
// println!("{:?}", v); // errore: v è stato mosso`,
        status: "not-started",
      },
    ],
    totalCards: 8,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "collections",
    title: "Collezioni",
    description: "Vec, HashMap, HashSet e altre strutture dati",
    icon: "📚",
    flashcards: [
      {
        id: "col-1",
        rule: "Panoramica collezioni + scelte in base alla complessità",
        explanation:
          "Rust offre strutture standard per casi d’uso comuni: Vec (array dinamico), VecDeque (coda doppia), LinkedList (lista doppia), BinaryHeap (coda a priorità), HashMap/BTreeMap (mappe hash/ordinate), HashSet/BTreeSet (insiemi). La scelta dipende da pattern d’accesso e complessità: O(1) medio per HashMap/HashSet, O(log n) per BTree*, O(1) push/pop in coda/fondo con VecDeque, ecc.",
        codeExample: `// Accessi casuali veloci: Vec
// Molte rimozioni/aggiunte a estremi: VecDeque
// Chiavi senza ordine: HashMap/HashSet
// Range e ordinamento per chiave: BTreeMap/BTreeSet
// Priorità massima al top: BinaryHeap`,
        status: "not-started",
      },
      {
        id: "col-2",
        rule: "Metodi comuni + IntoIterator/FromIterator",
        explanation:
          "Tutte le collezioni espongono new/len/clear/is_empty/iter/extend. Inoltre implementano IntoIterator (consumo in iteratore) e FromIterator (collect da iteratore). Questi trait consentono pipeline fluide tra iteratori e contenitori, senza copie inutili.",
        codeExample: `let mut v = Vec::<i32>::new();
v.extend([1,2,3]);
assert_eq!(v.len(), 3);
let sum: i32 = v.iter().copied().sum(); // Iteratore -> somma
let again: Vec<_> = (0..3).collect();   // FromIterator`,
        status: "not-started",
      },
      {
        id: "col-3",
        rule: "Vec: layout (ptr,len,cap) e riallocazioni su push",
        explanation:
          "Vec è (ptr,len,cap) con buffer su heap. push inserisce in fondo; se cap è piena, rialloca un buffer più grande, copia i dati e dealloca il precedente. Indicizzazione panica fuori range; get/get_mut restituiscono Option.",
        codeExample: `let mut v = Vec::with_capacity(2);
v.push(10); v.push(20);
let cap1 = v.capacity();
v.push(30); // può riallocare
let cap2 = v.capacity();
assert!(cap2 >= cap1);
assert_eq!(v.get(99), None); // sicuro: Option`,
        status: "not-started",
      },
      {
        id: "col-4",
        rule: "Vec: API pratiche (push/pop/insert/remove/first/last/retain/extend)",
        explanation:
          "Operazioni tipiche: push/pop in coda, insert/remove a indice, first/last (immut./mut.), get(range)/get_mut(range) per slice sicure, retain per filtrare in place, extend per concatenare.",
        codeExample: `let mut v = vec![1,2,3,4];
v.insert(2, 99);        // [1,2,99,3,4]
let x = v.remove(1);     // x=2, v=[1,99,3,4]
*v.first_mut().unwrap() *= 10;  // [10,99,3,4]
v.retain(|&n| n%3==0);  // [99,3] (99%3==0? no -> dipende; esempio)
v.extend([7,8]);
let s = v.get(..2);     // Option<&[T]>`,
        status: "not-started",
      },
      {
        id: "col-5",
        rule: "VecDeque: coda a doppia entrata (buffer circolare)",
        explanation:
          "VecDeque consente push_front/push_back e pop_front/pop_back in O(1). Non garantisce contiguità fisica; make_contiguous compattizza. È preferibile a Vec quando servono operazioni frequenti in testa.",
        codeExample: `use std::collections::VecDeque;
let mut d = VecDeque::new();
d.push_back(1); d.push_front(0);
assert_eq!(d.pop_front(), Some(0));
let slice: &mut [i32] = d.make_contiguous(); // ora contiguo`,
        status: "not-started",
      },
      {
        id: "col-6",
        rule: "BinaryHeap (max-heap): proprietà, peek/peek_mut e sorted drain",
        explanation:
          "BinaryHeap mantiene il massimo in cima, implementato su Vec con relazioni di indice padre/figli. push fa ‘heapify-up’; pop fa ‘heapify-down’. peek è O(1); peek_mut consente modifica del massimo; into_sorted_vec consuma la heap restituendo un Vec ordinato.",
        codeExample: `use std::collections::BinaryHeap;
let mut h = BinaryHeap::from([4,1,7,3,6]);
assert_eq!(h.peek(), Some(&7));
if let Some(mut top) = h.peek_mut() { *top /= 7; } // ridimensiona il massimo
let sorted = h.into_sorted_vec(); // crescente`,
        status: "not-started",
      },
      {
        id: "col-7",
        rule: "LinkedList: pro/contro e quando evitarla",
        explanation:
          "LinkedList ha inserimenti/rimozioni efficienti a estremi ma accesso casuale pessimo, overhead di puntatori e scarso locality di cache. In pratica si preferiscono Vec/VecDeque. Utile quando servono spostamenti O(1) di nodi tra liste.",
        codeExample: `use std::collections::LinkedList;
let mut l = LinkedList::new();
l.push_front("a".to_string());
l.push_back("b".to_string());
// split_off + append
let mut tail = l.split_off(1);
l.append(&mut tail); // concatena in O(1) sui puntatori`,
        status: "not-started",
      },
      {
        id: "col-8",
        rule: "HashMap: Eq+Hash, riallocazioni e API (keys/values/iter/iter_mut)",
        explanation:
          "HashMap archivia coppie K→V con hashing; K deve implementare Eq e Hash. Inserimenti possono causare riallocazioni della tabella. keys/values/iter/iter_mut forniscono viste e mutazioni controllate.",
        codeExample: `use std::collections::HashMap;
let mut m = HashMap::<&str,i32>::new();
m.insert("Alice", 100);
m.entry("Bob").or_insert(90);
for (k,v) in m.iter_mut() { *v += 1; }
assert!(m.contains_key("Alice"));`,
        status: "not-started",
      },
      {
        id: "col-9",
        rule: "HashMap: entry API (and_modify/or_insert/or_insert_with) e sicurezza",
        explanation:
          "entry evita doppie ricerche: Occupied consente and_modify; Vacant consente or_insert/or_insert_with. L’uso di operator[] panica se la chiave manca: preferisci get/entry per accessi sicuri.",
        codeExample: `use std::collections::hash_map::Entry;
let mut m = std::collections::HashMap::new();
for name in ["A","B","B","C","A"] {
  m.entry(name).and_modify(|c| *c+=1).or_insert(1);
}
assert_eq!(m.get("B"), Some(&2));`,
        status: "not-started",
      },
      {
        id: "col-10",
        rule: "BTreeMap: ordine per chiave, range/range_mut, entry ‘manuale’",
        explanation:
          "BTreeMap mantiene le coppie ordinate per chiave (ricerche, range e visita in-order in O(log n)). Supporta range/range_mut per intervalli. L’entry esiste ma senza scorciatoie and_modify/or_insert*: si lavora con get_mut/insert o con match su Entry.",
        codeExample: `use std::collections::{BTreeMap, btree_map::Entry};
let mut t = BTreeMap::new();
t.insert(2, "due"); t.insert(5, "cinque");
for (k,v) in t.range(2..=9) { let _ = (k,v); }
match t.entry(5) {
  Entry::Occupied(mut e) => { *e.get_mut() = "5"; }
  Entry::Vacant(e) => { e.insert("5"); }
}`,
        status: "not-started",
      },
      {
        id: "col-11",
        rule: "HashSet: insieme non ordinato, operazioni insiemistiche",
        explanation:
          "HashSet è un wrapper su HashMap<K,()> e conserva unicità senza ordine. Offre union/intersection/difference/symmetric_difference, oltre a contains/get/take per membership e rimozione sicura.",
        codeExample: `use std::collections::HashSet;
let a: HashSet<_> = [1,2,3,4,5].into_iter().collect();
let b: HashSet<_> = [3,4,5,6,7].into_iter().collect();
let u: HashSet<_> = a.union(&b).cloned().collect();
let i: HashSet<_> = a.intersection(&b).cloned().collect();`,
        status: "not-started",
      },
      {
        id: "col-12",
        rule: "BTreeSet: insieme ordinato, range e relazioni (subset/superset)",
        explanation:
          "BTreeSet mantiene i valori ordinati, espone range e relazioni insiemistiche: is_disjoint, is_subset, is_superset. È indicato quando servono query per intervallo e ordine stabile.",
        codeExample: `use std::collections::BTreeSet;
let s: BTreeSet<_> = [5,10,18,20,35].into_iter().collect();
for x in s.range(10..20) { let _ = x; }
let a: BTreeSet<_> = [1,2,3].into_iter().collect();
let b: BTreeSet<_> = [2,3,4].into_iter().collect();
assert!(a.is_disjoint(&b)==false);`,
        status: "not-started",
      },
      {
        id: "col-13",
        rule: "Pattern ‘collect/extend’: materializzare o concatenare stream",
        explanation:
          "collect materializza un iteratore in una collezione target; extend concatena in-place da un iteratore o un’altra collezione, evitando allocazioni temporanee superflue.",
        codeExample: `let mut v = vec![1,2];
v.extend(3..=5);               // [1,2,3,4,5]
let set: std::collections::HashSet<_> = v.into_iter().collect();`,
        status: "not-started",
      },
      {
        id: "col-14",
        rule: "Checklist di scelta rapida (difficoltà/trade-off)",
        explanation:
          "• Molte letture casuali e append in coda: Vec. • Molte operazioni in testa e coda: VecDeque. • Massimo/minimo rapido: BinaryHeap. • Chiavi senza ordine e lookup mediamente O(1): HashMap/HashSet. • Range, ordinamento e traversal ordinato: BTreeMap/BTreeSet. • Evita LinkedList salvo necessità di spostamenti O(1) tra liste.",
        codeExample: `// Esempio: conteggio parole e poi top-K
use std::collections::{HashMap, BinaryHeap};
let text = "a a b c a b";
let mut freq = HashMap::new();
for w in text.split_whitespace() {
  *freq.entry(w).or_insert(0) += 1;
}
let mut heap: BinaryHeap<(i32,&str)> = freq.into_iter().map(|(k,v)|(v,k)).collect();
let top = heap.pop(); // parola più frequente`,
        status: "not-started",
      },
    ],
    totalCards: 14,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "io",
    title: "Input / Output [DA FARE]",
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
    flashcards: [
      {
        id: "sp-1",
        rule: "Perché Smart Pointer (oltre a &/*)",
        explanation:
          "Gli smart pointer ‘sembrano’ puntatori grazie a Deref/DerefMut, ma aggiungono garanzie: possesso, rilascio deterministico (Drop), conteggio riferimenti, sincronizzazione. In Rust servono a possedere i dati, mentre i riferimenti forniscono solo prestiti.",
        codeExample:
          "struct MyBox<T>(T);\nuse std::ops::{Deref, DerefMut};\nimpl<T> Deref for MyBox<T> { type Target = T; fn deref(&self)->&T { &self.0 } }\nimpl<T> DerefMut for MyBox<T> { fn deref_mut(&mut self)->&mut T { &mut self.0 } }\nlet mut b = MyBox(10);\n*b += 1;\n",
        status: "not-started",
      },
      {
        id: "sp-2",
        rule: "C++: unique_ptr / shared_ptr / weak_ptr (cicli!)",
        explanation:
          "unique_ptr: possesso esclusivo, solo move. shared_ptr: possesso condiviso con control block (strong/weak count) → overhead. I cicli (A↔B) impediscono l’azzeramento dello strong count: serve weak_ptr per rompere i cicli e accedere via lock().",
        codeExample:
          "// C++ (concetto)\n// std::shared_ptr<Node> a, b; a->next = b; b->prev = a; // ciclo!\n// Usare std::weak_ptr per i riferimenti “indietro”.\n",
        status: "not-started",
      },
      {
        id: "sp-3",
        rule: "Deref/DerefMut in Rust: dot syntax e auto-deref",
        explanation:
          "Se un tipo implementa Deref/DerefMut, l’operatore * e la dot syntax funzionano come su un puntatore: il compilatore riscrive *p in *p.deref() e p.m() in (*p).m(). Questo abilita API ‘trasparenti’ per smart pointer.",
        codeExample:
          'use std::ops::Deref;\nlet s = Box::new(String::from("hi"));\n// thanks to Deref, posso usare metodi di String direttamente\nassert_eq!(s.len(), 2); // auto-deref\n',
        status: "not-started",
      },
      {
        id: "sp-4",
        rule: "Box<T>: heap, move, Drop, unsized e trait object",
        explanation:
          "Box possiede dati su heap con rilascio deterministico a fine scope; il move trasferisce il possesso senza copia dei contenuti. Supporta unsized (`Box<[T]>`, `Box<str>`) e trait object (`Box<dyn Trait>`, fat pointer: data+vtable).",
        codeExample: `trait Animal{ fn sound(&self)->&'static str; }
  struct Dog; impl Animal for Dog{ fn sound(&self)->&'static str{"bau"} }
  let a: Box<dyn Animal> = Box::new(Dog);
  assert_eq!(a.sound(), "bau");
  `,
        status: "not-started",
      },
      {
        id: "sp-5",
        rule: "Tipi ricorsivi ed errore E0072: serve indirezionare",
        explanation:
          "Un enum ricorsivo diretto ha dimensione infinita; il compilatore non può calcolarne la size. Si inserisce un livello di indirezionamento: `Box` in una variante (es. lista, albero) per rendere la dimensione finita.",
        codeExample:
          "enum List { Cons(i32, Box<List>), Nil }\nlet l = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));\n",
        status: "not-started",
      },
      {
        id: "sp-6",
        rule: "Rc<T>: possesso condiviso single-thread",
        explanation:
          "Rc fornisce ownership condiviso non thread-safe con strong_count/weak_count. `clone` incrementa lo strong count; al drop decrementa e libera quando raggiunge 0. Dato mutabile solo se l’Rc è unico: `Rc::get_mut(&mut rc)` → `Some(&mut T)` quando strong==1 e nessun weak.",
        codeExample:
          'use std::rc::Rc;\nlet mut a = Rc::new(String::from("x"));\nlet b = Rc::clone(&a);\nassert!(Rc::get_mut(&mut a).is_none()); // non unico\n',
        status: "not-started",
      },
      {
        id: "sp-7",
        rule: "Weak<T>: rompi i cicli mantenendo la navigabilità",
        explanation:
          "I riferimenti ‘all’indietro’ si modellano con Weak: non tengono in vita l’oggetto (non aumentano lo strong count). Per accedere si usa `upgrade()` → `Option<Rc<T>>`. Pattern classico: children con Rc, parent con Weak.",
        codeExample:
          "use std::rc::{Rc,Weak};\nlet a = Rc::new(5);\nlet w: Weak<i32> = Rc::downgrade(&a);\nassert!(w.upgrade().is_some());\ndrop(a);\nassert!(w.upgrade().is_none());\n",
        status: "not-started",
      },
      {
        id: "sp-8",
        rule: "Cell<T>: interior mutability senza riferimenti",
        explanation:
          "Cell permette di sostituire il valore tramite `&self` (no riferimenti al contenuto): `get` richiede `T: Copy`, `set/replace/take/into_inner` operano per copia o scambio. Utile per contatori o campi mutabili in struct esternamente immutabili.",
        codeExample:
          "use std::cell::Cell;\nstruct S{ a: u8, b: Cell<u8> }\nlet s = S{ a:0, b:Cell::new(1) };\ns.b.set(42); // valido anche se s è immutabile\n",
        status: "not-started",
      },
      {
        id: "sp-9",
        rule: "RefCell<T>: borrow verificati a runtime (può panica!)",
        explanation:
          "RefCell consente `borrow()` (più lettori) e `borrow_mut()` (un solo scrittore) controllati a runtime. Violazioni generano panic. Pattern chiave: `Rc<RefCell<T>>` per stato condiviso e mutabile in single-thread.",
        codeExample:
          "use std::cell::RefCell;\nlet c = RefCell::new(5);\n{\n  let _r = c.borrow();\n  // c.borrow_mut(); // panicherebbe qui\n}\n*c.borrow_mut() = 6;\n",
        status: "not-started",
      },
      {
        id: "sp-10",
        rule: "Albero doppiamente collegato: Rc<RefCell<_>> + Weak",
        explanation:
          "Usa `Rc<RefCell<Node>>` per i figli e `Weak<Node>` per il genitore. I figli tengono vivo il genitore? No: il parent è Weak così eviti cicli forti e memory leak; accedi risalendo con `upgrade()`.",
        codeExample:
          "use std::{rc::{Rc,Weak},cell::RefCell};\n#[derive(Debug)] struct Node{ parent: RefCell<Weak<Node>>, children: RefCell<Vec<Rc<Node>>> }\n",
        status: "not-started",
      },
      {
        id: "sp-11",
        rule: "Cow<'a, B>: clone on write (Borrowed→Owned)",
        explanation:
          "Cow parte da un borrow e clona solo quando serve mutare (to_mut). `into_owned` consegna la proprietà. Efficiente quando spesso non modifichi i dati.",
        codeExample:
          "use std::borrow::Cow;\nfn upper(s:&str)->Cow<str>{ if s.chars().any(|c|c.is_lowercase()) { Cow::Owned(s.to_uppercase()) } else { Cow::Borrowed(s) } }\n",
        status: "not-started",
      },
      {
        id: "sp-12",
        rule: "Metodi che consumano smart pointer: self: Box<Self>/Rc<Self>",
        explanation:
          "Un metodo può richiedere `self: Box<Self>` o `self: Rc<Self>` per consumare lo smart pointer (trasferire ownership al metodo). Non esiste sugar: il tipo di self va scritto esplicitamente.",
        codeExample:
          'struct Task{ name:String }\nimpl Task{ fn complete(self: Box<Self>){ println!("{}", self.name); } }\nlet t = Box::new(Task{name:"X".into()});\nt.complete();\n',
        status: "not-started",
      },
    ],
    totalCards: 12,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "modules",
    title: "Moduli [DA FARE]",
    description: "Organizzazione del codice, crate e sistema di moduli",
    icon: "📂",
    flashcards: createSampleFlashcards("Moduli", 7),
    totalCards: 7,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "testing",
    title: "Test [DA FARE]",
    description: "Unit test, integration test e testing patterns",
    icon: "🧪",
    flashcards: createSampleFlashcards("Test", 6),
    totalCards: 6,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "channels",
    title: "Canali [DA FARE]",
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
    flashcards: [
      {
        id: "cc-1",
        rule: "Thread vs process, scheduling e green thread",
        explanation:
          "Un processo ha spazio d’indirizzamento isolato; i thread del processo condividono heap/codice ma hanno stack propri. Lo scheduler OS alterna o esegue in parallelo i thread (non deterministico). Oltre ai thread nativi esistono green thread gestiti in user-space; in Rust la std usa thread nativi (green disponibili via crate).",
        codeExample: `use std::thread;
fn main() {
  let t1 = thread::spawn(|| { println!("T1"); });
  let t2 = thread::spawn(|| { println!("T2"); });
  // join attende e propaga eventuale panic
  t1.join().unwrap();
  t2.join().unwrap();
}`,
        status: "not-started",
      },
      {
        id: "cc-2",
        rule: "Modello di memoria, cache e fence: perché servono",
        explanation:
          "Cache per-core e riordino di CPU/compilatore rendono non predicibile la visibilità/ordine delle letture/scritture tra thread. Le barriere (x86: LFENCE/SFENCE/MFENCE; ARM: DMB/DSB/ISB) impongono un ordine. In Rust/C++ le astrazioni di concorrenza inseriscono fence adeguate.",
        codeExample: `use std::sync::atomic::{AtomicUsize, AtomicBool, Ordering};
use std::thread;
static X: AtomicUsize = AtomicUsize::new(0);
static READY: AtomicBool = AtomicBool::new(false);
fn main() {
  let w = thread::spawn(|| { X.store(42, Ordering::SeqCst); READY.store(true, Ordering::SeqCst); });
  let r = thread::spawn(|| { while !READY.load(Ordering::SeqCst) {} ; println!("X = {}", X.load(Ordering::SeqCst)); });
  w.join().unwrap(); r.join().unwrap();
}`,
        status: "not-started",
      },
      {
        id: "cc-3",
        rule: "Non-determinismo: output e ‘output locking’ di println!",
        explanation:
          "Senza sincronizzazione non puoi assumere un ordine tra i thread. L’unica garanzia tipica è l’ordine intra-thread. In Rust, `println!` usa un lock dello stdout per non ‘spezzare’ singole righe, ma non ordina tra thread diversi.",
        codeExample: `use std::{thread, time::Duration};
fn run(tag: &'static str) {
  for i in 0..5 { println!("{}{}", tag, i); thread::sleep(Duration::from_nanos(1)); }
}
fn main() { let a = thread::spawn(|| run("A")); let b = thread::spawn(|| run("B")); a.join().unwrap(); b.join().unwrap(); }`,
        status: "not-started",
      },
      {
        id: "cc-4",
        rule: "Data race e operazioni RMW non atomiche: come si rompono",
        explanation:
          "Una RMW naïf ‘leggi-modifica-scrivi’ può interlecciarsi tra thread producendo valori assurdi. Soluzioni: (1) esclusione mutua (`Mutex`/`RwLock`), (2) tipi atomici con ordering adeguato. Evita static mut in safe Rust.",
        codeExample: `use std::sync::{Arc, atomic::{AtomicUsize, Ordering}};
use std::thread;
fn main() {
  let c = Arc::new(AtomicUsize::new(0));
  let mut hs = vec![];
  for _ in 0..4 {
    let c2 = Arc::clone(&c);
    hs.push(thread::spawn(move || { for _ in 0..100_000 { c2.fetch_add(1, Ordering::Relaxed); } }));
  }
  for h in hs { h.join().unwrap(); }
  println!("Final = {}", c.load(Ordering::Relaxed));
}`,
        status: "not-started",
      },
      {
        id: "cc-5",
        rule: "Marker trait di sicurezza: Send e Sync (e perché Rc fallisce)",
        explanation:
          "`Send`: il tipo può essere trasferito tra thread; `Sync`: &T può essere condiviso tra thread. Riferimenti nudi, `Rc`, `RefCell` non sono `Send`/`Sync`. Usa `Arc` (thread-safe) e, per mutabilità condivisa, abbinalo a `Mutex`/`RwLock`.",
        codeExample: `use std::sync::Arc; use std::thread;
fn main() {
  let a = Arc::new(1);
  let b = Arc::clone(&a);
  let j = thread::spawn(move || { println!("b = {}", b); });
  j.join().unwrap();
  println!("a = {}", a);
}`,
        status: "not-started",
      },
      {
        id: "cc-6",
        rule: "Catture `move` e vincolo `'static`: cosa posso passare a `spawn`",
        explanation:
          "La closure di `spawn` deve possedere i dati o riferirsi a dati con durata ≥ al thread. Con `move` trasferisci la proprietà; i literal `&'static str` sono sempre validi. Riferimenti a locali non-static senza `scope` sono vietati.",
        codeExample: `use std::thread;
static S: &str = "Viva Rust";
fn main() {
  let owned = "ciao".to_string();
  let h1 = thread::spawn(move || println!("owned len = {}", owned.len())); // move possiede la String
  let h2 = thread::spawn(|| println!("static = {}", S));                    // &'static str ok
  h1.join().unwrap(); h2.join().unwrap();
}`,
        status: "not-started",
      },
      {
        id: "cc-7",
        rule: "Scoped threads: prestiti sicuri senza `'static`",
        explanation:
          "`thread::scope` vincola la vita dei thread allo scope corrente; questo consente di passare riferimenti a locali perché è garantito che i thread finiscono prima dell’uscita dallo scope.",
        codeExample: `use std::thread;
fn main() {
  let mut numbers = vec![1,2,3];
  thread::scope(|s| {
    s.spawn(|| { println!("len = {}", numbers.len()); });
    s.spawn(|| { for n in &numbers { println!("{}", n); } });
  });
  numbers.push(4); // sicuro: i thread sono terminati
}`,
        status: "not-started",
      },
      {
        id: "cc-8",
        rule: "Arc<Mutex<T>>: mutabilità condivisa + RAII del lock",
        explanation:
          "Incapsula lo stato in `Mutex<T>` e condividilo con `Arc`. `lock()` restituisce `MutexGuard<T>` che dereferenzia a `&mut T` e rilascia il lock a fine scope (RAII). Associa ogni risorsa al suo mutex; evita accessi senza lock. In grafi condivisi, usa `Weak` per rompere cicli con `Arc`.",
        codeExample: `use std::sync::{Arc, Mutex}; use std::thread;
fn main() {
  let shared = Arc::new(Mutex::new(Vec::<i32>::new()));
  let mut hs = vec![];
  for i in 0..5 {
    let s2 = Arc::clone(&shared);
    hs.push(thread::spawn(move || { let mut v = s2.lock().unwrap(); v.push(i); }));
  }
  for h in hs { h.join().unwrap(); }
  println!("Result = {:?}", *shared.lock().unwrap());
}`,
        status: "not-started",
      },
      {
        id: "cc-9",
        rule: "Poisoning: recuperare un `Mutex` dopo un panic",
        explanation:
          "Se il thread che detiene il lock panica, il lock diventa ‘poisoned’ per segnalare potenziale incoerenza. Puoi gestire l’errore (`Err(poisoned)`) e recuperare il dato con `into_inner()` decidendo come ripristinare lo stato.",
        codeExample: `use std::sync::{Arc, Mutex}; use std::thread;
fn main() {
  let data = Arc::new(Mutex::new(0));
  let d2 = Arc::clone(&data);
  let _ = thread::spawn(move || { let mut g = d2.lock().unwrap(); *g += 1; panic!("boom"); }).join();
  match data.lock() {
    Ok(g) => println!("OK: {}", *g),
    Err(poisoned) => { let mut g = poisoned.into_inner(); *g += 1; println!("Recuperato: {}", *g); }
  }
}`,
        status: "not-started",
      },
      {
        id: "cc-10",
        rule: "RwLock: molti lettori, uno scrittore (poisoning incluso)",
        explanation:
          "`RwLock<T>` permette più letture concorrenti (`read`) o una sola scrittura esclusiva (`write`). È preferibile se il carico è sbilanciato sulle letture. Anche qui esiste lo stato ‘poisoned’.",
        codeExample: `use std::sync::{Arc, RwLock}; use std::thread;
fn main() {
  let data = Arc::new(RwLock::new(vec![1,2,3]));
  let r = { let d = Arc::clone(&data); thread::spawn(move || { let g = d.read().unwrap(); println!("R: {:?}", *g); }) };
  let w = { let d = Arc::clone(&data); thread::spawn(move || { let mut g = d.write().unwrap(); g.push(4); println!("W: {:?}", *g); }) };
  r.join().unwrap(); w.join().unwrap();
}`,
        status: "not-started",
      },
      {
        id: "cc-11",
        rule: "Atomici e ordering: Acquire/Release/SeqCst corretti",
        explanation:
          "I tipi atomici offrono `load/store/fetch_*` con *ordering*. `Acquire` su lettura e `Release` su scrittura sincronizzano un hand-off (produttore/consumatore). `SeqCst` dà un ordine globale semplice da ragionare ma più costoso.",
        codeExample: `use std::sync::{Arc, atomic::{AtomicBool, Ordering}}; use std::thread;
fn main() {
  let done = Arc::new(AtomicBool::new(false));
  let d2 = Arc::clone(&done);
  let prod = thread::spawn(move || { /* produce */ d2.store(true, Ordering::Release); });
  let cons = thread::spawn(move || { while !done.load(Ordering::Acquire) {} ; println!("Consumo sicuro"); });
  prod.join().unwrap(); cons.join().unwrap();
}`,
        status: "not-started",
      },
      {
        id: "cc-12",
        rule: "Spinlock vs attesa bloccante: quando (non) usarlo",
        explanation:
          "Uno spinlock (busy-wait su variabile atomica) può essere ok per sezioni critiche brevissime e bassa contesa; altrimenti spreca CPU e può indurre livelock. Preferisci `Mutex`/`Condvar` per attese ‘senza consumare CPU’.",
        codeExample: `use std::{sync::{Arc, atomic::{AtomicUsize, Ordering}}, thread, hint};
fn main() {
  let gate = Arc::new(AtomicUsize::new(1));
  let g2 = Arc::clone(&gate);
  let rel = thread::spawn(move || { thread::sleep(std::time::Duration::from_millis(1)); g2.store(0, Ordering::Release); });
  while gate.load(Ordering::Acquire) != 0 { hint::spin_loop(); }
  println!("Passo la barriera");
  rel.join().unwrap();
}`,
        status: "not-started",
      },
      {
        id: "cc-13",
        rule: "Condition variable: wait_while, wake-up spurie e notifiche perse",
        explanation:
          "`Condvar` va sempre usata con un `Mutex` e un predicato: attendo in un ciclo (`wait_while`) per gestire risvegli spurii e notifiche inviate ‘troppo presto’. `notify_one/all` risveglia ma non trasferisce dati: il predicato su stato condiviso decide la prosecuzione.",
        codeExample: `use std::sync::{Arc, Mutex, Condvar}; use std::thread;
fn main() {
  let pair = Arc::new((Mutex::new(false), Condvar::new()));
  let p2 = Arc::clone(&pair);
  thread::spawn(move || { let (m, c) = &*p2; let mut started = m.lock().unwrap(); *started = true; c.notify_one(); });
  let (m, c) = &*pair; let mut started = m.lock().unwrap();
  started = c.wait_while(started, |s| *s == false).unwrap();
  println!("Avviato: {}", *started);
}`,
        status: "not-started",
      },
      {
        id: "cc-14",
        rule: "Coordinamento avanzato: Barrier e OnceLock",
        explanation:
          "`Barrier` sincronizza N thread nello stesso punto (`wait`). `OnceLock` inizializza pigramente un valore globale/thread-safe una sola volta (`get_or_init`), evitando race sull’inizializzazione.",
        codeExample: `use std::sync::{Arc, Barrier, OnceLock};
use std::thread;
// Barrier
fn barrier_demo() {
  let n = 3; let b = Arc::new(Barrier::new(n)); let mut hs = vec![];
  for i in 0..n {
    let b2 = Arc::clone(&b);
    hs.push(thread::spawn(move || { println!("{} prima", i); b2.wait(); println!("{} dopo", i); }));
  }
  for h in hs { h.join().unwrap(); }
}
// OnceLock
static LOGGER: OnceLock<&'static str> = OnceLock::new();
fn main() { barrier_demo(); let v = LOGGER.get_or_init(|| "init una volta"); println!("{}", v); }`,
        status: "not-started",
      },
    ],
    totalCards: 14,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "processes",
    title: "Processi",
    description: "Gestione di processi esterni e system programming",
    icon: "⚙️",
    flashcards: [
      {
        id: "pr-1",
        rule: "Che cos’è un processo: PID, spazio di indirizzamento, thread e isolamento",
        explanation:
          "Un processo è l’unità base di esecuzione (identificata da PID) con uno spazio di indirizzamento separato in cui operano uno o più thread. Lo spazio fornisce isolamento ‘parziale’: i processi possono comunque interferire via filesystem, autenticazione/autorizzazioni, rete o periferiche condivise; per cooperare in modo controllato si usano meccanismi IPC.",
        codeExample: `// Concetti: PID, address space, thread primario, isolamento parziale, IPC`,
        status: "not-started",
      },
      {
        id: "pr-2",
        rule: "Perché più processi: riuso, scalabilità, sicurezza (vs singolo address space dei thread)",
        explanation:
          "I thread semplificano la cooperazione in uno spazio condiviso, ma quando riusi programmi esistenti, scali su più macchine o vuoi isolamento forte, conviene decomporre in processi collegati (concorrenti per natura) e coordinati con IPC.",
        codeExample: `// Architettura multi-processo: servizio A ↔ servizio B tramite pipe/socket/shared memory`,
        status: "not-started",
      },
      {
        id: "pr-3",
        rule: "Windows: CreateProcess e ciclo di vita del figlio",
        explanation:
          "`CreateProcess` crea un nuovo address space ‘pulito’, carica l’immagine dell’eseguibile, crea/avvia il thread primario (tramite startup CRT che poi invoca main). Il figlio può ereditare env e alcuni handle (file, semafori, pipe), non thread/process handle, DLL o regioni di memoria.",
        codeExample: `// Schema: CreateProcess(cmdline) → STARTUPINFO/PROCESS_INFORMATION → WaitForSingleObject → CloseHandle`,
        status: "not-started",
      },
      {
        id: "pr-4",
        rule: "Linux: fork() e Copy-On-Write; ritorna due volte",
        explanation:
          "`fork()` duplica lo spazio del padre (stack, heap, globali) con COW: le pagine si copiano solo alla prima scrittura. Ritorna 2 volte: al padre restituisce il PID del figlio; al figlio restituisce 0. Per ottenere PID e PPID si usano `getpid()`/`getppid()`.",
        codeExample: `// padre: pid=fork(); if (pid>0) { /* padre */ } else if (pid==0) { /* figlio */ } else { /* errore */ }`,
        status: "not-started",
      },
      {
        id: "pr-5",
        rule: "exec*(): sostituire l’immagine del processo (fork–exec)",
        explanation:
          "La famiglia `exec*` rimpiazza completamente l’immagine del processo corrente con un nuovo eseguibile (parametri gestiti in modi diversi a seconda della variante). Pattern tipico: `fork()` nel padre, `exec*()` nel figlio per avviare il programma target.",
        codeExample: `// figlio:
execl("./prog", "./prog", (const char*)0); // se fallisce, torna con -1 e errno`,
        status: "not-started",
      },
      {
        id: "pr-6",
        rule: "Fork e thread: perché serve pthread_atfork",
        explanation:
          "Dopo `fork()` il figlio ha un solo thread: oggetti di sincronizzazione possono restare in stati incoerenti (es. mutex detenuto da un thread inesistente → deadlock). `pthread_atfork(prepare,parent,child)` permette di acquisire i mutex in `prepare`, rilasciarli nel padre e reimpostare/rilasciare nel figlio.",
        codeExample: `pthread_atfork(lock_all_mutexes, unlock_in_parent, unlock_and_reset_in_child);`,
        status: "not-started",
      },
      {
        id: "pr-7",
        rule: "Terminare un processo: _exit/ExitProcess vs exit/atexit",
        explanation:
          "`_exit(int)` (Linux) ed `ExitProcess(int)` (Windows) terminano immediatamente TUTTI i thread, chiudono handle e rilasciano memoria; non chiamano distruttori/cleanup del runtime. `exit(int)`/`std::exit(int)` invece eseguono le callback registrate con `atexit` e la pulizia del CRT prima di uscire.",
        codeExample: `// Registrazione cleanup portabile
int ok1=std::atexit(cb1); int ok2=std::atexit(cb2); /* ... */ std::exit(0);`,
        status: "not-started",
      },
      {
        id: "pr-8",
        rule: "Return code e terminazione per eccezione/panic",
        explanation:
          "Per convenzione, 0 = successo, ≠0 = errore (semantica definita dall’app). In Unix solo 8 bit arrivano al SO. Eccezioni non gestite o panic nel thread principale portano alla terminazione del processo con un codice specifico (es. 101 in molti binari Rust in caso di panic).",
        codeExample: `// main → ritorna → startup code invoca exit(status)
// panic nel main → termina il processo con codice definito dal runtime`,
        status: "not-started",
      },
      {
        id: "pr-9",
        rule: "Rust: std::process::Command (builder pattern) e Output/ExitStatus",
        explanation:
          "`Command::new(...).args(...).output()` lancia il figlio e attende il termine restituendo `Result<Output>`, che include `status` (ExitStatus), `stdout` e `stderr`. `ExitStatus` espone info sul codice e, su Unix, sulla causa (segnale, core dump, sospensione/continuazione).",
        codeExample: `use std::process::Command;
let out = Command::new("sh").arg("-c").arg("echo hello").output().unwrap();
// out.status.success(), String::from_utf8_lossy(&out.stdout)`,
        status: "not-started",
      },
      {
        id: "pr-10",
        rule: "Ambiente e I/O: env/envs/env_remove/env_clear, stdin/stdout/stderr",
        explanation:
          "Di default il figlio eredita le variabili d’ambiente del padre. Puoi aggiungere/modificare (`env`, `envs`), rimuovere (`env_remove`) o azzerare tutto (`env_clear`). Per i flussi standard: `inherit()` (condivide), `piped()` (crea pipe), `null()` (scarta). I default cambiano: `output()` usa pipe; `status()`/`spawn()` ereditano.",
        codeExample: `use std::process::{Command,Stdio};
let out = Command::new("echo").arg("hi").stdout(Stdio::piped()).env("K","V").output().unwrap();`,
        status: "not-started",
      },
      {
        id: "pr-11",
        rule: "Current dir, status(), spawn(): tre modalità e differenze",
        explanation:
          "`current_dir(path)` modifica la working directory del figlio. `status()` avvia e attende restituendo `ExitStatus`; `output()` cattura stdout/stderr; `spawn()` restituisce `Child` e NON attende. Di default, `status/spawn` → inherit; `output` → piped.",
        codeExample: `use std::process::{Command,Stdio};
let st = Command::new("ls").current_dir("/bin").status().unwrap();
let child = Command::new("sleep").arg("5").stdout(Stdio::piped()).spawn().unwrap();`,
        status: "not-started",
      },
      {
        id: "pr-12",
        rule: "Child: id(), wait(), wait_with_output(), kill() e piping manuale",
        explanation:
          "`Child` permette controllo fine: `id()` per il PID, `wait()` per attendere, `wait_with_output()` per chiudere stdin e raccogliere output residuo, `kill()` per terminare. Con `Stdio::piped()` puoi scrivere su `stdin` del figlio e leggere `stdout`.",
        codeExample: `use std::io::Write; use std::process::{Command,Stdio};
let mut p = Command::new("rev").stdin(Stdio::piped()).stdout(Stdio::piped()).spawn().unwrap();
p.stdin.as_mut().unwrap().write_all("abc".as_bytes()).unwrap();
let out = p.wait_with_output().unwrap(); // -> cba`,
        status: "not-started",
      },
      {
        id: "pr-13",
        rule: "Interazione fork–stdio: buffering duplicato e flush preventivo",
        explanation:
          "Dopo `fork()`, i buffer di I/O sono duplicati; se padre e figlio fanno flush, lo stesso contenuto può essere scritto due volte (più probabile se l’output è rediretto a file con buffering a blocchi). Prima di `fork()` conviene forzare `flush()` su stream e file aperti.",
        codeExample: `// Strategia: fflush(stdout); fflush(stderr); // o cout/cerre flush esplicito prima di fork()`,
        status: "not-started",
      },
      {
        id: "pr-14",
        rule: "std::process::exit/abort/panic in Rust: differenze operative",
        explanation:
          "`std::process::exit(code)` termina subito senza invocare i distruttori sullo stack (nessun unwinding). `abort()` termina anomalo con codice ‘forzato’. `panic!` fa unwinding dello stack del thread corrente; nel main può terminare il processo, ma esegue i distruttori nello stack del thread.",
        codeExample: `// Esempi separati:
// process::exit(1);
// process::abort();
// panic!("errore");`,
        status: "not-started",
      },
      {
        id: "pr-15",
        rule: "Attendere processi esterni: wait/waitpid/waitid e codifica dello stato",
        explanation:
          "Su Unix: `wait()` blocca finché un figlio termina (restituisce il suo PID e compone lo stato a 16 bit); `waitpid(pid, &status, options)` consente targeting e polling non bloccante. I bit distinguono exit code, segnale di terminazione, e flag di core dump.",
        codeExample: `// Interpretazione di status:
// exit_status (0–255) vs terminazione per segnale (e.g., SIGKILL, SIGABRT), core_dumped flag`,
        status: "not-started",
      },
      {
        id: "pr-16",
        rule: "Orfani e zombie; evitare zombie con wait",
        explanation:
          "Se il padre muore, il figlio diventa orfano ed è adottato da PID 1 (init). Se il figlio termina e il padre non chiama `wait*`, resta uno zombie (solo ID e stato conservati finché il padre non raccoglie). Per evitare zombie, assicurati di invocare `wait()`/`waitpid()` per ogni figlio.",
        codeExample: `// Pattern:
// let mut child = Command::new("sleep").arg("1").spawn().unwrap();
// child.wait().unwrap(); // raccoglie lo stato, niente zombie`,
        status: "not-started",
      },
    ],
    totalCards: 16,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "async",
    title: "Programmazione asincrona",
    description: "Async/await, Future trait e runtime asincroni",
    icon: "🚀",
    flashcards: [
      {
        id: "as-1",
        rule: "Concorrente vs Asincrono: I/O-bound vs CPU-bound",
        explanation:
          "Usa i thread quando devi ELABORARE in parallelo (CPU-bound); usa l’asincrono quando devi ATTENDERE in parallelo (I/O-bound). L’asincrono separa la richiesta dall’azione da compiere quando arriva la risposta, evitando di bloccare il thread se c’è altro da fare.",
        codeExample: `// Concorrente (thread): più CPU eseguono lavoro pesante in parallelo
// Asincrono (async): mentre un I/O attende, il runtime esegue altro lavoro`,
        status: "not-started",
      },
      {
        id: "as-2",
        rule: "Costi: task async vs thread nativi",
        explanation:
          "Creazione/cambio contesto/memoria: i task async hanno ordini di grandezza inferiori rispetto ai thread (poche centinaia di ns e centinaia di byte vs più µs e KB). Quindi sono adatti a molte attese concorrenti senza saturare risorse.",
        codeExample: `// Regola pratica: per migliaia di 'attese' parallele preferisci async a thread.`,
        status: "not-started",
      },
      {
        id: "as-3",
        rule: "Callback e 'inferno' di nidificazioni",
        explanation:
          "API a callback eliminano il blocco ma complicano flussi composti/ciclici e gestione errori: si finisce a scrivere una macchina a stati manuale con callback annidate (callback hell).",
        codeExample: `// Pseudocodice (non idiomatico Rust):
// read_async(f1, |res1| { if ok { write_async(f2, buf, |res2| { if ok { /*...*/ } }) } })`,
        status: "not-started",
      },
      {
        id: "as-4",
        rule: "Futures come esecuzione parziale + chaining",
        explanation:
          "Riorganizza le callback in una pipeline lineare: ogni step restituisce un Future; gli step successivi si collegano con combinatori/await. La computazione avanza 'a strappi' quando i Future diventano pronti.",
        codeExample: `async fn copy(mut r: Reader, mut w: Writer) -> std::io::Result<()> {
  let mut buf = Vec::new();
  r.read_async(&mut buf).await?;   // attesa non bloccante
  w.write_async(&buf).await?;      // step successivo
  Ok(())
}`,
        status: "not-started",
      },
      {
        id: "as-5",
        rule: "Che cos’è async/await: desugar in Future",
        explanation:
          "`async fn` viene desugared in una funzione che restituisce `impl Future<Output=T>`. Ogni `.await` introduce uno stato intermedio della macchina a stati generata dal compilatore.",
        codeExample: `async fn f() -> u32 { 1 }
fn g() -> impl core::future::Future<Output = u32> { async { 1 } } // equivalenti nel tipo di ritorno`,
        status: "not-started",
      },
      {
        id: "as-6",
        rule: "Trait Future: poll, Pin, Context e Waker",
        explanation:
          "`Future` espone `poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<T>`. `Pin` impedisce di muovere la struttura (necessario per stati autoreferenziali); `Context` incapsula un `Waker` per notificare quando riprovare il `poll`. `Poll::Pending` sospende, `Poll::Ready(val)` completa.",
        codeExample: `use core::future::Future;
use core::pin::Pin; use core::task::{Context, Poll};
struct MyFut;
impl Future for MyFut {
  type Output = u32;
  fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<u32> {
    Poll::Ready(42)
  }
}`,
        status: "not-started",
      },
      {
        id: "as-7",
        rule: "Macchina a stati generata dal compilatore",
        explanation:
          "Il compilatore sintetizza struct per gli stati (variabili locali salvate) e una enum che li racchiude; implementa `Future::poll` con un `match` sullo stato, passando da `Pending` a `Ready` quando i sotto-future completano.",
        codeExample: `// Schema concettuale:
// enum CopySm { S0{...}, S1{...}, S2{...}, Done }
// impl Future for CopySm { fn poll(...) -> Poll<Result<()>> { /* match sugli stati */ } }`,
        status: "not-started",
      },
      {
        id: "as-8",
        rule: "Chi fa avanzare i Future? Il ruolo dell’esecutore",
        explanation:
          "Un `Future` è inerte: avanza solo se qualcuno chiama `poll`. I runtime (Tokio, smol, async-std) implementano un event loop che poll-a i Future quando i Waker li segnalano pronti. Da funzioni sync devi usare un esecutore per avviare/attendere Future.",
        codeExample: `#[tokio::main]
async fn main() {
  let fut = async { 123 };
  let n = fut.await; // il runtime invoca poll sotto il cofano
  println!("{}", n);
}`,
        status: "not-started",
      },
      {
        id: "as-9",
        rule: "Runtime multi-thread e requisiti Send/Sync",
        explanation:
          "Tokio usa un thread-pool con work-stealing: uno stesso task può riprendere su thread diversi. Tutto ciò che attraversa gli stati (catturato dalla future state machine) deve essere `Send`; riferimenti condivisi tra thread devono rispettare `Sync`.",
        codeExample: `#[tokio::main(flavor="multi_thread")]
async fn main() {
  let s = std::sync::Arc::new(String::from("ciao")); // Arc<String>: Send+Sync se T: Send+Sync
  let s2 = s.clone();
  tokio::spawn(async move { println!("{}", s2.len()); }).await.unwrap();
}`,
        status: "not-started",
      },
      {
        id: "as-10",
        rule: "Tokio: spawn e JoinHandle; join!/try_join!",
        explanation:
          "`tokio::spawn` avvia un task concorrente e restituisce `JoinHandle<T>` da `.await`-are. `tokio::join!` attende più future in parallelo; `tokio::try_join!` si ferma al primo errore e restituisce `Result`.",
        codeExample: `use tokio::time::{sleep, Duration};
#[tokio::main]
async fn main() {
  let h = tokio::spawn(async { sleep(Duration::from_millis(10)).await; 7 });
  let a = async { 1u32 };
  let b = async { 2u32 };
  let (x, y) = tokio::join!(a, b);
  let z = h.await.unwrap();
  println!("{} {} {}", x, y, z);
}`,
        status: "not-started",
      },
      {
        id: "as-11",
        rule: "select!: primo che completa, gli altri si cancellano",
        explanation:
          "`tokio::select!` attende su più rami asincroni ed esegue il primo che diventa pronto, cancellando gli altri. Può avere condizioni (if) e ramo `else`.",
        codeExample: `use tokio::{select, time::{sleep, Duration}};
#[tokio::main]
async fn main() {
  let a = async { sleep(Duration::from_millis(50)).await; "A" };
  let b = async { sleep(Duration::from_millis(10)).await; "B" };
  select! {
    v = a => println!("{}", v),
    v = b => println!("{}", v),
    else => println!("niente pronto"),
  }
}`,
        status: "not-started",
      },
      {
        id: "as-12",
        rule: "Tempo: sleep non blocca, timeout limita la durata",
        explanation:
          "`tokio::time::sleep(d)` sospende il task senza consumare CPU. `tokio::time::timeout(d, fut)` restituisce `Ok(val)` se `fut` termina in tempo altrimenti `Err(Elapsed)`.",
        codeExample: `use tokio::time::{sleep, timeout, Duration};
#[tokio::main]
async fn main() {
  let fut = async { sleep(Duration::from_secs(2)).await; 42 };
  let res = timeout(Duration::from_secs(1), fut).await;
  println!("{:?}", res); // Err(elapsed)
}`,
        status: "not-started",
      },
      {
        id: "as-13",
        rule: "CPU-bound in async: usa spawn_blocking",
        explanation:
          "Lavoro computazionalmente intenso introduce latenza se eseguito nel reactor. Incapsulalo in `tokio::task::spawn_blocking` (thread-pool separato per chiamate bloccanti/CPU-bound). Evita di abusarne o saturi la CPU.",
        codeExample: `use tokio::task;
#[tokio::main]
async fn main() {
  let sum = task::spawn_blocking(|| (0..20_000_000u64).sum()).await.unwrap();
  println!("{}", sum);
}`,
        status: "not-started",
      },
      {
        id: "as-14",
        rule: "Stato condiviso: Arc<Mutex<T>>, Semaphore, RwLock, Barrier, Notify",
        explanation:
          "Con più thread nel runtime valgono le stesse regole del multithreading: usa `Arc<Mutex<T>>` per mutabilità condivisa, `Semaphore` per limitare la concorrenza, `RwLock` per molti lettori/un solo scrittore, `Barrier` per sincronizzare fasi, `Notify` per semplici notifiche.",
        codeExample: `use std::sync::Arc;
use tokio::sync::{Mutex, Semaphore, RwLock, Barrier, Notify};
#[tokio::main]
async fn main() {
  let v = Arc::new(Mutex::new(0));
  let sem = Arc::new(Semaphore::new(2));
  let rw  = Arc::new(RwLock::new(0));
  let bar = Arc::new(Barrier::new(2));
  let nfy = Arc::new(Notify::new());
  let v2 = v.clone(); let sem2 = sem.clone(); let rw2 = rw.clone(); let bar2 = bar.clone(); let nfy2 = nfy.clone();
  let t1 = tokio::spawn(async move {
    let _p = sem2.acquire().await.unwrap();
    *v2.lock().await += 1;
    *rw2.write().await += 1;
    nfy2.notify_one();
    bar2.wait().await;
  });
  let t2 = tokio::spawn(async move {
    nfy.notified().await;
    let r = *rw.read().await; let _ = r;
    bar.wait().await;
  });
  let _ = tokio::join!(t1, t2);
}`,
        status: "not-started",
      },
      {
        id: "as-15",
        rule: "Canali: oneshot e mpsc bounded/unbounded",
        explanation:
          "`oneshot` trasferisce un singolo valore da un produttore a un consumatore. `mpsc` crea un canale molti-produttori/singolo-consumatore; versione bounded (buffer finito) o unbounded (coda non limitata). Chiudi i sender per far terminare il receiver.",
        codeExample: `use tokio::sync::{oneshot, mpsc};
#[tokio::main]
async fn main() {
  let (tx1, rx1) = oneshot::channel::<i32>();
  tokio::spawn(async move { let _ = tx1.send(7); });
  println!("oneshot = {}", rx1.await.unwrap());
  let (tx, mut rx) = mpsc::channel::<&'static str>(2);
  for _ in 0..3 { let t = tx.clone(); tokio::spawn(async move { let _=t.send("hi").await; }); }
  drop(tx);
  while let Some(msg) = rx.recv().await { let _ = msg; }
}`,
        status: "not-started",
      },
      {
        id: "as-16",
        rule: "Canali: broadcast e watch (pattern Observer)",
        explanation:
          "`broadcast` invia ogni messaggio a tutti i subscriber attivi (ogni receiver ha la sua coda). `watch` mantiene solo l’ultimo valore e notifica i cambi: i receiver leggono con `borrow()/borrow_and_update()` e attendono con `changed().await`.",
        codeExample: `use tokio::sync::{broadcast, watch};
#[tokio::main]
async fn main() {
  let (txb, _rx0) = broadcast::channel::<i32>(16);
  let mut r1 = txb.subscribe(); let mut r2 = txb.subscribe();
  tokio::spawn(async move { while let Ok(v)=r1.recv().await { let _=v; } });
  tokio::spawn(async move { while let Ok(v)=r2.recv().await { let _=v; } });
  let _ = txb.send(10);
  let (txw, mut rw) = watch::channel(0);
  tokio::spawn(async move { while rw.changed().await.is_ok() { let _=*rw.borrow(); } });
  let _ = txw.send(1);
}`,
        status: "not-started",
      },
    ],
    totalCards: 16,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "problem-solving",
    title: "Problem Solving [DA FARE]",
    description: "Pattern e tecniche per risolvere problemi complessi",
    icon: "💡",
    flashcards: createSampleFlashcards("Problem Solving", 15),
    totalCards: 15,
    completedCards: 0,
    reviewCards: 0,
  },
];
