import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Heart, LogOut, Package, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { products, phaseLabels, type CyclePhase } from "@/data/products";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/conta")({
  component: AccountPage,
});

function AccountPage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
  }, [user, navigate]);

  if (!user) return null;

  const favs = products.filter((p) => user.favorites.includes(p.id));

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="bg-gradient-wine text-primary-foreground rounded-3xl p-8 md:p-10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/15 flex items-center justify-center">
            <UserIcon className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Olá,</p>
            <h1 className="font-display text-3xl">{user.name}</h1>
            <p className="text-sm text-primary-foreground/70">{user.email}</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate({ to: "/" }); }} className="inline-flex items-center gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 px-5 py-2.5 rounded-full text-sm">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-3xl shadow-soft p-7 lg:col-span-2">
          <h2 className="font-display text-2xl mb-5 flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Meus pedidos</h2>
          {user.orders.length === 0 ? (
            <p className="text-muted-foreground text-sm">Você ainda não fez pedidos.</p>
          ) : (
            <div className="space-y-3">
              {user.orders.map((o) => (
                <div key={o.id} className="border border-border rounded-2xl p-5">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <div>
                      <p className="font-medium">Pedido {o.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.date).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <span className={`text-[11px] uppercase tracking-widest px-3 py-1 rounded-full ${o.status === "entregue" ? "bg-secondary text-secondary-foreground" : "bg-accent/40 text-accent-foreground"}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {o.items.map((i) => `${i.qty}× ${i.name}`).join(" · ")}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{o.shipping}</span>
                    <span className="font-medium text-primary">{formatBRL(o.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-3xl shadow-soft p-7">
            <h3 className="font-display text-xl mb-3">Sua fase do ciclo</h3>
            <p className="text-xs text-muted-foreground mb-3">Receba sugestões personalizadas.</p>
            <select
              value={user.cyclePhase ?? ""}
              onChange={(e) => updateUser({ cyclePhase: (e.target.value || undefined) as CyclePhase })}
              className="w-full bg-muted rounded-full px-4 h-11 text-sm outline-none"
            >
              <option value="">Não informar</option>
              {(Object.keys(phaseLabels) as CyclePhase[]).map((p) => (
                <option key={p} value={p}>{phaseLabels[p]}</option>
              ))}
            </select>
          </div>

          <div className="bg-card rounded-3xl shadow-soft p-7">
            <h3 className="font-display text-xl mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /> Favoritos</h3>
            {favs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum favorito ainda.</p>
            ) : (
              <div className="space-y-2">
                {favs.map((p) => (
                  <Link key={p.id} to="/produto/$slug" params={{ slug: p.slug }} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition">
                    <div className="w-12 h-12 bg-gradient-warm rounded-xl">
                      <img src={p.image} alt="" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium leading-tight">{p.name}</p>
                      <p className="text-primary text-xs">{formatBRL(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
