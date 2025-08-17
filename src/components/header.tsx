'use client';

import Link from 'next/link';
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
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

const navLinks = [
  { href: '/collections/all', label: 'All Sarees' },
  { href: '/collections/silk', label: 'Silk' },
  { href: '/collections/cotton', label: 'Cotton' },
  { href: '/collections/designer', label: 'Designer' },
  { href: '/about', label: 'About Us' },
];

export function Header() {
  const pathname = usePathname();

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="p-4">
                <Logo />
              </div>
              <nav className="flex flex-col gap-4 p-4">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex">
          <Logo />
        </div>

        <nav className="hidden md:flex md:items-center md:gap-4 md:mx-6">
          <NavLinks />
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <div className="hidden sm:block w-full max-w-xs">
             <Input type="search" placeholder="Search for sarees..." className="h-9" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5 sm:hidden" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
