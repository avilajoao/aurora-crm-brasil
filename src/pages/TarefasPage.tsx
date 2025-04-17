
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, User } from 'lucide-react';
import { StatusTarefa, PrioridadeTarefa } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { TarefasBoard } from "@/components/tarefas/TarefasBoard";

// Status das tarefas
const statusTarefas = {
  pendente: { label: "Pendente", color: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300" },
  em_andamento: { label: "Em Andamento", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  em_revisao: { label: "Em Revisão", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
  concluida: { label: "Concluída", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  bloqueada: { label: "Bloqueada", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" }
};

// Prioridades das tarefas
const prioridadeTarefas = {
  baixa: { label: "Baixa", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  media: { label: "Média", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
  alta: { label: "Alta", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  urgente: { label: "Urgente", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" }
};

// Dados de exemplo de tarefas
const tarefasExemplo = [
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

export function TarefasPage() {
  const [tarefas, setTarefas] = useState(tarefasExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredTarefas = searchTerm ? 
    tarefas.filter((tarefa) =>
      tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarefa.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : tarefas;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("tarefaId", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, novoStatus: StatusTarefa) => {
    e.preventDefault();
    const tarefaId = e.dataTransfer.getData("tarefaId");
    
    if (!tarefaId) return;
    
    const tarefasAtualizadas = tarefas.map(tarefa => {
      if (tarefa.id === tarefaId && tarefa.status !== novoStatus) {
        const novaTarefa = { ...tarefa, status: novoStatus };
        
        // Se a tarefa estiver sendo marcada como concluída, adiciona a data de conclusão
        if (novoStatus === "concluida" && !tarefa.dataConclusao) {
          novaTarefa.dataConclusao = new Date();
        }
        
        // Se a tarefa estiver sendo movida de concluída para outro status, remove a data de conclusão
        if (tarefa.status === "concluida" && novoStatus !== "concluida") {
          novaTarefa.dataConclusao = undefined;
        }
        
        // Se a tarefa estiver sendo iniciada, adiciona a data de início
        if ((novoStatus === "em_andamento" || novoStatus === "em_revisao") && !tarefa.dataInicio) {
          novaTarefa.dataInicio = new Date();
        }
        
        toast({
          title: "Tarefa atualizada",
          description: `A tarefa "${tarefa.titulo}" foi movida para ${statusTarefas[novoStatus].label}`,
          variant: "default"
        });
        
        return novaTarefa;
      }
      return tarefa;
    });
    
    setTarefas(tarefasAtualizadas);
  };

  const statusList: StatusTarefa[] = ["pendente", "em_andamento", "em_revisao", "concluida", "bloqueada"];

  return (
    <AppLayout>
      <div className="container py-6 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
            <p className="text-muted-foreground">Acompanhe e gerencie suas tarefas</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
            <Button variant="outline" className="flex gap-2">
              <User className="h-4 w-4" /> Minhas Tarefas
            </Button>
          </div>
        </div>

        {/* Layout de quadros para tarefas */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[calc(100vh-16rem)]">
          {statusList.map((status) => (
            <div key={status} className="border rounded-md p-4">
              <TarefasBoard 
                status={status} 
                tarefas={filteredTarefas} 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                prioridadeTarefas={prioridadeTarefas}
                statusTarefas={statusTarefas}
              />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
