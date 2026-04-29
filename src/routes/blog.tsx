import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

const posts = [
  {
    slug: "fases-ciclo",
    title: "Conhecendo as fases do seu ciclo menstrual",
    excerpt: "Entenda como cada fase impacta seu corpo, humor e energia — e como cuidar de cada uma delas.",
    category: "Autocuidado",
    color: "from-rose-100 to-pink-200",
  },
  {
    slug: "ervas-tpm",
    title: "Ervas que aliviam os sintomas da TPM",
    excerpt: "Camomila, lavanda, hibisco e outros aliados naturais para os dias difíceis.",
    category: "Fitoterapia",
    color: "from-purple-100 to-indigo-200",
  },
  {
    slug: "ritual-noturno",
    title: "Como criar um ritual noturno acolhedor",
    excerpt: "Spray, banho de imersão e chá: dicas para transformar sua noite em um abraço.",
    category: "Bem-estar",
    color: "from-amber-100 to-rose-200",
  },
];

function BlogPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Blog</p>
        <h1 className="font-display text-5xl md:text-6xl mb-4 text-balance">Diário Hibiscus</h1>
        <p className="text-muted-foreground">Conteúdos para cuidar do seu ciclo, corpo e mente.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition cursor-pointer">
            <div className={`aspect-[4/3] bg-gradient-to-br ${p.color} relative`}>
              <span className="absolute bottom-4 left-4 bg-card/90 backdrop-blur text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                {p.category}
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl leading-tight mb-2 group-hover:text-primary transition">{p.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                Ler mais <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
