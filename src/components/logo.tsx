
import Image from 'next/image';

export function Logo() {
  return (
    <>
      <Image
        src="/images/logo.png"
        alt="NidhuVastra Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        data-ai-hint="logo"
      />
      <span className="sr-only">NidhuVastra</span>
    </>
  );
}
