
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusCompra, Compra } from "@/types";
import { CompraCard } from './CompraCard';

interface ComprasBoardProps {
  status: StatusCompra;
  compras: Compra[];
  draggingId: string | null;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: StatusCompra) => void;
  onEditClick: (compra: Compra) => void;
  statusNames: Record<string, string>;
  statusColors: Record<string, string>;
}

export function ComprasBoard({
  status,
  compras,
  draggingId,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onEditClick,
  statusNames,
  statusColors
}: ComprasBoardProps) {
  const comprasFiltradas = compras.filter(compra => compra.status === status);

  return (
    <div 
      key={status}
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
            {comprasFiltradas.length} compra(s)
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {comprasFiltradas.map((compra) => (
          <CompraCard 
            key={compra.id}
            compra={compra}
            isDragging={draggingId === compra.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEditClick={onEditClick}
            statusColors={statusColors}
          />
        ))}
        {comprasFiltradas.length === 0 && (
          <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
            <p className="text-sm">Sem compras neste status</p>
          </div>
        )}
      </div>
    </div>
  );
}
