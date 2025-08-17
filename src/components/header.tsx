'use client';

import Link from 'next/link';
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
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
} from '@/components/ui/dropdown-menu';

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
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-4 p-4">
                    <NavContent />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Logo />
        </div>

        <nav className="hidden md:flex md:items-center md:gap-2 md:mx-6">
          <NavContent />
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button asChild>
                <Link href="/collections/all">Shop now</Link>
            </Button>
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
