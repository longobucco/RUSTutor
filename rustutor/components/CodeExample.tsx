// src/components/CodeExample.tsx

interface CodeExampleProps {
  code: string;
}

export default function CodeExample({ code }: CodeExampleProps) {
  if (!code) return null;

  return (
    <div className="bg-base-100 rounded-box p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">💻 Codice di esempio</h3>
      <pre className="bg-neutral text-neutral-content p-4 rounded overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
