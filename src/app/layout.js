import { Poppins, Inter } from 'next/font/google';
import './globals.css';


const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'ACAS Dhristi - Aadhaar Capacity Advisory System',
  description: 'Predictive Governance Framework for Aadhaar Enrollment Centers - Tamil Nadu Pilot by National Informatics Centre (NIC)',
  keywords: 'ACAS, Dhristi, Aadhaar, UIDAI, Predictive Governance, Tamil Nadu, NIC, ELCOT',
  authors: [{ name: 'National Informatics Centre' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1E40AF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
