import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata = {
  title: 'MAD4x4 Club',
  description: 'Mudgee & Districts 4x4 Club — trips, membership, and community',
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container">{children}</main>
        <footer className="footer">© {new Date().getFullYear()} MAD4x4 Club</footer>
      </body>
    </html>
  );
}
