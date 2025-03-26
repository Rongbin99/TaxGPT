// pages/index.js
import Head from 'next/head';
import Chat from '../../components/Chat';

export default function Home() {
  return (
    <div>
      <Head>
        <title>TaxGPT: Your Tax Assistant</title>
        <meta name="description" content="A Tax Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="pt-6">
          <Chat />
        </div>
      </main>
    </div>
  );
}
