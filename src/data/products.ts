import chaImg from "@/assets/products/cha-relaxante.png";
import sprayImg from "@/assets/products/spray-relaxante.png";
import saisImg from "@/assets/products/sais-banho.png";
import cremeImg from "@/assets/products/creme-termico.png";
import chocoImg from "@/assets/products/chocolate-terapeutico.png";

export type CyclePhase = "menstrual" | "folicular" | "ovulatoria" | "lutea" | "tpm";
export type Category = "alivio" | "autocuidado" | "ritual" | "alimento";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  categoryLabel: string;
  phases: CyclePhase[];
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  fragrances?: string[];
  rating: number;
  reviews: number;
  highlight?: "novo" | "mais-vendido";
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "cha-relaxante-tpm",
    name: "Chá Relaxante TPM",
    tagline: "Equilíbrio e bem-estar",
    category: "alimento",
    categoryLabel: "Chá & Infusões",
    phases: ["tpm", "lutea", "menstrual"],
    price: 29.9,
    image: chaImg,
    shortDescription: "Blend de ervas selecionadas que promove relaxamento e equilíbrio para o seu ciclo.",
    description:
      "Nos dias de TPM, o corpo e a mente pedem cuidado. Nosso Chá Relaxante foi criado para oferecer momentos de equilíbrio e bem-estar, com um sabor suave e levemente adocicado.",
    benefits: [
      "Contribui para o relaxamento do corpo e da mente",
      "Auxilia no equilíbrio emocional",
      "Promove sensação de bem-estar",
      "Aroma e sabor que acolhem",
    ],
    ingredients: ["Hibisco", "Camomila", "Lavanda", "Capim-limão", "Laranja doce", "Canela"],
    rating: 4.9,
    reviews: 96,
    highlight: "novo",
  },
  {
    id: "p2",
    slug: "spray-relaxante-tpm",
    name: "Spray Relaxante TPM",
    tagline: "Aroma terapêutico",
    category: "ritual",
    categoryLabel: "Aromaterapia",
    phases: ["tpm", "lutea"],
    price: 49.9,
    image: sprayImg,
    shortDescription: "Aroma que promove relaxamento, equilíbrio e bem-estar para o seu ritual.",
    description:
      "Desenvolvido para auxiliar no alívio de tensões e promover momentos de relaxamento. Borrife no travesseiro, no quarto ou em roupas de cama para uma noite mais acolhedora.",
    benefits: [
      "Aroma relaxante e acolhedor",
      "Auxilia no alívio de tensões e desconfortos",
      "Ideal para seu ritual de bem-estar",
      "Ingredientes naturais e seguros",
    ],
    ingredients: ["Hidrolato de Lavanda", "Camomila Romana", "Melissa", "Capim-limão", "Jasmim"],
    fragrances: ["Lavanda & Camomila", "Jasmim & Melissa", "Lavanda Pura"],
    rating: 4.9,
    reviews: 128,
    highlight: "mais-vendido",
  },
  {
    id: "p3",
    slug: "sais-de-banho-tpm",
    name: "Sais de Banho TPM",
    tagline: "Relaxamento & Conforto",
    category: "ritual",
    categoryLabel: "Banho & Ritual",
    phases: ["tpm", "menstrual", "lutea"],
    price: 49.9,
    image: saisImg,
    shortDescription: "100% fitoterápico com óleos essenciais e flores naturais.",
    description:
      "Desenvolvidos para proporcionar relaxamento profundo, alívio do estresse e equilíbrio emocional durante o ciclo. Transformam seu banho em um ritual de autocuidado.",
    benefits: [
      "Relaxamento profundo e bem-estar",
      "Ação calmante e equilibrante",
      "Sensação de aconchego e conforto",
      "100% fitoterápico, natural e vegano",
    ],
    ingredients: ["Sal rosa do Himalaia", "Sal de Epsom", "Lavanda", "Camomila", "Óleos essenciais"],
    fragrances: ["Lavanda & Camomila", "Rosas & Hibisco"],
    rating: 4.8,
    reviews: 96,
  },
  {
    id: "p4",
    slug: "creme-termico-corporal-tpm",
    name: "Creme Térmico Corporal TPM",
    tagline: "Cuidado que acolhe seus ciclos",
    category: "alivio",
    categoryLabel: "Alívio & Conforto",
    phases: ["tpm", "menstrual"],
    price: 59.9,
    image: cremeImg,
    shortDescription: "Equilíbrio, conforto e bem-estar todos os dias.",
    description:
      "Desenvolvido para proporcionar sensação de conforto, calor e relaxamento, ajudando você a se sentir melhor ao longo do dia. Textura leve e de rápida absorção.",
    benefits: [
      "Ação térmica que alivia e conforta",
      "Conforto nas áreas sensíveis",
      "Com extratos naturais",
      "Equilíbrio no dia a dia",
    ],
    ingredients: ["Gengibre", "Arnica", "Menta Piperita", "Alecrim", "Cânfora"],
    rating: 4.8,
    reviews: 128,
    highlight: "mais-vendido",
  },
  {
    id: "p5",
    slug: "chocolate-terapeutico-tpm",
    name: "Chocolate Terapêutico TPM",
    tagline: "Sabor que acolhe. Cuidado que transforma.",
    category: "alimento",
    categoryLabel: "Alimentos Funcionais",
    phases: ["tpm", "lutea"],
    price: 29.9,
    image: chocoImg,
    shortDescription: "Chocolate ao leite com cacau selecionado e toque de licuri.",
    description:
      "Criado para oferecer momentos de prazer com benefícios reais. Feito com cacau de alta qualidade e ingredientes naturais que ajudam a melhorar o humor e reduzir o estresse.",
    benefits: [
      "Contribui para o equilíbrio do humor",
      "Auxilia na redução do estresse",
      "Promove sensação de prazer e bem-estar",
    ],
    ingredients: ["Cacau 70%", "Maca Peruana", "Hibisco", "Licuri", "Triptofano", "Baunilha"],
    rating: 4.9,
    reviews: 96,
    highlight: "novo",
  },
];

export const categories: { value: Category | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "alivio", label: "Alívio & Cólica" },
  { value: "autocuidado", label: "Autocuidado" },
  { value: "ritual", label: "Ritual & Aroma" },
  { value: "alimento", label: "Alimentos" },
];

export const phaseLabels: Record<CyclePhase, string> = {
  menstrual: "Menstrual",
  folicular: "Folicular",
  ovulatoria: "Ovulatória",
  lutea: "Lútea",
  tpm: "TPM",
};

export const phaseDescriptions: Record<CyclePhase, string> = {
  menstrual: "Dias de descanso. Acolhimento e alívio.",
  folicular: "Energia renovada. Leveza e movimento.",
  ovulatoria: "Pico de vitalidade. Brilho e disposição.",
  lutea: "Sensibilidade. Cuidado e equilíbrio.",
  tpm: "Tensão pré-menstrual. Calma e conforto.",
};
