interface Props {
  line: string;
}

export default function ResultCard({ line }: Props) {
  return (
    <div className="mt-6 p-4 border rounded max-w-md">
      {/* the generated roast or toast */}
      <p className="italic">{line}</p>

      {/* action buttons */}
      <div className="flex gap-4 mt-4">
        <button
          className="flex-1 bg-gray-200 rounded py-1"
          onClick={() => navigator.clipboard.writeText(line)}
        >
          Copy
        </button>

        <a
          className="flex-1 bg-sky-500 text-white text-center rounded py-1"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(line)}`}
        >
          Tweet
        </a>
      </div>
    </div>
  );
}
