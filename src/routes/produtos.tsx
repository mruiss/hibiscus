import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, phaseLabels, type Category, type CyclePhase } from "@/data/products";

const searchSchema = z.object({
  q: z.string().optional(),
  cat: z.string().optional(),
  phase: z.string().optional(),
});

export const Route = createFileRoute("/produtos")({
  component: ProductsPage,
  validateSearch: (s) => searchSchema.parse(s),
});

function ProductsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<Category | "todos">((search.cat as Category) || "todos");
  const [phase, setPhase] = useState<CyclePhase | "todas">((search.phase as CyclePhase) || "todas");
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "todos" && p.category !== cat) return false;
      if (phase !== "todas" && !p.phases.includes(phase)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [q, cat, phase, maxPrice]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Catálogo</p>
        <h1 className="font-display text-5xl md:text-6xl mb-4 text-balance">Nossos Produtos</h1>
        <p className="text-muted-foreground">
          Cuidado natural e fitoterápico para acompanhar você em cada fase do ciclo.
        </p>
      </div>

      <div className="bg-card rounded-3xl shadow-soft p-6 mb-10 grid md:grid-cols-[1fr_auto_auto_auto] gap-4 items-center">
        <div className="flex items-center bg-muted rounded-full px-4 h-11 gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar produtos..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as Category | "todos")}
          className="bg-muted rounded-full px-5 h-11 text-sm outline-none cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <select
          value={phase}
          onChange={(e) => setPhase(e.target.value as CyclePhase | "todas")}
          className="bg-muted rounded-full px-5 h-11 text-sm outline-none cursor-pointer"
        >
          <option value="todas">Todas as fases</option>
          {(Object.keys(phaseLabels) as CyclePhase[]).map((p) => (
            <option key={p} value={p}>{phaseLabels[p]}</option>
          ))}
        </select>
        <div className="flex items-center gap-3 px-3">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <input
            type="range"
            min={20}
            max={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-primary w-32"
          />
          <span className="text-xs text-muted-foreground w-16">até R$ {maxPrice}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhum produto encontrado com esses filtros.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">← Voltar ao início</Link>
      </div>
    </div>
  );
}
