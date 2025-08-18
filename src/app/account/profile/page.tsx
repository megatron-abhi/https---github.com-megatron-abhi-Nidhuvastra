
'use client';

import { useAuth } from "@/hooks/use-auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return null; // Layout handles auth check
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
            <div className="space-y-6 max-w-md">
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="text" value={user.phoneNumber || 'N/A'} readOnly />
                    <p className="text-sm text-muted-foreground mt-1">Your phone number is used for login and order communication.</p>
                </div>
                 <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user.phoneNumber ? `${user.phoneNumber}@example.com` : 'N/A'} readOnly />
                    <p className="text-sm text-muted-foreground mt-1">This is a placeholder email based on your phone number.</p>
                </div>
                 <div>
                    <Label>Account Created</Label>
                    <p className="text-lg font-medium">You're a valued member of our community!</p>
                    <p className="text-sm text-muted-foreground mt-1">Thank you for being a part of the NidhuVastra family.</p>
                </div>
            </div>
        </div>
    );
}
