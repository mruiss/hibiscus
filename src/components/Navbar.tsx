import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Heart, Menu, X, Moon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/produtos", search: { q } as never });
    setOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/produtos", label: "Produtos" },
    { to: "/luna-fases", label: "LunaFases" },
    { to: "/sobre", label: "Sobre Nós" },
    { to: "/blog", label: "Blog" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-wine flex items-center justify-center shadow-soft">
                <Moon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-display text-2xl text-primary tracking-tight">hibiscus</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground -mt-0.5">
                Fitoterápicos
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={submitSearch} className="hidden md:flex items-center bg-muted/60 rounded-full px-4 h-10 gap-2 w-56 focus-within:ring-2 ring-primary/30 transition">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar..."
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
              />
            </form>

            <Link
              to={user ? "/conta" : "/login"}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition"
              aria-label="Conta"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              to="/conta"
              className="hidden sm:flex w-10 h-10 rounded-full hover:bg-muted items-center justify-center transition"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              to="/carrinho"
              className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-6 space-y-1 animate-fade-up">
            <form onSubmit={submitSearch} className="flex items-center bg-muted/60 rounded-full px-4 h-11 gap-2 mb-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar produtos..."
                className="bg-transparent outline-none text-sm flex-1"
              />
            </form>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 rounded-lg hover:bg-muted text-foreground/90"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
