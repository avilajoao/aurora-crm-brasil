
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, Eye, CheckCircle, XCircle } from 'lucide-react';
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
import { StatusSolicitacaoCompra, SolicitacaoCompra, Comentario } from "@/types";
import { NovaSolicitacaoCompra } from "@/components/solicitacoes/NovaSolicitacaoCompra";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { PermissionGuard, PermissionButton } from "@/components/auth/PermissionGuard";

const statusColors: Record<string, string> = {
  rascunho: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
  enviada: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  em_analise: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  aprovada: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  parcialmente_aprovada: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
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

// Dados de exemplo
const solicitacoesExemplo: SolicitacaoCompra[] = [
  {
    id: "1",
    projetoId: "1",
    solicitanteId: "2",
    titulo: "Materiais para fundação",
    justificativa: "Necessário para iniciar a fundação do projeto",
    status: "aprovada" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-05-15"),
    dataAprovacao: new Date("2023-05-17"),
    responsavelAprovacaoId: "1",
    itens: [
      {
        id: "1-1",
        solicitacaoId: "1",
        descricao: "Cimento CP-II",
        quantidade: 50,
        unidadeMedida: "saco",
        valorEstimado: 32.5,
        aprovado: true,
        quantidadeAprovada: 50,
      },
      {
        id: "1-2",
        solicitacaoId: "1",
        descricao: "Areia média",
        quantidade: 10,
        unidadeMedida: "m³",
        valorEstimado: 90,
        aprovado: true,
        quantidadeAprovada: 10,
      }
    ],
    comentarios: []
  },
  {
    id: "2",
    projetoId: "2",
    solicitanteId: "3",
    titulo: "Equipamentos de segurança",
    justificativa: "Para equipe que irá trabalhar na altura",
    status: "em_analise" as StatusSolicitacaoCompra,
    urgente: true,
    dataSolicitacao: new Date("2023-06-02"),
    itens: [
      {
        id: "2-1",
        solicitacaoId: "2",
        descricao: "Capacete de segurança",
        quantidade: 15,
        unidadeMedida: "un",
        valorEstimado: 45,
      },
      {
        id: "2-2",
        solicitacaoId: "2",
        descricao: "Cinto de segurança para trabalho em altura",
        quantidade: 8,
        unidadeMedida: "un",
        valorEstimado: 220,
      }
    ],
    comentarios: []
  },
  {
    id: "3",
    projetoId: "1",
    solicitanteId: "4",
    titulo: "Ferramentas elétricas",
    justificativa: "Necessárias para a fase de acabamento",
    status: "parcialmente_aprovada" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-05-28"),
    dataAprovacao: new Date("2023-05-30"),
    responsavelAprovacaoId: "1",
    itens: [
      {
        id: "3-1",
        solicitacaoId: "3",
        descricao: "Serra circular",
        quantidade: 3,
        unidadeMedida: "un",
        valorEstimado: 450,
        aprovado: true,
        quantidadeAprovada: 2,
        observacoes: "Quantidade reduzida para otimizar custos"
      },
      {
        id: "3-2",
        solicitacaoId: "3",
        descricao: "Furadeira de impacto",
        quantidade: 4,
        unidadeMedida: "un",
        valorEstimado: 350,
        aprovado: true,
        quantidadeAprovada: 3,
        observacoes: "Quantidade reduzida para otimizar custos"
      }
    ],
    comentarios: []
  },
  {
    id: "4",
    solicitanteId: "2",
    titulo: "Material de escritório",
    justificativa: "Reposição do estoque",
    status: "enviada" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-06-05"),
    itens: [
      {
        id: "4-1",
        solicitacaoId: "4",
        descricao: "Papel A4",
        quantidade: 20,
        unidadeMedida: "resma",
        valorEstimado: 22,
      },
      {
        id: "4-2",
        solicitacaoId: "4",
        descricao: "Caneta esferográfica azul",
        quantidade: 50,
        unidadeMedida: "un",
        valorEstimado: 1.5,
      }
    ],
    comentarios: []
  },
  {
    id: "5",
    projetoId: "3",
    solicitanteId: "5",
    titulo: "Material elétrico",
    justificativa: "Para instalação elétrica do projeto",
    status: "rejeitada" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-05-20"),
    dataAprovacao: new Date("2023-05-22"),
    responsavelAprovacaoId: "1",
    itens: [
      {
        id: "5-1",
        solicitacaoId: "5",
        descricao: "Cabo flexível 2.5mm",
        quantidade: 500,
        unidadeMedida: "m",
        valorEstimado: 1.8,
        aprovado: false,
        observacoes: "Solicitar especificação técnica mais detalhada"
      },
      {
        id: "5-2",
        solicitacaoId: "5",
        descricao: "Disjuntor monopolar 20A",
        quantidade: 30,
        unidadeMedida: "un",
        valorEstimado: 12.5,
        aprovado: false,
        observacoes: "Solicitar especificação técnica mais detalhada"
      }
    ],
    comentarios: []
  }
];

export function SolicitacoesCompraPage() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoCompra[]>(solicitacoesExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoCompra | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const { toast } = useToast();
  const { currentUser, addNotificacao } = useAuth();

  const filteredSolicitacoes = solicitacoes.filter((solicitacao) =>
    solicitacao.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNovaSolicitacao = (novaSolicitacao: SolicitacaoCompra) => {
    setSolicitacoes([novaSolicitacao, ...solicitacoes]);
  };

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const viewDetails = (solicitacao: SolicitacaoCompra) => {
    setSelectedSolicitacao(solicitacao);
    setIsDetailsOpen(true);
  };

  const openApprovalDialog = (solicitacao: SolicitacaoCompra) => {
    setSelectedSolicitacao(solicitacao);
    setIsApprovalDialogOpen(true);
  };

  const handleApproveSolicitacao = (approved: boolean) => {
    if (selectedSolicitacao) {
      // Criar um novo comentário para a ação
      const novoComentario: Comentario = {
        id: Date.now().toString(),
        referenciaId: selectedSolicitacao.id,
        tipoReferencia: 'solicitacao',
        autorId: currentUser?.id || '1',
        texto: approved ? 'Solicitação aprovada.' : 'Solicitação rejeitada.',
        dataCriacao: new Date(),
      };
      
      // Atualizar o status da solicitação
      const updatedSolicitacoes = solicitacoes.map(sol => {
        if (sol.id === selectedSolicitacao.id) {
          return {
            ...sol,
            status: approved ? 'aprovada' as StatusSolicitacaoCompra : 'rejeitada' as StatusSolicitacaoCompra,
            responsavelAprovacaoId: currentUser?.id || '1',
            dataAprovacao: new Date(),
            comentarios: [...sol.comentarios, novoComentario]
          };
        }
        return sol;
      });
      
      setSolicitacoes(updatedSolicitacoes);
      setIsApprovalDialogOpen(false);
      
      // Notificar o solicitante
      addNotificacao({
        titulo: approved ? "Solicitação Aprovada" : "Solicitação Rejeitada",
        mensagem: `Sua solicitação "${selectedSolicitacao.titulo}" foi ${approved ? 'aprovada' : 'rejeitada'}.`,
        tipo: approved ? "success" : "error",
        destinatarioIds: [selectedSolicitacao.solicitanteId],
        dadosReferencia: {
          tipo: "solicitacao",
          id: selectedSolicitacao.id
        }
      });
      
      // Mostrar toast de confirmação
      toast({
        title: "Sucesso",
        description: `Solicitação ${approved ? 'aprovada' : 'rejeitada'} com sucesso.`,
        variant: "default",
      });
    }
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Solicitações de Compra</h1>
            <p className="text-muted-foreground">Gerencie solicitações para aquisição de materiais e serviços</p>
          </div>
          <PermissionButton
            requiredPermission="edit_purchase_requests"
            component={<NovaSolicitacaoCompra onSolicitacaoCriada={handleAddNovaSolicitacao} />}
          />
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
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-center">Urgente?</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolicitacoes.map((solicitacao) => (
                <TableRow key={solicitacao.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{solicitacao.id}</TableCell>
                  <TableCell>{solicitacao.titulo}</TableCell>
                  <TableCell>{solicitacao.projetoId ? `Projeto #${solicitacao.projetoId}` : '-'}</TableCell>
                  <TableCell>{formatarData(solicitacao.dataSolicitacao)}</TableCell>
                  <TableCell className="text-center">
                    {solicitacao.urgente && <Badge className="bg-red-100 text-red-800">Urgente</Badge>}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal", statusColors[solicitacao.status])}>
                      {statusNames[solicitacao.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => viewDetails(solicitacao)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {solicitacao.status === "enviada" || solicitacao.status === "em_analise" ? (
                        <PermissionButton
                          requiredPermission="approve_purchase_requests"
                          component={
                            <Button variant="ghost" size="icon" onClick={() => openApprovalDialog(solicitacao)}>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          }
                        />
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Diálogo de Detalhes da Solicitação */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes da Solicitação</DialogTitle>
            </DialogHeader>
            {selectedSolicitacao && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Título</p>
                    <p className="font-medium">{selectedSolicitacao.titulo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={cn("font-normal mt-1", statusColors[selectedSolicitacao.status])}>
                      {statusNames[selectedSolicitacao.status]}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Justificativa</p>
                  <p>{selectedSolicitacao.justificativa || "Não informada"}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data da Solicitação</p>
                    <p>{formatarData(selectedSolicitacao.dataSolicitacao)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projeto</p>
                    <p>{selectedSolicitacao.projetoId ? `Projeto #${selectedSolicitacao.projetoId}` : 'Não vinculado a projeto'}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Itens Solicitados</p>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Qtd.</TableHead>
                          <TableHead>Un.</TableHead>
                          <PermissionGuard requiredPermission="view_purchase_values">
                            <TableHead className="text-right">Valor Est.</TableHead>
                          </PermissionGuard>
                          {(selectedSolicitacao.status === 'aprovada' || selectedSolicitacao.status === 'parcialmente_aprovada' || selectedSolicitacao.status === 'rejeitada') && (
                            <>
                              <TableHead className="text-center">Aprovado</TableHead>
                              <TableHead className="text-right">Qtd. Aprovada</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedSolicitacao.itens.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell className="text-right">{item.quantidade}</TableCell>
                            <TableCell>{item.unidadeMedida}</TableCell>
                            <PermissionGuard requiredPermission="view_purchase_values">
                              <TableCell className="text-right">
                                {item.valorEstimado 
                                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorEstimado)
                                  : '-'
                                }
                              </TableCell>
                            </PermissionGuard>
                            {(selectedSolicitacao.status === 'aprovada' || selectedSolicitacao.status === 'parcialmente_aprovada' || selectedSolicitacao.status === 'rejeitada') && (
                              <>
                                <TableCell className="text-center">
                                  {item.aprovado === undefined ? '-' : 
                                    item.aprovado ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : 
                                    <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                                  }
                                </TableCell>
                                <TableCell className="text-right">{item.quantidadeAprovada || '-'}</TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Aprovação */}
        <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aprovar Solicitação</DialogTitle>
              <DialogDescription>
                Deseja aprovar ou rejeitar a solicitação de compra "{selectedSolicitacao?.titulo}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleApproveSolicitacao(false)}
              >
                <XCircle className="h-4 w-4 mr-2" /> Rejeitar
              </Button>
              <Button 
                onClick={() => handleApproveSolicitacao(true)}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Aprovar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
