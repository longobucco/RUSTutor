// src/components/ExerciseWithSolution.tsx
import { useState } from "react";

interface Props {
  title: string;
  code: string;
}

export default function ExerciseWithSolution({ title, code }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-6 bg-gray-800 rounded-lg p-6 shadow-md">
      <h4 className="font-medium mb-2">{title}</h4>
      <button
        className="btn btn-sm btn-outline mb-2"
        onClick={() => setShow(!show)}
      >
        {show ? "Nascondi soluzione" : "Mostra soluzione"}
      </button>

      {show && (
        <div className="text-sm sm:text-base inline-flex text-left items-start space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6 w-full overflow-x-auto">
          <span className="flex gap-4">
            <span className="shrink-0 text-gray-500">$</span>
            <pre className="whitespace-pre-wrap">
              <code>{code}</code>
            </pre>
          </span>
        </div>
      )}
    </div>
  );
}
