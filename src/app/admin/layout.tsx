

'use client';
import Link from 'next/link';
import {
  Bell,
  Home,
  Package2,
  Package,
  Settings,
  Users,
  ShoppingCart,
  ShieldAlert,
  LogOut,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '@/components/logo';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { LoadingSaree } from '@/components/loading-saree';


function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed shadow-sm p-8 text-center">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="text-3xl font-bold mt-4">Access Denied</h1>
            <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
            <Button asChild className="mt-6">
                <Link href="/">Go to Homepage</Link>
            </Button>
        </div>
    )
}

function LoadingScreen() {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                 <div className="flex items-center gap-2 font-semibold">
                    <Logo />
                    <span className="">Admin Panel</span>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                 <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <LoadingSaree message="Verifying credentials..." />
                </div>
            </main>
        </div>
    )
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, setMockUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    // Clear mock user if it exists
    if (sessionStorage.getItem('mockUser')) {
        sessionStorage.removeItem('mockUser');
        setMockUser(null);
    } else {
        await signOut(auth);
    }
    router.push('/');
  };
  
  useEffect(() => {
    if (!loading && !user) {
        router.push('/'); // Redirect to home if not logged in
    }
  },[user, loading, router])

  if (loading) {
    return <LoadingScreen />;
  }
  
  const adminUids = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',');
  const isAuthorized = user && 'uid' in user && adminUids.includes(user.uid);
  
  if (!isAuthorized) {
      return (
        <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                <Link href="/" className="lg:hidden">
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Home</span>
                </Link>
                <div className="flex-1">
                    <h1 className="font-semibold text-lg">Unauthorized</h1>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <Unauthorized />
            </main>
      </div>
      )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <Logo />
              <span className="">Admin Panel</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin/dashboard"
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === "/admin/dashboard" && "bg-muted text-primary"
                )}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/orders"
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.startsWith("/admin/orders") && "bg-muted text-primary"
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="/admin/products"
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.startsWith("/admin/products") && "bg-muted text-primary"
                )}
              >
                <Package className="h-4 w-4" />
                Products{' '}
              </Link>
              <Link
                href="/admin/customers"
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.startsWith("/admin/customers") && "bg-muted text-primary"
                )}
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
             <Button size="sm" variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {/* We can add a header here later if needed */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
