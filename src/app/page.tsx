// pages/index.js
import Head from 'next/head';
import Chat from '../../components/Chat';
const YEAR = new Date().getFullYear();
import { SocialIcon } from 'react-social-icons';

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
        <div className="flex justify-center mt-6">
          <SocialIcon url="https://www.cotax.ai/" label="Visit our Website!" style={{float: 'right', marginRight: "10px", width: "30px", height: "30px"}}/>
          <SocialIcon url="https://www.linkedin.com/company/cotax-ai/" label="Follow Us on LinkedIn!" style={{float: 'right', marginRight: "10px", width: "30px", height: "30px"}}/>
          <SocialIcon url="https://github.com/Rongbin99/" style={{float: 'right', marginRight: "10px", width: "30px", height: "30px"}}/>
        </div>
        <div className="flex justify-center mt-6">
          <p className="flex text-right text-gray-500 text-sm">{
              `© ${YEAR} Cotax AI. All rights reserved.`
            }</p>
        </div>
      </main>
    </div>
  );
}
