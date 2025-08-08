import { useState, useEffect } from "react";
import { chapters } from "../data/chapters";
import TheorySection from "../components/TheorySection";
import FlashcardSection from "../components/FlashcardSection";
import ExercisesSection from "../components/ExercisesSection";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [theory, setTheory] = useState(chapters[0].theory);
  const chapter = chapters[index];

  useEffect(() => {
    if (chapter.title === "Allocazione della memoria") {
      fetch("/data/teoria-allocazione-memoria.md")
        .then((res) => res.text())
        .then((text) => setTheory(text));
    } else if (chapter.id === 1) {
      fetch("/data/introduzione-al-linguaggio.md")
        .then((res) => res.text())
        .then((text) => setTheory(text));
    } else if (chapter.id === 2) {
      fetch("/data/variabili-e-tipi.md")
        .then((res) => res.text())
        .then((text) => setTheory(text));
    } else if (chapter.id === 3) {
      fetch("/data/puntatori_gestione_memoria.md")
        .then((res) => res.text())
        .then((text) => setTheory(text));
    } else {
      setTheory(chapter.theory);
    }
  }, [chapter.title, chapter.theory, chapter.id]);

  return (
    <div
      data-theme={isNight ? "night" : "lofi"}
      className="min-h-screen bg-base-200 text-base-content flex items-center justify-center relative"
    >
      {/* Theme Controller in alto a destra */}
      <div className="absolute top-4 right-4 z-10">
        <label className="flex cursor-pointer gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            checked={isNight}
            onChange={() => setIsNight((prev) => !prev)}
            className="toggle theme-controller"
            aria-label="Toggle theme"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
      <div className="w-full max-w-[72rem] mx-auto p-4 sm:p-8">
        <header className="relative text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            📘 RUSTutor
          </h1>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-2 inline-block">
              {chapter.title}
            </h2>
            {/* Contatore capitoli in alto a destra */}
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 text-base sm:text-lg bg-primary text-primary-content rounded-full px-3 py-1 shadow-md"
              style={{ minWidth: "3.5rem" }}
            >
              {index + 1} / {chapters.length}
            </span>
          </div>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </header>
        <div className="flex justify-between mt-4 mb-8 gap-2">
          <button
            className="btn btn-outline btn-sm sm:btn-md rounded-md"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            ⬅ Precedente
          </button>
          <button
            className="btn btn-primary btn-sm sm:btn-md rounded-md"
            disabled={index === chapters.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            Prossimo ➡
          </button>
        </div>
        {/* Sezione Teoria */}
        <div className="mb-12">
          <TheorySection theory={theory} />
        </div>

        {/* Sezione Flashcard */}
        <div className="mb-12">
          <FlashcardSection flashcards={chapter.flashcards} />
        </div>

        {/* Sezione Esercizi */}
        <div className="mb-12">
          <ExercisesSection
            chapterId={chapter.id}
            code={chapter.code}
            exercises={chapter.exercises}
          />
        </div>

        {/* Navigazione */}
        <div className="flex justify-between mt-8 gap-2">
          <button
            className="btn btn-outline btn-sm sm:btn-md rounded-md"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            ⬅ Precedente
          </button>
          <button
            className="btn btn-primary btn-sm sm:btn-md rounded-md"
            disabled={index === chapters.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            Prossimo ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
