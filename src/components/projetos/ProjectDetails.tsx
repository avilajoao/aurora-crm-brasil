
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Users, DollarSign, FileText } from "lucide-react";
import { StatusProjeto } from "@/types";

interface ProjectDetailsProps {
  projeto: {
    id: string;
    titulo: string;
    cliente: string;
    responsavel: string;
    valor: number;
    status: StatusProjeto;
    dataPrevista: string;
    descricao?: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDetails({ projeto, open, onClose }: ProjectDetailsProps) {
  if (!projeto) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{projeto.titulo}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Cliente:</span>
              <span>{projeto.cliente}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Responsável:</span>
              <span>{projeto.responsavel}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Data Prevista:</span>
              <span>{projeto.dataPrevista}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Valor:</span>
              <span>{new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(projeto.valor)}</span>
            </div>
          </div>

          {projeto.descricao && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Descrição:</span>
              </div>
              <p className="text-sm text-muted-foreground">{projeto.descricao}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
