
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText, Building2, User, Calendar, MoveHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { StatusCompra, Compra } from "@/types";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

interface CompraCardProps {
  compra: Compra;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onEditClick: (compra: Compra) => void;
  statusColors: Record<string, string>;
}

export function CompraCard({
  compra,
  isDragging,
  onDragStart,
  onDragEnd,
  onEditClick,
  statusColors
}: CompraCardProps) {
  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <Card 
      className={cn(
        "cursor-move shadow-sm hover:shadow-md transition-all",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      draggable
      onDragStart={(e) => onDragStart(e, compra.id)}
      onDragEnd={onDragEnd}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base">Compra #{compra.id}</h3>
          <MoveHorizontal className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
        <div className="space-y-1.5 my-2">
          <div className="flex items-center gap-1 text-sm">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span>NF: {compra.numeroNotaFiscal || "Pendente"}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Projeto #{compra.projetoId}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Responsável #{compra.responsavelId}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{formatarData(compra.dataCompra)}</span>
          </div>
        </div>
        <PermissionGuard
          requiredPermission="view_purchase_values"
          fallback={<div className="mt-3 text-sm text-muted-foreground">Valor: Restrito</div>}
        >
          <div className="mt-3 font-medium">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(compra.valorTotal)}
          </div>
        </PermissionGuard>
      </CardContent>
      <CardFooter className="px-4 py-2 flex justify-end gap-2 border-t">
        <PermissionGuard requiredPermission="change_purchase_status">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(compra);
            }}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        </PermissionGuard>
      </CardFooter>
    </Card>
  );
}
