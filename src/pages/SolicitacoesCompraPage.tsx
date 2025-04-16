import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  FileText,
  Calendar,
  User
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Comentario, SolicitacaoCompra, StatusSolicitacaoCompra } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { PermissionGuard, PermissionButton } from '@/components/auth/PermissionGuard';

interface ItemSolicitacao {
  id: string;
  descricao: string;
  quantidade: number;
  unidadeMedida: string;
  valorEstimado?: number;
}

const statusColors: Record<string, string> = {
  rascunho: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
  enviada: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  em_analise: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  aprovada: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  parcialmente_aprovada: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  rejeitada: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  cancelada: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const statusNames: Record<string, string> = {
  rascunho: "Rascunho",
  enviada: "Enviada",
  em_analise: "Em Análise",
  aprovada: "Aprovada",
  parcialmente_aprovada: "Parcialmente Aprovada",
  rejeitada: "Rejeitada",
  cancelada: "Cancelada",
};

const projetos = [
  {id: "1", nome: "Reforma Escritório Central"},
  {id: "2", nome: "Construção Galpão Industrial"},
  {id: "3", nome: "Instalação Elétrica Predial"},
  {id: "4", nome: "Ampliação Fábrica de Alimentos"},
  {id: "5", nome: "Manutenção Preventiva Maquinário"}
];

const usuarios = [
  {id: "1", nome: "Ana Silva", cargo: "Gestor"},
  {id: "2", nome: "Carlos Mendes", cargo: "Supervisor"},
  {id: "3", nome: "Mariana Costa", cargo: "Supervisor"},
  {id: "4", nome: "Ricardo Oliveira", cargo: "Gestor"},
  {id: "5", nome: "Paulo Santos", cargo: "Operador"}
];

const solicitacoesExemplo: SolicitacaoCompra[] = [
  // ... (same data as before)
];

export function SolicitacoesCompraPage() {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoCompra[]>(solicitacoesExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [currentSolicitacao, setCurrentSolicitacao] = useState<SolicitacaoCompra | null>(null);
  const [statusFilter, setStatusFilter] = useState("todos");

  const [novaSolicitacao, setNovaSolicitacao] = useState<Partial<SolicitacaoCompra>>({
    titulo: '',
    projetoId: '',
    solicitanteId: '3',
    justificativa: '',
    status: 'rascunho' as StatusSolicitacaoCompra,
    urgente: false,
    itens: [],
    comentarios: []
  });

  const [novoItem, setNovoItem] = useState<Partial<ItemSolicitacao>>({
    descricao: '',
    quantidade: 1,
    unidadeMedida: 'unidade',
    valorEstimado: 0
  });

  const [itensSolicitacao, setItensSolicitacao] = useState<ItemSolicitacao[]>([]);

  const handleNovaSolicitacaoChange = (campo: keyof SolicitacaoCompra, valor: any) => {
    setNovaSolicitacao({
      ...novaSolicitacao,
      [campo]: valor
    });
  };

  const handleNovoItemChange = (campo: keyof ItemSolicitacao, valor: any) => {
    setNovoItem({
      ...novoItem,
      [campo]: valor
    });
  };

  const adicionarItem = () => {
    if (!novoItem.descricao || !novoItem.quantidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a descrição e quantidade do item.",
        variant: "destructive",
      });
      return;
    }

    const item: ItemSolicitacao = {
      id: `temp-${itensSolicitacao.length + 1}`,
      descricao: novoItem.descricao || '',
      quantidade: novoItem.quantidade || 0,
      unidadeMedida: novoItem.unidadeMedida || 'unidade',
      valorEstimado: novoItem.valorEstimado
    };

    setItensSolicitacao([...itensSolicitacao, item]);
    setNovoItem({
      descricao: '',
      quantidade: 1,
      unidadeMedida: 'unidade',
      valorEstimado: 0
    });
  };

  const removerItem = (id: string) => {
    setItensSolicitacao(itensSolicitacao.filter(item => item.id !== id));
  };

  const adicionarSolicitacao = () => {
    if (!novaSolicitacao.titulo || !novaSolicitacao.projetoId || itensSolicitacao.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios e adicione pelo menos um item.",
        variant: "destructive",
      });
      return;
    }

    const novaSolicitacaoCompleta: SolicitacaoCompra = {
      id: (solicitacoes.length + 1).toString(),
      projetoId: novaSolicitacao.projetoId || '',
      solicitanteId: novaSolicitacao.solicitanteId || '3',
      titulo: novaSolicitacao.titulo || '',
      justificativa: novaSolicitacao.justificativa || '',
      status: novaSolicitacao.status as StatusSolicitacaoCompra || 'rascunho',
      urgente: novaSolicitacao.urgente || false,
      dataSolicitacao: new Date(),
      itens: itensSolicitacao.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
        solicitacaoId: (solicitacoes.length + 1).toString()
      })),
      comentarios: []
    };

    setSolicitacoes([novaSolicitacaoCompleta, ...solicitacoes]);
    setNovaSolicitacao({
      titulo: '',
      projetoId: '',
      justificativa: '',
      status: 'rascunho' as StatusSolicitacaoCompra,
      urgente: false,
      itens: [],
      comentarios: []
    });
    setItensSolicitacao([]);
    setIsDialogOpen(false);
    toast({
      title: "Solicitação criada",
      description: "A solicitação de compra foi criada com sucesso.",
    });
  };

  const enviarSolicitacao = () => {
    if (!novaSolicitacao.titulo || !novaSolicitacao.projetoId || itensSolicitacao.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios e adicione pelo menos um item.",
        variant: "destructive",
      });
      return;
    }

    const novaSolicitacaoCompleta: SolicitacaoCompra = {
      id: (solicitacoes.length + 1).toString(),
      projetoId: novaSolicitacao.projetoId || '',
      solicitanteId: novaSolicitacao.solicitanteId || '3',
      titulo: novaSolicitacao.titulo || '',
      justificativa: novaSolicitacao.justificativa || '',
      status: 'enviada' as StatusSolicitacaoCompra,
      urgente: novaSolicitacao.urgente || false,
      dataSolicitacao: new Date(),
      itens: itensSolicitacao.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
        solicitacaoId: (solicitacoes.length + 1).toString()
      })),
      comentarios: []
    };

    setSolicitacoes([novaSolicitacaoCompleta, ...solicitacoes]);
    setNovaSolicitacao({
      titulo: '',
      projetoId: '',
      justificativa: '',
      status: 'rascunho' as StatusSolicitacaoCompra,
      urgente: false,
      itens: [],
      comentarios: []
    });
    setItensSolicitacao([]);
    setIsDialogOpen(false);
    toast({
      title: "Solicitação enviada",
      description: "A solicitação de compra foi enviada para aprovação.",
      variant: "default",
    });
  };

  const aprovarSolicitacao = (id: string, aprovacaoCompleta: boolean) => {
    const solicitacaoAtualizada = solicitacoes.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: aprovacaoCompleta ? 'aprovada' : 'parcialmente_aprovada' as StatusSolicitacaoCompra,
          responsavelAprovacaoId: '1',
          dataAprovacao: new Date(),
          itens: s.itens.map(item => ({
            ...item,
            aprovado: aprovacaoCompleta ? true : item.aprovado,
            quantidadeAprovada: aprovacaoCompleta ? item.quantidade : item.quantidadeAprovada
          }))
        };
      }
      return s;
    });
    
    setSolicitacoes(solicitacaoAtualizada);
    setIsApproveDialogOpen(false);
    toast({
      title: aprovacaoCompleta ? "Solicitação aprovada" : "Solicitação parcialmente aprovada",
      description: "A decisão foi registrada com sucesso.",
      variant: "default",
    });
  };

  const rejeitarSolicitacao = (id: string, motivo: string) => {
    const solicitacaoAtualizada = solicitacoes.map(s => {
      if (s.id === id) {
        const novoComentario: Comentario = {
          id: `comentario-${Date.now()}`,
          referenciaId: id,
          tipoReferencia: 'compra',
          autorId: '1',
          texto: motivo,
          dataCriacao: new Date(),
          anexos: []
        };
        
        return {
          ...s,
          status: 'rejeitada' as StatusSolicitacaoCompra,
          responsavelAprovacaoId: '1',
          dataAprovacao: new Date(),
          comentarios: [...s.comentarios, novoComentario]
        };
      }
      return s;
    });
    
    setSolicitacoes(solicitacaoAtualizada);
    setIsApproveDialogOpen(false);
    toast({
      title: "Solicitação rejeitada",
      description: "A solicitação foi rejeitada com sucesso.",
      variant: "destructive",
    });
  };

  const cancelarSolicitacao = (id: string) => {
    const solicitacaoAtualizada = solicitacoes.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'cancelada' as StatusSolicitacaoCompra,
        };
      }
      return s;
    });
    
    setSolicitacoes(solicitacaoAtualizada);
    toast({
      title: "Solicitação cancelada",
      description: "A solicitação foi cancelada com sucesso.",
      variant: "destructive",
    });
  };

  const filteredSolicitacoes = solicitacoes.filter((solicitacao) => {
    const matchesSearch = solicitacao.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || solicitacao.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getNomeProjeto = (projetoId: string) => {
    const projeto = projetos.find(p => p.id === projetoId);
    return projeto ? projeto.nome : `Projeto #${projetoId}`;
  };

  const getNomeUsuario = (userId: string) => {
    const usuario = usuarios.find(u => u.id === userId);
    return usuario ? usuario.nome : `Usuário #${userId}`;
  };

  const calcularValorTotal = (itens: any[]) => {
    return itens.reduce((total, item) => {
      return total + ((item.valorEstimado || 0) * item.quantidade);
    }, 0);
  };

  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [tabAtiva, setTabAtiva] = useState("itens");

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Solicitações de Compra</h1>
            <p className="text-muted-foreground">Solicite e acompanhe aprovações de compras</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <PermissionButton
                requiredPermission="view_purchase_requests"
                component={
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nova Solicitação
                  </Button>
                }
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Nova Solicitação de Compra</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da solicitação de compra e adicione os itens necessários.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título*</Label>
                    <Input
                      id="titulo"
                      value={novaSolicitacao.titulo}
                      onChange={(e) => handleNovaSolicitacaoChange('titulo', e.target.value)}
                      placeholder="Ex: Materiais para obra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projeto">Projeto*</Label>
                    <Select
                      value={novaSolicitacao.projetoId}
                      onValueChange={(value) => handleNovaSolicitacaoChange('projetoId', value)}
                    >
                      <SelectTrigger id="projeto">
                        <SelectValue placeholder="Selecione o projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        {projetos.map(projeto => (
                          <SelectItem key={projeto.id} value={projeto.id}>{projeto.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justificativa">Justificativa</Label>
                  <Textarea
                    id="justificativa"
                    value={novaSolicitacao.justificativa}
                    onChange={(e) => handleNovaSolicitacaoChange('justificativa', e.target.value)}
                    placeholder="Descreva o motivo desta solicitação"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="urgente"
                    checked={novaSolicitacao.urgente}
                    onCheckedChange={(checked) => handleNovaSolicitacaoChange('urgente', checked)}
                  />
                  <Label htmlFor="urgente" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Marcar como urgente
                  </Label>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Itens</h3>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-descricao">Descrição*</Label>
                        <Input
                          id="item-descricao"
                          value={novoItem.descricao}
                          onChange={(e) => handleNovoItemChange('descricao', e.target.value)}
                          placeholder="Ex: Cimento CP-II 50kg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="item-quantidade">Quantidade*</Label>
                          <Input
                            id="item-quantidade"
                            type="number"
                            value={novoItem.quantidade}
                            onChange={(e) => handleNovoItemChange('quantidade', parseInt(e.target.value) || 0)}
                            min={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item-unidade">Unidade</Label>
                          <Select
                            value={novoItem.unidadeMedida}
                            onValueChange={(value) => handleNovoItemChange('unidadeMedida', value)}
                          >
                            <SelectTrigger id="item-unidade">
                              <SelectValue placeholder="Unidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unidade">Unidade</SelectItem>
                              <SelectItem value="caixa">Caixa</SelectItem>
                              <SelectItem value="pacote">Pacote</SelectItem>
                              <SelectItem value="rolo">Rolo</SelectItem>
                              <SelectItem value="metro">Metro</SelectItem>
                              <SelectItem value="m²">Metro Quadrado</SelectItem>
                              <SelectItem value="m³">Metro Cúbico</SelectItem>
                              <SelectItem value="kg">Quilograma</SelectItem>
                              <SelectItem value="litro">Litro</SelectItem>
                              <SelectItem value="saco">Saco</SelectItem>
                              <SelectItem value="par">Par</SelectItem>
                              <SelectItem value="conjunto">Conjunto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-valor">Valor Unitário Estimado (R$)</Label>
                        <Input
                          id="item-valor"
                          type="number"
                          step="0.01"
                          value={novoItem.valorEstimado || ''}
                          onChange={(e) => handleNovoItemChange('valorEstimado', parseFloat(e.target.value) || 0)}
                          placeholder="0,00"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={adicionarItem} className="w-full md:w-auto mt-2 md:mt-0">
                          Adicionar Item
                        </Button>
                      </div>
                    </div>
                  </div>

                  {itensSolicitacao.length > 0 ? (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead className="text-right">Valor Unit.</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itensSolicitacao.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.descricao}</TableCell>
                              <TableCell className="text-right">{item.quantidade}</TableCell>
                              <TableCell>{item.unidadeMedida}</TableCell>
                              <TableCell className="text-right">
                                {item.valorEstimado ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado) : '-'}
                              </TableCell>
                              <TableCell className="text-right">
                                {item.valorEstimado ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado * item.quantidade) : '-'}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => removerItem(item.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 border border-dashed rounded-md text-muted-foreground">
                      <FileText className="h-10 w-10 mb-2" />
                      <p>Nenhum item adicionado</p>
                      <p className="text-sm">Adicione itens para completar a solicitação</p>
                    </div>
                  )}

                  {itensSolicitacao.length > 0 && (
                    <div className="flex justify-between items-center mt-4 font-semibold">
                      <span>Valor Total Estimado:</span>
                      <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                        calcularValorTotal(itensSolicitacao)
                      )}</span>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setItensSolicitacao([]);
                }}>Cancelar</Button>
                <Button variant="secondary" onClick={adicionarSolicitacao}>Salvar Rascunho</Button>
                <Button onClick={enviarSolicitacao}>Enviar para Aprovação</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar solicitações..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
                <SelectItem value="enviada">Enviada</SelectItem>
                <SelectItem value="em_analise">Em análise</SelectItem>
                <SelectItem value="aprovada">Aprovada</SelectItem>
                <SelectItem value="parcialmente_aprovada">Parcialmente aprovada</SelectItem>
                <SelectItem value="rejeitada">Rejeitada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Mais Filtros
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Urgente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolicitacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium">Nenhuma solicitação encontrada</h3>
                      <p className="text-muted-foreground text-sm">
                        Não há solicitações que correspondam aos critérios de busca.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSolicitacoes.map((solicitacao) => (
                  <TableRow key={solicitacao.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{solicitacao.id}</TableCell>
                    <TableCell>{solicitacao.titulo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatarData(solicitacao.dataSolicitacao)}
                      </div>
                    </TableCell>
                    <TableCell>{getNomeProjeto(solicitacao.projetoId || '')}</TableCell>
                    <TableCell>
                      {solicitacao.urgente && (
                        <div className="flex items-center text-amber-600">
                          <AlertTriangle className="h-4 w-4 mr-1" /> Urgente
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", statusColors[solicitacao.status])}>
                        {statusNames[solicitacao.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentSolicitacao(solicitacao);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {(solicitacao.status === 'enviada' || solicitacao.status === 'em_analise') && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentSolicitacao(solicitacao);
                              setIsApproveDialogOpen(true);
                              setTabAtiva("itens");
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </Button>
                        )}
                        {(solicitacao.status === 'rascunho' || solicitacao.status === 'enviada') && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => cancelarSolicitacao(solicitacao.id)}
                          >
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
            <DialogDescription>
              Informações da solicitação de compra #{currentSolicitacao?.id}
            </DialogDescription>
          </DialogHeader>

          {currentSolicitacao && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">{currentSolicitacao.titulo}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={cn("font-normal", statusColors[currentSolicitacao.status])}>
                        {statusNames[currentSolicitacao.status]}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projeto:</span>
                      <span>{getNomeProjeto(currentSolicitacao.projetoId || '')}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data da Solicitação:</span>
                      <span>{formatarData(currentSolicitacao.dataSolicitacao)}</span>
                    </div>
                    
                    {currentSolicitacao.dataAprovacao && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data da Aprovação:</span>
                        <span>{formatarData(currentSolicitacao.dataAprovacao)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Solicitante:</span>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{getNomeUsuario(currentSolicitacao.solicitanteId)}</span>
                      </div>
                    </div>
                    
                    {currentSolicitacao.responsavelAprovacaoId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Aprovador:</span>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{getNomeUsuario(currentSolicitacao.responsavelAprovacaoId)}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Urgente:</span>
                      <span>{currentSolicitacao.urgente ? 'Sim' : 'Não'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
                  <h4 className="text-sm font-medium mb-2">Justificativa</h4>
                  <p className="text-muted-foreground">
                    {currentSolicitacao.justificativa || "Sem justificativa fornecida"}
                  </p>
                  
                  {currentSolicitacao.comentarios && currentSolicitacao.comentarios.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Comentários</h4>
                      <div className="space-y-2">
                        {currentSolicitacao.comentarios.map((comentario) => (
                          <div key={comentario.id} className="bg-muted p-2 rounded-md">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium">{getNomeUsuario(comentario.autorId)}</span>
                              <span className="text-muted-foreground">{formatarData(comentario.dataCriacao)}</span>
                            </div>
                            <p className="mt-1">{comentario.texto}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Itens</h4>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        {(currentSolicitacao.status === 'aprovada' || currentSolicitacao.status === 'parcialmente_aprovada') && (
                          <TableHead className="text-right">Aprovado</TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentSolicitacao.itens.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell>{item.unidadeMedida}</TableCell>
                          <TableCell className="text-right">
                            {item.valorEstimado ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado) : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.valorEstimado ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado * item.quantidade) : '-'}
                          </TableCell>
                          {(currentSolicitacao.status === 'aprovada' || currentSolicitacao.status === 'parcialmente_aprovada') && (
                            <TableCell className="text-right">
                              {item.aprovado ? (
                                <div className="flex items-center justify-end gap-1">
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  {item.quantidadeAprovada < item.quantidade && (
                                    <span>{item.quantidadeAprovada} un.</span>
                                  )}
                                </div>
                              ) : (
                                <XCircle className="h-4 w-4 text-destructive ml-auto" />
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between items-center mt-4 font-semibold">
                  <span>Valor Total Estimado:</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    calcularValorTotal(currentSolicitacao.itens)
                  )}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Aprovar Solicitação</DialogTitle>
            <DialogDescription>
              Revise os itens da solicitação #{currentSolicitacao?.id} e decida sobre a aprovação.
            </DialogDescription>
          </DialogHeader>

          {currentSolicitacao && (
            <div className="space-y-4 py-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{currentSolicitacao.titulo}</CardTitle>
                  <CardDescription>
                    Solicitado por {getNomeUsuario(currentSolicitacao.solicitanteId)} em {formatarData(currentSolicitacao.dataSolicitacao)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Projeto</p>
                      <p className="font-medium">{getNomeProjeto(currentSolicitacao.projetoId || '')}</p>
                    </div>
                    {currentSolicitacao.urgente && (
                      <div>
                        <p className="text-sm text-muted-foreground">Prioridade</p>
                        <div className="flex items-center text-amber-600">
                          <AlertTriangle className="h-4 w-4 mr-1" /> Urgente
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Total Estimado</p>
                      <p className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                        calcularValorTotal(currentSolicitacao.itens)
                      )}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Justificativa</p>
                    <p>{currentSolicitacao.justificativa || "Sem justificativa fornecida"}</p>
                  </div>
                </CardContent>
              </Card>

              <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="itens">Itens da Solicitação</TabsTrigger>
                  <TabsTrigger value="decisao">Decisão</TabsTrigger>
                </TabsList>
                <TabsContent value="itens" className="space-y-4 py-4">
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Quantidade</TableHead>
                          <TableHead>Unidade</TableHead>
                          <TableHead className="text-right">Valor Unit.</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentSolicitacao.itens.map((item: any) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell className="text-right">{item.quantidade}</TableCell>
                            <TableCell>{item.unidadeMedida}</TableCell>
                            <TableCell className="text-right">
                              {item.valorEstimado ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado) : '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.valorEstimado ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado * item.quantidade) : '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <Button onClick={() => setTabAtiva("decisao")} className="w-full">
                    Continuar para Decisão
                  </Button>
                </TabsContent>
                
                <TabsContent value="decisao" className="space-y-4 py-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <Card className="hover:bg-green-50 cursor-pointer transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-green-600">
                            <CheckCircle2 className="mr-2 h-5 w-5" /> Aprovar Totalmente
                          </CardTitle>
                          <CardDescription>
                            Todos os itens serão aprovados com as quantidades solicitadas
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            onClick={() => aprovarSolicitacao(currentSolicitacao.id, true)}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            Aprovar Todos os Itens
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:bg-red-50 cursor-pointer transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-red-600">
                            <XCircle className="mr-2 h-5 w-5" /> Rejeitar
                          </CardTitle>
                          <CardDescription>
                            A solicitação será rejeitada e retornará ao solicitante
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Textarea 
                            placeholder="Informe o motivo da rejeição..."
                            value={motivoRejeicao}
                            onChange={(e) => setMotivoRejeicao(e.target.value)}
                          />
                          <Button 
                            onClick={() => rejeitarSolicitacao(currentSolicitacao.id, motivoRejeicao)}
                            variant="destructive"
                            className="w-full"
                            disabled={!motivoRejeicao}
                          >
                            Rejeitar Solicitação
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex justify-center py-2">
                      <span className="text-sm text-muted-foreground">ou</span>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-amber-600">
                          <AlertTriangle className="mr-2 h-5 w-5" /> Aprovar Parcialmente
                        </CardTitle>
                        <CardDescription>
                          Você pode aprovar apenas alguns itens ou alterar quantidades
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2 text-sm text-muted-foreground">
                          Para aprovação parcial, entre em contato com o desenvolvedor do sistema para implementar esta funcionalidade avançada.
                        </p>
                        <Button 
                          onClick={() => aprovarSolicitacao(currentSolicitacao.id, false)}
                          className="w-full bg-amber-600 hover:bg-amber-700"
                        >
                          Simular Aprovação Parcial
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AppLayout>
  );
}
