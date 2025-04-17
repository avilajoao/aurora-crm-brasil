import { StatusTarefa, PrioridadeTarefa } from "@/types";

export const tarefasExemplo = [
  {
    id: "1",
    etapaId: "1",
    titulo: "Aprovar planta baixa com cliente",
    descricao: "Reunião com cliente para aprovação da planta baixa final",
    status: "concluida" as StatusTarefa,
    prioridade: "alta" as PrioridadeTarefa,
    responsavelId: "1",
    responsavel: {
      nome: "Ana Silva",
      avatar: "/avatars/ana.png"
    },
    dataCriacao: new Date("2023-05-10"),
    dataInicio: new Date("2023-05-12"),
    dataVencimento: new Date("2023-05-15"),
    dataConclusao: new Date("2023-05-14"),
    comentarios: []
  },
  {
    id: "2",
    etapaId: "2",
    titulo: "Comprar materiais de construção",
    descricao: "Adquirir materiais necessários para início da obra conforme lista aprovada",
    status: "em_andamento" as StatusTarefa,
    prioridade: "media" as PrioridadeTarefa,
    responsavelId: "2",
    responsavel: {
      nome: "Carlos Mendes",
      avatar: "/avatars/carlos.png"
    },
    dataCriacao: new Date("2023-05-15"),
    dataInicio: new Date("2023-05-16"),
    dataVencimento: new Date("2023-05-22"),
    comentarios: []
  },
  {
    id: "3",
    etapaId: "2",
    titulo: "Contratar equipe de pedreiros",
    descricao: "Entrevistar e contratar equipe para início das obras",
    status: "pendente" as StatusTarefa,
    prioridade: "alta" as PrioridadeTarefa,
    responsavelId: "3",
    responsavel: {
      nome: "Mariana Costa",
      avatar: "/avatars/mariana.png"
    },
    dataCriacao: new Date("2023-05-17"),
    dataVencimento: new Date("2023-05-25"),
    comentarios: []
  },
  {
    id: "4",
    etapaId: "3",
    titulo: "Instalar fiação elétrica",
    descricao: "Realizar instalação conforme projeto elétrico aprovado",
    status: "bloqueada" as StatusTarefa,
    prioridade: "urgente" as PrioridadeTarefa,
    responsavelId: "4",
    responsavel: {
      nome: "Lucas Ferreira",
      avatar: "/avatars/lucas.png"
    },
    dataCriacao: new Date("2023-05-12"),
    dataVencimento: new Date("2023-05-20"),
    comentarios: []
  },
  {
    id: "5",
    etapaId: "1",
    titulo: "Revisar orçamento de materiais",
    descricao: "Atualizar orçamento com novos preços do fornecedor",
    status: "em_revisao" as StatusTarefa,
    prioridade: "baixa" as PrioridadeTarefa,
    responsavelId: "5",
    responsavel: {
      nome: "Paulo Santos",
      avatar: "/avatars/paulo.png"
    },
    dataCriacao: new Date("2023-05-10"),
    dataInicio: new Date("2023-05-11"),
    dataVencimento: new Date("2023-05-18"),
    comentarios: []
  },
  {
    id: "6",
    etapaId: "4",
    titulo: "Preparar relatório de progresso",
    descricao: "Elaborar relatório semanal de progresso da obra para apresentação ao cliente",
    status: "pendente" as StatusTarefa,
    prioridade: "media" as PrioridadeTarefa,
    responsavelId: "1",
    responsavel: {
      nome: "Ana Silva",
      avatar: "/avatars/ana.png"
    },
    dataCriacao: new Date("2023-05-18"),
    dataVencimento: new Date("2023-05-22"),
    comentarios: []
  }
];
