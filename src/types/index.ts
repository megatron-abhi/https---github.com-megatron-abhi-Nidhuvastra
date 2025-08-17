export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
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
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}
