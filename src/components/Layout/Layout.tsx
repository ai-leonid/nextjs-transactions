import styles from './Layout.module.scss';
import Footer from '@/components/Footer/Footer';
import React from 'react';
import { Inter } from 'next/font/google'
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ['latin'] })

type props = {
  children: React.ReactNode
}

export default function Layout({ children }: props) {
  return (
    <div className="content">
      <Header />
      <main className={`${styles.layout} ${inter.className}`}>
        {children}
      </main>
      <Footer />
    </div>

  );
}
