'use client'

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await fetch(`https://insta-lnmp.onrender.com/api/download?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Instagram Video Downloader | Free & Fast</title>
        <meta name="description" content="Download Instagram videos easily and for free. Just paste the link and download instantly." />
        <meta name="keywords" content="Instagram downloader, video downloader, Instagram video download" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-6">Instagram Video Downloader</h1>
        <input
          type="text"
          placeholder="Paste Instagram URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full max-w-md p-2 border rounded shadow"
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Downloading...' : 'Download'}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {data && (
          <div className="mt-6 bg-white p-4 rounded shadow-lg w-full max-w-md">
            <img src={data.thumbnail} alt="Thumbnail" className="rounded" />
            <p className="mt-2">{data.description}</p>
            <a
              href={data.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600"
            >
              Download Video
            </a>
          </div>
        )}
      </main>
    </>
  );
}
