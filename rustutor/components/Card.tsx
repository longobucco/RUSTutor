// src/components/Card.tsx
// Questo componente è ora deprecato in favore dei componenti separati:
// TheorySection, FlashcardSection, ExercisesSection

import ReactMarkdown from "react-markdown";
import Flashcards from "./Flashcard";

export interface Flashcard {
  q: string;
  a: string;
}

export interface Chapter {
  id: number;
  title: string;
  theory: string;
  flashcards: Flashcard[];
  code: string;
  exercises: string[];
}

interface Props {
  chapter: Chapter;
}

export default function Card({ chapter }: Props) {
  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold border-b pb-2 mb-4">
          📝 {chapter.title}
        </h1>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📖 Teoria</h2>
        <div className="prose text-justify max-w-none">
          <ReactMarkdown>{chapter.theory}</ReactMarkdown>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📚 Flashcard</h2>
        <Flashcards cards={chapter.flashcards} />
      </section>

      {/* Sezioni esercizi e codice rimosse: ora gestite da App.tsx attraverso ExercisesSection */}
    </article>
  );
}
