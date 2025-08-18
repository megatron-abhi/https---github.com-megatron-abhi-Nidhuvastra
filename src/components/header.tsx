
'use client';

import Link from 'next/link';
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
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
import { Input } from './ui/input';
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

  const handleLogout = async () => {
    await signOut(auth);
  };

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
                <SheetContent side="left" className="w-[300px]">
                  <div className="p-4">
                     <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-bold text-foreground">SareeShree</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-4 p-4">
                    <NavContent />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
             <Link href="/" className="hidden md:flex items-center gap-2">
                <Logo />
                <span className="text-xl font-bold text-foreground">SareeShree</span>
            </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-2 md:mx-6">
          <NavContent />
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           {loading ? (
             <Skeleton className="h-10 w-24" />
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
                     <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
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
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
