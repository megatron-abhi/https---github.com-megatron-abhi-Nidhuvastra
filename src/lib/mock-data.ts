
import type { Product, Review, Order, Customer } from '@/types';

// Set offer end date to be 3 days from now
const offerEndDate = new Date();
offerEndDate.setDate(offerEndDate.getDate() + 3);

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Kanjivaram Silk Saree',
    slug: 'royal-kanjivaram-silk-saree',
    category: 'Silk Sarees',
    price: 12500,
    originalPrice: 15000,
    stock: 15,
    videoSrc: '/videos/showcase3.mp4',
    images: [
      { src: '/images/img01.jpg', alt: 'Kanjivaram Saree Front', aiHint: 'kanjivaram saree'},
      { src: '/images/5.jpg', alt: 'Kanjivaram Saree Back', aiHint: 'silk fabric detail' },
      { src: '/images/1.jpg', alt: 'Kanjivaram Saree Detail', aiHint: 'saree border gold' },
      { src: '/images/7.jpg', alt: 'Kanjivaram Saree Detail', aiHint: 'saree border gold' },
      { src: '/images/12.jpg', alt: 'Kanjivaram Saree Detail', aiHint: 'saree border gold' },

    ],
    rating: 4.8,
    reviewCount: 45,
    description: "A masterpiece of craftsmanship, this Kanjivaram silk saree features intricate gold zari work on a deep maroon body. Perfect for weddings and grand occasions.",
    details: [
      'Pure mulberry silk',
      'Handwoven by master weavers in Kanchipuram',
      'Comes with a matching blouse piece',
    ],
    sizes: ['One Size'],
    colors: ['Maroon', 'Gold'],
    isExclusive: true,
    promotion: 'Limited Time',
    offerEndDate: offerEndDate.toISOString(),
    status: 'active',
  },
  {
    id: '2',
    name: 'Elegant Banarasi Georgette Saree',
    slug: 'elegant-banarasi-georgette-saree',
    category: 'Georgette Sarees',
    price: 8200,
    stock: 25,
    videoSrc: '/videos/showcase3.mp4',
    images: [
      { src: '/images/7.jpg', alt: 'Banarasi Saree', aiHint: 'banarasi saree model' },
      { src: '/images/4.jpg', alt: 'Banarasi Saree Detail', aiHint: 'georgette fabric floral' },
      { src: '/images/12.jpg', alt: 'Banarasi Saree Detail', aiHint: 'georgette fabric floral' },

    ],
    rating: 4.5,
    reviewCount: 28,
    description: "Lightweight and graceful, this Banarasi georgette saree in a soft beige hue is adorned with delicate floral patterns. Ideal for festive gatherings and parties.",
    details: [
      'Pure georgette fabric',
      'Authentic Banarasi weaving',
      'Includes unstitched blouse material',
    ],
    sizes: ['One Size'],
    colors: ['Beige', 'Silver'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Classic Cotton Chanderi Saree',
    slug: 'classic-cotton-chanderi-saree',
    category: 'Cotton Sarees',
    price: 4500,
    originalPrice: 5000,
    stock: 50,
    images: [
      { src: '/images/15.jpg', alt: 'Chanderi Fabric', aiHint: 'chanderi fabric' },
      { src: '/images/8.jpg', alt: 'Chanderi Fabric Saree', aiHint: 'chanderi texture' },
      { src: '/images/9.jpg', alt: 'Chanderi Saree', aiHint: 'cotton saree ivory' },
      { src: '/images/10.jpg', alt: 'Chanderi Saree Fabric', aiHint: 'chanderi fabric texture' },
    ],
    rating: 4.7,
    reviewCount: 62,
    description: "Experience the sheer comfort and elegance of our Chanderi cotton saree. Its ivory white body and subtle gold border make it a versatile choice for both casual and formal wear.",
    details: [
      'Premium Chanderi cotton-silk blend',
      'Lightweight and breathable',
      'Eco-friendly dyes',
    ],
    sizes: ['One Size'],
    colors: ['Ivory', 'Gold'],
    status: 'active',
  },
  {
    id: '4',
    name: 'Vibrant Bandhani Printed Saree',
    slug: 'vibrant-bandhani-printed-saree',
    category: 'Printed Sarees',
    price: 3800,
    stock: 30,
    videoSrc: '/videos/showcase.mp4',
    images: [
      { src: '/images/13.jpg', alt: 'Bandhani Saree', aiHint: 'bandhani saree bright' },
      { src: '/images/14.jpg', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/11.jpg', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/16.jpg', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/18.jpg', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },

    ],
    rating: 4.4,
    reviewCount: 34,
    description: "A celebration of color, this Bandhani printed saree from Gujarat is a joyous addition to any wardrobe. The vibrant patterns are created using traditional tie-dye techniques.",
    details: [
      'Soft and flowing chiffon material',
      'Authentic Bandhani print',
      'Perfect for cultural events and festivals',
    ],
    sizes: ['One Size'],
    colors: ['Red', 'Yellow', 'Green'],
    isExclusive: true,
    promotion: 'Limited Stock',
    status: 'active',
  },
  {
    id: '5',
    name: 'Banarasi  Saree',
    slug: 'banarasi-saree',
    category: 'Printed Sarees',
    price: 3800,
    stock: 30,
    images: [
      { src: '/images/17.jpg', alt: 'Bandhani Saree', aiHint: 'bandhani saree bright' },
      { src: '/images/img02.jpg', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },

    ],
    rating: 4.4,
    reviewCount: 34,
    description: "A celebration of color, this Bandhani printed saree from Gujarat is a joyous addition to any wardrobe. The vibrant patterns are created using traditional tie-dye techniques.",
    details: [
      'Soft and flowing chiffon material',
      'Authentic Bandhani print',
      'Perfect for cultural events and festivals',
    ],
    sizes: ['One Size'],
    colors: ['Red', 'Yellow', 'Green'],
    isExclusive: true,
    promotion: 'Limited Stock',
    status: 'active',
  },
  {
    id: '6',
    name: 'White and Purple fancy Ajrakh printed crepe silk saree [Product Code: 002]',
    slug: 'silk-saree',
    category: 'Printed Sarees',
    price: 3800,
    stock: 30,
    videoSrc: '/videos/showcase4.mp4',
    images: [
      { src: '/images/latest01.png', alt: 'Bandhani Saree', aiHint: 'bandhani saree bright' },
      { src: '/images/latest02.png', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/latest03.png', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/latest04.png', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/latest05.png', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/latest06.png', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
      { src: '/images/latest07.png', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },

    ],
    rating: 4.4,
    reviewCount: 34,
    description: "A celebration of color, this Bandhani printed saree from Gujarat is a joyous addition to any wardrobe. The vibrant patterns are created using traditional tie-dye techniques.",
    details: [
      'Soft and flowing chiffon material',
      'Authentic Bandhani print',
      'Perfect for cultural events and festivals',
    ],
    sizes: ['One Size'],
    colors: ['Red', 'Yellow', 'Green'],
    isExclusive: true,
    promotion: 'Limited Stock',
    status: 'active',
  },
];

export const reviews: Review[] = [
    {
        id: 'r1',
        author: 'Priya Sharma',
        date: '2 weeks ago',
        rating: 5,
        text: "Absolutely stunning saree! The quality of the silk is exceptional and the color is even more beautiful in person. Received so many compliments at the wedding.",
        avatar: "https://placehold.co/100x100.png"
    },
    {
        id: 'r2',
        author: 'Anjali Mehta',
        date: '1 month ago',
        rating: 4,
        text: "Beautiful design and very lightweight. It was very comfortable to wear for a long day. The delivery was also very prompt. Would have liked a bit more intricacy on the border.",
        avatar: "https://placehold.co/100x100.png"
    },
    {
        id: 'r3',
        author: 'Sunita Rao',
        date: '3 months ago',
        rating: 5,
        text: "This is my second purchase from SareeShree and they never disappoint. The craftsmanship is top-notch. It's a timeless piece I will cherish forever.",
        avatar: "https://placehold.co/100x100.png"
    }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@example.com',
    date: '2024-07-28',
    status: 'Shipped',
    total: 12500,
  },
  {
    id: 'ORD-002',
    customerName: 'Anjali Mehta',
    customerEmail: 'anjali.m@example.com',
    date: '2024-07-27',
    status: 'Delivered',
    total: 8200,
  },
  {
    id: 'ORD-003',
    customerName: 'Sunita Rao',
    customerEmail: 'sunita.r@example.com',
    date: '2024-07-25',
    status: 'Delivered',
    total: 4500,
  },
  {
    id: 'ORD-004',
    customerName: 'Kavita Singh',
    customerEmail: 'kavita.s@example.com',
    date: '2024-07-29',
    status: 'Pending',
    total: 3800,
  },
   {
    id: 'ORD-005',
    customerName: 'Meera Iyer',
    customerEmail: 'meera.i@example.com',
    date: '2024-07-26',
    status: 'Cancelled',
    total: 8200,
  },
   {
    id: 'ORD-006',
    customerName: 'Rohan Desai',
    customerEmail: 'rohan.d@example.com',
    date: '2024-07-30',
    status: 'Pending',
    total: 17000,
  }
];

export const customers: Customer[] = [
    {
        id: 'CUST-001',
        name: 'Priya Sharma',
        email: 'priya.s@example.com',
        phone: '+91 98765 43210',
        joinedDate: '2024-01-15',
        totalOrders: 3,
        totalSpent: 25300,
    },
    {
        id: 'CUST-002',
        name: 'Anjali Mehta',
        email: 'anjali.m@example.com',
        phone: '+91 98765 43211',
        joinedDate: '2024-03-22',
        totalOrders: 1,
        totalSpent: 8200,
    },
    {
        id: 'CUST-003',
        name: 'Sunita Rao',
        email: 'sunita.r@example.com',
        phone: '+91 98765 43212',
        joinedDate: '2023-11-05',
        totalOrders: 5,
        totalSpent: 41000,
    },
     {
        id: 'CUST-004',
        name: 'Rohan Desai',
        email: 'rohan.d@example.com',
        phone: '+91 83103 20951',
        joinedDate: '2024-05-10',
        totalOrders: 2,
        totalSpent: 21500,
    }
];
