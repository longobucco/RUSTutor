import Flashcards from "./Flashcard";

export interface Flashcard {
  q: string;
  a: string;
}

interface Props {
  flashcards: Flashcard[];
}

export default function FlashcardSection({ flashcards }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg border border-base-300">
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          📚 <span>Flashcard</span>
        </h2>
        <Flashcards cards={flashcards} />
      </section>
    </div>
  );
}
