
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  videoSrc?: string;
  images: {
    src: string;
    alt: string;
    aiHint: string;
  }[];
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  slug: string;
  isExclusive?: boolean;
  promotion?: 'Limited Time' | 'Limited Stock';
  offerEndDate?: string;
  stock?: number;
  status?: 'active' | 'draft';
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
}
