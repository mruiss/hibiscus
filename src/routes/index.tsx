import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Leaf, Moon, Heart, Shield } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImg from "@/assets/hero-botanical.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="container mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur border border-border/60 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground/80">Lançamento · Linha Luna Fases</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] text-balance">
                Cuidado que acolhe <em className="text-primary not-italic">cada fase</em> do seu ciclo.
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Produtos fitoterápicos pensados para o ritmo único do corpo feminino — do alívio da TPM
                ao ritual de bem-estar.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/produtos"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-medium shadow-elegant hover:shadow-glow transition-all"
                >
                  Conheça nossos produtos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/luna-fases"
                  className="inline-flex items-center gap-2 border border-foreground/15 px-7 py-4 rounded-full font-medium hover:bg-foreground/5 transition"
                >
                  Descubra sua fase
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5" /> Natural</span>
                <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Vegano</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Sem testes</span>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="absolute -inset-10 bg-accent/30 blur-3xl rounded-full" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
                <img
                  src={heroImg}
                  alt="Composição botânica com lavanda, camomila e hibisco"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={1024}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elegant p-5 max-w-[200px] animate-float">
                <Moon className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground leading-snug">
                  <span className="font-display text-base text-foreground block">Luna Fases</span>
                  Para cada momento do seu ciclo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS / PILARES */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Alívio para a TPM", desc: "Cremes térmicos e infusões que confortam." },
            { icon: Moon, title: "Rituais noturnos", desc: "Sprays e sais que acolhem seu descanso." },
            { icon: Leaf, title: "Equilíbrio diário", desc: "Alimentos funcionais para o seu humor." },
          ].map((p) => (
            <div key={p.title} className="bg-card rounded-3xl p-8 shadow-soft hover:shadow-elegant transition">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Nossa coleção</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance">Linha Luna Fases TPM</h2>
          </div>
          <Link to="/produtos" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA CICLO */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-wine text-primary-foreground p-10 md:p-16">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-3">
                Sugestões personalizadas
              </p>
              <h2 className="font-display text-4xl md:text-5xl mb-4 text-balance">
                Em qual fase do seu ciclo você está?
              </h2>
              <p className="text-primary-foreground/80 mb-7 leading-relaxed">
                Conte-nos e receba recomendações pensadas para você — do alívio à celebração.
              </p>
              <Link
                to="/luna-fases"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-7 py-4 rounded-full font-medium hover:bg-primary-foreground/90 transition"
              >
                Descobrir minhas recomendações
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Menstrual", "Folicular", "Ovulatória", "Lútea / TPM"].map((f) => (
                <div key={f} className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-5 border border-primary-foreground/15">
                  <Moon className="w-5 h-5 mb-2" strokeWidth={1.5} />
                  <p className="font-display text-lg">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
