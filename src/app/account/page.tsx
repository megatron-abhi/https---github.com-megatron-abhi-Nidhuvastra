
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page just redirects to the profile page by default.
export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account/profile');
  }, [router]);

  return null; 
}
