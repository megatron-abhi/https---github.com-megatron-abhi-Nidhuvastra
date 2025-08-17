import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="NidhuVastra Home">
      <Image
        src="/images/logo.png"
        alt="NidhuVastra Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        data-ai-hint="logo"
      />
      <span className="sr-only">NidhuVastra</span>
    </Link>
  );
}
