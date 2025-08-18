
'use client';

import Link from 'next/link';
import {
  Heart,
  Menu,
  User,
  ChevronDown,
  LogOut,
  ShoppingCart,
  LayoutDashboard,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { AuthButton } from './auth-button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Badge } from './ui/badge';


const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
];

const shopLinks = [
  { href: '/collections/all', label: 'All Sarees' },
  { href: '/collections/silk', label: 'Silk' },
  { href: '/collections/cotton', label: 'Cotton' },
  { href: '/collections/designer', label: 'Designer' },
]

export function Header() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { cartCount } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };
  
  const adminUids = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',');
  const isAuthorizedAdmin = user && adminUids.includes(user.uid);

  const NavContent = () => (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    Shop <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {shopLinks.map(link => (
                    <DropdownMenuItem key={link.href} asChild>
                         <Link
                            href={link.href}
                            className={cn(
                            'text-sm font-medium',
                            pathname.startsWith(link.href)
                                ? 'text-primary font-bold'
                                : 'text-foreground/80 hover:text-foreground'
                            )}
                        >
                            {link.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild>
          <Link
            href={link.href}
            className={cn(
              'text-sm font-medium',
              pathname.startsWith(link.href)
                ? 'text-primary font-bold'
                : 'text-foreground/80 hover:text-foreground'
            )}
          >
            {link.label}
          </Link>
        </Button>
      ))}
      <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    Help <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild><Link href="/contact">Contact</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/faq">FAQ</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/shipping">Shipping</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-auto flex items-center">
            <div className="md:hidden mr-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                  <div className="p-4 border-b">
                     <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-bold text-foreground">SareeShree</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-1 p-4">
                    <NavContent />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
             <Link href="/" className="hidden md:flex items-center gap-2" aria-label="SareeShree Home">
                <Logo />
                <span className="text-xl font-bold text-foreground">SareeShree</span>
            </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-2 md:mx-6">
          <NavContent />
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           {loading || !isClient ? (
             <Skeleton className="h-10 w-24 rounded-md" />
           ) : user ? (
            <>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
                </Link>
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>
                               <User />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">My Account</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.phoneNumber}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                     {isAuthorizedAdmin && (
                        <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                        </DropdownMenuItem>
                     )}
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </>
           ) : <AuthButton />}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {isClient && cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cartCount}</Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
