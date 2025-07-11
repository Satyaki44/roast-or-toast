import { useState } from 'react';
import Head from 'next/head';
import NameForm from '../components/NameForm';
import ResultCard from '../components/ResultCard';

export default function Home() {
  const [line, setLine] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Roast or Toast</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-3xl font-bold mb-6">Roast or Toast?</h1>

        <NameForm
          disabled={loading}
          onSubmit={async ({ name, mode }) => {
            setLoading(true);
            setLine(null);

            const res = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, mode })
            });
            const data = await res.json();
            setLine(data.line);
            setLoading(false);
          }}
        />

        {line && <ResultCard line={line} />}
      </main>
    </>
  );
}
