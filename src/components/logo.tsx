import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
       <div className="p-1.5 bg-white text-black rounded-md">
         <Sparkles className="h-5 w-5" />
       </div>
      <span className="text-xl font-bold text-foreground">
        NidhuVastra
      </span>
    </Link>
  );
}
