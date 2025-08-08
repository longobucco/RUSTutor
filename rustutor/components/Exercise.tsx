// src/components/Exercises.tsx

interface ExercisesProps {
  items: string[];
}

export default function Exercises({ items }: ExercisesProps) {
  if (!items?.length) return null;

  return (
    <div className="bg-base-100 rounded-box p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2"></h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((exercise, idx) => (
          <li key={idx}>{exercise}</li>
        ))}
      </ul>
    </div>
  );
}
