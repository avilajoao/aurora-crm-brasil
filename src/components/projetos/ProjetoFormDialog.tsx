
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StatusProjeto } from "@/types";

interface ProjetoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projeto: any;
  setProjeto: (projeto: any) => void;
  onSubmit: () => void;
  title: string;
  description: string;
  submitLabel: string;
  clientes: string[];
  responsaveis: string[];
}

export function ProjetoFormDialog({
  open,
  onOpenChange,
  projeto,
  setProjeto,
  onSubmit,
  title,
  description,
  submitLabel,
  clientes,
  responsaveis
}: ProjetoFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="titulo" className="text-sm font-medium">Título do Projeto*</label>
            <Input
              id="titulo"
              value={projeto.titulo}
              onChange={(e) => setProjeto({...projeto, titulo: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="cliente" className="text-sm font-medium">Cliente*</label>
            <Select
              value={projeto.cliente}
              onValueChange={(value) => setProjeto({...projeto, cliente: value})}
            >
              <SelectTrigger id="cliente">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map(cliente => (
                  <SelectItem key={cliente} value={cliente}>{cliente}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="responsavel" className="text-sm font-medium">Responsável</label>
              <Select
                value={projeto.responsavel}
                onValueChange={(value) => setProjeto({...projeto, responsavel: value})}
              >
                <SelectTrigger id="responsavel">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {responsaveis.map(resp => (
                    <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="data-prevista" className="text-sm font-medium">Data Prevista*</label>
              <Input
                id="data-prevista"
                type="text"
                placeholder="DD/MM/AAAA"
                value={projeto.dataPrevista}
                onChange={(e) => setProjeto({...projeto, dataPrevista: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="valor" className="text-sm font-medium">Valor Orçado (R$)</label>
              <Input
                id="valor"
                type="number"
                value={projeto.valor || ''}
                onChange={(e) => setProjeto({...projeto, valor: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select
                value={projeto.status}
                onValueChange={(value: StatusProjeto) => setProjeto({...projeto, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status do projeto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_analise">Em análise</SelectItem>
                  <SelectItem value="aguardando_aprovacao">Aguardando aprovação</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
                  <SelectItem value="em_pausa">Em pausa</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
            <Textarea
              id="descricao"
              placeholder="Detalhes do projeto"
              value={projeto.descricao || ''}
              onChange={(e) => setProjeto({...projeto, descricao: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onSubmit}>{submitLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
