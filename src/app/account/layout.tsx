
'use client';
import Link from 'next/link';
import {
  User,
  ShoppingCart,
  Heart,
  LogOut,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';


function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed shadow-sm p-8 text-center">
            <ShieldAlert className="h-16 w-16 text-destructive" />
            <h1 className="text-3xl font-bold mt-4">Please Log In</h1>
            <p className="text-muted-foreground mt-2">You need to be logged in to view your account details.</p>
            <Button asChild className="mt-6">
                <Link href="/">Go to Homepage</Link>
            </Button>
        </div>
    )
}

function LoadingScreen() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                   <div className="space-y-2">
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                     <Skeleton className="h-8 w-full" />
                   </div>
                </div>
                <div className="md:col-span-3">
                   <Skeleton className="h-96 w-full" />
                </div>
            </div>
        </div>
    )
}


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, setMockUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    if (sessionStorage.getItem('mockUser')) {
        sessionStorage.removeItem('mockUser');
        setMockUser(null);
    } else {
        await signOut(auth);
    }
    router.push('/');
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Unauthorized />
        </div>
      )
  }

  const navLinks = [
    { href: "/account/profile", label: "My Profile", icon: User },
    { href: "/account/orders", label: "My Orders", icon: ShoppingCart },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">My Account</h1>
          <p className="text-lg text-muted-foreground mt-2">Manage your orders, profile, and wishlist.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
            <nav className="flex flex-col space-y-2">
                {navLinks.map(link => (
                    <Button 
                        key={link.href}
                        asChild 
                        variant={pathname === link.href ? 'default' : 'ghost'}
                        className="justify-start"
                    >
                        <Link href={link.href}>
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.label}
                        </Link>
                    </Button>
                ))}
                 <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </nav>
        </aside>
        <main className="md:col-span-3">
            <Card>
                <CardContent className="p-6">
                    {children}
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
