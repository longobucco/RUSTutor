import type { Chapter } from "../components/Card";

export const chapters: Chapter[] = [
  {
    id: 0,
    title: "Allocazione della memoria",
    theory: "",
    flashcards: [
      {
        q: "Quali sono i tre tipi principali di variabili per ciclo di vita?",
        a: "Globali, locali e dinamiche.",
      },
      {
        q: "Dove vengono allocate le variabili locali?",
        a: "Nello stack, con indirizzo relativo.",
      },
      { q: "Cosa fa malloc?", a: "Alloca memoria dinamica nello heap." },
      {
        q: "Cos'è un memory leak?",
        a: "Quando memoria allocata dinamicamente non viene liberata.",
      },
      {
        q: "Cos'è un dangling pointer?",
        a: "Un puntatore a memoria non più valida.",
      },
      {
        q: "Come si previene il double free?",
        a: "Liberando una sola volta e azzerando il puntatore dopo il free.",
      },
      {
        q: "Cosa succede se si dereferenzia un puntatore NULL?",
        a: "Si genera un errore di runtime (segmentation fault).",
      },
      {
        q: "Chi deve liberare la memoria allocata?",
        a: "Il possessore del blocco, ovvero chi ha effettuato l'allocazione.",
      },
      {
        q: "Cosa bisogna fare dopo delete[] buf?",
        a: "Impostare il puntatore a nullptr per evitare dangling pointer.",
      },
    ],
    code: `#include <stdlib.h>
#include <stdio.h>

int main() {
    int *ptr = malloc(10 * sizeof(int)); // Allocazione dinamica

    if (ptr == NULL) {
        printf("Errore di allocazione\n");
        return 1;
    }

    for (int i = 0; i < 10; i++) {
        ptr[i] = i * 2;
    }

    for (int i = 0; i < 10; i++) {
        printf("%d ", ptr[i]);
    }

    printf("\n");

    free(ptr);         // Rilascio memoria
    ptr = NULL;        // Evita dangling pointer
    return 0;
}`,
    exercises: [
      "Alloca un array dinamico di 5 float, inizializzali e stampali, poi libera la memoria.",
      "Scrivi un programma che simula un memory leak intenzionale. Riesci a correggerlo?",
      "Crea un dangling pointer e prova a dereferenziarlo. Che errore ottieni?",
      "Usa realloc per raddoppiare la dimensione di un array precedentemente allocato.",
      "Alloca un blocco di memoria e prova a liberarlo due volte. Cosa succede?",
      "Copia un puntatore che possiede un blocco. Implementa una strategia per evitare il double free.",
      "Scrivi una funzione che riceve un puntatore dinamico e lo libera solo se è il proprietario.",
      "Simula un programma che tiene traccia del possesso della memoria tra più moduli (es. con flag o wrapper).",
    ],
  },
  {
    id: 1,
    title: "Introduzione al linguaggio",
    theory: "",
    flashcards: [
      {
        q: "Cosa rappresenta il concetto di 'possesso' in Rust?",
        a: "Ogni valore ha un unico proprietario; il possesso può essere trasferito o preso in prestito.",
      },
      {
        q: "Come Rust evita race condition nei thread?",
        a: "Controlla l'accesso ai dati e i trasferimenti tra thread a compile time.",
      },
      {
        q: "Che tipo di tipizzazione ha Rust?",
        a: "Statica e forte, con inferenza automatica.",
      },
      {
        q: "Cosa fa Cargo?",
        a: "Gestisce build, dipendenze e test in progetti Rust.",
      },
      {
        q: 'Cosa fa println!("{:x}", num)?',
        a: "Stampa num in esadecimale.",
      },
      {
        q: "Come si legge una riga dalla console?",
        a: "Con std::io::stdin().read_line(&mut var).expect(...)",
      },
      {
        q: "Cosa succede a una variabile quando esce dallo scope?",
        a: "Viene automaticamente deallocata.",
      },
    ],
    code: `use std::io::{self, Write};
use std::fs::{self, File};
use std::io::BufReader;
use std::io::prelude.*;

fn main() {
    // Lettura da input
    let mut name = String::new();
    println!("Inserisci il tuo nome:");
    io::stdin().read_line(&mut name).expect("Errore lettura");
    println!("Ciao, {}", name.trim());

    // Scrittura su file
    let mut file = File::create("output.txt").expect("Impossibile creare il file");
    file.write_all(b"Contenuto da scrivere\n").expect("Scrittura fallita");

    // Lettura da file
    let file = File::open("output.txt").expect("File non trovato");
    let reader = BufReader::new(file);
    for line in reader.lines() {
        println!("Riga: {}", line.unwrap());
    }

    // Elenco directory corrente
    for entry in fs::read_dir(".").unwrap() {
        let entry = entry.unwrap();
        println!("Trovato: {}", entry.path().display());
    }
}`,
    exercises: [""],
  },
  {
    id: 2,
    title: "Variabili e Tipi",
    theory: "",
    flashcards: [
      {
        q: "Come si dichiara una variabile mutabile?",
        a: "let mut nome = valore;",
      },
      {
        q: "Che tipo di tipizzazione ha Rust?",
        a: "Statica, i tipi sono noti a compile time.",
      },
      {
        q: 'Cosa fa println!("Hello, {}!", nome)?',
        a: "Stampa su stdout sostituendo il placeholder {} con l'argomento.",
      },
      {
        q: "Cos'è lo shadowing?",
        a: "Ridefinire una variabile con lo stesso nome, nascondendo la precedente.",
      },
      {
        q: "Cosa rappresenta il tipo `!`?",
        a: "Un tipo che non restituisce mai, usato per panic o loop infiniti.",
      },
      {
        q: "Cosa fa panic!()?",
        a: "Termina il programma e libera le risorse.",
      },
      {
        q: "Cosa fa il tratto Copy?",
        a: "Permette di copiare un valore invece di spostarlo.",
      },
    ],
    code: `fn main() {
    let v: i32 = 123;
    let mut w = v;
    w = -5;
    let x = 1.3278;
    let y = 1.3278f32;
    let one_million = 1_000_000;

    println!("{} {} {} {} {}", v, w, x, y, one_million);
}`,
    exercises: [""],
  },
  {
    id: 3,
    title: "Puntatori e Gestione della Memoria",
    theory: "", // la teoria è nel file .md separato
    flashcards: [
      {
        q: "Che differenza c'è tra &T e &mut T?",
        a: "`&T` è un riferimento condiviso (immutabile), `&mut T` è un riferimento esclusivo (mutabile).",
      },
      {
        q: "Cosa fa Box<T>?",
        a: "Allocca dinamicamente un valore sullo heap e ne gestisce automaticamente il rilascio.",
      },
      {
        q: "Cosa indica il tratto Drop?",
        a: "Gestisce il rilascio della memoria o risorse quando il valore esce dallo scope.",
      },
      {
        q: "Cosa fa il metodo .get() su un array?",
        a: "Restituisce un Option<T> e previene l'accesso fuori dai limiti.",
      },
      {
        q: "Quando serve usare unsafe in Rust?",
        a: "Per accedere direttamente a puntatori nativi o eseguire operazioni non verificate dal borrow checker.",
      },
    ],
    code: `fn main() {
  let b = Box::new((5, 2));
  println!("Secondo valore: {}", b.1);
  let mut a = [1, 2, 3, 4];
  let s2 = &mut a[0..2];
  s2[0] = 10;
  drop(s2); // rilascio del borrow mutabile
  println!("Array completo: {:?}", a);
}`,
    exercises: [
      "Crea una variabile allocata su heap con Box e modifica il suo contenuto.",
      "Scrivi un programma che accede a un array usando sia [i] che .get(i).",
      "Simula un errore di borrow checker e poi correggilo con drop() o uno scope separato.",
      "Dichiara un puntatore nativo (*const T) e stampane l'indirizzo con {:p}.",
      "Scrivi una funzione che prende una slice mutabile e ne modifica tutti gli elementi.",
    ],
  },
];
