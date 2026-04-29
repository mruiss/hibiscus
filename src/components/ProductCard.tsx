import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { useAuth } from "@/contexts/AuthContext";

export function ProductCard({ product }: { product: Product }) {
  const { user, toggleFavorite } = useAuth();
  const isFav = user?.favorites.includes(product.id);

  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-gradient-warm overflow-hidden">
        {product.highlight && (
          <span
            className={`absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full ${
              product.highlight === "mais-vendido"
                ? "bg-gold/90 text-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {product.highlight === "mais-vendido" ? "Mais Vendido" : "Lançamento"}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (user) toggleFavorite(product.id);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
          aria-label="Favoritar"
        >
          <Heart
            className={`w-4 h-4 ${isFav ? "fill-primary text-primary" : "text-foreground/60"}`}
            strokeWidth={1.5}
          />
        </button>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5 space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {product.categoryLabel}
        </p>
        <h3 className="font-display text-xl text-foreground leading-tight">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>· {product.reviews} avaliações</span>
        </div>
        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="font-display text-2xl text-primary">{formatBRL(product.price)}</p>
            <p className="text-[11px] text-muted-foreground">
              ou 5x de {formatBRL(product.price / 5)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
