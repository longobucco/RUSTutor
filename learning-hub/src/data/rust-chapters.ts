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
      "Sfide di verifica su borrowing, slice e mutabilità (con soluzioni spiegate).",
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
    ],
    totalCards: 3,
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
    id: "review-2",
    title: "Ripasso #2",
    description: "Sfide di verifica sul possesso (con soluzioni spiegate).",
    icon: "🧩",
    challenges: [
      {
        id: "ch-1",
        prompt:
          "Perché questo programma è compilato? Perché read_string non è mosso?",
        code: `fn main() {
  let read_string = "Dante Alighieri".to_string();
  let second_string = read_string.to_uppercase();
  println!("{}\\n{}", read_string, second_string);
}`,
        solution: `Alla riga 3 si invoca il metodo "to_uppercase" con firma: "pub fn to_uppercase(&self) -> String".
Il ricevitore (read_string) è prestato in modo immutabile tramite "&self" (internamente come &str), quindi NON viene mosso né consumato.
La funzione costruisce e restituisce una NUOVA "String" (second_string) che viene mossa nella variabile di destinazione.
Di conseguenza, il valore originale (read_string) rimane valido e può essere letto successivamente alla riga 4.`,
        fixes: [
          {
            label:
              "Versione con mutazione in-place ASCII (evita allocazione extra)",
            code: `fn main() {
  let mut s = String::from("Dante Alighieri");
  s.make_ascii_uppercase();          // muta in-place, solo per ASCII
  println!("{}", s);
}`,
          },
          {
            label: "Versione esplicita che mostra il prestito immutabile",
            code: `fn main() {
  let read_string = String::from("Dante Alighieri");
  let second_string: String = String::from(read_string.as_str()).to_uppercase();
  println!("{}\\n{}", read_string, second_string);
}`,
          },
        ],
        status: "not-started",
      },

      {
        id: "ch-2",
        prompt:
          "Perché questo programma è compilato? Perché con un riferimento mutabile posso comunque leggere il dato (in uno dei rami)?",
        code: `use rand::Rng;
fn main() {
  let mut b = Box::new(84);
  let r = &mut b;
  *r = Box::new(100);
  let mut rng = rand::rng();
  let n = rng.random_range(0..10);
  if n > 5 {
    println!("{:?}", b);
  } else {
    println!("{:?}", r);
  }
}`,
        solution: `Il borrow checker analizza i due percorsi di esecuzione (rami dell'if) separatamente.
- Ramo "true": si stampa "b". In questo ramo il riferimento mutabile "r" non viene usato; il suo prestito è considerato concluso prima del punto d'uso di "b". Pertanto l'accesso al proprietario è lecito.
- Ramo "false": si stampa "r" (il riferimento mutabile). In questo ramo, dopo la creazione di "r" e l'assegnazione "*r = ...", non ci sono accessi diretti a "b" prima del println!; quindi l'uso esclusivo di "r" è lecito.
Poiché in ogni ramo attivo si rispetta l'esclusività del prestito mutabile, il programma è ben tipato e compila.`,
        fixes: [
          {
            label: "Rendere esplicita la fine del prestito prima di usare b",
            code: `use rand::Rng;
fn main() {
  let mut b = Box::new(84);
  let r = &mut b;
  *r = Box::new(100);
  let mut rng = rand::rng();
  let n = rng.random_range(0..10);
  if n > 5 {
    drop(r);                 // fine esplicita del prestito mutabile
    println!("{:?}", b);
  } else {
    println!("{:?}", r);
  }
}`,
          },
          {
            label: "Limitare la vita del riferimento con un blocco",
            code: `use rand::Rng;
fn main() {
  let mut b = Box::new(84);
  {
    let r = &mut b;
    *r = Box::new(100);
    let mut rng = rand::rng();
    let n = rng.random_range(0..10);
    if n <= 5 {
      println!("{:?}", r);   // uso dentro al blocco
    }
  } // rilasciato qui
  println!("{:?}", b);       // ora accesso a b è sempre lecito
}`,
          },
          {
            label: "Evitare aliasing passando la proprietà temporaneamente",
            code: `use rand::Rng;
fn main() {
  let mut b = Box::new(84);
  // sposta e ri-ottieni per ridurre la finestra del prestito
  let mut tmp = b;
  tmp = Box::new(100);
  b = tmp;
  let mut rng = rand::rng();
  let n = rng.random_range(0..10);
  if n > 5 { println!("{:?}", b); } else { println!("{:?}", &b); }
}`,
          },
        ],
        status: "not-started",
      },

      {
        id: "ch-3",
        prompt:
          "Perché questo programma è compilato? Perché si può accedere al Box nonostante ci sia un prestito?",
        code: `fn main() {
  let mut x = Box::new(150);
  let mut z = &x;
  for i in 0..10 {
    println!("{:?}", z);
    x = Box::new(i);
    z = &x;
  }
  println!("{:?}", z);
}`,
        solution: `Il riferimento "z" prende in prestito "x" alla riga di inizializzazione e, ad ogni iterazione, viene usato nel println! prima di qualsiasi mutazione. 
Quel println! segna la fine effettiva del tempo di vita del prestito corrente (ultimo uso). Subito dopo, la riassegnazione di "x" è lecita perché non esistono più usi pendenti di "z" in quell'iterazione.
Poi si crea un nuovo prestito con "z = &x" che vale fino al println! della prossima iterazione (se esiste). In altre parole: 
- riga 1–3: creazione di "x" e primo prestito "z = &x"; 
- riga 6: ultimo uso del prestito corrente → il prestito termina;
- riga 7: mutazione del proprietario "x" consentita;
- riga 8: nuovo prestito "z = &x".
Questo ciclo si ripete per ogni iterazione, mantenendo l'ordine “usa il prestito → termina → muta → crea nuovo prestito”, perciò il programma è valido.`,
        fixes: [
          {
            label: "Rendere espliciti i confini del prestito con un blocco",
            code: `fn main() {
  let mut x = Box::new(150);
  let mut z = &x;
  for i in 0..10 {
    {
      println!("{:?}", z); // uso e fine prestito in questo blocco
    }
    x = Box::new(i);       // ora si può mutare
    z = &x;                // nuovo prestito
  }
  println!("{:?}", z);
}`,
          },
          {
            label: "Prestare solo quando serve (minimizzare la durata)",
            code: `fn main() {
  let mut x = Box::new(150);
  for i in 0..10 {
    { let z = &x; println!("{:?}", z); } // prestito breve
    x = Box::new(i);
  }
  let z = &x;
  println!("{:?}", z);
}`,
          },
          {
            label:
              "Usare stampa diretta quando non serve un binding persistente",
            code: `fn main() {
  let mut x = Box::new(150);
  for i in 0..10 {
    println!("{:?}", &x); // prestito creato e usato sul momento
    x = Box::new(i);
  }
  println!("{:?}", &x);
}`,
          },
        ],
        status: "not-started",
      },
    ],
    totalCards: 3,
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
    totalCards: 14,
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
    id: "review-3",
    title: "Ripasso #3",
    description: "Sfide di verifica sul lifetime (con soluzioni spiegate).",
    icon: "🧩",
    challenges: [
      {
        id: "ch-1",
        prompt: "Perché questo programma NON compila? (Vec<&str> + temporaneo)",
        code: `fn insert<'a>(vet: &mut Vec<&'a str>, s: &'a str) {
  vet.push(s);
}
fn main() {
  let mut v = Vec::<&str>::new();
  insert(&mut v, &"Ciao".to_string());
  println!("{:?}", v);
}`,
        solution: `Il parametro passato a insert è un riferimento a una String temporanea creata con "to_string()" e immediatamente referenziata con "&".
Quella String vive solo per la durata dell'espressione; il riferimento risultante non vive abbastanza per essere immagazzinato nel Vec<&str>.
Il borrow checker rileva che il riferimento ha un lifetime inferiore a quello del vettore e rifiuta la compilazione (rischio di dangling reference).`,
        fixes: [
          {
            label: "Memorizza possesso: usa Vec<String>",
            code: `fn insert(vet: &mut Vec<String>, s: &str) {
  vet.push(s.to_string());
}
fn main() {
  let mut v = Vec::<String>::new();
  insert(&mut v, "Ciao");
  println!("{:?}", v);
}`,
          },
          {
            label: "Mantieni viva la String (attenzione al lifetime!)",
            code: `fn insert<'a>(vet: &mut Vec<&'a str>, s: &'a str) {
  vet.push(s);
}
fn main() {
  let mut v: Vec<&str> = Vec::new();
  let s = "Ciao".to_string();     // vive finché serve
  insert(&mut v, &s);             // ok perché &s vive fino alla stampa
  println!("{:?}", v);
  // Se v dovesse vivere oltre 's', diventerebbe di nuovo illegale
}`,
          },
          {
            label: "Usa un literal &'static str",
            code: `fn insert<'a>(vet: &mut Vec<&'a str>, s: &'a str) {
  vet.push(s);
}
fn main() {
  let mut v = Vec::<&str>::new();
  insert(&mut v, "Ciao"); // literal: &'static str
  println!("{:?}", v);
}`,
          },
          {
            label: "Flessibile con Cow<'a, str>: prestito o possesso",
            code: `use std::borrow::Cow;
fn insert<'a>(vet: &mut Vec<Cow<'a, str>>, s: &'a str) {
  vet.push(Cow::Owned(s.to_string())); // oppure Cow::Borrowed(s)
}
fn main() {
  let mut v: Vec<Cow<'_, str>> = Vec::new();
  insert(&mut v, "Ciao");
  println!("{:?}", v);
}`,
          },
        ],
        status: "not-started",
      },

      {
        id: "ch-2",
        prompt:
          "Perché questo programma compila senza annotazioni di lifetime? (Vec<String>)",
        code: `fn insert(vet: &mut Vec<String>, s: &str) {
  vet.push(s.to_string());
}
fn main() {
  let mut v = Vec::<String>::new();
  {
    let messaggio = String::from("Ciao");
    insert(&mut v, &messaggio);
    println!("{:?}", v);
  }
  println!("{:?}", v); // funziona!
}`,
        solution: `Il vettore possiede elementi di tipo String, quindi non immagazzina riferimenti.
La chiamata a "to_string()" crea una nuova String sullo heap che viene mossa nel Vec: nessun riferimento da tracciare a livello di lifetime, quindi non servono annotazioni.
La firma di ToString chiarisce la semantica di possesso: "fn to_string(&self) -> String" (prende in prestito, restituisce possesso).`,
        fixes: [
          {
            label: "Usa to_owned/into (idiomatico)",
            code: `fn insert(vet: &mut Vec<String>, s: &str) {
  vet.push(s.to_owned());      // equivalente a to_string per &str
  // vet.push(s.into());       // alternativa idiomatica
}`,
          },
          {
            label: "Passa già una String e spostala",
            code: `fn insert_move(vet: &mut Vec<String>, s: String) {
  vet.push(s); // move
}
fn main() {
  let mut v = Vec::<String>::new();
  let messaggio = String::from("Ciao");
  insert_move(&mut v, messaggio); // messaggio mosso
  println!("{:?}", v);
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-3",
        prompt:
          "Perché con move + i32 (Copy) l’esterno resta 0? (closure FnMut con cattura per copia)",
        code: `fn main() {
  let mut count = 0;
  let mut increment = move || {
    count += 1;
    println!("Il conteggio è: {}", count);
  };
  increment();
  increment();
  println!("Hello, {}", count);
}`,
        solution: `Con "move", la chiusura cattura "count" per valore. Poiché i32 implementa Copy, la cattura è una copia.
La chiusura modifica la sua copia interna (stato della closure), non la variabile esterna: per questo stampa 1, poi 2, e fuori resta 0.
"let mut increment" è necessario perché la closure modifica il proprio ambiente catturato (FnMut).`,
        fixes: [
          {
            label: "Senza move: cattura per riferimento mutabile",
            code: `fn main() {
  let mut count = 0;
  let mut increment = || { // niente move
    count += 1;            // &mut count (prestito esclusivo durante la chiamata)
    println!("Il conteggio è: {}", count);
  };
  increment();
  increment();
  println!("Hello, {}", count); // ora stampa 2
}`,
          },
          {
            label: "Condividere stato anche con move usando Cell",
            code: `use std::cell::Cell;
fn main() {
  let count = Cell::new(0);
  let increment = move || {
    count.set(count.get() + 1);
    println!("Il conteggio è: {}", count.get());
  };
  increment(); increment();
  println!("Hello, {}", count.get()); // 2
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-4",
        prompt:
          "Perché questo programma NON compila con Box? Cosa cambia rispetto a i32 Copy?",
        code: `fn main() {
  let mut myBox = Box::new(42);
  let mut increment = move || {
    *myBox += 1;
    println!("Il conteggio è: {}", *myBox);
  };
  increment();
  increment();
  println!("Hello, {}", *myBox);
}`,
        solution: `Con "move", la chiusura sposta "myBox" dentro di sé (Box non è Copy). L'ultimo println! prova a usare "myBox" dopo che è stato mosso nella closure: uso dopo move → errore di compilazione.
Differenza col caso i32: i32 è Copy, quindi la chiusura lavora su una copia e l'originale esterno resta disponibile; Box non è Copy, quindi l'originale viene consumato.`,
        fixes: [
          {
            label: "Cattura per riferimento mutabile (niente move)",
            code: `fn main() {
  let mut myBox = Box::new(42);
  let mut increment = || {
    *myBox += 1; // &mut myBox durante la chiamata
    println!("Il conteggio è: {}", *myBox);
  };
  increment();
  increment();
  println!("Hello, {}", *myBox); // ora è lecito
}`,
          },
          {
            label: "Se vuoi mantenere move, non usare myBox fuori",
            code: `fn main() {
  let mut myBox = Box::new(42);
  let mut increment = move || {
    *myBox += 1;
    println!("Il conteggio è: {}", *myBox);
  };
  increment();
  increment();
  // niente uso di myBox qui: è posseduto dalla closure
}`,
          },
          {
            label: "Condividere possesso: Rc<RefCell<i32>>",
            code: `use std::cell::RefCell;
use std::rc::Rc;
fn main() {
  let x = Rc::new(RefCell::new(42));
  let x2 = Rc::clone(&x);
  let mut increment = move || {
    *x2.borrow_mut() += 1;
    println!("Il conteggio è: {}", *x2.borrow());
  };
  increment(); increment();
  println!("Hello, {}", *x.borrow());
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-5",
        prompt:
          "Perché senza move la chiusura aggiorna count e il valore esterno riflette gli aggiornamenti?",
        code: `fn main() {
  let mut count = 0;
  let mut increment_n = |n| {
    count += n;
    println!("Il conteggio è: {}", count);
  };
  increment_n(10);
  increment_n(5);
  println!("Hello, {}", count);
}`,
        solution: `Senza "move", la chiusura cattura "count" per riferimento mutabile a ogni chiamata (FnMut).
Durante l'esecuzione di "increment_n", esiste un prestito esclusivo su "count"; quel prestito termina alla fine della chiamata, quindi tra una chiamata e l'altra è lecito leggere "count" dall'esterno (come nell'esempio che stampa "Hello, 15").
Se si volesse usare "count" mentre è ancora preso in prestito dalla chiusura, il compilatore lo vieterebbe.`,
        fixes: [
          {
            label: "Rendere la closure Fn (senza mut) con Cell",
            code: `use std::cell::Cell;
fn main() {
  let count = Cell::new(0);
  let increment_n = |n: i32| {
    count.set(count.get() + n);
    println!("Il conteggio è: {}", count.get());
  };
  increment_n(10);
  println!("Hello, {}", count.get());
  increment_n(5);
}`,
          },
          {
            label: "Evitare cattura: passa &mut esplicito a una funzione",
            code: `fn inc_n(count: &mut i32, n: i32) {
  *count += n;
  println!("Il conteggio è: {}", *count);
}
fn main() {
  let mut count = 0;
  inc_n(&mut count, 10);
  println!("Hello, {}", count);
  inc_n(&mut count, 5);
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-6",
        prompt:
          "Perché questa closure si può chiamare due volte e stampa lo stesso risultato?",
        code: `fn main() {
  let data = vec![1, 2, 3, 4, 5];
  let process_data = move || { // move può anche essere omesso
    let sum: i32 = data.iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();
  process_data();
}`,
        solution: `Anche con move, la closure cattura "data" per valore ma non lo consuma: dentro usa "data.iter()", che prende un prestito immutabile (&) sul Vec e non ne muta lo stato. 
La closure non modifica l'ambiente catturato e può quindi essere invocata più volte (è una Fn), producendo sempre la stessa somma finché il contenuto non cambia.`,
        fixes: [
          {
            label: "Variante senza move (cattura per riferimento)",
            code: `fn main() {
  let data = vec![1, 2, 3, 4, 5];
  let process_data = || {
    let sum: i32 = data.iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();
  process_data();
}`,
          },
          {
            label:
              "Attenzione: usare into_iter() la renderebbe FnOnce (consuma)",
            code: `fn main() {
  let data = vec![1, 2, 3, 4, 5];
  let f = move || data.into_iter().count(); // consuma "data" → FnOnce
  let n1 = f();
  // let n2 = f(); // errore: la closure ha già consumato il suo ambiente
  println!("{}", n1);
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-7",
        prompt:
          "La closure con move muta il Vec e poi fuori si usa ancora data: compila?",
        code: `fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  let mut process_data = move || {
    data.push(6);
    let sum: i32 = data.iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();
  data.push(7);
}`,
        solution: `Non compila. Con "move" la closure sposta "data" dentro di sé; dopo l'assegnazione della closure, il binding esterno "data" è stato mosso e non è più accessibile. 
Il borrow checker segnala l'errore sull'uso esterno "data.push(7);" perché il proprietario è ormai la closure.`,
        fixes: [
          {
            label: "Senza move: cattura per riferimento mutabile",
            code: `fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  let mut process_data = || {
    data.push(6);
    let sum: i32 = data.iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();    // prestito mutabile finisce qui
  data.push(7);      // ora è di nuovo accessibile
}`,
          },
          {
            label: "Se vuoi mantenere move, non riusare data fuori",
            code: `fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  let mut process_data = move || {
    data.push(6);
    let sum: i32 = data.iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();
  // nessun uso di "data" qui: è posseduto dalla closure
}`,
          },
          {
            label: "Condividere possesso e mutabilità con Rc<RefCell<_>>",
            code: `use std::cell::RefCell;
use std::rc::Rc;
fn main() {
  let data = Rc::new(RefCell::new(vec![1, 2, 3, 4, 5]));
  let data2 = Rc::clone(&data);
  let mut process_data = move || {
    data2.borrow_mut().push(6);
    let sum: i32 = data2.borrow().iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();
  data.borrow_mut().push(7); // accesso esterno consentito
  println!("{:?}", data.borrow());
}`,
          },
          {
            label: "Non catturare: passa &mut esplicito a una funzione",
            code: `fn process_data(v: &mut Vec<i32>) {
  v.push(6);
  let sum: i32 = v.iter().sum();
  println!("La somma dei dati è: {}", sum);
}
fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  process_data(&mut data);
  data.push(7);
  println!("{:?}", data);
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-8",
        prompt:
          "Senza move: la closure muta il Vec e poi lo si usa fuori. Compila? Che output produce?",
        code: `fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  let mut process_data = || {
    data.push(6);
    let sum: i32 = data.iter().sum();
    println!("La somma dei dati è: {}", sum);
  };
  process_data();
  data.push(7);
  println!("{:?}", data);
}`,
        solution: `Compila e stampa:
"La somma dei dati è: 21"
"[1, 2, 3, 4, 5, 6, 7]"

Perché: senza "move", la closure prende un prestito mutabile su "data" durante la chiamata (FnMut). Alla fine della chiamata, il prestito termina, quindi "data" è di nuovo disponibile e può essere mutato dall'esterno.`,
        fixes: [
          {
            label: "Chiamare più volte alternando usi esterni",
            code: `fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  let mut process_data = || {
    data.push(6);
    let sum: i32 = data.iter().sum();
    println!("Somma: {}", sum);
  };
  process_data();          // prestito termina qui
  println!("{:?}", data);  // lecito
  process_data();          // nuovo prestito
  data.push(7);            // di nuovo lecito dopo la chiamata
  println!("{:?}", data);
}`,
          },
          {
            label: "Ridurre la durata del prestito con un blocco",
            code: `fn main() {
  let mut data = vec![1, 2, 3, 4, 5];
  {
    let mut process_data = || {
      data.push(6);
      let sum: i32 = data.iter().sum();
      println!("Somma: {}", sum);
    };
    process_data();
  } // il borrow della closure è sicuramente terminato
  data.push(7);
  println!("{:?}", data);
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-9",
        prompt:
          "Perché questa closure non può essere invocata due volte? (count consuma l'iteratore)",
        code: `fn main() {
  let range = 1..10;
  let f = || range.count();
  let n1 = f();
  println!("{n1}");
  let n2 = f();
}`,
        solution: `Il metodo "count()" è un consumatore di iteratore: richiede il possesso dell'iteratore e lo esaurisce. 
La closure, alla prima chiamata, muove "range" fuori dal proprio ambiente (FnOnce). Alla seconda chiamata non ha più il valore da consumare → errore: la closure implementa solo FnOnce.`,
        fixes: [
          {
            label: "Rigenera il range ad ogni chiamata (nessuna cattura)",
            code: `fn main() {
  let f = || (1..10).count();
  let n1 = f();
  let n2 = f(); // ok
  println!("{} {}", n1, n2);
}`,
          },
          {
            label: "Clona il range (Range è Clone) prima di consumarlo",
            code: `fn main() {
  let range = 1..10;
  let f = || range.clone().count(); // non muove l'originale
  let n1 = f();
  let n2 = f();
  println!("{} {}", n1, n2);
}`,
          },
          {
            label: "Se deve restare FnOnce, chiamala una sola volta",
            code: `fn main() {
  let range = 1..10;
  let f = || range.count(); // FnOnce
  let n1 = f();
  println!("{}", n1);
  // niente seconda chiamata
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-10",
        prompt: "Perché my_closure implementa solo FnOnce?",
        code: `fn main() {
  let s = String::from("ciao");
  // La closure prende possesso della variabile s
  let my_closure = move || {
    println!("Stampo la stringa: {}", s);
    s
  };
  // my_closure implementa solo FnOnce
  my_closure();
}`,
        solution: `La closure cattura "s" per valore (move) e la **restituisce** come valore di ritorno (l'ultima espressione non termina con ';').
Restituire "s" la sposta fuori dall'ambiente catturato: dopo la prima invocazione, la closure ha consumato "s" e non può essere richiamata di nuovo.
Una closure che **muove fuori** un catturato può essere chiamata al massimo una volta → implementa solo **FnOnce**.
Versione migliorata: assegnare il valore di ritorno a una variabile esterna e usarlo lì.`,
        fixes: [
          {
            label: "Miglioramento proposto: usa il valore di ritorno una volta",
            code: `fn main() {
  let s = String::from("ciao");
  let my_closure = move || {
    println!("Stampo la stringa: {}", s);
    s
  };
  let t = my_closure(); // sposta 's' fuori dalla closure
  println!("{}", t);
}`,
          },
          {
            label:
              "Non muovere fuori: non restituire 's' → Fn richiamabile più volte",
            code: `fn main() {
  let s = String::from("ciao");
  let my_closure = move || {
    println!("Stampo la stringa: {}", s); // solo lettura per &s
    // niente return di 's'
  };
  my_closure();
  my_closure(); // ok: non ha consumato 's'
}`,
          },
          {
            label:
              "Restituisci una copia (clone) per poter richiamare la closure",
            code: `fn main() {
  let s = String::from("ciao");
  let my_closure = move || {
    println!("Stampo la stringa: {}", s);
    s.clone() // ritorna una nuova String, non consuma l'originale
  };
  let t1 = my_closure();
  let t2 = my_closure();
  println!("{} {}", t1, t2);
}`,
          },
          {
            label:
              "Senza move: cattura per riferimento e restituisci una copia",
            code: `fn main() {
  let s = String::from("ciao");
  let my_closure = || {
    println!("Stampo la stringa: {}", s); // &s
    s.clone()
  };
  let t1 = my_closure();
  let t2 = my_closure();
  println!("{} {}", t1, t2);
  // Nota: senza 'move' puoi ancora usare 's' qui se serve.
}`,
          },
        ],
        status: "not-started",
      },
    ],
    totalCards: 10,
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
    title: "Input / Output",
    description: "File I/O, networking e gestione dei flussi di dati",
    icon: "💾",
    flashcards: [
      {
        id: "io-1",
        rule: "Modello del file system: file, metadati, permessi e accesso random",
        explanation:
          "Un file è un blocco di byte associato a un nome all’interno di un file system gerarchico (cartelle/percorsi). Ogni file ha metadati (proprietario, permessi, date, dimensione). L’accesso è random: puoi posizionarti e leggere/scrivere in punti arbitrari. Le librerie standard espongono API portabili (std::fs::File).",
        codeExample: `// Elenco metadata essenziali (concettualmente): nome, owner, permessi, timestamps, size
// In Unix, i permessi si rappresentano anche in ottale (es. 644, 755).`,
        status: "not-started",
      }, // :contentReference[oaicite:1]{index=1}

      {
        id: "io-2",
        rule: "Path e PathBuf: componibilità portabile, differenza da str/String",
        explanation:
          "Path è una vista unsized e read-only sul percorso (come str), PathBuf possiede il percorso e può mutare (come String). Nascondono differenze di separatori (Unix '/', Windows '\\\\') e offrono metodi per navigare/segmentare. Molte funzioni accettano P: AsRef<Path> per lavorare con &str/String in modo generico.",
        codeExample: `use std::path::{Path, PathBuf};
fn main() {
  let p = Path::new("data").join("logs").join("app.txt");
  let mut pb = PathBuf::from("data");
  pb.push("images"); pb.set_file_name("img.png");
  assert!(p.parent().is_some());
}`,
        status: "not-started",
      }, // :contentReference[oaicite:2]{index=2}

      {
        id: "io-3",
        rule: "Directory: read_dir / create_dir / remove_dir e precondizioni",
        explanation:
          "read_dir(path) restituisce un iteratore di DirEntry con nome, tipo e metadati; create_dir fallisce se esiste o manca il genitore; remove_dir rimuove solo se vuota e permessi adeguati.",
        codeExample: `use std::fs;
fn main() -> std::io::Result<()> {
  let here = ".";
  for e in fs::read_dir(here)? {
    let e = e?;
    println!("{:?}", e.file_name());
  }
  fs::create_dir("tmpdir")?;
  fs::remove_dir("tmpdir")?;
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:3]{index=3}

      {
        id: "io-4",
        rule: "Copia/rinomina/rimozione: copy, rename, remove_file",
        explanation:
          "copy(from,to) duplica i contenuti e ritorna i byte copiati; rename può spostare/atomically swap a seconda dell’OS; remove_file elimina un file (su alcuni OS la rimozione può essere differita se aperto).",
        codeExample: `use std::fs;
fn main() -> std::io::Result<()> {
  fs::copy("src.txt","dst.txt")?;
  fs::rename("dst.txt","renamed.txt")?;
  fs::remove_file("renamed.txt")?;
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:4]{index=4}

      {
        id: "io-5",
        rule: "Aprire file: File::open / File::create e OpenOptions avanzate",
        explanation:
          "File::open apre in lettura se esiste; File::create tronca o crea e apre in scrittura. OpenOptions consente combinazioni (read, write, create, truncate, append). I parametri percorso sono generici tramite AsRef<Path>.",
        codeExample: `use std::fs::{File, OpenOptions};
use std::io::{Read, Write};
fn main() -> std::io::Result<()> {
  let mut f = File::open("input.txt")?;
  let mut s = String::new(); f.read_to_string(&mut s)?;
  let mut out = OpenOptions::new().write(true).create(true).truncate(true).open("out.txt")?;
  out.write_all(s.as_bytes())?;
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:5]{index=5}

      {
        id: "io-6",
        rule: "Helper ad alto livello: fs::read_to_string e fs::write",
        explanation:
          "read_to_string(path) legge l’intero file in una String (assume UTF-8 valido); write(path, bytes) sovrascrive con il buffer fornito. Sono comodi per file testuali “piccoli/medi”: per file grandi è preferibile lo streaming.",
        codeExample: `use std::fs;
fn main() -> std::io::Result<()> {
  fs::write("note.txt", "riga1\\nriga2")?;
  let txt = fs::read_to_string("note.txt")?;
  println!("{}", txt);
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:6]{index=6}

      {
        id: "io-7",
        rule: "Gestione errori I/O: ErrorKind, matching e retry per Interrupted",
        explanation:
          "Le operazioni I/O restituiscono Result con io::Error; .kind() classifica cause comuni: NotFound, PermissionDenied, AlreadyExists, InvalidInput, TimedOut, Interrupted (tipica da segnali: spesso si ritenta).",
        codeExample: `use std::io::{self, Read, ErrorKind};
use std::fs::File;
fn main() {
  match File::open("missing.txt") {
    Ok(mut f) => { let mut s=String::new(); let _=f.read_to_string(&mut s); }
    Err(e) => match e.kind() {
      ErrorKind::NotFound => eprintln!("manca"),
      ErrorKind::PermissionDenied => eprintln!("permessi"),
      _ => eprintln!("altro: {}", e),
    }
  }
}`,
        status: "not-started",
      }, // :contentReference[oaicite:7]{index=7}

      {
        id: "io-8",
        rule: "Tratto Read: read(), read_exact(), read_to_end(), chain(), take()",
        explanation:
          "Read definisce read(&mut [u8])→usize: può restituire scritture parziali, Ok(0) può indicare EOF. read_exact riempie tutto il buffer o fallisce (UnexpectedEof). read_to_end accumula fino a EOF. chain concatena reader; take limita i byte massimi. Ogni read può invocare una syscall (costo).",
        codeExample: `use std::io::{self, Read};
use std::fs::File;
fn main() -> io::Result<()> {
  let mut f = File::open("test.txt")?;
  let mut buf = [0u8; 16];
  let n = f.read(&mut buf)?;
  if n == 0 { return Ok(()); }
  let mut more = Vec::new();
  f.read_to_end(&mut more)?;
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:8]{index=8}

      {
        id: "io-9",
        rule: "BufRead: buffering, lines()/read_line(), fill_buf()+consume()",
        explanation:
          "BufRead introduce un buffer utente per ridurre syscall su letture piccole. lines() produce Result<String> per riga; read_line appende a una String esistente. Con fill_buf ritorni una slice interna; DEVI chiamare consume(len) dopo l’elaborazione, altrimenti leggerai sempre gli stessi byte.",
        codeExample: `use std::io::{BufRead, BufReader};
use std::fs::File;
fn main() -> std::io::Result<()> {
  let f = File::open("poema.txt")?;
  let mut r = BufReader::new(f);
  let mut line = String::new();
  r.read_line(&mut line)?; println!("{}", line);
  line.clear();
  let buf = r.fill_buf()?; print!("{}", String::from_utf8_lossy(buf));
  let len = buf.len(); r.consume(len);
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:9]{index=9}

      {
        id: "io-10",
        rule: "Tratto Write: write(), write_all(), flush() e macro write!()",
        explanation:
          "Write::write può eseguire scritture parziali; write_all ripete fino a esaurire il buffer o fallire. flush forza lo svuotamento dei buffer verso il kernel. La macro write! formatta e scrive su un writer, e (per come presentato) include il flush prima del ritorno.",
        codeExample: `use std::io::{self, Write};
use std::fs::File;
fn main() -> io::Result<()> {
  let mut f = File::create("out.txt")?;
  let data = b"Hello\\n";
  let _ = f.write(data)?;
  f.write_all(b"World\\n")?;
  f.flush()?;
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:10]{index=10}

      {
        id: "io-11",
        rule: "Seek/posizionamento: Start/End/Current, stream_position, rewind",
        explanation:
          "Seek tratta il file come un array di byte indicizzato: puoi posizionare il cursore con SeekFrom::{Start,End,Current}, leggere/scrivere in posizioni arbitrarie, leggere la posizione corrente o riavvolgere all’inizio.",
        codeExample: `use std::io::{self, Read, Write, Seek, SeekFrom};
use std::fs::OpenOptions;
fn main() -> io::Result<()> {
  let mut f = OpenOptions::new().read(true).write(true).create(true).open("ex.txt")?;
  f.write_all(b"Hello, world!")?;
  f.seek(SeekFrom::Start(7))?;
  f.write_all(b"Rust")?;
  f.rewind()?;
  let mut s = String::new(); f.read_to_string(&mut s)?;
  println!("{}", s); // "Hello, Rust!"
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:11]{index=11}

      {
        id: "io-12",
        rule: "Lettura binaria e dispositivi speciali; attenzione a read_exact",
        explanation:
          "Puoi leggere stream binari (anche dispositivi speciali come /dev/urandom). read_exact richiede che il flusso fornisca esattamente buf.len() byte, altrimenti fallisce con UnexpectedEof; converti i buffer con from_*_bytes secondo l’endian desiderato.",
        codeExample: `use std::fs::File;
use std::io::Read;
fn main() -> std::io::Result<()> {
  let mut f = File::open("/dev/urandom")?;
  let mut buff = [0u8; 4];
  f.read_exact(&mut buff)?;
  let x = i32::from_be_bytes(buff);
  println!("{}", x);
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:12]{index=12}

      {
        id: "io-13",
        rule: "RAII di File: niente close(), chiusura automatica a fine scope",
        explanation:
          "File segue RAII: alla fine dello scope (o quando viene droppato) rilascia la handle e le risorse kernel. Non esiste un metodo close esplicito; eventualmente puoi usare drop(file) per anticipare la chiusura.",
        codeExample: `use std::fs::File;
fn main() {
  {
    let _f = File::create("tmp.bin").unwrap();
    // uso del file...
  } // qui _f viene droppato e il file si chiude
}`,
        status: "not-started",
      }, // :contentReference[oaicite:13]{index=13}

      {
        id: "io-14",
        rule: "Contenuti strutturati: Serde per JSON/CSV (Serialize/Deserialize)",
        explanation:
          "Serde genera (via derive) serializer/deserializer efficienti per tipi arbitrari. Con serde_json serializzi/parsifichi JSON, con crate csv scrivi/leggi record tabellari. Attenzione alla validità dei dati e ai tipi compatibili; derive fallisce su campi ‘patologici’.",
        codeExample: `use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize, Debug)]
struct Persona { nome: String, eta: u32 }
fn main() -> Result<(), Box<dyn std::error::Error>> {
  let v = vec![Persona{nome:"Ada".into(), eta:36}, Persona{nome:"Linus".into(), eta:55}];
  let json = serde_json::to_string(&v)?; // o to_string_pretty
  std::fs::write("people.json", json)?;
  let s = std::fs::read_to_string("people.json")?;
  let back: Vec<Persona> = serde_json::from_str(&s)?;
  println!("{:?}", back);
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:14]{index=14}
    ],
    totalCards: 14,
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
    id: "review-4",
    title: "Ripasso #4",
    description:
      "Sfide di verifica su iteratori e smart pointers (con soluzioni spiegate).",
    icon: "🧩",
    challenges: [
      {
        id: "ch-1",
        prompt: "for consuma il Vec: cosa succede agli elementi dopo il break?",
        code: `fn main() {
  let v = vec![1,2,3,4,5,6,7,8,8,10];
  for num in v { // equivale a: for num in v.into_iter()
    if num % 3 == 0 { break; }
  }
}`,
        solution: `Il for su Vec<T> usa into_iter(), quindi **sposta** il vettore nel ciclo e ne consuma gli elementi.
Quando esci con break:
- gli elementi già estratti sono stati mossi in "num" (e poi droppati se non usati);
- l'iteratore IntoIter viene droppato e, come effetto, **droppa anche tutti gli elementi rimanenti** non ancora estratti.
Il Vec originale "v" è stato mosso dentro il for e non è più disponibile dopo il ciclo.`,
        fixes: [
          {
            label: "Visualizza il comportamento con Drop personalizzato",
            code: `#[derive(Debug)]
struct S(i32);
impl Drop for S {
  fn drop(&mut self) { println!("Dropping S({})", self.0); }
}
fn main() {
  let v = vec![S(1),S(2),S(3),S(4),S(5),S(6)];
  for num in v {
    println!("{:?}", num);
    if num.0 % 3 == 0 { break; } // qui vedrai i drop del resto
  }
}`,
          },
          {
            label: "Non consumare il vettore: itera per riferimento",
            code: `fn main() {
  let v = vec![1,2,3,4,5,6,7,8,9,10];
  for num in &v { // &v.iter()
    if *num % 3 == 0 { break; }
  }
  println!("{:?}", v); // ancora disponibile
}`,
          },
          {
            label: "Trova l'indice e usa slice senza consumare",
            code: `fn main() {
  let v = vec![1,2,3,4,5,6,7,8,9,10];
  if let Some(idx) = v.iter().position(|n| n % 3 == 0) {
    let (_scanditi, restanti) = v.split_at(idx);
    println!("Restanti (slice): {:?}", restanti);
  }
}`,
          },
        ],
        status: "not-started",
      },
      {
        id: "ch-2",
        prompt:
          "Rc<Node> e get_mut: perché ritorna None e cosa stampa il programma?",
        code: `use std::rc::Rc;
#[derive(Debug)]
struct Node { value: i32, children: Vec<Rc<Node>> }
fn main() {
  let mut nipote1 = Rc::new(Node { value: 3, children: vec![] });
  let nipote2 = Rc::new(Node { value: 6, children: vec![] });
  let padre   = Rc::new(Node {
    value: 9,
    children: vec![Rc::clone(&nipote1), Rc::clone(&nipote2)],
  });
  let nonno   = Rc::new(Node {
    value: 27,
    children: vec![Rc::clone(&padre)],
  });
  match Rc::get_mut(&mut nipote1) {
    Some(v) => v.children.push(Rc::clone(&nonno)),
    None => println!("Non è possibile ottenere un riferimento mutabile."),
  }
  println!("{:#?}", nonno);
}`,
        solution: `Il programma compila e costruisce l'albero: "nonno" → "padre" → { "nipote1", "nipote2" }.
"Rc::get_mut(&mut nipote1)" restituisce **None** perché richiede **unicità** (strong_count==1): ma "nipote1" è posseduto sia dalla variabile "nipote1" sia dentro "padre.children" → strong_count≥2. 
Quindi non è possibile ottenere "&mut Node" tramite get_mut e compare il messaggio "Non è possibile ottenere un riferimento mutabile.".
La stampa finale mostra l'albero senza il collegamento aggiuntivo, evitando anche di creare un ciclo (nonno→padre→nipote1→nonno) che con Rc puro provocherebbe una perdita di memoria.`,
        fixes: [
          {
            label: "Mutare PRIMA di condividere (unicità garantita)",
            code: `use std::rc::Rc;
#[derive(Debug)]
struct Node { value: i32, children: Vec<Rc<Node>> }
fn main() {
  let mut nipote1 = Rc::new(Node { value: 3, children: vec![] });
  // OK: unico proprietario → get_mut funziona
  Rc::get_mut(&mut nipote1).unwrap().children.push(Rc::new(Node{ value: 30, children: vec![] }));
  let nipote2 = Rc::new(Node { value: 6, children: vec![] });
  let padre   = Rc::new(Node { value: 9, children: vec![Rc::clone(&nipote1), Rc::clone(&nipote2)] });
  let nonno   = Rc::new(Node { value: 27, children: vec![Rc::clone(&padre)] });
  println!("{:#?}", nonno);
}`,
          },
          {
            label: "Consentire mutabilità condivisa con Rc<RefCell<Node>>",
            code: `use std::{rc::Rc, cell::RefCell};
#[derive(Debug)]
struct Node { value: i32, children: Vec<Rc<RefCell<Node>>> }
fn main() {
  let nipote1 = Rc::new(RefCell::new(Node { value: 3, children: vec![] }));
  let nipote2 = Rc::new(RefCell::new(Node { value: 6, children: vec![] }));
  let padre   = Rc::new(RefCell::new(Node {
    value: 9, children: vec![Rc::clone(&nipote1), Rc::clone(&nipote2)]
  }));
  let nonno   = Rc::new(RefCell::new(Node {
    value: 27, children: vec![Rc::clone(&padre)]
  }));
  // Mutazione anche se condiviso
  nipote1.borrow_mut().children.push(Rc::clone(&nonno));
  println!("{:#?}", nonno);
  // Attenzione: così si crea un ciclo Rc ↔ Rc (leak). Usa Weak per rompere il ciclo.
}`,
          },
          {
            label: "Evitare cicli usando Weak nei riferimenti ‘verso l’alto’",
            code: `use std::rc::{Rc, Weak};
#[derive(Debug)]
struct Node { value: i32, parent: Weak<Node>, children: Vec<Rc<Node>> }
fn new_node(value: i32, parent: Weak<Node>) -> Rc<Node> {
  Rc::new(Node { value, parent, children: vec![] })
}
fn main() {
  let nonno = new_node(27, Weak::new());
  let padre = new_node(9, Rc::downgrade(&nonno));
  // collega
  let nipote1 = new_node(3, Rc::downgrade(&padre));
  let nipote2 = new_node(6, Rc::downgrade(&padre));
  // aggiorna children (serve RefCell se vuoi mutare dopo la creazione)
  // questo esempio mostra solo la struttura dei tipi per rompere i cicli.
  let _ = (nonno, padre, nipote1, nipote2);
}`,
          },
          {
            label:
              "Clona-on-write con Rc::make_mut (attenzione: rompe la condivisione)",
            code: `use std::rc::Rc;
#[derive(Debug, Clone)]
struct Node { value: i32, children: Vec<Rc<Node>> }
fn main() {
  let mut nipote1 = Rc::new(Node { value: 3, children: vec![] });
  let padre = Rc::new(Node { value: 9, children: vec![Rc::clone(&nipote1)] });
  // Non unico → make_mut clona il contenuto e rende unica la nuova istanza
  Rc::make_mut(&mut nipote1).children.push(Rc::clone(&padre));
  // Ora 'nipote1' non è più condiviso con 'padre.children[0]'
  println!("{:?}", nipote1.children.len());
}`,
          },
        ],
        status: "not-started",
      },
    ],
    totalCards: 2,
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
    id: "modules",
    title: "Moduli",
    description: "Organizzazione del codice, crate e sistema di moduli",
    icon: "📂",
    flashcards: [
      {
        id: "mod-1",
        rule: "Crate: unità di compilazione, linking e output (bin/lib)",
        explanation:
          "Un crate è l’unità di compilazione Rust: i sorgenti vengono compilati in oggetti e collegati in un eseguibile (con main) o in una libreria. Un crate binario è anche l’unità di versionamento/caricamento a runtime; se usa API esportate da un altro crate libreria, il linker combina i prodotti in base al tipo di libreria (statica/dinamica).",
        codeExample: `// Cargo crea un package che può contenere più crate (bin/lib):
// src/main.rs  -> crate binario
// src/lib.rs   -> crate libreria
// altri binari: src/bin/nome.rs`,
        status: "not-started",
      },
      {
        id: "mod-2",
        rule: "Librerie statiche vs dinamiche: quando e perché",
        explanation:
          "Statico: il codice della libreria è copiato dentro l’eseguibile al link; nessun caricamento a runtime, più dimensione su disco. Dinamico: l’eseguibile contiene solo un riferimento e il SO carica la .dll/.so/.dylib all’avvio; più processi possono condividere la stessa copia in memoria (spazio degli indirizzi del SO), uso risorse più efficiente.",
        codeExample: `// Statico: link-time copy nel binario
// Dinamico: il loader del SO risolve e mappa la libreria all'avvio`,
        status: "not-started",
      },
      {
        id: "mod-3",
        rule: "Cargo.toml [lib] crate-type: rlib, dylib, staticlib, cdylib",
        explanation:
          "Il tipo di libreria si imposta in [lib]. rlib (default) è una libreria statica Rust per utenti Rust; dylib è dinamica Rust; staticlib è una libreria statica compatibile C (.a/.lib) per utenti non-Rust; cdylib è dinamica compatibile C (.so/.dll/.dylib). Scegli in base a chi consumerà la libreria e a come vuoi linkare.",
        codeExample: `[lib]
name = "mylib"
crate-type = ["rlib"]   // o: ["dylib"], ["staticlib"], ["cdylib"]`,
        status: "not-started",
      },
      {
        id: "mod-4",
        rule: "Creare e usare un’rlib (libreria Rust statica) da un binario",
        explanation:
          "cargo new my_lib --lib genera la struttura base. Esporre funzioni con pub in src/lib.rs. Nel binario, dichiarare la dipendenza in [dependencies] via path e chiamare le API. Il linking è statico (rlib) e trasparente per Cargo.",
        codeExample: `// my_lib/src/lib.rs
pub fn add(a: u64, b: u64) -> u64 { a + b }

// my_app/Cargo.toml
// [dependencies]
// my_lib = { path = "../my_lib" }

// my_app/src/main.rs
use my_lib;
fn main() { println!("{}", my_lib::add(1,2)); }`,
        status: "not-started",
      },
      {
        id: "mod-5",
        rule: "Creare e usare una dylib (libreria Rust dinamica) da un binario",
        explanation:
          'Per una libreria dinamica Rust, imposta crate-type = ["dylib"]. Il binario la riferisce come dipendenza e la usa con use my_lib2::.... Il build genera l’artefatto di piattaforma (es. libmylib2.so / my_lib2.dll) accanto ai target.',
        codeExample: `// my_lib2/Cargo.toml
[lib]
crate-type = ["dylib"]

// my_lib2/src/lib.rs
pub fn somma(a: u64, b: u64) -> u64 { a + b }

// binario:
use my_lib2;
fn main() { println!("{}", my_lib2::somma(1,2)); }`,
        status: "not-started",
      },
      {
        id: "mod-6",
        rule: "Output nominale delle librerie dinamiche a build completata",
        explanation:
          "Compilando una dylib ottieni: Windows → nome.dll, Linux → libnome.so, macOS → libnome.dylib. Cargo colloca i file nella cartella target (profilo debug/release); l’eseguibile dipendente caricherà la libreria a runtime.",
        codeExample: `// target/debug/
//   my_app.exe
//   my_lib2.dll   // Windows (oppure libmy_lib2.so su Linux)`,
        status: "not-started",
      },
      {
        id: "mod-7",
        rule: 'Esportare API compatibili C: staticlib/cdylib, extern "C", #[no_mangle]',
        explanation:
          'Per esporre funzioni a C: scegli staticlib (link statico) o cdylib (dinamico). Marca le funzioni con extern "C" per ABI C e #[no_mangle] per evitare il name mangling; così il linker C le trova col nome atteso. Compila con cargo build --release e linka dal C.',
        codeExample: `// Cargo.toml (lato Rust)
[lib]
crate-type = ["staticlib"]   // o ["cdylib"]

// src/lib.rs
#[no_mangle]
pub extern "C" fn somma(a: u64, b: u64) -> u64 { a + b }`,
        status: "not-started",
      },
      {
        id: "mod-8",
        rule: "Link da C: comandare gcc verso la libreria Rust",
        explanation:
          "Dopo il build (profilo release) avrai libmylib3.a (Linux/macOS) o mylib3.lib (Windows). Da C compila e linka specificando il path alla libreria (-L) e il nome senza prefisso lib né suffisso (-l).",
        codeExample: `// main.c
// extern unsigned long long somma(unsigned long long, unsigned long long);
// gcc main.c -L./target/release -lmylib3 -o main`,
        status: "not-started",
      },
      {
        id: "mod-9",
        rule: "Albero dei moduli: default privato, pub e catena di accessibilità",
        explanation:
          "Il crate è un albero di moduli (mod). Di default tutto è privato e visibile al modulo che lo contiene. Anteponendo pub un item diventa pubblico, ma può essere usato da fuori solo se tutti i moduli lungo il cammino sono a loro volta accessibili (pub o antenati del chiamante).",
        codeExample: `mod my_mod {
  fn private_fn() {}
  pub fn public_fn() {}
  mod private_nested {}
  pub mod public_nested { pub fn api() {} }
}
fn main() {
  my_mod::public_fn();
  my_mod::public_nested::api();
}`,
        status: "not-started",
      },
      {
        id: "mod-10",
        rule: "Percorsi assoluti/relativi: crate::, self::, super:: e use",
        explanation:
          "Un percorso assoluto parte da crate:: (crate corrente) o da un nome di crate esterno; relativo parte da self:: (modulo corrente), super:: (genitore) o da un sotto-modulo. use importa simboli o moduli per evitare percorsi prolissi; use path::* espone tutti i pubblici del modulo.",
        codeExample: `mod genitore {
  fn f2() {}
  pub fn f1() { f2(); }
  pub mod figlio {
    pub fn g() { super::f2(); self::h(); }
    fn h() {}
  }
}
use genitore::figlio::g;
fn main() { g(); }`,
        status: "not-started",
      },
      {
        id: "mod-11",
        rule: "Organizzazione sorgenti: file singolo, nome.rs, cartella/mod.rs",
        explanation:
          "Un sotto-modulo può essere definito: (1) inline nello stesso file con mod nome { ... }; (2) in un file nome.rs nella stessa cartella, previa dichiarazione mod nome; nel genitore; (3) in una cartella nome/ con mod.rs (che può a sua volta dichiarare sotto-moduli). Le dipendenze esterne si elencano in [dependencies] del Cargo.toml.",
        codeExample: `// main.rs
mod my_module;          // cerca src/my_module.rs oppure src/my_module/mod.rs
fn main() {}

// src/my_module.rs   (oppure src/my_module/mod.rs)
pub fn api() {}`,
        status: "not-started",
      },
      {
        id: "mod-12",
        rule: "use ... as ... : alias per disambiguare o accorciare",
        explanation:
          "Puoi importare più simboli con lo stesso nome usando alias, o per rendere più leggibile il call-site. È comune quando due moduli esportano funzioni/tipi omonimi.",
        codeExample: `mod a { pub fn f(){ println!("A"); } }
mod b { pub fn f(){ println!("B"); } }
use a::f as fa;
use b::f as fb;
fn main(){ fa(); fb(); }`,
        status: "not-started",
      },
      {
        id: "mod-13",
        rule: "Glob import: use modulo::* (quando sì, quando no)",
        explanation:
          "use modulo::* porta nel namespace corrente tutti i simboli pubblici del modulo. È comodo nei test o per moduli “preludio” interni; in produzione può ridurre la leggibilità e introdurre collisioni di nomi: usalo con parsimonia.",
        codeExample: `mod util {
  pub fn a() {}
  pub fn b() {}
}
use util::*;
fn main(){ a(); b(); }`,
        status: "not-started",
      },
      {
        id: "mod-14",
        rule: "Preludio: simboli importati automaticamente per edizione",
        explanation:
          "Rust importa automaticamente un “preludio” appropriato all’edizione (2015/2018/2021/2024), includendo tipi usati spesso (String, Vec, Option, Result, ecc.). Per questo puoi usarli senza use esplicito. L’edizione selezionata in Cargo influisce sul modulo di preludio importato.",
        codeExample: `// Nessun use esplicito per String/Vec/Option/Result:
// sono nel preludio della std per la tua edizione
fn main() {
  let s: String = "ciao".into();
  let v: Vec<i32> = vec![1,2,3];
  let o: Option<i32> = Some(5);
  let r: Result<i32, ()> = Ok(1);
}`,
        status: "not-started",
      },
    ],
    totalCards: 14,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "testing",
    title: "Test",
    description: "Unit test, integration test e testing patterns",
    icon: "🧪",
    flashcards: [
      {
        id: "t-1",
        rule: "Perché testare: confidenza, refactoring e qualità",
        explanation:
          "Un test è codice scritto per verificare se una porzione di software funziona. I test non provano l’assenza di bug, ma aumentano la confidenza al deploy e proteggono da regressioni durante la manutenzione e il refactoring. Scriverli bene ha costo contenuto e benefici elevati nel medio periodo.",
        codeExample: `// Idea: ogni componente con casi 'tipici' e casi limite deve avere test mirati.`,
        status: "not-started",
      }, // :contentReference[oaicite:1]{index=1}

      {
        id: "t-2",
        rule: "Unit, Integration, End-to-End/Accettazione: cosa validano",
        explanation:
          "Unit test: singolo componente con conoscenza interna e casi limite. Integration test: correttezza dell’interfaccia fra due o più parti già unit-tested. End-to-End: comportamento dell’intero prodotto su casi d’uso reali; i test di accettazione verificano le aspettative del committente.",
        codeExample: `// Piramide: tanti unit, meno integration, pochi E2E ad alto valore informativo.`,
        status: "not-started",
      }, // :contentReference[oaicite:2]{index=2}

      {
        id: "t-3",
        rule: "Unit test in Rust: sotto-modulo #[cfg(test)]",
        explanation:
          "I test di unità vivono spesso in un sotto-modulo `tests` nello stesso file/modulo del codice, preceduto da `#[cfg(test)]`. Questo codice esiste solo quando compili con `cargo test`, mantenendo pulita la build di produzione.",
        codeExample: `pub fn add(a: u64, b: u64) -> u64 { a + b }

#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  fn it_works() {
    let result = add(2, 2);
    assert_eq!(result, 4);
  }
}`,
        status: "not-started",
      }, // :contentReference[oaicite:3]{index=3}

      {
        id: "t-4",
        rule: "AAA: Arrange–Act–Assert e macro di asserzione",
        explanation:
          "La forma tipica di un test è: (A) Arrange: prepara dati/stat0; (A) Act: invoca il codice sotto test; (A) Assert: verifica con `assert!`, `assert_eq!`, `assert_ne!`. Le asserzioni devono esprimere il comportamento osservabile previsto.",
        codeExample: `#[test]
fn divide_interi() {
  // Arrange
  let a = 10; let b = 2;
  // Act
  let q = a / b;
  // Assert
  assert_eq!(q, 5);
}`,
        status: "not-started",
      }, // :contentReference[oaicite:4]{index=4}

      {
        id: "t-5",
        rule: "Verificare i panic: #[should_panic] ed expected=...",
        explanation:
          'Puoi esprimere che un test debba fallire con panico: `#[should_panic]`. Con `expected = "msg"` verifichi che il messaggio contenga la stringa data. Utile per contratti e guard-clause.',
        codeExample: `pub fn divide(a: i32, b: i32) -> i32 {
  if b == 0 { panic!("Divisione per zero") } else { a / b }
}

#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  #[should_panic(expected = "Divisione per zero")]
  fn test_divide_panic() { divide(10, 0); }
}`,
        status: "not-started",
      }, // :contentReference[oaicite:5]{index=5}

      {
        id: "t-6",
        rule: "Test che ritornano Result: usare ? per fallire ordinatamente",
        explanation:
          "Una funzione di test può ritornare `Result<(), E>`. Se usi `?`, un errore indica direttamente fallimento del test; `Ok(())` indica successo. Ciò semplifica i test che chiamano API fallibili.",
        codeExample: `fn parse_number(s: &str) -> Result<i32, String> {
  s.parse().map_err(|_| "Parsing fallito".to_string())
}

#[test]
fn test_parse_valid() -> Result<(), String> {
  let num = parse_number("42")?;
  assert_eq!(num, 42);
  Ok(())
}`,
        status: "not-started",
      }, // :contentReference[oaicite:6]{index=6}

      {
        id: "t-7",
        rule: "Integration test: cartella tests/ e API pubblica",
        explanation:
          "I test di integrazione vivono in `tests/` accanto a `src/` e trattano il crate come un utente esterno: importano solo simboli pubblici. Sono supportati per i crate libreria; ogni file in `tests/` è un binario di test separato.",
        codeExample: `// Struttura
// my_lib/
//   src/lib.rs
//   tests/calcolatrice.rs
// In calcolatrice.rs:
// use my_lib::*;
// #[test] fn test_somma() { assert_eq!(somma(10, 5), 15); }`,
        status: "not-started",
      }, // :contentReference[oaicite:7]{index=7}

      {
        id: "t-8",
        rule: "Eseguire test: cargo test, filtri e test ignorati",
        explanation:
          "`cargo test` compila in modalità test ed esegue tutti i test (inclusi eventuali doc-test). Puoi filtrare per nome (`cargo test add_`) ed includere test ignorati marcati con `#[ignore]` usando `cargo test -- --ignored`.",
        codeExample: `#[test]
#[ignore] // eseguito solo con -- --ignored
fn test_lento() {
  // simulazione workload pesante...
}`,
        status: "not-started",
      }, // :contentReference[oaicite:8]{index=8}

      {
        id: "t-9",
        rule: "Design dei test di unità: casi tipici, bordi e complessità ciclomatica",
        explanation:
          "Un buon set di unit test copre il comportamento tipico, i casi ai bordi e oltre il dominio previsto. Il numero di test cresce con la complessità ciclomatica del modulo: più rami, più casi vanno esercitati deliberatamente.",
        codeExample: `// Esempio: funzioni con molti rami 'match' richiedono test per ogni variante.`,
        status: "not-started",
      }, // :contentReference[oaicite:9]{index=9}

      {
        id: "t-10",
        rule: "rstest: test parametrici con #[case(...)]",
        explanation:
          "`rstest` permette di definire test parametrici: una singola funzione `#[rstest]` viene eseguita su più tuple di casi fornite con `#[case(...)]`. Utile per tabellare input/attesi e ridurre duplicazioni.",
        codeExample: `use rstest::rstest;

fn somma(a: i32, b: i32) -> i32 { a + b }

#[rstest]
#[case(2, 3, 5)]
#[case(-1, 1, 0)]
#[case(0, 0, 0)]
fn test_somma(#[case] a: i32, #[case] b: i32, #[case] expected: i32) {
  assert_eq!(somma(a, b), expected);
}`,
        status: "not-started",
      }, // :contentReference[oaicite:10]{index=10}

      {
        id: "t-11",
        rule: "rstest: fixture per setup riutilizzabile",
        explanation:
          "Con `#[fixture]` definisci funzioni di setup che creano dati di test riusabili. Nella firma del test, un parametro con lo stesso nome della fixture fa iniettare automaticamente il suo valore.",
        codeExample: `use rstest::{fixture, rstest};

#[fixture]
fn vettore() -> Vec<i32> { vec![1, 2, 3, 4] }

fn somma_vec(v: &[i32]) -> i32 { v.iter().sum() }

#[rstest]
fn test_somma_vec(vettore: Vec<i32>) {
  assert_eq!(somma_vec(&vettore), 10);
}`,
        status: "not-started",
      }, // :contentReference[oaicite:11]{index=11}

      {
        id: "t-12",
        rule: "Esempio realistico: API con Result e test di errore/OK",
        explanation:
          "Progetta l’API per fallire con un tipo errore espressivo e verifica entrambi i percorsi: success e failure. Nei test di integrazione importa solo i simboli pubblici e verifica i contratti senza dipendere dai dettagli interni.",
        codeExample: `#[derive(Debug, PartialEq)]
pub enum CalcoloErrore { DivisionePerZero }

pub fn dividi(a: i32, b: i32) -> Result<i32, CalcoloErrore> {
  if b == 0 { Err(CalcoloErrore::DivisionePerZero) } else { Ok(a / b) }
}

// tests/calcolatrice.rs:
// use my_lib::*;
// #[test] fn test_divisione_ok() { assert_eq!(dividi(10, 2), Ok(5)); }
// #[test] fn test_divisione_per_zero() { assert_eq!(dividi(1, 0), Err(CalcoloErrore::DivisionePerZero)); }`,
        status: "not-started",
      }, // :contentReference[oaicite:12]{index=12}
    ],
    totalCards: 12,
    completedCards: 0,
    reviewCards: 0,
  },
  {
    id: "channels",
    title: "Canali",
    description: "Comunicazione tra thread con canali e message passing",
    icon: "📡",
    flashcards: [
      {
        id: "ch-can-1",
        rule: "Due modelli: stato condiviso vs scambio di messaggi",
        explanation:
          "Rust supporta sia la sincronizzazione su stato condiviso (lock/condvar) sia lo scambio di messaggi (channels). Nel secondo, comunichi per sincronizzarti: chi riceve acquisisce possesso del dato e l’ordine è FIFO sul canale scelto. È una forma naturale di disaccoppiamento tra produttori e consumatori.",
        codeExample: `// mpsc: multiple-producer, single-consumer
use std::sync::mpsc::channel;
use std::thread;
fn main() {
  let (tx, rx) = channel::<String>();
  thread::spawn(move || { let _ = tx.send("ciao".into()); });
  println!("{}", rx.recv().unwrap()); // blocca finché arriva
}`,
        status: "not-started",
      },
      {
        id: "ch-can-2",
        rule: "std::sync::mpsc::channel: Sender/Receiver, SendError/RecvError",
        explanation:
          "channel() restituisce (Sender<T>, Receiver<T>). send() è non bloccante (unbounded), recv() blocca senza busy wait. Se il Receiver è droppato, send() fallisce con SendError<T>. Se tutti i Sender sono droppati e la coda si svuota, recv() fallisce con RecvError. T deve implementare Send.",
        codeExample: `use std::sync::mpsc::channel;
fn main() {
  let (tx, rx) = channel::<u32>();
  let t2 = tx.clone();
  std::thread::spawn(move || { let _ = t2.send(1); });
  drop(tx); // chiude il canale quando la coda si svuota
  while let Ok(v) = rx.recv() { println!("{}", v); } // termina con RecvError
}`,
        status: "not-started",
      },
      {
        id: "ch-can-3",
        rule: "Il messaggio trasferisce possesso (move) e funge da sincronizzazione",
        explanation:
          "Il producer cede il possesso del valore al canale (move); il consumer diventa l’unico owner. La ricezione accade dopo l’invio: comunicazione e sincronizzazione in un’operazione sola.",
        codeExample: `use std::sync::mpsc::channel;
#[derive(Debug)]
struct Task(u32);
fn main() {
  let (tx, rx) = channel::<Task>();
  std::thread::spawn(move || { let _ = tx.send(Task(7)); });
  let t = rx.recv().unwrap(); // possesso della Task
  println!("{:?}", t);
}`,
        status: "not-started",
      },
      {
        id: "ch-can-4",
        rule: "Chiudere il canale: perché droppare l’ultimo Sender è essenziale",
        explanation:
          "Con più produttori, il consumer resta bloccato su recv() finché c’è almeno un Sender vivo o finché restano messaggi. Droppare l’ultimo Sender segnala la chiusura: recv() termina con errore e puoi uscire dal loop in modo pulito.",
        codeExample: `use std::sync::mpsc::channel;
use std::thread;
fn main() {
  let (tx, rx) = channel::<&'static str>();
  let mut handles = vec![];
  for _ in 0..3 {
    let txc = tx.clone();
    handles.push(thread::spawn(move || { let _ = txc.send("ok"); }));
  }
  drop(tx); // senza questo, rx.recv() penderebbe
  while let Ok(m) = rx.recv() { println!("{}", m); }
  for h in handles { let _ = h.join(); }
}`,
        status: "not-started",
      },
      {
        id: "ch-can-5",
        rule: "Receiver come iteratore: into_iter, iter, try_iter",
        explanation:
          "Receiver implementa IntoIterator in tre varianti: into_iter(self) (consuma il Receiver e blocca ad ogni next), iter(&self) (borrow, blocca come sopra, termina quando tutti i Sender sono droppati) e try_iter(&self) (non bloccante: None se la coda è vuota).",
        codeExample: `use std::sync::mpsc::channel;
fn main() {
  let (tx, rx) = channel::<i32>();
  std::thread::spawn(move || { for i in 1..=10 { let _ = tx.send(i); } });
  rx.iter().skip_while(|v| *v < 8).take(4)
    .filter(|v| v % 2 == 1)
    .map(|v| format!("Stampo {}", v))
    .for_each(|s| println!("{}", s));
}`,
        status: "not-started",
      },
      {
        id: "ch-can-6",
        rule: "Canali sincroni: sync_channel(cap) e rendezvous (cap=0)",
        explanation:
          "sync_channel(cap) crea un canale bounded: send() blocca quando ci sono cap messaggi pendenti finché qualcuno non legge. Con cap=0 ottieni un canale di rendezvous: send e recv devono sovrapporsi temporalmente.",
        codeExample: `use std::sync::mpsc::sync_channel;
use std::time::Duration;
use std::thread;
fn main() {
  let (tx, rx) = sync_channel::<i32>(1);
  thread::spawn(move || { let _ = tx.send(1); let _ = tx.send(2); });
  println!("{}", rx.recv().unwrap());
  thread::sleep(Duration::from_millis(500));
  println!("{}", rx.recv().unwrap());
}`,
        status: "not-started",
      },
      {
        id: "ch-can-7",
        rule: "Crossbeam channel: MPMC bounded/unbounded e select!",
        explanation:
          "crossbeam_channel offre canali MPMC (più consumer) sia bounded sia unbounded, con API ergonomiche e select! per attese su più canali. Disponibili anche after(duration) e tick(period) per timeout/heartbeat.",
        codeExample: `use crossbeam_channel::{bounded, select, tick, after};
use std::time::Duration;
fn main() {
  let (s, r) = bounded::<&'static str>(1);
  let tmo = after(Duration::from_secs(2));
  let hb  = tick(Duration::from_millis(500));
  std::thread::spawn(move || { let _ = s.send("done"); });
  loop {
    select! {
      recv(hb) -> _ => println!("heartbeat"),
      recv(tmo) -> _ => { println!("timeout"); break; }
      recv(r) -> msg => { println!("{}", msg.unwrap()); break; }
    }
  }
}`,
        status: "not-started",
      },
      {
        id: "ch-can-8",
        rule: "Pattern Fan-Out / Fan-In con Crossbeam",
        explanation:
          "Un canale distribuisce lavoro a N worker (fan-out) e un secondo canale raccoglie i risultati (fan-in). Cloni il Receiver in ingresso e il Sender in uscita. Chiudi gli estremi per far terminare naturalmente i loop.",
        codeExample: `use crossbeam_channel::{bounded, Sender, Receiver};
use std::{thread, time::Duration};
fn worker(id: usize, rx: Receiver<i32>, tx: Sender<String>) {
  while let Ok(v) = rx.recv() {
    thread::sleep(Duration::from_millis(50));
    tx.send(format!("W{} ({})", id, v)).unwrap();
  }
}
fn main() {
  let (tx_in, rx_in) = bounded::<i32>(8);
  let (tx_out, rx_out) = bounded::<String>(8);
  let mut hs = vec![];
  for i in 0..3 {
    let rx = rx_in.clone(); let tx = tx_out.clone();
    hs.push(thread::spawn(move || worker(i, rx, tx)));
  }
  for i in 1..=10 { let _ = tx_in.send(i); }
  drop(tx_in); drop(tx_out);
  while let Ok(s) = rx_out.recv() { println!("{}", s); }
  for h in hs { let _ = h.join(); }
}`,
        status: "not-started",
      },
      {
        id: "ch-can-9",
        rule: "Pipeline: stadi in serie collegati da canali",
        explanation:
          "Una sequenza di stadi (ognuno in un thread) trasforma i dati e li inoltra al successivo. Ogni stadio fa recv() dal canale precedente, elabora, poi send() a quello successivo. Si chiudono i canali a fine produzione.",
        codeExample: `use crossbeam_channel::bounded;
use std::thread;
fn s1(rx_in: crossbeam_channel::Receiver<i32>, tx_out: crossbeam_channel::Sender<String>) {
  while let Ok(v) = rx_in.recv() { let _ = tx_out.send(format!("S1({})", v)); }
}
fn s2(rx_in: crossbeam_channel::Receiver<String>, tx_out: crossbeam_channel::Sender<String>) {
  while let Ok(v) = rx_in.recv() { let _ = tx_out.send(format!("S2( {} )", v)); }
}
fn main() {
  let (tx,  rx ) = bounded::<i32>(8);
  let (tx1, rx1) = bounded::<String>(8);
  let (tx2, rx2) = bounded::<String>(8);
  let h1 = thread::spawn(move || s1(rx,  tx1));
  let h2 = thread::spawn(move || s2(rx1, tx2));
  for i in 1..=5 { let _ = tx.send(i); }
  drop(tx);
  while let Ok(out) = rx2.recv() { println!("{}", out); }
  let _ = h1.join(); let _ = h2.join();
}`,
        status: "not-started",
      },
      {
        id: "ch-can-10",
        rule: "Queue concorrenti: ArrayQueue (bounded) vs SegQueue (unbounded)",
        explanation:
          "crossbeam::queue::ArrayQueue è una coda circolare bounded lock-free: push fallisce se piena; pop restituisce Option. SegQueue è unbounded e non bloccante: push non fallisce; pop restituisce Option (None se vuota). Sono alternative a canali quando non serve il blocco.",
        codeExample: `use crossbeam_queue::{ArrayQueue, SegQueue};
use std::{sync::Arc, thread, time::Duration};
fn main() {
  let q = Arc::new(ArrayQueue::new(2));
  let qc = q.clone();
  let h = thread::spawn(move || {
    loop { if let Some(x) = qc.pop() { println!("pop {}", x); } else { break; } }
  });
  // riempi e svuota a ritmo
  for i in 0..4 {
    while q.push(i).is_err() { thread::sleep(Duration::from_millis(1)); }
  }
  let _ = h.join();
  let sq = SegQueue::new();
  sq.push(1); sq.push(2);
  println!("{:?} {:?}", sq.pop(), sq.pop());
}`,
        status: "not-started",
      },
      {
        id: "ch-can-11",
        rule: "Work-stealing con crossbeam::deque (Worker/Stealer/Injector)",
        explanation:
          "Ogni thread ha una deque locale (Worker). Gli altri rubano lavoro con Stealer; un Injector globale inietta nuovi task. Il furto avviene da capo opposto per ridurre contese; utile per scheduler personalizzati.",
        codeExample: `use crossbeam_deque::{Injector, Steal, Worker};
use std::sync::Arc;
fn main() {
  let injector = Arc::new(Injector::new());
  let worker = Worker::new_fifo();
  let stealer = worker.stealer();
  for i in 1..=3 { worker.push(format!("task {}", i)); }
  for i in 4..=6 { injector.push(format!("task {}", i)); }
  let s = stealer.clone(); let inj = injector.clone();
  let h = std::thread::spawn(move || {
    loop {
      match s.steal().or_else(|| inj.steal()) {
        Steal::Success(t) => println!("[ladro] {}", t),
        Steal::Retry => continue,
        Steal::Empty => break,
      }
    }
  });
  while let Some(t) = worker.pop() { println!("[main] {}", t); }
  let _ = h.join();
}`,
        status: "not-started",
      },
      {
        id: "ch-can-12",
        rule: "Rayon: join() e par_iter() su thread-pool con work-stealing",
        explanation:
          "Rayon semplifica il data-parallelism: join(f,g) esegue due task in parallelo; par_iter() parallelizza iteratori su un thread-pool con work-stealing (basato su deque). Ottieni parallelismo senza gestire esplicitamente i thread.",
        codeExample: `use rayon::prelude::*;
use rayon::join;
fn main() {
  let (a, b) = join(|| (1..=25_000).sum::<i32>(),
                    || (1..=12).product::<i32>());
  println!("join -> {}", a + b);
  let sum: i64 = (0..1_000_000i64).into_par_iter().sum();
  println!("par_iter sum {}", sum);
}`,
        status: "not-started",
      },
      {
        id: "ch-can-13",
        rule: "AtomicCell: scambio lock-free di valori arbitrari (se Send)",
        explanation:
          "crossbeam_utils::atomic::AtomicCell<T> generalizza le atomiche a tipi qualsiasi (se Send). Operazioni come swap/take/set permettono di passare un payload tra thread senza lock, utile per hand-off semplici.",
        codeExample: `use crossbeam_utils::atomic::AtomicCell;
use std::{sync::Arc, thread, time::Duration};
fn main() {
  let cell = Arc::new(AtomicCell::new(None::<String>));
  let p = cell.clone();
  let prod = thread::spawn(move || {
    thread::sleep(Duration::from_millis(100));
    let _ = p.swap(Some("hello".into()));
  });
  let c = cell.clone();
  let cons = thread::spawn(move || {
    loop {
      if let Some(msg) = c.take() { println!("{}", msg); break; }
      thread::sleep(Duration::from_millis(10));
    }
  });
  let _ = prod.join(); let _ = cons.join();
}`,
        status: "not-started",
      },
      {
        id: "ch-can-14",
        rule: "Glossario pratico: unbounded/bounded, backpressure, sync/async",
        explanation:
          "Unbounded: coda illimitata (send non blocca). Bounded: capacità fissa → backpressure (send blocca quando piena). Comunicazione sincrona (rendezvous cap=0): mittente e destinatario devono coincidere temporalmente; asincrona: il mittente non attende il destinatario.",
        codeExample: `// Unbounded: std::sync::mpsc::channel()
// Bounded: crossbeam_channel::bounded(n)
// Rendezvous: sync_channel(0) oppure bounded(0)`,
        status: "not-started",
      },
    ],
    totalCards: 14,
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
    id: "review-5",
    title: "Ripasso #5",
    description:
      "Sfide di verifica sulla concorrenza (con soluzioni spiegate).",
    icon: "🧩",
    challenges: [
      {
        id: "ch-1",
        prompt:
          "Thread e cattura di una variabile stack: perché NON compila senza move? Come sistemare?",
        code: `use std::thread;
fn main() {
  let mut numero = 5;
  let handle = thread::spawn(|| {
    let x = 2;
    numero += x;
    println!("Numero incrementato di {}. Nuovo valore: {}", x, numero);
    numero
  });
  let result = handle.join();
  match result {
    Ok(res) => { println!("Il risultato è {:?}", res); }
    Err(err) => { println!("Errore {:?}", err); }
  }
}`,
        solution: `La closure passata a thread::spawn deve essere 'static (può vivere più del chiamante) e Send. 
Senza move, cattura "numero" per riferimento allo stack del main → riferimento non 'static e (per di più) mutabile su altro thread: il compilatore lo proibisce.
Con move la closure prende possesso di "numero". Poiché i32 è Copy, viene copiato nella closure; l'operazione "numero += x" modifica la COPIA interna e il valore esterno resta 5.`,
        fixes: [
          {
            label: "Aggiungi move (chiusura possiede la sua copia di numero)",
            code: `use std::thread;
fn main() {
  let numero = 5;
  let handle = thread::spawn(move || {
    let x = 2;
    let mut numero = numero; // copia locale
    numero += x;
    println!("Numero incrementato di {}. Nuovo valore: {}", x, numero);
    numero
  });
  println!("join: {:?}", handle.join());
}`,
          },
          {
            label:
              "Condividere e mutare davvero dallo stesso numero: Arc<Mutex<i32>>",
            code: `use std::{sync::{Arc, Mutex}, thread};
fn main() {
  let numero = Arc::new(Mutex::new(5));
  let th_num = numero.clone();
  let handle = thread::spawn(move || {
    let mut n = th_num.lock().unwrap();
    *n += 2;
  });
  handle.join().unwrap();
  println!("valore finale: {}", *numero.lock().unwrap());
}`,
          },
          {
            label:
              "Usare thread::scope per prestare in sicurezza uno stack local",
            code: `use std::thread;
fn main() {
  let mut numero = 5;
  thread::scope(|s| {
    s.spawn(|| {
      let x = 2;
      // qui sarebbe illegale mutare numero, ma leggerlo è ok se prestato immutabilmente:
      let _ = x;
    });
  }); // i thread sono terminati qui
  println!("{}", numero);
}`,
          },
        ],
        status: "not-started",
      },

      {
        id: "ch-2",
        prompt:
          "AtomicUsize dentro thread::scope senza Arc né static: perché funziona?",
        code: `use std::{thread, time::Duration};
use std::sync::atomic::{AtomicUsize, Ordering::*};
const SOGLIA: usize = 100;
fn main() {
  let num_done = AtomicUsize::new(0);
  thread::scope(|s| {
    // thread in background che processa 100 item
    s.spawn(|| {
      for i in 0..SOGLIA {
        thread::sleep(Duration::from_nanos(1));
        num_done.store(i + 1, Relaxed);
      }
    });
    // il thread principale mostra avanzamento ogni 10ns
    loop {
      let n = num_done.load(Relaxed);
      if n == SOGLIA { break; }
      println!("Working.. {}/100 done", n);
      thread::sleep(Duration::from_nanos(10));
    }
  });
  println!("Done!");
}`,
        solution: `I thread sono creati dentro un **scope** delimitato: thread::scope garantisce che TUTTI i thread terminino prima di uscire dallo scope, quindi è lecito catturare per riferimento stack-local come "num_done".
AtomicUsize è Sync, quindi il riferimento condiviso è sicuro (qui con Ordering::Relaxed per semplice contatore di progresso). Senza scope, servirebbe Arc<AtomicUsize> o una variabile 'static.`,
        fixes: [
          {
            label: "Senza scope: usa Arc<AtomicUsize>",
            code: `use std::{thread, time::Duration, sync::Arc};
use std::sync::atomic::{AtomicUsize, Ordering::*};
const SOGLIA: usize = 100;
fn main() {
  let num_done = Arc::new(AtomicUsize::new(0));
  let bg = {
    let nd = num_done.clone();
    thread::spawn(move || {
      for i in 0..SOGLIA {
        thread::sleep(Duration::from_nanos(1));
        nd.store(i + 1, Relaxed);
      }
    })
  };
  while num_done.load(Relaxed) != SOGLIA {
    println!("Working.. {}/100 done", num_done.load(Relaxed));
    thread::sleep(Duration::from_nanos(10));
  }
  bg.join().unwrap();
  println!("Done!");
}`,
          },
          {
            label: "Ordering più forte (solo se serve visibilità/ordine)",
            code: `// Sostituisci Relaxed con Release/Acquire se il valore sblocca letture/scritture successive:
num_done.store(i + 1, std::sync::atomic::Ordering::Release);
// ...
let n = num_done.load(std::sync::atomic::Ordering::Acquire);`,
          },
        ],
        status: "not-started",
      },

      {
        id: "ch-3",
        prompt:
          "Condvar: cosa succede se non aggiorno il flag protetto prima di notify_one?",
        code: `use std::sync::{Arc, Mutex, Condvar};
use std::thread;
use std::time::Duration;
fn main() {
  // Arc con (Mutex<bool>, Condvar)
  let pair = Arc::new((Mutex::new(false), Condvar::new()));
  let (mutex, cvar) = &*pair;
  let pair2 = Arc::clone(&pair);
  thread::spawn(move || {
    let (mutex, cvar) = &*pair2;
    let _started = mutex.lock().unwrap();
    thread::sleep(Duration::from_secs(5));
    // *_started = true;
    cvar.notify_one();
  });
  let started = mutex.lock().unwrap();
  println!("Waiting ...");
  let _started = cvar.wait(started).unwrap();
  println!("Thread started!");
}`,
        solution: `Il programma “sembra” funzionare uguale perché il thread in attesa NON controlla il predicato protetto dal mutex (il bool). 
Le condition variable possono avere **notifiche spurie**: senza verificare la condizione al risveglio, il thread potrebbe proseguire anche se lo stato non è cambiato.
Buona norma: impostare il flag prima di notify e attendere in un loop (o usare wait_while).`,
        fixes: [
          {
            label: "Corretto: imposta il flag e attendi con wait_while",
            code: `use std::sync::{Arc, Mutex, Condvar};
use std::thread;
use std::time::Duration;
fn main() {
  let pair = Arc::new((Mutex::new(false), Condvar::new()));
  let (mutex, cvar) = &*pair;
  let pair2 = Arc::clone(&pair);
  thread::spawn(move || {
    let (mutex, cvar) = &*pair2;
    let mut started = mutex.lock().unwrap();
    thread::sleep(Duration::from_secs(5));
    *started = true;
    cvar.notify_one();
  });
  let started = mutex.lock().unwrap();
  let _started = cvar.wait_while(started, |s| !*s).unwrap();
  println!("Thread started!");
}`,
          },
          {
            label: "Pattern classico: while !cond { wait }",
            code: `// Equivalente esplicito:
let mut g = mutex.lock().unwrap();
while !*g {
  g = cvar.wait(g).unwrap();
}
println!("Thread started!");`,
          },
        ],
        status: "not-started",
      },

      {
        id: "ch-4",
        prompt:
          "Perché questo uso di Condvar può andare in deadlock? (lock tenuto durante la join)",
        code: `use std::{
  sync::{Arc, Condvar, Mutex},
  thread::sleep,
  time::Duration,
};
struct Counter { value: Mutex<u32>, condvar: Condvar }
fn main() {
  let counter = Arc::new(Counter { value: Mutex::new(0), condvar: Condvar::new() });
  let counter_clone = counter.clone();
  let counting_thread = std::thread::spawn(move || loop {
    sleep(Duration::from_millis(100));
    let mut value = counter_clone.value.lock().unwrap();
    *value += 1;
    counter_clone.condvar.notify_all();
    if *value > 15 { break; }
  });
  // attende finché value < 15
  let mut value = counter.value.lock().unwrap();
  value = counter.condvar.wait_while(value, |val| *val < 15).unwrap();
  println!("Condition met. Value is now {}.", *value);
  // attende il thread... ma TENENDO il lock!
  counting_thread.join().unwrap();
}`,
        solution: `Deadlock: il main esce dal wait_while quando value≥15 ma **mantiene il lock** sul mutex fino a fine scope. Subito dopo chiama join: se il thread secondario ha bisogno di riacquisire il lock per proseguire/terminare, rimarrà bloccato, mentre il main aspetta la join → stallo.
Tre modi per risolvere: (1) rilasciare il lock prima della join; (2) far terminare il thread senza necessità di riacquisire il lock (cambiare condizione/posizione della notify); (3) ridurre la durata del lock con uno scope.`,
        fixes: [
          {
            label: "Soluzione 1: rilascia il lock prima della join (drop)",
            code: `// ... dopo la stampa
drop(value);                  // rilascio esplicito del guard
counting_thread.join().unwrap();`,
          },
          {
            label: "Soluzione 2: fai terminare il thread a value >= 15",
            code: `use std::{
  sync::{Arc, Condvar, Mutex},
  thread::sleep,
  time::Duration,
};
struct Counter { value: Mutex<u32>, condvar: Condvar }
fn main() {
  let counter = Arc::new(Counter { value: Mutex::new(0), condvar: Condvar::new() });
  let counter_clone = counter.clone();
  let counting_thread = std::thread::spawn(move || loop {
    sleep(Duration::from_millis(100));
    let mut value = counter_clone.value.lock().unwrap();
    *value += 1;
    counter_clone.condvar.notify_all();
    if *value >= 15 { break; }       // termina senza necessità di altro lock
  });
  let mut value = counter.value.lock().unwrap();
  value = counter.condvar.wait_while(value, |val| *val < 15).unwrap();
  println!("Condition met. Value is now {}.", *value);
  drop(value);                       // comunque buona pratica
  counting_thread.join().unwrap();
}`,
          },
          {
            label:
              "Soluzione 3: notifica finale prima del break (schema alternativo)",
            code: `use std::{
  sync::{Arc, Condvar, Mutex},
  thread::sleep,
  time::Duration,
};
struct Counter { value: Mutex<u32>, condvar: Condvar }
fn main() {
  let counter = Arc::new(Counter { value: Mutex::new(0), condvar: Condvar::new() });
  let counter_clone = counter.clone();
  let counting_thread = std::thread::spawn(move || loop {
    sleep(Duration::from_millis(100));
    let mut value = counter_clone.value.lock().unwrap();
    *value += 1;
    if *value > 15 {
      counter_clone.condvar.notify_all(); // notifica di “fine”
      break;
    }
  });
  let mut value = counter.value.lock().unwrap();
  value = counter.condvar.wait_while(value, |val| *val < 15).unwrap();
  println!("Condition met. Value is now {}.", *value);
  drop(value);
  counting_thread.join().unwrap();
}`,
          },
          {
            label: "Accorcia la vita del guard con uno scope",
            code: `{
  let mut value = counter.value.lock().unwrap();
  value = counter.condvar.wait_while(value, |val| *val < 15).unwrap();
  println!("Condition met. Value is now {}.", *value);
} // guard rilasciato qui
counting_thread.join().unwrap();`,
          },
        ],
        status: "not-started",
      },
    ],
    totalCards: 4,
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
    title: "Problem Solving [SOON]",
    description: "Pattern e tecniche per risolvere problemi complessi",
    icon: "💡",
    flashcards: createSampleFlashcards("Problem Solving", 1),
    totalCards: 1,
    completedCards: 0,
    reviewCards: 0,
  },
];
