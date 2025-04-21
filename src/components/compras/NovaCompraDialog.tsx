
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Compra, StatusCompra } from '@/types';

interface NovaCompraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompraAdicionada: (compra: Compra) => void;
}

export function NovaCompraDialog({ open, onOpenChange, onCompraAdicionada }: NovaCompraDialogProps) {
  const [valorTotal, setValorTotal] = useState<string>("");
  const [projetoId, setProjetoId] = useState<string>("");
  const [fornecedorId, setFornecedorId] = useState<string>("");
  const [numeroNotaFiscal, setNumeroNotaFiscal] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projetoId || !fornecedorId || !valorTotal) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    const novaCompra: Compra = {
      id: Date.now().toString(),
      projetoId,
      fornecedorId,
      responsavelId: "1", // ID do usuário atual
      numeroNotaFiscal: numeroNotaFiscal || undefined,
      valorTotal: parseFloat(valorTotal),
      dataCompra: new Date(),
      status: "pendente" as StatusCompra,
      itens: []
    };
    
    onCompraAdicionada(novaCompra);
    
    // Resetar formulário
    setValorTotal("");
    setProjetoId("");
    setFornecedorId("");
    setNumeroNotaFiscal("");
    
    // Fechar diálogo
    onOpenChange(false);
    
    toast({
      title: "Compra adicionada",
      description: "A compra foi adicionada com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projeto">Projeto</Label>
              <Select value={projetoId} onValueChange={setProjetoId}>
                <SelectTrigger id="projeto">
                  <SelectValue placeholder="Selecione o projeto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Projeto #1</SelectItem>
                  <SelectItem value="2">Projeto #2</SelectItem>
                  <SelectItem value="3">Projeto #3</SelectItem>
                  <SelectItem value="4">Projeto #4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Select value={fornecedorId} onValueChange={setFornecedorId}>
                <SelectTrigger id="fornecedor">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Fornecedor #1</SelectItem>
                  <SelectItem value="2">Fornecedor #2</SelectItem>
                  <SelectItem value="3">Fornecedor #3</SelectItem>
                  <SelectItem value="4">Fornecedor #4</SelectItem>
                  <SelectItem value="5">Fornecedor #5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorTotal">Valor Total</Label>
              <Input
                id="valorTotal"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notaFiscal">Número da Nota Fiscal</Label>
              <Input
                id="notaFiscal"
                placeholder="NF-00000"
                value={numeroNotaFiscal}
                onChange={(e) => setNumeroNotaFiscal(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Compra</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
