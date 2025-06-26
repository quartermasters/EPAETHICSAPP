import './globals.css';

export const metadata = {
  title: 'EPA Ethics Admin Portal',
  description: 'Administrative interface for EPA Ethics training platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
