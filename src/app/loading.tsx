import { LoadingSaree } from '@/components/loading-saree';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50 animate-fade-in-delayed">
        <LoadingSaree message="Loading page..." />
    </div>
  )
}
