import type { Metadata } from 'next';
import { Outfit, Manrope } from 'next/font/google';
import '../index.css'; // Global CSS from Vite app
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'BECL | Premium Engineering & Construction Company',
    template: '%s | BECL'
  },
  description: 'Benstruct Engineering and Construction Limited (BECL) is a premier engineering company specializing in large-scale commercial real estate development, luxury apartments, and infrastructure projects.',
  keywords: [
    'construction company', 
    'engineering company', 
    'real estate development', 
    'civil engineering', 
    'property development', 
    'luxury apartments', 
    'infrastructure projects'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://becl.com',
    siteName: 'BECL - Benstruct Engineering',
    title: 'BECL | Premium Engineering & Construction Company',
    description: 'Premier engineering firm specializing in large-scale commercial real estate development and civil infrastructure projects.',
    images: [
      {
        url: 'https://i.postimg.cc/MpL57gpH/beclogo-(1).png', // Fallback OG Image
        width: 1200,
        height: 630,
        alt: 'BECL Engineering Excellence',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable} ${manrope.variable}`}>
      <body className="bg-[#050505] text-white/80 selection:bg-[#D4AF37] selection:text-black antialiased overflow-x-hidden min-h-screen">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
