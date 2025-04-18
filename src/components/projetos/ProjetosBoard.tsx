import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusProjeto } from "@/types";
import { ProjetoCard } from './ProjetoCard';
import { ProjectDetails } from './ProjectDetails';

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

interface ProjetosBoardProps {
  status: StatusProjeto;
  projetos: Projeto[];
  draggingId: string | null;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: StatusProjeto) => void;
  onEditClick: (projeto: Projeto) => void;
  onDeleteClick: (id: string) => void;
  statusNames: Record<string, string>;
  statusColors: Record<string, string>;
}

export function ProjetosBoard({
  status,
  projetos,
  draggingId,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onEditClick,
  onDeleteClick,
  statusNames,
  statusColors
}: ProjetosBoardProps) {
  const [selectedProject, setSelectedProject] = React.useState<Projeto | null>(null);
  const projetosFiltrados = projetos.filter(projeto => projeto.status === status);

  return (
    <div 
      className="flex-shrink-0 w-80 flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className="mb-3 sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between border rounded-md p-3">
          <Badge className={cn("font-normal text-sm", statusColors[status])}>
            {statusNames[status]}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {projetosFiltrados.length} projeto(s)
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {projetosFiltrados.map((projeto) => (
          <ProjetoCard 
            key={projeto.id}
            projeto={projeto}
            isDragging={draggingId === projeto.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            statusColors={statusColors}
            onViewDetails={() => setSelectedProject(projeto)}
          />
        ))}
        {projetosFiltrados.length === 0 && (
          <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
            <p className="text-sm">Sem projetos neste status</p>
          </div>
        )}
      </div>

      <ProjectDetails 
        projeto={selectedProject} 
        open={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
