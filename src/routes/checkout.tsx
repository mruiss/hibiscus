import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CreditCard,
  QrCode,
  FileText,
  MapPin,
  Check,
} from "lucide-react";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatBRL } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

interface ShippingOption {
  id: string;
  name: string;
  days: string;
  price: number;
}

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");

  const [shippingOptions, setShippingOptions] = useState<
    ShippingOption[]
  >([]);

  const [shipping, setShipping] =
    useState<ShippingOption | null>(null);

  const [payment, setPayment] = useState<
    "cartao" | "pix" | "boleto"
  >("pix");

  const calcShipping = () => {
    if (cep.replace(/\D/g, "").length < 8) {
      toast.error("Informe um CEP válido");
      return;
    }

    const opts: ShippingOption[] = [
      {
        id: "sedex",
        name: "SEDEX",
        days: "2 a 4 dias úteis",
        price: 34.9,
      },
    ];

    setShippingOptions(opts);

    // corrigido
    setShipping(opts[0]);

    toast.success("Frete calculado com sucesso");
  };

  const finalTotal = total + (shipping?.price ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shipping) {
      toast.error("Selecione uma opção de entrega");
      return;
    }

    if (items.length === 0) {
      toast.error("Carrinho vazio");
      return;
    }

    const order = addOrder({
      items: items.map((item) => ({
        name: item.product.name,
        qty: item.quantity,
        price: item.product.price,
      })),
      total: finalTotal,
      shipping: shipping.name,
    });

    clear();

    toast.success(
      `Pedido ${order.id} realizado com sucesso!`
    );

    navigate({
      to: "/conta",
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground mb-6">
          Seu carrinho está vazio.
        </p>

        <Link
          to="/produtos"
          className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-full"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-10">
        Finalizar compra
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-[1fr_400px] gap-8"
      >
        <div className="space-y-6">
          <Section title="Seus dados">
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Nome completo"
                value={name}
                onChange={setName}
                required
              />

              <Field
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />

              <Field
                label="Telefone"
                value={phone}
                onChange={setPhone}
                required
              />
            </div>
          </Section>

          <Section title="Endereço de entrega">
            <div className="grid md:grid-cols-[200px_1fr_auto] gap-3 items-end">
              <Field
                label="CEP"
                value={cep}
                onChange={setCep}
                required
              />

              <Field
                label="Endereço"
                value={address}
                onChange={setAddress}
                required
              />

              <button
                type="button"
                onClick={calcShipping}
                className="h-11 px-5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80"
              >
                Calcular frete
              </button>
            </div>

            {shippingOptions.length > 0 && (
              <div className="mt-5 space-y-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <MapPin
                    className="w-4 h-4 text-primary"
                    strokeWidth={1.5}
                  />

                  Escolha a transportadora
                </p>

                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                      shipping?.id === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping?.id === option.id}
                      onChange={() => setShipping(option)}
                      className="accent-primary"
                    />

                    <div className="flex-1">
                      <p className="font-medium">
                        {option.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {option.days}
                      </p>
                    </div>

                    <span className="font-medium">
                      {formatBRL(option.price)}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </Section>

          <Section title="Forma de pagamento">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: "pix",
                  icon: QrCode,
                  label: "PIX",
                  desc: "5% OFF à vista",
                },
                {
                  id: "cartao",
                  icon: CreditCard,
                  label: "Cartão",
                  desc: "Até 5x sem juros",
                },
                {
                  id: "boleto",
                  icon: FileText,
                  label: "Boleto",
                  desc: "Pagamento à vista",
                },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    setPayment(
                      p.id as "cartao" | "pix" | "boleto"
                    )
                  }
                  className={`p-5 rounded-2xl border text-left transition ${
                    payment === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <p.icon
                    className="w-5 h-5 mb-2 text-primary"
                    strokeWidth={1.5}
                  />

                  <p className="font-medium">{p.label}</p>

                  <p className="text-xs text-muted-foreground">
                    {p.desc}
                  </p>
                </button>
              ))}
            </div>
          </Section>
        </div>

        <aside className="bg-card rounded-3xl p-7 shadow-soft h-fit sticky top-28 space-y-4">
          <h2 className="font-display text-2xl">
            Seu pedido
          </h2>

          <div className="space-y-3 text-sm max-h-60 overflow-auto">
            {items.map((item) => (
              <div
                key={
                  item.product.id +
                  (item.fragrance ?? "")
                }
                className="flex justify-between gap-3"
              >
                <span className="text-foreground/80">
                  {item.quantity}× {item.product.name}
                </span>

                <span>
                  {formatBRL(
                    item.product.price * item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal
              </span>

              <span>{formatBRL(total)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Frete
              </span>

              <span>
                {shipping
                  ? formatBRL(shipping.price)
                  : "—"}
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t">
              <span className="font-display text-lg">
                Total
              </span>

              <span className="font-display text-2xl text-primary">
                {formatBRL(finalTotal)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-full h-12 font-medium flex items-center justify-center gap-2 shadow-soft hover:shadow-elegant transition"
          >
            <Check className="w-4 h-4" />

            Confirmar pedido
          </button>

          <p className="text-[11px] text-muted-foreground text-center">
            Seus dados estão protegidos · Conformidade LGPD
          </p>
        </aside>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-3xl p-7 shadow-soft">
      <h2 className="font-display text-2xl mb-5">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

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
