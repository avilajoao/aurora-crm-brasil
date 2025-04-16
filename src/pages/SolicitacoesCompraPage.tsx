
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, AlertTriangle } from 'lucide-react';
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
import { SolicitacaoCompra, StatusSolicitacaoCompra } from "@/types";

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

// Dados de exemplo
const solicitacoesExemplo: SolicitacaoCompra[] = [
  {
    id: "1",
    projetoId: "1",
    solicitanteId: "3",
    responsavelAprovacaoId: "1",
    titulo: "Material Elétrico para Escritório",
    justificativa: "Materiais necessários para instalação elétrica",
    status: "aprovada" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-05-10"),
    dataAprovacao: new Date("2023-05-15"),
    itens: [],
    comentarios: []
  },
  {
    id: "2",
    projetoId: "2",
    solicitanteId: "4",
    titulo: "Cimento e Areia para Fundação",
    justificativa: "Materiais para início da obra do galpão",
    status: "enviada" as StatusSolicitacaoCompra,
    urgente: true,
    dataSolicitacao: new Date("2023-06-01"),
    itens: [],
    comentarios: []
  },
  {
    id: "3",
    projetoId: "1",
    solicitanteId: "3",
    responsavelAprovacaoId: "1",
    titulo: "Cabos e Conectores",
    justificativa: "Materiais para finalização da instalação elétrica",
    status: "parcialmente_aprovada" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-05-20"),
    dataAprovacao: new Date("2023-05-22"),
    itens: [],
    comentarios: []
  },
  {
    id: "4",
    projetoId: "3",
    solicitanteId: "5",
    titulo: "Ferramentas Específicas",
    justificativa: "Ferramentas necessárias para equipe de instalação",
    status: "em_analise" as StatusSolicitacaoCompra,
    urgente: false,
    dataSolicitacao: new Date("2023-06-05"),
    itens: [],
    comentarios: []
  },
  {
    id: "5",
    projetoId: "4",
    solicitanteId: "2",
    responsavelAprovacaoId: "1",
    titulo: "Materiais de Construção Diversos",
    justificativa: "Materiais necessários para ampliação da fábrica",
    status: "rejeitada" as StatusSolicitacaoCompra,
    urgente: true,
    dataSolicitacao: new Date("2023-05-30"),
    dataAprovacao: new Date("2023-06-02"),
    itens: [],
    comentarios: []
  },
];

export function SolicitacoesCompraPage() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoCompra[]>(solicitacoesExemplo);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSolicitacoes = solicitacoes.filter((solicitacao) =>
    solicitacao.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Solicitações de Compra</h1>
            <p className="text-muted-foreground">Solicite e acompanhe aprovações de compras</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Solicitação
          </Button>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolicitacoes.map((solicitacao) => (
                <TableRow key={solicitacao.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{solicitacao.id}</TableCell>
                  <TableCell>{solicitacao.titulo}</TableCell>
                  <TableCell>{formatarData(solicitacao.dataSolicitacao)}</TableCell>
                  <TableCell>Projeto #{solicitacao.projetoId}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
