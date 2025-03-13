import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'promptastic - Smart AI Prompt Generator',
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
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-bold text-gray-900">promptastic</h1>
              <p className="mt-2 text-gray-600">Your One-Stop Solution for AI Prompting</p>
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} promptastic. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}