import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center" aria-label="NidhuVastra Logo">
      <Image
        src="https://placehold.co/40x40.png"
        alt="NidhuVastra Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        data-ai-hint="logo"
      />
      <span className="sr-only">NidhuVastra</span>
    </div>
  );
}
