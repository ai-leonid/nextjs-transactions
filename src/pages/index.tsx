import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Транзакции</title>
        <meta name="description" content="Мои транзакции" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={`${inter.className}`}/>
      <main className={`${inter.className}`}>

      </main>
    </>
  )
}
