// src/components/Flashcard.tsx

import { useState } from "react";
import type { Flashcard } from "./Card";

interface FlashcardsProps {
  cards: Flashcard[];
}

export default function Flashcards({ cards }: FlashcardsProps) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!cards?.length) return null;

  const next = () => {
    setShowAnswer(false);
    setIndex((index + 1) % cards.length);
  };

  return (
    <div className="bg-base-100 rounded-box p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">
        Flashcard {index + 1} / {cards.length}
      </h3>
      <p className="text-md">
        <strong>Q:</strong> {cards[index].q}
      </p>
      {showAnswer && (
        <p className="mt-2">
          <strong>A:</strong> {cards[index].a}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Nascondi" : "Mostra"} risposta
        </button>
        <button className="btn btn-primary btn-sm" onClick={next}>
          Prossima
        </button>
      </div>
    </div>
  );
}
