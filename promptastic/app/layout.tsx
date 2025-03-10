import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrompTastic - Smart AI Prompt Generator',
  description: 'Generate intelligent AI prompts tailored to your needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="header-content">
              <h1 className="title">PrompTastic</h1>
              <p className="subtitle">Smart AI Prompt Generator</p>
            </div>
          </header>

          <main className="main-content">
            {children}
          </main>

          <footer className="footer">
            <div className="footer-content">
              <p className="copyright">
                &copy; {new Date().getFullYear()} PrompTastic. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}