import { Lock, CreditCard } from 'lucide-react';

export function TrustBadges() {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Lock className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Secure SSL Encryption</span>
      </div>
      <div className="flex items-center space-x-2">
        <CreditCard className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Safe Payments</span>
      </div>
    </div>
  );
}
