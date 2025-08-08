La gestione della memoria è uno dei concetti fondamentali nella programmazione di basso livello.
Comprendere **dove e come vengono allocate le variabili** permette di evitare bug complessi come **dangling pointer**, **leak di memoria**, **double free** e **undefined behavior**.

### 🧠 Ciclo di vita delle variabili

Le variabili possono essere:

- **Globali**: dichiarate fuori da ogni funzione.

  - Sono inizializzate all'avvio del programma.
  - Occupano una zona fissa della memoria (tipicamente il segmento dati o BSS).
  - Sono accessibili ovunque (scope globale).

- **Locali**: dichiarate dentro una funzione o blocco.

  - Vengono allocate nello **stack**.
  - Il loro indirizzo è relativo al frame attivo dello stack.
  - Il loro ciclo di vita coincide con l’esecuzione del blocco/funzione.

- **Dinamiche**: allocate esplicitamente a runtime (durante l’esecuzione).
  - Occupano spazio nello **heap**.
  - L’accesso avviene tramite **puntatori**.
  - Il programmatore è **responsabile della gestione**, ovvero deve deallocarle.

---

### ⚙️ Allocazione dinamica in C

C fornisce funzioni standard per l’allocazione dinamica:

- `void *malloc(size_t s)`: alloca `s` byte consecutivi nello heap.
- `void *calloc(int n, size_t s)`: alloca `n × s` byte inizializzati a zero.
- `void *realloc(void *p, size_t s)`: ridimensiona il blocco `p`; se necessario, copia i dati.
- `void free(void *p)`: dealloca il blocco precedentemente allocato.

> ⚠️ Ogni blocco deve essere deallocato usando la **stessa funzione** con cui è stato allocato.

---

### 🚨 Errori comuni

#### Memory leak

Accade quando **non si libera** memoria dinamica allocata. Anche se il programma termina, la memoria rimane marcata come usata dal sistema operativo (fino a riavvio o cleanup).

#### Double free

Avviene quando si chiama `free()` due volte sullo stesso puntatore. Questo corrompe la gestione della memoria.

#### Dangling pointer

Un puntatore che **punta a memoria non più valida**, ad esempio locale a una funzione già terminata o a un blocco già liberato.

#### Puntatore nullo e dereferenziazione

Dereferenziare un puntatore `NULL` causa **segmentation fault**. È sempre buona norma verificare che il puntatore sia valido prima dell'uso.

---

### 🧩 Responsabilità e possesso

In programmazione manuale della memoria (es. C), vige la regola:

> **Chi alloca, libera.**

Chi possiede un blocco è responsabile del suo rilascio. La copia di un puntatore può causare ambiguità: entrambi sembrano poterlo liberare. Serve una gestione chiara.

---

### 🏗️ Heap

L’**heap** è la zona di memoria usata per allocare dati:

- con **ciclo di vita indipendente** dalla funzione corrente,
- oppure di **dimensione variabile o ignota a compile-time**.

Le allocazioni avvengono tramite funzioni come `malloc` in C o `new[]` in C++:

- L’accesso è possibile **solo tramite puntatori**.
- La memoria **non viene liberata automaticamente**.

> Il programmatore è pienamente responsabile del rilascio, pena **memory leak**.

Esempio C++:

```cpp
int* buf = new int[100];
delete[] buf;  // libera la memoria nello heap
buf = nullptr; // evita dangling pointer
```

> Dopo la chiamata a `delete[] buf;`, la memoria viene effettivamente liberata, ma il puntatore non viene azzerato.  
> Impostare `buf = nullptr;` è una buona pratica per prevenire accessi errati.
