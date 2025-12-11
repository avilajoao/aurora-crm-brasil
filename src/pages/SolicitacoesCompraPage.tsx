import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator";
import { Search, PlusCircle, Filter, ArrowUpDown, CheckCircle, XCircle, AlertCircle, MoreHorizontal, FileEdit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusSolicitacaoCompra, SolicitacaoCompra, Notificacao, TipoReferencia, TipoNotificacao } from "@/types";
import { NovaSolicitacaoCompra } from '@/components/solicitacoes/NovaSolicitacaoCompra';
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

// Cores e nomes dos status de solicitações
const statusColors: Record<string, string> = {
  pendente: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  aprovada: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  parcialmente_aprovada: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  rejeitada: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  cancelada: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  enviada: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

const statusNames: Record<string, string> = {
  pendente: "Pendente",
  aprovada: "Aprovada",
  parcialmente_aprovada: "Parcialmente Aprovada",
  rejeitada: "Rejeitada",
  cancelada: "Cancelada",
  enviada: "Enviada",
};

// Dados de exemplo para solicitações de compra
const solicitacoesMock: SolicitacaoCompra[] = [
  {
    id: "1",
    titulo: "Material de escritório",
    descricao: "Suprimentos básicos para o escritório central",
    solicitanteId: "1",
    aprovadorId: "3",
    dataSolicitacao: new Date("2023-06-10"),
    dataAprovacao: new Date("2023-06-12"),
    status: "aprovada",
    prioridade: "media",
    urgente: false,
    itens: [
      { id: "1-1", nome: "Resma de papel A4", quantidade: 20, unidade: "un", valorEstimado: 18.90, aprovado: true, solicitacaoId: "1" },
      { id: "1-2", nome: "Canetas esferográficas", quantidade: 50, unidade: "un", valorEstimado: 1.50, aprovado: true, solicitacaoId: "1" },
      { id: "1-3", nome: "Grampeador", quantidade: 5, unidade: "un", valorEstimado: 22.50, aprovado: true, solicitacaoId: "1" }
    ],
    projetoId: "1",
    comentarios: []
  },
  {
    id: "2",
    titulo: "Equipamentos para novo departamento",
    descricao: "Computadores e periféricos para nova equipe",
    solicitanteId: "2",
    dataSolicitacao: new Date("2023-06-15"),
    status: "pendente",
    prioridade: "alta",
    urgente: false,
    itens: [
      { id: "2-1", nome: "Notebook Dell i7", quantidade: 3, unidade: "un", valorEstimado: 4500.00, solicitacaoId: "2" },
      { id: "2-2", nome: "Monitor LED 24\"", quantidade: 5, unidade: "un", valorEstimado: 950.00, solicitacaoId: "2" },
      { id: "2-3", nome: "Teclado sem fio", quantidade: 5, unidade: "un", valorEstimado: 120.00, solicitacaoId: "2" },
      { id: "2-4", nome: "Mouse sem fio", quantidade: 5, unidade: "un", valorEstimado: 65.00, solicitacaoId: "2" }
    ],
    projetoId: "2",
    comentarios: []
  },
  {
    id: "3",
    titulo: "Materiais de construção",
    descricao: "Materiais para reforma do andar térreo",
    solicitanteId: "3",
    aprovadorId: "1",
    dataSolicitacao: new Date("2023-06-05"),
    dataAprovacao: new Date("2023-06-08"),
    status: "parcialmente_aprovada",
    prioridade: "media",
    urgente: false,
    itens: [
      { id: "3-1", nome: "Cimento CP II", quantidade: 50, unidade: "saco", valorEstimado: 32.90, aprovado: true, solicitacaoId: "3" },
      { id: "3-2", nome: "Areia média", quantidade: 5, unidade: "m³", valorEstimado: 120.00, aprovado: true, solicitacaoId: "3" },
      { id: "3-3", nome: "Tijolo 6 furos", quantidade: 2000, unidade: "un", valorEstimado: 0.75, aprovado: true, solicitacaoId: "3" },
      { id: "3-4", nome: "Piso porcelanato 60x60", quantidade: 100, unidade: "m²", valorEstimado: 89.90, aprovado: false, solicitacaoId: "3" },
      { id: "3-5", nome: "Porta de madeira completa", quantidade: 8, unidade: "un", valorEstimado: 450.00, aprovado: false, solicitacaoId: "3" }
    ],
    observacoes: "Aprovado apenas os itens básicos. Acabamentos serão revisados em orçamento separado.",
    projetoId: "3",
    comentarios: []
  },
  {
    id: "4",
    titulo: "Ferramentas para manutenção",
    descricao: "Ferramentas para equipe de manutenção predial",
    solicitanteId: "4",
    aprovadorId: "1",
    dataSolicitacao: new Date("2023-06-01"),
    dataAprovacao: new Date("2023-06-01"),
    status: "rejeitada",
    prioridade: "baixa",
    urgente: false,
    itens: [
      { id: "4-1", nome: "Furadeira de impacto", quantidade: 2, unidade: "un", valorEstimado: 399.90, aprovado: false, solicitacaoId: "4" },
      { id: "4-2", nome: "Jogo de chaves", quantidade: 3, unidade: "kit", valorEstimado: 189.90, aprovado: false, solicitacaoId: "4" },
      { id: "4-3", nome: "Escada 6 degraus", quantidade: 2, unidade: "un", valorEstimado: 210.00, aprovado: false, solicitacaoId: "4" }
    ],
    observacoes: "Solicitar com melhor detalhamento e justificativa para cada item.",
    projetoId: "4",
    comentarios: []
  },
  {
    id: "5",
    titulo: "Material de limpeza",
    descricao: "Produtos de limpeza para estoque trimestral",
    solicitanteId: "2",
    dataSolicitacao: new Date("2023-06-18"),
    status: "pendente",
    prioridade: "urgente",
    urgente: true,
    itens: [
      { id: "5-1", nome: "Detergente multiuso", quantidade: 50, unidade: "un", valorEstimado: 8.90, solicitacaoId: "5" },
      { id: "5-2", nome: "Álcool 70%", quantidade: 30, unidade: "un", valorEstimado: 9.90, solicitacaoId: "5" },
      { id: "5-3", nome: "Papel toalha", quantidade: 100, unidade: "fardo", valorEstimado: 12.50, solicitacaoId: "5" },
      { id: "5-4", nome: "Desinfetante", quantidade: 40, unidade: "un", valorEstimado: 7.50, solicitacaoId: "5" }
    ],
    projetoId: "5",
    comentarios: []
  }
];

// Lista de projetos
const projetos = [
  { id: "1", nome: "Reforma Escritório Central" },
  { id: "2", nome: "Construção Galpão Industrial" },
  { id: "3", nome: "Instalação Elétrica Predial" },
  { id: "4", nome: "Ampliação Fábrica de Alimentos" },
  { id: "5", nome: "Manutenção Preventiva Maquinário" }
];

export function SolicitacoesCompraPage() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoCompra[]>(solicitacoesMock);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoCompra | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAvaliarDialogOpen, setIsAvaliarDialogOpen] = useState(false);
  const { toast } = useToast();

  // Para edição/criação de solicitação
  const [novaSolicitacao, setNovaSolicitacao] = useState<Partial<SolicitacaoCompra>>({
    titulo: '',
    descricao: '',
    prioridade: 'media',
    projetoId: '',
    itens: []
  });
  
  const filteredSolicitacoes = solicitacoes.filter((solicitacao) => {
    const matchesSearch = searchTerm === "" || 
      solicitacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      projetos.find(p => p.id === solicitacao.projetoId)?.nome.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });
  
  const criarSolicitacao = (solicitacao: Partial<SolicitacaoCompra>) => {
    const novaSolic: SolicitacaoCompra = {
      id: (solicitacoes.length + 1).toString(),
      titulo: solicitacao.titulo || "",
      descricao: solicitacao.descricao,
      solicitanteId: "1", // ID do usuário atual
      dataSolicitacao: new Date(),
      status: "pendente",
      prioridade: solicitacao.prioridade as "baixa" | "media" | "alta" | "urgente",
      itens: solicitacao.itens || [],
      projetoId: solicitacao.projetoId,
      urgente: solicitacao.prioridade === "urgente",
      comentarios: []
    };
    
    setSolicitacoes([...solicitacoes, novaSolic]);
    setIsDialogOpen(false);
    
    // Cria notificação
    const notificacao = {
      titulo: "Nova solicitação de compra",
      mensagem: `Uma nova solicitação "${novaSolic.titulo}" foi criada e aguarda aprovação.`,
      tipo: "info" as TipoNotificacao,
      destinatarioIds: ["1", "3"], // IDs dos aprovadores
      lida: false,
      dadosReferencia: {
        tipo: "solicitacao" as TipoReferencia,
        id: novaSolic.id
      }
    };

    criarNotificacao(notificacao);
    
    toast({
      title: "Solicitação criada",
      description: "Sua solicitação de compra foi enviada para aprovação.",
    });
  };
  
  const atualizarStatusSolicitacao = (id: string, status: StatusSolicitacaoCompra, observacoes?: string) => {
    const solicitacoesAtualizadas = solicitacoes.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          status, 
          aprovadorId: "1", // ID do usuário atual
          dataAprovacao: new Date(),
          observacoes: observacoes || s.observacoes
        };
      }
      return s;
    });
    
    setSolicitacoes(solicitacoesAtualizadas);
    setIsAvaliarDialogOpen(false);
    
    // Status da notificação
    const tipoNotificacao = status === "aprovada" || status === "parcialmente_aprovada" ? "success" as const : "error" as const;
    const mensagem = status === "aprovada" 
      ? "Sua solicitação foi aprovada."
      : status === "parcialmente_aprovada"
      ? "Sua solicitação foi parcialmente aprovada."
      : "Sua solicitação foi rejeitada/cancelada.";
    
    // Cria notificação para informar o solicitante
    const solicitacao = solicitacoes.find(s => s.id === id);
    if (solicitacao) {
      const notificacao = {
        titulo: `Atualização na solicitação #${id}`,
        mensagem,
        tipo: tipoNotificacao,
        destinatarioIds: [solicitacao.solicitanteId],
        lida: false,
        dadosReferencia: {
          tipo: "solicitacao" as TipoReferencia,
          id
        }
      };
      
      criarNotificacao(notificacao);
    }
    
    toast({
      title: "Status atualizado",
      description: `A solicitação #${id} foi ${statusNames[status].toLowerCase()}.`,
      variant: status === "rejeitada" || status === "cancelada" ? "destructive" : "default",
    });
  };
  
  const criarNotificacao = (notificacao: Omit<Notificacao, "id" | "dataCriacao">) => {
    console.log("Notificação criada:", notificacao);
    // Aqui entraria a lógica para salvar a notificação
  };

  const getStatusIcon = (status: StatusSolicitacaoCompra) => {
    switch (status) {
      case 'aprovada':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejeitada':
      case 'cancelada':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'parcialmente_aprovada':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };
  
  const formatarData = (data: Date) => {
    return format(data, "dd/MM/yyyy", { locale: ptBR });
  };
  
  const formatarValor = (valor?: number) => {
    if (valor === undefined) return "N/A";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  const calcularTotalSolicitacao = (itens: any[]) => {
    return itens.reduce((total, item) => {
      return total + (item.valorEstimado || 0) * item.quantidade;
    }, 0);
  };
  
  const calcularTotalAprovado = (itens: any[]) => {
    return itens.reduce((total, item) => {
      if (item.aprovado) {
        return total + (item.valorEstimado || 0) * item.quantidade;
      }
      return total;
    }, 0);
  };
  
  const getNomeProjeto = (projetoId?: string) => {
    if (!projetoId) return "Não informado";
    const projeto = projetos.find(p => p.id === projetoId);
    return projeto ? projeto.nome : `Projeto #${projetoId}`;
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Solicitações de Compra</h1>
            <p className="text-muted-foreground">Gerencie e acompanhe solicitações de compras</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Solicitação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Nova Solicitação de Compra</DialogTitle>
                <DialogDescription>
                  Preencha os dados da solicitação de compra
                </DialogDescription>
              </DialogHeader>
              <NovaSolicitacaoCompra
                onSolicitacaoCriada={criarSolicitacao}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={criarSolicitacao}
                projetos={projetos}
              />
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
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
            <Button variant="outline" className="flex gap-2">
              <ArrowUpDown className="h-4 w-4" /> Ordenar
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Projeto</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead className="hidden sm:table-cell">Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor Estimado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolicitacoes.map((solicitacao) => (
                <TableRow key={solicitacao.id}>
                  <TableCell className="font-medium">{solicitacao.id}</TableCell>
                  <TableCell>{solicitacao.titulo}</TableCell>
                  <TableCell className="hidden md:table-cell">{getNomeProjeto(solicitacao.projetoId)}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatarData(solicitacao.dataSolicitacao)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={solicitacao.prioridade === "urgente" ? "destructive" : "outline"}>
                      {solicitacao.prioridade.charAt(0).toUpperCase() + solicitacao.prioridade.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(solicitacao.status)}
                      <Badge className={cn(statusColors[solicitacao.status])}>
                        {statusNames[solicitacao.status]}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatarValor(calcularTotalSolicitacao(solicitacao.itens))}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setSelectedSolicitacao(solicitacao);
                          setIsAvaliarDialogOpen(true);
                        }}>
                          <FileEdit className="h-4 w-4 mr-2" />
                          Avaliar Solicitação
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Detalhes das Solicitações</h2>
          <Accordion type="single" collapsible className="w-full">
            {filteredSolicitacoes.map((solicitacao) => (
              <AccordionItem key={solicitacao.id} value={`item-${solicitacao.id}`}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <span>Solicitação #{solicitacao.id}</span>
                    <Badge className={cn("ml-2", statusColors[solicitacao.status])}>
                      {statusNames[solicitacao.status]}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold">{solicitacao.titulo}</h4>
                      <p className="text-sm text-muted-foreground">{solicitacao.descricao}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Projeto: </span>
                        <span>{getNomeProjeto(solicitacao.projetoId)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Data da Solicitação: </span>
                        <span>{formatarData(solicitacao.dataSolicitacao)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Solicitante: </span>
                        <span>Usuário #{solicitacao.solicitanteId}</span>
                      </div>
                      <div>
                        <span className="font-medium">Aprovador: </span>
                        <span>{solicitacao.aprovadorId ? `Usuário #${solicitacao.aprovadorId}` : "Pendente"}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Itens Solicitados</h5>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Qtd</TableHead>
                              <TableHead>Valor Unit.</TableHead>
                              <TableHead>Subtotal</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {solicitacao.itens.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{item.nome}</div>
                                    {item.especificacoes && (
                                      <div className="text-xs text-muted-foreground">{item.especificacoes}</div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>{item.quantidade} {item.unidade}</TableCell>
                                <TableCell>{formatarValor(item.valorEstimado)}</TableCell>
                                <TableCell>
                                  {formatarValor(item.valorEstimado ? item.valorEstimado * item.quantidade : undefined)}
                                </TableCell>
                                <TableCell>
                                  {solicitacao.status === "aprovada" || item.aprovado === true ? (
                                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Aprovado</Badge>
                                  ) : solicitacao.status === "parcialmente_aprovada" && item.aprovado === false ? (
                                    <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">Rejeitado</Badge>
                                  ) : (
                                    <Badge variant="outline">Pendente</Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Valor Total Estimado: </span>
                        <span className="font-semibold">{formatarValor(calcularTotalSolicitacao(solicitacao.itens))}</span>
                        
                        {solicitacao.status === "parcialmente_aprovada" && (
                          <div className="mt-1">
                            <span className="text-sm text-muted-foreground">Valor Aprovado: </span>
                            <span className="font-semibold">{formatarValor(calcularTotalAprovado(solicitacao.itens))}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {solicitacao.status === "pendente" && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => {
                                setSelectedSolicitacao(solicitacao);
                                setIsAvaliarDialogOpen(true);
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Avaliar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {solicitacao.observacoes && (
                      <div className="pt-2 border-t">
                        <h5 className="font-medium">Observações:</h5>
                        <p className="text-sm mt-1">{solicitacao.observacoes}</p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Dialog open={isAvaliarDialogOpen} onOpenChange={setIsAvaliarDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Avaliar Solicitação #{selectedSolicitacao?.id}</DialogTitle>
              <DialogDescription>
                Analise os itens solicitados e aprove ou rejeite a solicitação.
              </DialogDescription>
            </DialogHeader>
            
            {selectedSolicitacao && (
              <div className="space-y-4 py-2">
                <div>
                  <h4 className="font-semibold">{selectedSolicitacao.titulo}</h4>
                  <p className="text-sm text-muted-foreground">{selectedSolicitacao.descricao}</p>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Alterar Status</h5>
                  <Select
                    defaultValue="pendente"
                    onValueChange={(value) => {
                      // Lógica de mudança de status
                      const novoStatus = value as StatusSolicitacaoCompra;
                      if (selectedSolicitacao && novoStatus !== selectedSolicitacao.status) {
                        atualizarStatusSolicitacao(selectedSolicitacao.id, novoStatus, selectedSolicitacao.observacoes);
                      } else {
                        setIsAvaliarDialogOpen(false);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o novo status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aprovada">Aprovar tudo</SelectItem>
                      <SelectItem value="parcialmente_aprovada">Aprovar parcialmente</SelectItem>
                      <SelectItem value="rejeitada">Rejeitar</SelectItem>
                      <SelectItem value="cancelada">Cancelar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="observacoes" className="block text-sm font-medium mb-1">Observações:</label>
                  <Textarea 
                    id="observacoes"
                    placeholder="Adicione observações sobre esta avaliação..."
                    value={selectedSolicitacao.observacoes || ""} 
                    onChange={(e) => {
                      setSelectedSolicitacao({
                        ...selectedSolicitacao,
                        observacoes: e.target.value
                      });
                    }}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAvaliarDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </AppLayout>
  );
}
