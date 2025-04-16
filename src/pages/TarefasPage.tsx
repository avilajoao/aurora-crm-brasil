
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Filter, 
  ClipboardList, 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertCircle, 
  User,
  Calendar
} from 'lucide-react';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusTarefa, PrioridadeTarefa } from "@/types";

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

// Componente para renderizar coluna de tarefas
interface ColunaTarefasProps {
  status: StatusTarefa;
  tarefas: typeof tarefasExemplo;
}

function ColunaTarefas({ status, tarefas }: ColunaTarefasProps) {
  const tarefasFiltradas = tarefas.filter(tarefa => tarefa.status === status);
  const statusConfig = statusTarefas[status];

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getIconeStatus = (status: StatusTarefa) => {
    switch (status) {
      case 'pendente': return <Circle className="h-4 w-4 text-slate-500" />;
      case 'em_andamento': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'em_revisao': return <ClipboardList className="h-4 w-4 text-amber-500" />;
      case 'concluida': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'bloqueada': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3 px-2">
        {getIconeStatus(status)}
        <h3 className="font-medium">{statusConfig.label}</h3>
        <Badge variant="outline">{tarefasFiltradas.length}</Badge>
      </div>
      
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {tarefasFiltradas.map((tarefa) => (
            <Card key={tarefa.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <h4 className="font-medium">{tarefa.titulo}</h4>
                {tarefa.descricao && <p className="text-sm text-muted-foreground mt-1">{tarefa.descricao}</p>}
                
                <div className="mt-3 flex justify-between items-center">
                  <Badge className={cn("font-normal", prioridadeTarefas[tarefa.prioridade].color)}>
                    {prioridadeTarefas[tarefa.prioridade].label}
                  </Badge>
                  
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={tarefa.responsavel.avatar} alt={tarefa.responsavel.nome} />
                    <AvatarFallback>{tarefa.responsavel.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                
                {tarefa.dataVencimento && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Vence: {formatarData(tarefa.dataVencimento)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function TarefasPage() {
  const [tarefas] = useState(tarefasExemplo);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTarefas = searchTerm ? 
    tarefas.filter((tarefa) =>
      tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarefa.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : tarefas;

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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[calc(100vh-16rem)]">
          <div className="border rounded-md p-4">
            <ColunaTarefas status="pendente" tarefas={filteredTarefas} />
          </div>
          <div className="border rounded-md p-4">
            <ColunaTarefas status="em_andamento" tarefas={filteredTarefas} />
          </div>
          <div className="border rounded-md p-4">
            <ColunaTarefas status="em_revisao" tarefas={filteredTarefas} />
          </div>
          <div className="border rounded-md p-4">
            <ColunaTarefas status="concluida" tarefas={filteredTarefas} />
          </div>
          <div className="border rounded-md p-4">
            <ColunaTarefas status="bloqueada" tarefas={filteredTarefas} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
