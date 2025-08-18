
'use client'
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { orders as mockOrders } from '@/lib/mock-data'
import type { Order } from '@/types';
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AccountOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || JSON.stringify(mockOrders));
            if (user) {
                // In a real app, you'd filter by user ID. Here we'll simulate it based on email for the mock user.
                const userEmail = user?.phoneNumber ? `${user.phoneNumber}@example.com` : (user as any).email;
                const userOrders = allOrders.filter(o => o.customerEmail === userEmail);
                setOrders(userOrders);
            }
        }
    }, [user]);

    if (orders.length === 0) {
        return (
            <div className="text-center">
                <h3 className="text-2xl font-semibold">No Orders Yet</h3>
                <p className="text-muted-foreground mt-2 mb-6">You haven't placed any orders with us yet. Let's change that!</p>
                <Button asChild>
                    <Link href="/collections/all">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Your Order History</h2>
            <div className="border rounded-lg">
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                                order.status === 'Delivered' ? 'default' :
                                order.status === 'Cancelled' ? 'destructive' :
                                'secondary'
                            }
                            className={cn(order.status === 'Pending' && 'bg-yellow-500/20 text-yellow-700',
                                        order.status === 'Shipped' && 'bg-blue-500/20 text-blue-700'
                            )}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{order.total.toLocaleString('en-IN')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
        </div>
    )
}
