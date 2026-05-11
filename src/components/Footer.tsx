import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-wine text-primary-foreground mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur flex items-center justify-center">
                <Moon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="font-display text-2xl">hibiscus</div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Cuidado que acolhe, natureza que equilibra, você que floresce.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Navegar</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/produtos" className="hover:text-primary-foreground">Produtos</Link></li>
              <li><Link to="/luna-fases" className="hover:text-primary-foreground">LunaFases</Link></li>
              <li><Link to="/sobre" className="hover:text-primary-foreground">Sobre nós</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/contato" className="hover:text-primary-foreground">Contato</Link></li>
              <li><Link to="/conta" className="hover:text-primary-foreground">Meus pedidos</Link></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Trocas e devoluções</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Política de privacidade</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Receba carinho</h4>
            <p className="text-sm text-primary-foreground/70 mb-3">
              Promoções e conteúdos para o seu ciclo.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 text-sm placeholder:text-primary-foreground/50 outline-none focus:bg-primary-foreground/20"
              />
              <button
                type="submit"
                className="bg-primary-foreground text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition"
              >
                Enviar
              </button>
            </form>
            <div className="flex gap-3 mt-5">
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Hibiscus Fitoterápicos. Todos os direitos reservados.</p>
          <p>Conformidade com LGPD · Pagamentos seguros</p>
        </div>
      </div>
    </footer>
  );
}
