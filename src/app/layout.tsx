
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart';
import { WishlistProvider } from '@/hooks/use-wishlist';
import { ChatBotLoader } from '@/components/chat-bot-loader';


export const metadata: Metadata = {
  title: 'NidhuVastra',
  description:
    'Experience premium Indian sarees designed for comfort, quality, and modern elegance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
         <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="relative flex min-h-screen flex-col">
                <AnnouncementBar />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatBotLoader />
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
