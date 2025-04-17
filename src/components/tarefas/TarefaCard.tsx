
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MoveHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PrioridadeTarefa } from "@/types";

interface TarefaCardProps {
  tarefa: any;
  prioridadeTarefas: Record<string, { label: string; color: string }>;
  formatarData: (data: Date) => string;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

export function TarefaCard({ 
  tarefa, 
  prioridadeTarefas,
  formatarData,
  onDragStart
}: TarefaCardProps) {
  return (
    <Card 
      key={tarefa.id} 
      className="cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("tarefaId", tarefa.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(e, tarefa.id);
      }}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{tarefa.titulo}</h4>
          <MoveHorizontal className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
        {tarefa.descricao && <p className="text-sm text-muted-foreground mt-1">{tarefa.descricao}</p>}
        
        <div className="mt-3 flex justify-between items-center">
          <Badge className={cn("font-normal", prioridadeTarefas[tarefa.prioridade].color)}>
            {prioridadeTarefas[tarefa.prioridade].label}
          </Badge>
          
          <Avatar className="h-6 w-6">
            <AvatarImage src={tarefa.responsavel?.avatar} alt={tarefa.responsavel?.nome} />
            <AvatarFallback>{tarefa.responsavel?.nome?.charAt(0) || "U"}</AvatarFallback>
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
  );
}
