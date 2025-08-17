import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { TrustBadges } from './trust-badges';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
                 <Logo />
                 <span className="text-xl font-bold text-foreground">NidhuVastra</span>
            </div>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Experience premium Indian sarees designed for comfort, quality, and modern elegance.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-foreground">Stay Connected</h4>
              <p className="text-muted-foreground text-sm mt-2">Get updates on new arrivals and special offers.</p>
              <form className="flex space-x-2 mt-4 max-w-sm">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Subscribe</Button>
              </form>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/collections/silk" className="text-muted-foreground hover:text-primary">Silk Sarees</Link></li>
              <li><Link href="/collections/cotton" className="text-muted-foreground hover:text-primary">Cotton Sarees</Link></li>
              <li><Link href="/collections/designer" className="text-muted-foreground hover:text-primary">Designer Sarees</Link></li>
              <li><Link href="/collections/all" className="text-muted-foreground hover:text-primary">All Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/journal" className="text-muted-foreground hover:text-primary">Journal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} NidhuVastra. All Rights Reserved.</p>
          <div className="mt-4 sm:mt-0">
            <TrustBadges />
          </div>
        </div>
      </div>
    </footer>
  );
}
