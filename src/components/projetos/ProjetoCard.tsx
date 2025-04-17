
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Building2, Users, Calendar, MoveHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { StatusProjeto } from "@/types";

interface Projeto {
  id: string;
  titulo: string;
  cliente: string;
  responsavel: string;
  valor: number;
  status: StatusProjeto;
  dataPrevista: string;
  descricao?: string;
}

interface ProjetoCardProps {
  projeto: Projeto;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onEditClick: (projeto: Projeto) => void;
  onDeleteClick: (id: string) => void;
  statusColors: Record<string, string>;
}

export function ProjetoCard({
  projeto,
  isDragging,
  onDragStart,
  onDragEnd,
  onEditClick,
  onDeleteClick,
  statusColors
}: ProjetoCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-move shadow-sm hover:shadow-md transition-all",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      draggable
      onDragStart={(e) => onDragStart(e, projeto.id)}
      onDragEnd={onDragEnd}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base">{projeto.titulo}</h3>
          <MoveHorizontal className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
        <div className="text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5" />
            <span>{projeto.cliente}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{projeto.responsavel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{projeto.dataPrevista}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="font-medium text-sm">
            {new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            }).format(projeto.valor)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 flex justify-end gap-2 border-t">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(projeto);
          }}
        >
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(projeto.id);
          }}
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
}
