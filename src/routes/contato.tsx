import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
});

function ContatoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com carinho. Em breve responderemos!");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 max-w-5xl">
      <div className="text-center mb-12 max-w-xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Contato</p>
        <h1 className="font-display text-5xl mb-3 text-balance">Vamos conversar?</h1>
        <p className="text-muted-foreground">Estamos aqui para acolher sua mensagem.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "E-mail", value: "ola@hibiscus.com.br" },
            { icon: Phone, label: "Telefone", value: "(11) 4040-2025" },
            { icon: MapPin, label: "Atendimento", value: "Seg a Sex · 9h às 18h" },
          ].map((c) => (
            <div key={c.label} className="bg-card rounded-2xl p-5 shadow-soft flex gap-4 items-center">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <c.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
                <p className="font-medium">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="bg-card rounded-3xl shadow-soft p-7 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Nome</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full bg-muted rounded-full px-4 h-11 text-sm outline-none" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full bg-muted rounded-full px-4 h-11 text-sm outline-none" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Mensagem</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} className="mt-1 w-full bg-muted rounded-3xl px-4 py-3 text-sm outline-none resize-none" />
          </label>
          <button type="submit" className="bg-primary text-primary-foreground rounded-full px-8 h-12 font-medium shadow-soft hover:shadow-elegant transition">
            Enviar mensagem
          </button>
        </form>
      </div>
    </div>
  );
}
