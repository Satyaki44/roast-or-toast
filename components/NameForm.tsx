import { useState } from 'react';

interface Props {
  disabled: boolean;
  onSubmit: (d: { name: string; mode: 'roast' | 'toast' }) => void;
}

export default function NameForm({ disabled, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'roast' | 'toast'>('roast');

  return (
    <form
      className="w-full max-w-md space-y-4"
      onSubmit={e => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit({ name: name.trim(), mode });
      }}
    >
      {/* name / handle input */}
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Type a name or @handle"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* roast / toast toggle */}
      <div className="flex gap-2">
        {(['roast', 'toast'] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded ${
              mode === m ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            {m === 'roast' ? '🔥 Roast' : '🥂 Toast'}
          </button>
        ))}
      </div>

      {/* generate button */}
      <button
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        disabled={disabled}
      >
        {disabled ? 'Generating…' : 'Generate'}
      </button>
    </form>
  );
}
