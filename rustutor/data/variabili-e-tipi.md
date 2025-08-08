### 🧠 Concetti Base

In Rust, una **variabile** è un nome che lega un valore.  
Si dichiara con la parola chiave `let`.

Per default le variabili sono **immutabili**: una volta assegnato un valore, non può essere cambiato.

Per creare una variabile modificabile si usa `mut`:

```rust
let mut nome = valore;
```

---

### 🔒 Tipizzazione statica

Ad ogni variabile è associato un tipo **a compile-time**, che:

- Definisce l'insieme di valori validi
- Definisce le operazioni consentite

Il tipo può essere **esplicito** o **dedotto** dal compilatore.

---

### 💡 Esempi di Codice

```rust
let v: i32 = 123;
// v = -5;  // Errore: v è immutabile

let mut w = v;
w = -5;     // OK

let x = 1.3278;    // f64
let y = 1.3278f32; // f32

let one_million = 1_000_000;

println!("{} {} {} {} {}", v, w, x, y, one_million);
```

---

### 🖨️ Stampa e Macro

Rust usa le macro `print!()` e `println!()` per stampare su stdout.

```rust
println!("Hello, {}!", "world");
```

Per stderr:

- `eprint!()`
- `eprintln!()`

Le macro sono espanse a compile-time e **generano codice**, non sono funzioni runtime.

---

### 🔁 Shadowing e Mutabilità

Lo **shadowing** permette di ridefinire una variabile con lo stesso nome anche con tipo diverso.

```rust
fn main() {
    let i = -12;
    println!("Numero: {i}");

    let i = "ciao mamma";
    println!("Stringa: {i}");
}
```

Scope annidati:

```rust
fn main() {
    let mut x = 5;
    x = x + 1;
    {
        let x = x * 2;
        println!("Inner x: {x}");
    }
    println!("Outer x: {x}");
}
```

Differenza:

- `mut` cambia il **valore**
- **Shadowing** può cambiare **tipo e valore**

---

### 📐 Valori ed Espressioni

Una **espressione** produce un valore:

```rust
let x = 2;
let y = x * 3;
```

Espressioni possono restituire valori da blocchi:

```rust
let risultato = {
    let a = 5;
    let b = 10;
    a + b
};
```

`if` è un’espressione:

```rust
let y = if x > 3 { 10 } else { 20 };
```

---

### ❗ Tipo Never (!)

```rust
fn errore() -> ! {
    panic!("Errore irreversibile");
}
```

---

### 💥 panic!()

`panic!()` termina il programma in caso di errore irreversibile.

---

### 🧬 char, Tipi e Traits

```rust
let z = 'ℤ';
let emoji = '😻';
println!("Char: {emoji}");
```

- `char` è un Unicode a 32 bit

**Traits** = comportamenti comuni.  
Es: `Copy`, `Clone`, `Drop`, `Eq`, `Ord`, `Display`
