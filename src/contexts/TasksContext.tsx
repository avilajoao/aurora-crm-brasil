
import React, { createContext, useContext, useState } from 'react';
import { StatusTarefa, PrioridadeTarefa } from "@/types";

interface TarefaType {
  id: string;
  etapaId: string;
  titulo: string;
  descricao: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  responsavelId: string;
  responsavel: {
    nome: string;
    avatar?: string;
  };
  dataCriacao: Date;
  dataInicio?: Date;
  dataVencimento?: Date;
  dataConclusao?: Date;
  comentarios: any[];
}

interface TasksContextType {
  tarefas: TarefaType[];
  setTarefas: React.Dispatch<React.SetStateAction<TarefaType[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children, initialTarefas = [] }: { children: React.ReactNode; initialTarefas?: TarefaType[] }) {
  const [tarefas, setTarefas] = useState<TarefaType[]>(initialTarefas);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <TasksContext.Provider value={{ tarefas, setTarefas, searchTerm, setSearchTerm }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
