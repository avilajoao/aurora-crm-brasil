
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, X, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SolicitacaoCompra, ItemSolicitacao } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface NovaSolicitacaoCompraProps {
  onSolicitacaoCriada: (solicitacao: SolicitacaoCompra) => void;
  onClose?: () => void;
  onSubmit?: (solicitacao: Partial<SolicitacaoCompra>) => void;
  projetos?: { id: string; nome: string; }[];
}

export const NovaSolicitacaoCompra: React.FC<NovaSolicitacaoCompraProps> = ({ onSolicitacaoCriada, onClose, onSubmit, projetos }) => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [projetoId, setProjetoId] = useState('');
  const [itens, setItens] = useState<Partial<ItemSolicitacao>[]>([]);
  const { toast } = useToast();
  const { currentUser, addNotificacao } = useAuth();

  const adicionarItem = () => {
    setItens([...itens, {
      descricao: '',
      quantidade: 1,
      unidadeMedida: 'un',
    }]);
  };

  const removerItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const atualizarItem = (index: number, campo: keyof ItemSolicitacao, valor: any) => {
    const novosItens = [...itens];
    novosItens[index] = { ...novosItens[index], [campo]: valor };
    setItens(novosItens);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe um título para a solicitação.",
        variant: "destructive",
      });
      return;
    }
    
    if (itens.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à solicitação.",
        variant: "destructive",
      });
      return;
    }
    
    // Criar ID único para solicitação
    const solicitacaoId = Date.now().toString();
    
    // Criar solicitação com dados do formulário
    const novaSolicitacao: SolicitacaoCompra = {
      id: solicitacaoId,
      solicitanteId: currentUser?.id || "1",
      titulo,
      justificativa,
      status: "pendente",
      urgente,
      dataSolicitacao: new Date(),
      ...(projetoId && { projetoId }),
      itens: itens.map((item, index) => ({
        id: `${solicitacaoId}-${index}`,
        nome: item.descricao || '',
        quantidade: item.quantidade || 1,
        unidade: item.unidadeMedida || 'un',
        solicitacaoId
      })),
      prioridade: urgente ? 'urgente' : 'media',
      comentarios: []
    };
    
    // Chamar callback para adicionar à lista
    if (onSubmit) {
      onSubmit(novaSolicitacao);
    } else {
      onSolicitacaoCriada(novaSolicitacao);
    }
    
    // Enviar notificação para compradores e supervisores
    addNotificacao({
      titulo: "Nova Solicitação de Compra",
      mensagem: `Nova solicitação de compra "${titulo}" criada ${urgente ? '[URGENTE]' : ''}.`,
      tipo: "info",
      destinatarioIds: ["1", "2", "3"], // IDs dos compradores e supervisores
      lida: false,
      dadosReferencia: {
        tipo: "solicitacao",
        id: solicitacaoId
      }
    });
    
    // Exibir toast de sucesso
    toast({
      title: "Sucesso",
      description: "Solicitação de compra enviada com sucesso.",
      variant: "default",
    });
    
    // Limpar formulário e fechar diálogo
    setTitulo('');
    setJustificativa('');
    setUrgente(false);
    setProjetoId('');
    setItens([]);
    setOpen(false);
    
    // Se houver callback de fechamento, chamar
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Solicitação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Solicitação de Compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título da solicitação"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projeto">Projeto (opcional)</Label>
                <Input
                  id="projeto"
                  value={projetoId}
                  onChange={(e) => setProjetoId(e.target.value)}
                  placeholder="ID ou nome do projeto"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="justificativa">Justificativa</Label>
              <Textarea
                id="justificativa"
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                placeholder="Explique a necessidade desta solicitação"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="urgente"
                checked={urgente}
                onCheckedChange={setUrgente}
              />
              <Label htmlFor="urgente">Solicitação Urgente</Label>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Itens</Label>
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
                      <div className="col-span-6">
                        <Label htmlFor={`item-${index}-descricao`} className="text-xs">Descrição</Label>
                        <Input
                          id={`item-${index}-descricao`}
                          value={item.descricao}
                          onChange={(e) => atualizarItem(index, 'descricao', e.target.value)}
                          placeholder="Descrição do item"
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
                      <div className="col-span-3">
                        <Label htmlFor={`item-${index}-unidade`} className="text-xs">Unidade</Label>
                        <Input
                          id={`item-${index}-unidade`}
                          value={item.unidadeMedida}
                          onChange={(e) => atualizarItem(index, 'unidadeMedida', e.target.value)}
                          placeholder="un, kg, m, etc."
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
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit">Enviar Solicitação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
