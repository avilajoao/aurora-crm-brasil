
import { StatusTarefa } from "@/types";

export const statusTarefas = {
  pendente: { label: "Pendente", color: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300" },
  em_andamento: { label: "Em Andamento", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  em_revisao: { label: "Em Revisão", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
  concluida: { label: "Concluída", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  bloqueada: { label: "Bloqueada", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" }
};

export const prioridadeTarefas = {
  baixa: { label: "Baixa", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  media: { label: "Média", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
  alta: { label: "Alta", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  urgente: { label: "Urgente", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" }
};

export const statusList: StatusTarefa[] = ["pendente", "em_andamento", "em_revisao", "concluida", "bloqueada"];
