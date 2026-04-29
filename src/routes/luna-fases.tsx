import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Sparkles, Heart, Sun } from "lucide-react";
import { useState } from "react";
import { products, phaseLabels, phaseDescriptions, type CyclePhase } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/luna-fases")({
  component: LunaFasesPage,
});

const phaseIcons: Record<CyclePhase, typeof Moon> = {
  menstrual: Moon,
  folicular: Sparkles,
  ovulatoria: Sun,
  lutea: Heart,
  tpm: Moon,
};

function LunaFasesPage() {
  const [phase, setPhase] = useState<CyclePhase>("tpm");
  const recommended = products.filter((p) => p.phases.includes(phase));

  return (
    <div>
      <section className="bg-gradient-warm py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Luna Fases</p>
          <h1 className="font-display text-5xl md:text-6xl mb-5 text-balance">
            Cada fase merece um cuidado <em className="text-primary not-italic">único</em>.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Selecione sua fase e receba recomendações pensadas para o seu momento.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {(Object.keys(phaseLabels) as CyclePhase[]).map((p) => {
            const Icon = phaseIcons[p];
            const active = phase === p;
            return (
              <button
                key={p}
                onClick={() => setPhase(p)}
                className={`p-5 rounded-3xl border transition text-left ${active ? "bg-primary text-primary-foreground border-primary shadow-elegant" : "bg-card border-border hover:border-primary/40"}`}
              >
                <Icon className="w-6 h-6 mb-3" strokeWidth={1.5} />
                <p className="font-display text-xl">{phaseLabels[p]}</p>
              </button>
            );
          })}
        </div>

        <div className="bg-card rounded-3xl p-8 mb-10 shadow-soft">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Fase {phaseLabels[phase]}</p>
          <p className="font-display text-2xl text-balance">{phaseDescriptions[phase]}</p>
        </div>

        <h2 className="font-display text-3xl mb-6">Recomendações para você</h2>
        {recommended.length === 0 ? (
          <p className="text-muted-foreground">Em breve, novos produtos para esta fase.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/produtos" className="text-sm text-primary hover:underline">Ver todos os produtos</Link>
        </div>
      </section>
    </div>
  );
}
