import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatBRL } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/carrinho")({
  component: CartPage,
});

function CartPage() {
  const { items, setQuantity, remove, subtotal, total, coupon, applyCoupon, removeCoupon } = useCart();
  const { user } = useAuth();
  const [code, setCode] = useState("");

  const handleApply = () => {
    const isFirst = !user || !user.hasOrdered;
    const r = applyCoupon(code, isFirst);
    r.ok ? toast.success(r.message) : toast.error(r.message);
    if (r.ok) setCode("");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl mb-3">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8">Que tal começar uma jornada de cuidado?</p>
        <Link to="/produtos" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full">
          Explorar produtos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Seu carrinho</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.product.id + (it.fragrance ?? "")} className="bg-card rounded-3xl p-5 shadow-soft flex gap-5 items-center">
              <div className="w-24 h-24 bg-gradient-warm rounded-2xl shrink-0">
                <img src={it.product.image} alt={it.product.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl">{it.product.name}</h3>
                {it.fragrance && <p className="text-xs text-muted-foreground">Fragrância: {it.fragrance}</p>}
                <p className="text-primary font-medium mt-1">{formatBRL(it.product.price)}</p>
              </div>
              <div className="flex items-center bg-muted rounded-full">
                <button onClick={() => setQuantity(it.product.id, it.quantity - 1)} className="w-9 h-10 hover:text-primary">−</button>
                <span className="w-8 text-center font-medium">{it.quantity}</span>
                <button onClick={() => setQuantity(it.product.id, it.quantity + 1)} className="w-9 h-10 hover:text-primary">+</button>
              </div>
              <button onClick={() => remove(it.product.id)} className="w-10 h-10 rounded-full hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition" aria-label="Remover">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="bg-card rounded-3xl p-7 shadow-soft h-fit sticky top-28 space-y-5">
          <h2 className="font-display text-2xl">Resumo</h2>

          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center bg-muted rounded-full px-4 h-11 gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Cupom" className="bg-transparent outline-none text-sm flex-1" />
              </div>
              <button onClick={handleApply} className="px-5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                Aplicar
              </button>
            </div>
            {coupon && (
              <div className="flex items-center justify-between text-sm bg-secondary/60 rounded-full px-4 py-2">
                <span>Cupom <strong>{coupon.code}</strong> aplicado</span>
                <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive">Remover</button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">Tente: PRIMEIRA10, LUNA15 ou HIBISCUS20</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatBRL(subtotal)}</span></div>
            {coupon && (
              <div className="flex justify-between text-sm text-primary"><span>Desconto ({Math.round(coupon.discount * 100)}%)</span><span>−{formatBRL(subtotal - total)}</span></div>
            )}
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Frete</span><span className="text-muted-foreground">Calculado no checkout</span></div>
            <div className="flex justify-between items-end pt-3 border-t border-border">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-3xl text-primary">{formatBRL(total)}</span>
            </div>
          </div>

          <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full h-12 font-medium shadow-soft hover:shadow-elegant transition">
            Finalizar compra <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/produtos" className="block text-center text-sm text-muted-foreground hover:text-primary">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
