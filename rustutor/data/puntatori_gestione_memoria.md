# Puntatori e Gestione della Memoria in Rust

## 🔢 Tipologie di Puntatori

### Riferimenti
In Rust, i riferimenti possono essere:

- **Condivisi** (`&T`)
- **Mutabili** (`&mut T`)

> I riferimenti **non sanno dove sta il dato puntato** (stack o heap), ma solo il suo indirizzo.

### ⚠️ Restrizioni

Non puoi **modificare** una variabile se esiste già un riferimento immutabile.

- ✅ Soluzione: rimuovi o non usare il riferimento immutabile durante la modifica.
- ✅ Soluzione: usa un **riferimento mutabile** (`&mut`).

> Non puoi creare una referenza mutabile a una costante (`let x = &mut 12;` è **errore**).

---

## 🧠 Variabili Locali e Stack

- Le variabili locali sono allocate sullo **stack**.
- Quando escono dallo **scope**, la memoria viene **rilasciata** automaticamente.
- Se il valore è troppo grande o deve vivere più a lungo, si usa lo **heap**.

---

## 📦 Box<T>

`Box<T>` serve per allocare dinamicamente nello **heap**.

```rust
let b = Box::new((5, 2));
(*b).1 = 7;
```

- `*b` accede al valore contenuto.
- Quando `b` esce dallo scope, la memoria è rilasciata.
- Il possesso può essere trasferito a un'altra variabile.

---

## 🧾 Ownership e Lifetimes

- **Ownership**: ogni valore ha un **solo proprietario**.
- **Lifetimes**: il compilatore controlla i **tempi di vita** delle variabili per evitare accessi non validi.

> Solo accessi **sicuri** sono permessi. Se usi operazioni non sicure, vanno racchiuse in `unsafe { ... }`.

---

## 🔧 Puntatori Nativi

- `*const T`: puntatore a dato immutabile
- `*mut T`: puntatore a dato mutabile

Richiedono `unsafe` per essere usati.

```rust
let x = 10;
let r: *const i32 = &x;
```

---

## 🖨️ Formattazione

- `{:?}` → Debug
- `{:#?}` → Debug con formattazione
- `{:p}` → Indirizzo del puntatore
- `{}` → Display

---

## 🧬 Copy vs Clone

- `Copy`: copia bit-a-bit (es. `i32`, `bool`)
- `Clone`: copia **profonda** → si usa `.clone()`
- Assegnare un `Clone` sposta il dato, mentre `Copy` lo duplica.

---

## 📚 Array

- Tipo `[T; N]` → es. `[i32; 4]`
- Allocati nello **stack**
- Lunghezza **fissa**
- Accesso con indice: `a[0]`

### 🛑 Index Out of Bounds

- **Compile time**: se l'indice è noto e fuori dai limiti.
- **Runtime**: se l'indice è calcolato dinamicamente.

```rust
let a = [1, 2, 3, 4];
println!("{}", a[10]); // panic!
```

✅ Accesso sicuro:

```rust
let opt = a.get(2); // Option<&T>
```

---

## 📏 Slice

- Riferimento a una **parte di array**
- Tipo: `&[T]` o `&mut [T]`
- Internamente è un **fat pointer** = puntatore + lunghezza

```rust
let s = &a[1..3];
let ms = &mut a[..];
```

---

## 🔐 Borrow Checker

```rust
fn main() {
    let mut a = [1, 2, 3, 4];
    let s2 = &mut a[0..2];
    s2[0] = 10;
    println!("array {:?}", a); // ❌ errore di borrow
}
```

### 🔧 Strategie per risolvere

1. Racchiudere lo slice in un blocco:
```rust
{
    let s2 = &mut a[0..2];
    s2[0] = 10;
}
// ora posso usare `a`
```

2. Usare `drop(s2);` per liberare il borrow

---

Rust rende la gestione della memoria **esplicita, sicura e prevedibile**, grazie a:
- Ownership
- Borrow checker
- Lifetime
- Tipi come Box e slice