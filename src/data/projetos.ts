
import { StatusProjeto } from "@/types";

export interface Projeto {
  id: string;
  titulo: string;
  cliente: string;
  responsavel: string;
  valor: number;
  status: StatusProjeto;
  dataPrevista: string;
  descricao?: string;
}

export const projectsData: Projeto[] = [
  {
    id: '1',
    titulo: 'Reforma Escritório Central',
    cliente: 'Tech Solutions Ltda',
    responsavel: 'Ana Silva',
    valor: 85000,
    status: 'em_andamento',
    dataPrevista: '15/06/2023',
    descricao: 'Projeto de reforma completa do escritório central com substituição de mobiliário e adequações estruturais.'
  },
  {
    id: '2',
    titulo: 'Construção Galpão Industrial',
    cliente: 'Indústrias Progresso S.A.',
    responsavel: 'Carlos Mendes',
    valor: 420000,
    status: 'aguardando_aprovacao',
    dataPrevista: '30/10/2023',
    descricao: 'Construção de galpão industrial com 1.200m² incluindo área administrativa e estacionamento.'
  },
  {
    id: '3',
    titulo: 'Instalação Elétrica Predial',
    cliente: 'Condomínio Vista Verde',
    responsavel: 'Mariana Costa',
    valor: 38500,
    status: 'concluido',
    dataPrevista: '22/04/2023',
    descricao: 'Revisão e modernização de toda a instalação elétrica do condomínio, incluindo áreas comuns.'
  },
  {
    id: '4',
    titulo: 'Ampliação Fábrica de Alimentos',
    cliente: 'Sabores do Brasil S.A.',
    responsavel: 'Ricardo Oliveira',
    valor: 650000,
    status: 'em_analise',
    dataPrevista: '10/12/2023',
    descricao: 'Projeto de ampliação da fábrica de alimentos com construção de novas linhas de produção.'
  },
  {
    id: '5',
    titulo: 'Manutenção Preventiva Maquinário',
    cliente: 'Metalúrgica Nacional',
    responsavel: 'Paulo Santos',
    valor: 22000,
    status: 'em_andamento',
    dataPrevista: '05/05/2023',
    descricao: 'Manutenção preventiva em todo o maquinário da linha de produção principal.'
  },
];

export const responsaveis = [
  "Ana Silva",
  "Carlos Mendes",
  "Mariana Costa",
  "Ricardo Oliveira",
  "Paulo Santos",
  "Juliana Ferreira",
  "Roberto Almeida"
];

export const clientes = [
  "Tech Solutions Ltda",
  "Indústrias Progresso S.A.",
  "Condomínio Vista Verde",
  "Sabores do Brasil S.A.",
  "Metalúrgica Nacional",
  "Construtora Horizonte",
  "Distribuidora Regional",
  "Supermercados Unidos"
];

export const statusColors: Record<string, string> = {
  em_analise: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  aguardando_aprovacao: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  aprovado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  em_andamento: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  em_pausa: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  concluido: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const statusNames: Record<string, string> = {
  em_analise: "Em análise",
  aguardando_aprovacao: "Aguardando aprovação",
  aprovado: "Aprovado",
  em_andamento: "Em andamento",
  em_pausa: "Em pausa",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

export const statusList: StatusProjeto[] = [
  "em_analise",
  "aguardando_aprovacao", 
  "aprovado",
  "em_andamento",
  "em_pausa",
  "concluido",
  "cancelado"
];
