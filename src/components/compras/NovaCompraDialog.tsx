
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
import { Compra, StatusCompra, ItemCompra } from '@/types';
import { PlusCircle, X } from 'lucide-react';

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
  const [itens, setItens] = useState<Partial<ItemCompra>[]>([]);
  const { toast } = useToast();

  const adicionarItem = () => {
    setItens([...itens, {
      nome: '',
      quantidade: 1,
      valorUnitario: 0,
      unidade: 'un',
    }]);
  };

  const removerItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const atualizarItem = (index: number, campo: keyof ItemCompra, valor: any) => {
    const novosItens = [...itens];
    novosItens[index] = { ...novosItens[index], [campo]: valor };
    
    // Recalcular o valor total com base nos itens
    if (campo === 'valorUnitario' || campo === 'quantidade') {
      const novoValorTotal = novosItens.reduce((total, item) => {
        return total + ((item.valorUnitario || 0) * (item.quantidade || 0));
      }, 0);
      
      setValorTotal(novoValorTotal.toFixed(2));
    }
    
    setItens(novosItens);
  };

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
      itens: itens.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        nome: item.nome || `Item ${index + 1}`,
        quantidade: item.quantidade || 1,
        valorUnitario: item.valorUnitario || 0,
        unidade: item.unidade || 'un',
      }))
    };
    
    onCompraAdicionada(novaCompra);
    
    // Resetar formulário
    setValorTotal("");
    setProjetoId("");
    setFornecedorId("");
    setNumeroNotaFiscal("");
    setItens([]);
    
    // Fechar diálogo
    onOpenChange(false);
    
    toast({
      title: "Compra adicionada",
      description: "A compra foi adicionada com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
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
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Itens da Compra</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={adicionarItem}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Adicionar Item
              </Button>
            </div>
            
            {itens.length > 0 ? (
              <div className="space-y-3">
                {itens.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md">
                    <div className="col-span-4">
                      <Label htmlFor={`item-${index}-nome`} className="text-xs">Nome</Label>
                      <Input
                        id={`item-${index}-nome`}
                        value={item.nome}
                        onChange={(e) => atualizarItem(index, 'nome', e.target.value)}
                        placeholder="Nome do item"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`item-${index}-quantidade`} className="text-xs">Qtd.</Label>
                      <Input
                        id={`item-${index}-quantidade`}
                        type="number"
                        min="1"
                        value={item.quantidade}
                        onChange={(e) => atualizarItem(index, 'quantidade', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`item-${index}-unidade`} className="text-xs">Unidade</Label>
                      <Input
                        id={`item-${index}-unidade`}
                        value={item.unidade}
                        onChange={(e) => atualizarItem(index, 'unidade', e.target.value)}
                        placeholder="un, kg"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`item-${index}-valor`} className="text-xs">Valor Unit.</Label>
                      <Input
                        id={`item-${index}-valor`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.valorUnitario}
                        onChange={(e) => atualizarItem(index, 'valorUnitario', Number(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removerItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed rounded-md p-6 text-center text-muted-foreground">
                Nenhum item adicionado. Clique em "Adicionar Item".
              </div>
            )}
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
