import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Heart, Sparkles, Shield } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
});

function SobrePage() {
  return (
    <div>
      <section className="bg-gradient-warm py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Sobre nós</p>
          <h1 className="font-display text-5xl md:text-6xl mb-5 text-balance">
            Cuidado natural que floresce com você.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A Hibiscus nasceu para acolher cada fase do ciclo feminino com fitoterapia,
            ciência e afeto.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl mb-4">Nossa missão</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Acreditamos que o cuidado com o ciclo menstrual deve ser tão natural quanto ele.
            Por isso, criamos produtos fitoterápicos que respeitam o ritmo do corpo,
            unindo ervas, óleos essenciais e ingredientes de origem responsável.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Cada formulação é pensada para uma fase: do alívio da TPM ao ritual de bem-estar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Leaf, title: "100% natural", desc: "Ingredientes de origem fitoterápica." },
            { icon: Heart, title: "Vegano", desc: "Sem origem animal em nossas fórmulas." },
            { icon: Shield, title: "Cruelty-free", desc: "Não testamos em animais." },
            { icon: Sparkles, title: "Embalagem", desc: "Reciclável e consciente." },
          ].map((v) => (
            <div key={v.title} className="bg-card rounded-2xl p-5 shadow-soft">
              <v.icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.5} />
              <p className="font-display text-lg">{v.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="bg-gradient-wine text-primary-foreground rounded-[2.5rem] p-12 text-center">
          <p className="font-display text-3xl md:text-4xl text-balance max-w-2xl mx-auto leading-tight">
            "Cuidado que acolhe, natureza que equilibra, você que floresce."
          </p>
        </div>
      </section>
    </div>
  );
}
