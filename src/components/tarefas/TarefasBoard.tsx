
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Circle, Clock, ClipboardList, CheckCircle, AlertCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusTarefa, PrioridadeTarefa } from "@/types";
import { TarefaCard } from './TarefaCard';

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

interface TarefasBoardProps {
  status: StatusTarefa;
  tarefas: TarefaType[];
  onDrop: (e: React.DragEvent, status: StatusTarefa) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  prioridadeTarefas: Record<string, { label: string; color: string }>;
  statusTarefas: Record<string, { label: string; color: string }>;
}

export function TarefasBoard({ 
  status, 
  tarefas, 
  onDrop, 
  onDragOver,
  onDragStart,
  prioridadeTarefas,
  statusTarefas
}: TarefasBoardProps) {
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
    <div 
      className="flex flex-col h-full"
      onDrop={(e) => onDrop(e, status)}
      onDragOver={onDragOver}
    >
      <div className="flex items-center gap-2 mb-3 px-2">
        {getIconeStatus(status)}
        <h3 className="font-medium">{statusConfig.label}</h3>
        <Badge variant="outline">{tarefasFiltradas.length}</Badge>
      </div>
      
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {tarefasFiltradas.map((tarefa) => (
            <TarefaCard 
              key={tarefa.id} 
              tarefa={tarefa} 
              prioridadeTarefas={prioridadeTarefas}
              formatarData={formatarData}
              onDragStart={onDragStart}
            />
          ))}
          
          {tarefasFiltradas.length === 0 && (
            <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
              <p className="text-sm">Nenhuma tarefa</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
