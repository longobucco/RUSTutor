import CodeExample from "./CodeExample";
import Exercises from "./Exercise";
import ExerciseWithSolution from "./ExerciseWithSolution";

interface Props {
  chapterId: number;
  code: string;
  exercises: string[];
}

export default function ExercisesSection({
  chapterId,
  code,
  exercises,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg border border-base-300 space-y-8">
      {/* Sezione Codice di Esempio */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          💻 <span>Esempi di Codice</span>
        </h2>
        <CodeExample code={code} />
      </section>

      {/* Sezione Esercizi */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          🏋️ <span>Esercizi</span>
        </h2>
        <Exercises items={exercises} />
      </section>

      {/* Esercizi consigliati per il capitolo 1 */}
      {chapterId === 1 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span></span>
          </h2>
          <div className="space-y-4">
            <ExerciseWithSolution
              title="Dichiara una variabile mutabile e stampala."
              code={`fn main() {\n    let mut count = 0;\n    count += 1;\n    println!("Valore mutabile: {}", count);\n}`}
            />
            <ExerciseWithSolution
              title="Crea una funzione che accetti un riferimento a stringa e la stampi."
              code={`fn stampa_nome(nome: &str) {\n    println!("Ciao, {}", nome);\n}\n\nfn main() {\n    let nome = String::from("Alice");\n    stampa_nome(&nome);\n}`}
            />
            <ExerciseWithSolution
              title="Leggi da console, scrivi su file, rileggi da quel file"
              code={`use std::fs::File;\nuse std::io::{self, BufRead, BufReader, Write};\n\nfn main() {\n    let mut input = String::new();\n    println!("Scrivi qualcosa da salvare:");\n    io::stdin().read_line(&mut input).expect("Errore input");\n\n    let mut file = File::create("prova.txt").expect("Errore creazione file");\n    file.write_all(input.as_bytes()).expect("Errore scrittura");\n\n    let file = File::open("prova.txt").expect("Errore apertura file");\n    let reader = BufReader::new(file);\n\n    println!("Contenuto letto da file:");\n    for line in reader.lines() {\n        println!("{}", line.unwrap());\n    }\n}`}
            />
            <ExerciseWithSolution
              title="Stampa tutti i file presenti in una directory locale"
              code={`use std::fs;\n\nfn main() {\n    let paths = fs::read_dir(".").expect("Impossibile leggere la directory");\n\n    for path in paths {\n        let entry = path.expect("Errore nella lettura dell'elemento");\n        println!("{}", entry.path().display());\n    }\n}`}
            />
            <ExerciseWithSolution
              title="Scrivi una funzione che restituisca un Option<T> e gestiscila nel main"
              code={`fn trova_pari(x: i32) -> Option<i32> {\n    if x % 2 == 0 {\n        Some(x)\n    } else {\n        None\n    }\n}\n\nfn main() {\n    let numero = 6;\n    match trova_pari(numero) {\n        Some(valore) => println!("Pari trovato: {}", valore),\n        None => println!("Il numero non è pari"),\n    }\n}`}
            />
            <ExerciseWithSolution
              title="Leggi un file riga per riga, filtra solo le righe non vuote e stampale"
              code={`use std::fs::File;\nuse std::io::{BufReader, BufRead};\n\nfn main() {\n    let file = File::open("file.txt").expect("Errore apertura file");\n    let reader = BufReader::new(file);\n\n    for line in reader.lines() {\n        let line = line.unwrap();\n        if !line.trim().is_empty() {\n            println!("Riga: {}", line);\n        }\n    }\n}`}
            />
          </div>
        </section>
      )}

      {chapterId === 2 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span>Esercizi avanzati su Variabili e Tipi</span>
          </h2>
          <div className="space-y-4">
            <ExerciseWithSolution
              title="1. Shadowing con trasformazioni multiple e cambio tipo"
              code={`fn main() {
    let s = "Rustaceo";
    let s = s.to_string();         // da &str a String
    let s = s.len();               // da String a usize
    let s = (s as f64).sqrt();     // da usize a f64 e radice quadrata

    println!("Risultato: {:.2}", s);
}`}
            />
            <ExerciseWithSolution
              title="2. Funzione che ritorna un tipo impl Trait"
              code={`trait Stampabile {
    fn stampa(&self);
}

fn crea_stampabile() -> impl Stampabile {
    struct MyStruct;
    impl Stampabile for MyStruct {
        fn stampa(&self) {
            println!("Sono una struttura stampabile!");
        }
    }
    MyStruct
}

fn main() {
    let x = crea_stampabile();
    x.stampa();
}`}
            />
            <ExerciseWithSolution
              title="3. Funzione generica con trait bounds multipli"
              code={`use std::fmt::Display;

fn stampa_due_volte<T: Copy + Display>(val: T) -> T {
    println!("{} {}", val, val);
    val
}

fn main() {
    let x = 42;
    let y = stampa_due_volte(x);
    println!("Restituito: {}", y);
}`}
            />
            <ExerciseWithSolution
              title="4. Closure che cattura variabile shadowata"
              code={`fn genera_closure() -> impl Fn() {
    let x = 2;
    let x = x * 5;
    let x = x + 1;

    move || println!("Valore finale di x: {}", x)
}

fn main() {
    let chiusura = genera_closure();
    chiusura();
}`}
            />
            <ExerciseWithSolution
              title="5. Match su enum generico per determinare il tipo"
              code={`enum Dato {
    Intero(i32),
    Decimale(f64),
    Testo(String),
}

fn descrivi(d: Dato) -> String {
    match d {
        Dato::Intero(_) => "È un intero".to_string(),
        Dato::Decimale(_) => "È un decimale".to_string(),
        Dato::Testo(_) => "È una stringa".to_string(),
    }
}

fn main() {
    let v = Dato::Testo("ciao".to_string());
    println!("Descrizione: {}", descrivi(v));
}`}
            />
          </div>
        </section>
      )}

      {chapterId === 3 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span>Esercizi avanzati su Puntatori e Memoria</span>
          </h2>
          <div className="space-y-4">
            <ExerciseWithSolution
              title="1. Usa Box per contenere una struttura e modificarla"
              code={`struct Punto {
    x: i32,
    y: i32,
}

fn main() {
    let mut p = Box::new(Punto { x: 1, y: 2 });
    p.y += 5;

    println!("Punto: ({}, {})", p.x, p.y);
}`}
            />

            <ExerciseWithSolution
              title="2. Scrivi una funzione che riceve una slice mutabile e inverte i valori"
              code={`fn inverti(valori: &mut [i32]) {
    let len = valori.len();
    for i in 0..len / 2 {
        valori.swap(i, len - 1 - i);
    }
}

fn main() {
    let mut a = [1, 2, 3, 4, 5];
    inverti(&mut a);
    println!("Array invertito: {:?}", a);
}`}
            />

            <ExerciseWithSolution
              title="3. Usa un puntatore nativo (*const T) e stampane l'indirizzo"
              code={`fn main() {
    let x = 123;
    let ptr: *const i32 = &x;

    unsafe {
        println!("Indirizzo di x: {:p}", ptr);
        println!("Contenuto puntato: {}", *ptr);
    }
}`}
            />

            <ExerciseWithSolution
              title="4. Simula un errore del borrow checker e correggilo con uno scope separato"
              code={`fn main() {
    let mut a = [10, 20, 30];

    {
        let s = &mut a[0..2];
        s[0] += 1;
        println!("Slice mutata: {:?}", s);
    }

    println!("Array completo: {:?}", a); // ora è lecito accedere
}`}
            />

            <ExerciseWithSolution
              title="5. Implementa una funzione che restituisce una slice di un array e la stampa"
              code={`fn prendi_slice<'a>(a: &'a [i32], start: usize, end: usize) -> &'a [i32] {
    &a[start..end]
}

fn main() {
    let a = [5, 10, 15, 20, 25];
    let s = prendi_slice(&a, 1, 4);

    println!("Slice: {:?}", s);
}`}
            />
          </div>
        </section>
      )}
    </div>
  );
}
