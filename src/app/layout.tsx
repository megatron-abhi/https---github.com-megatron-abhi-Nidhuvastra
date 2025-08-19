
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart';
import { WishlistProvider } from '@/hooks/use-wishlist';
import { ChatBotLoader } from '@/components/chat-bot-loader';
import { usePathname } from 'next/navigation';
import { WelcomeBanner } from '@/components/welcome-banner';
import { ThemeProvider } from '@/components/theme-provider';


// This is a client component, so metadata should be exported from a server component if needed.
// For now, we can keep it here, but for static generation, it might need to move.
// export const metadata: Metadata = {
//   title: 'NidhuVastra',
//   description:
//     'Experience premium Indian sarees designed for comfort, quality, and modern elegance.',
// };

function AppProviders({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');
    
    return (
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="relative flex min-h-screen flex-col">
                {!isAdminPage && <WelcomeBanner />}
                {!isAdminPage && <Header />}
                <main className="flex-1">{children}</main>
                {!isAdminPage && <Footer />}
                {!isAdminPage && <ChatBotLoader />}
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NidhuVastra</title>
        <meta name="description" content="Experience premium Indian sarees designed for comfort, quality, and modern elegance." />
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
        <AppProviders>
            {children}
        </AppProviders>
      </body>
    </html>
  );
}
