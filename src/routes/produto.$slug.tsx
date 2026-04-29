import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, ShoppingBag, Check, Leaf, Shield, Truck, ArrowLeft } from "lucide-react";
import { products, phaseLabels } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container mx-auto py-20 text-center">
      <p>Produto não encontrado.</p>
      <Link to="/produtos" className="text-primary underline">Ver todos</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { user, toggleFavorite } = useAuth();
  const [fragrance, setFragrance] = useState(product.fragrances?.[0]);
  const [qty, setQty] = useState(1);

  const isFav = user?.favorites.includes(product.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product, fragrance);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div>
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <Link to="/produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Voltar para produtos
        </Link>
      </div>

      <section className="container mx-auto px-4 lg:px-8 py-10 grid lg:grid-cols-2 gap-12">
        <div className="bg-gradient-warm rounded-[2.5rem] aspect-square relative overflow-hidden shadow-soft">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-12" />
          {product.highlight && (
            <span className={`absolute top-6 left-6 text-xs uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full ${product.highlight === "mais-vendido" ? "bg-gold/90 text-foreground" : "bg-primary text-primary-foreground"}`}>
              {product.highlight === "mais-vendido" ? "Mais Vendido" : "Lançamento"}
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">{product.categoryLabel}</p>
            <h1 className="font-display text-4xl md:text-5xl text-balance">{product.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{product.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">· {product.reviews} avaliações</span>
          </div>

          <p className="text-foreground/80 leading-relaxed">{product.shortDescription}</p>

          <div className="flex items-end gap-4 pt-2 pb-2">
            <p className="font-display text-5xl text-primary">{formatBRL(product.price)}</p>
            <p className="text-sm text-muted-foreground pb-2">ou 5x de {formatBRL(product.price / 5)}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.phases.map((p) => (
              <span key={p} className="text-xs uppercase tracking-widest bg-secondary/60 text-secondary-foreground px-3 py-1.5 rounded-full">
                Fase {phaseLabels[p]}
              </span>
            ))}
          </div>

          {product.fragrances && (
            <div>
              <p className="text-sm font-medium mb-2">Fragrância</p>
              <div className="flex flex-wrap gap-2">
                {product.fragrances.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFragrance(f)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${fragrance === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center bg-muted rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 hover:text-primary">−</button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-11 hover:text-primary">+</button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-primary text-primary-foreground rounded-full h-12 px-6 font-medium flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant transition"
            >
              <ShoppingBag className="w-4 h-4" /> Adicionar ao carrinho
            </button>
            <button
              onClick={() => user ? toggleFavorite(product.id) : toast.info("Faça login para favoritar")}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary transition"
              aria-label="Favoritar"
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            {[
              { icon: Leaf, label: "100% natural" },
              { icon: Shield, label: "Sem testes em animais" },
              { icon: Truck, label: "Frete para todo Brasil" },
            ].map((b) => (
              <div key={b.label} className="text-center">
                <b.icon className="w-5 h-5 mx-auto mb-1.5 text-primary" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12 grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-3xl p-8 shadow-soft">
          <h2 className="font-display text-2xl mb-4">Sobre o produto</h2>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>
        <div className="bg-card rounded-3xl p-8 shadow-soft">
          <h2 className="font-display text-2xl mb-4">Benefícios</h2>
          <ul className="space-y-2.5">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card rounded-3xl p-8 shadow-soft md:col-span-2">
          <h2 className="font-display text-2xl mb-4">Ingredientes naturais</h2>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((i) => (
              <span key={i} className="px-4 py-2 bg-secondary/50 rounded-full text-sm">{i}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <h2 className="font-display text-3xl mb-8">Você também pode amar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.id} to="/produto/$slug" params={{ slug: p.slug }} className="block bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition">
              <div className="aspect-square bg-gradient-warm">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-8" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl">{p.name}</h3>
                <p className="text-primary font-display text-xl mt-2">{formatBRL(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
