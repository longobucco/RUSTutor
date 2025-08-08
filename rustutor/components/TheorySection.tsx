import ReactMarkdown from "react-markdown";

interface Props {
  theory: string;
}

export default function TheorySection({ theory }: Props) {
  return (
    <article className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg border border-base-300">
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          📖 <span>Teoria</span>
        </h2>
        <div className="prose prose-lg max-w-none text-justify leading-relaxed">
          <ReactMarkdown>{theory}</ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
