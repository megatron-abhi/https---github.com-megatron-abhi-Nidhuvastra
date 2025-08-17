import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const journalPosts = [
  {
    slug: "the-enduring-elegance-of-kanjivaram",
    title: "The Enduring Elegance of Kanjivaram Silk",
    author: "NidhuVastra Team",
    date: "July 26, 2024",
    category: "Heritage",
    excerpt: "Discover the rich history and intricate craftsmanship behind the famed Kanjivaram sarees, a symbol of timeless South Indian bridal wear.",
    image: {
      src: "https://images.unsplash.com/photo-1617195921829-3c8a7413a1e4?q=80&w=1974&auto=format&fit=crop",
      alt: "A vibrant Kanjivaram silk saree with intricate gold patterns.",
      aiHint: "kanjivaram saree",
    }
  },
  {
    slug: "styling-your-saree-for-the-modern-office",
    title: "Styling Your Saree for the Modern Office",
    author: "Priya Sharma",
    date: "July 15, 2024",
    category: "Style Guide",
    excerpt: "Break the boardroom monotony! Here’s how you can style a classic cotton or linen saree for a look that's both professional and chic.",
    image: {
        src: "https://images.unsplash.com/photo-1620005755569-bf9a2180e2f5?q=80&w=1964&auto=format&fit=crop",
        alt: "A woman confidently wearing a modern cotton saree in an office setting.",
        aiHint: "saree office wear",
    }
  },
  {
    slug: "monsoon-saree-care-tips",
    title: "Monsoon Saree Care: Keeping Your Treasures Safe",
    author: "NidhuVastra Team",
    date: "June 28, 2024",
    category: "Saree Care",
    excerpt: "The rainy season requires extra care for your precious handloom sarees. Follow our guide to protect them from moisture and mildew.",
     image: {
        src: "https://images.unsplash.com/photo-1596206583979-a73468b355d1?q=80&w=1974&auto=format&fit=crop",
        alt: "A collection of sarees neatly folded and stored in a wardrobe.",
        aiHint: "saree storage",
    }
  },
];

export default function JournalPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-headline text-foreground">The Journal</h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Insights, stories, and style guides celebrating the art of the saree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {journalPosts.map((post) => (
            <div key={post.slug} className="group flex flex-col">
              <Link href={`/journal/${post.slug}`}>
                <div className="relative w-full h-80 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={post.image.aiHint}
                  />
                </div>
              </Link>
              <div className="flex-grow">
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <Link href={`/journal/${post.slug}`}>
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                </Link>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-4">By {post.author} on {post.date}</p>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href={`/journal/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
