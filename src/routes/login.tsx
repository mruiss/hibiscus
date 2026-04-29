import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = mode === "login" ? login(email, password) : signup(name, email, password);
    if (r.ok) {
      toast.success(r.message);
      navigate({ to: "/conta" });
    } else {
      toast.error(r.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-card rounded-3xl shadow-soft p-10">
        <h1 className="font-display text-4xl mb-2">{mode === "login" ? "Bem-vinda de volta" : "Crie sua conta"}</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          {mode === "login" ? "Entre para acompanhar seus pedidos." : "Cadastre-se e ganhe 10% na primeira compra."}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <Field label="Nome" value={name} onChange={setName} required />
          )}
          <Field label="E-mail" type="email" value={email} onChange={setEmail} required />
          <Field label="Senha" type="password" value={password} onChange={setPassword} required />

          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-full h-12 font-medium shadow-soft hover:shadow-elegant transition">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="block w-full mt-5 text-sm text-muted-foreground hover:text-primary"
        >
          {mode === "login" ? "Ainda não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
        </button>

        <Link to="/" className="block mt-3 text-xs text-center text-muted-foreground hover:text-primary">
          ← Voltar ao início
        </Link>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full bg-muted rounded-full px-4 h-11 text-sm outline-none focus:ring-2 ring-primary/30"
      />
    </label>
  );
}
