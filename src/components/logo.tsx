import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center" aria-label="NidhuVastra Logo">
      <Image
        src="/images/logo.png"
        alt="NidhuVastra Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        data-ai-hint="logo design"
      />
      <span className="sr-only">NidhuVastra</span>
    </div>
  );
}
