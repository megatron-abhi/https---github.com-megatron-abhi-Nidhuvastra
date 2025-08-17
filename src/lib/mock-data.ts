import type { Product, Review } from '@/types';

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
    images: [
      { src: 'https://images.unsplash.com/photo-1617195921829-3c8a7413a1e4?q=80&w=1974&auto=format&fit=crop', alt: 'Kanjivaram Saree Front', aiHint: 'kanjivaram saree'},
      { src: 'https://images.unsplash.com/photo-1620005755569-bf9a2180e2f5?q=80&w=1964&auto=format&fit=crop', alt: 'Kanjivaram Saree Back', aiHint: 'silk fabric detail' },
      { src: 'https://images.unsplash.com/photo-1596206583979-a73468b355d1?q=80&w=1974&auto=format&fit=crop', alt: 'Kanjivaram Saree Detail', aiHint: 'saree border gold' },
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
  },
  {
    id: '2',
    name: 'Elegant Banarasi Georgette Saree',
    slug: 'elegant-banarasi-georgette-saree',
    category: 'Georgette Sarees',
    price: 8200,
    images: [
      { src: 'https://images.unsplash.com/photo-1617195921829-3c8a7413a1e4?q=80&w=1974&auto=format&fit=crop', alt: 'Banarasi Saree', aiHint: 'banarasi saree model' },
      { src: 'https://images.unsplash.com/photo-1620005755569-bf9a2180e2f5?q=80&w=1964&auto=format&fit=crop', alt: 'Banarasi Saree Detail', aiHint: 'georgette fabric floral' },
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
  },
  {
    id: '3',
    name: 'Classic Cotton Chanderi Saree',
    slug: 'classic-cotton-chanderi-saree',
    category: 'Cotton Sarees',
    price: 4500,
    originalPrice: 5000,
    images: [
      { src: 'https://images.unsplash.com/photo-1617195921829-3c8a7413a1e4?q=80&w=1974&auto=format&fit=crop', alt: 'Chanderi Saree', aiHint: 'cotton saree ivory' },
      { src: 'https://images.unsplash.com/photo-1620005755569-bf9a2180e2f5?q=80&w=1964&auto=format&fit=crop', alt: 'Chanderi Saree Fabric', aiHint: 'chanderi fabric texture' },
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
  },
  {
    id: '4',
    name: 'Vibrant Bandhani Printed Saree',
    slug: 'vibrant-bandhani-printed-saree',
    category: 'Printed Sarees',
    price: 3800,
    images: [
      { src: 'https://images.unsplash.com/photo-1617195921829-3c8a7413a1e4?q=80&w=1974&auto=format&fit=crop', alt: 'Bandhani Saree', aiHint: 'bandhani saree bright' },
      { src: 'https://images.unsplash.com/photo-1620005755569-bf9a2180e2f5?q=80&w=1964&auto=format&fit=crop', alt: 'Bandhani Saree Print Detail', aiHint: 'tie dye fabric' },
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
  },
];

export const reviews: Review[] = [
    {
        id: 'r1',
        author: 'Priya Sharma',
        date: '2 weeks ago',
        rating: 5,
        text: "Absolutely stunning saree! The quality of the silk is exceptional and the color is even more beautiful in person. Received so many compliments at the wedding.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 'r2',
        author: 'Anjali Mehta',
        date: '1 month ago',
        rating: 4,
        text: "Beautiful design and very lightweight. It was very comfortable to wear for a long day. The delivery was also very prompt. Would have liked a bit more intricacy on the border.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
    },
    {
        id: 'r3',
        author: 'Sunita Rao',
        date: '3 months ago',
        rating: 5,
        text: "This is my second purchase from SareeShree and they never disappoint. The craftsmanship is top-notch. It's a timeless piece I will cherish forever.",
        avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1974&auto=format&fit=crop"
    }
];
