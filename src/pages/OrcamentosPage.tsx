
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
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
import { StatusOrcamento, Orcamento } from "@/types";

const statusColors: Record<string, string> = {
  rascunho: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
  enviado_ao_cliente: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  em_revisao: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  aprovado_pelo_cliente: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejeitado_pelo_cliente: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  aguardando_modificacoes: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  cancelado: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const statusNames: Record<string, string> = {
  rascunho: "Rascunho",
  enviado_ao_cliente: "Enviado ao Cliente",
  em_revisao: "Em Revisão",
  aprovado_pelo_cliente: "Aprovado pelo Cliente",
  rejeitado_pelo_cliente: "Rejeitado pelo Cliente",
  aguardando_modificacoes: "Aguardando Modificações",
  cancelado: "Cancelado",
};

// Dados de exemplo
const orcamentosExemplo: Orcamento[] = [
  {
    id: "1",
    clienteId: "1",
    titulo: "Reforma Escritório Central",
    descricao: "Reforma completa do escritório central",
    status: "aprovado_pelo_cliente" as StatusOrcamento,
    valorTotal: 85000,
    responsavelId: "1",
    dataCriacao: new Date("2023-05-15"),
    dataEnvio: new Date("2023-05-16"),
    dataAprovacao: new Date("2023-05-20"),
    dataValidade: new Date("2023-06-20"),
    itens: [],
    comentarios: []
  },
  {
    id: "2",
    clienteId: "2",
    titulo: "Construção Galpão Industrial",
    descricao: "Construção de galpão industrial de 800m²",
    status: "enviado_ao_cliente" as StatusOrcamento,
    valorTotal: 420000,
    responsavelId: "2",
    dataCriacao: new Date("2023-06-01"),
    dataEnvio: new Date("2023-06-05"),
    dataValidade: new Date("2023-07-05"),
    itens: [],
    comentarios: []
  },
  {
    id: "3",
    clienteId: "3",
    titulo: "Instalação Elétrica Predial",
    descricao: "Instalação elétrica completa em prédio comercial",
    status: "em_revisao" as StatusOrcamento,
    valorTotal: 38500,
    responsavelId: "3",
    dataCriacao: new Date("2023-04-10"),
    dataEnvio: new Date("2023-04-12"),
    dataValidade: new Date("2023-05-12"),
    itens: [],
    comentarios: []
  },
  {
    id: "4",
    clienteId: "4",
    titulo: "Ampliação Fábrica de Alimentos",
    descricao: "Ampliação de fábrica de alimentos",
    status: "rascunho" as StatusOrcamento,
    valorTotal: 650000,
    responsavelId: "1",
    dataCriacao: new Date("2023-06-15"),
    dataValidade: new Date("2023-07-15"),
    itens: [],
    comentarios: []
  },
  {
    id: "5",
    clienteId: "5",
    titulo: "Manutenção Preventiva Maquinário",
    descricao: "Manutenção preventiva de maquinário industrial",
    status: "rejeitado_pelo_cliente" as StatusOrcamento,
    valorTotal: 22000,
    responsavelId: "2",
    dataCriacao: new Date("2023-03-01"),
    dataEnvio: new Date("2023-03-03"),
    dataValidade: new Date("2023-04-03"),
    itens: [],
    comentarios: []
  },
];

export function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>(orcamentosExemplo);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrcamentos = orcamentos.filter((orcamento) =>
    orcamento.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
            <p className="text-muted-foreground">Gerencie e acompanhe orçamentos de projetos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Orçamento
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar orçamentos..."
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
                <TableHead>Data de Criação</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrcamentos.map((orcamento) => (
                <TableRow key={orcamento.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{orcamento.id}</TableCell>
                  <TableCell>{orcamento.titulo}</TableCell>
                  <TableCell>{formatarData(orcamento.dataCriacao)}</TableCell>
                  <TableCell>{orcamento.dataValidade ? formatarData(orcamento.dataValidade) : '-'}</TableCell>
                  <TableCell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orcamento.valorTotal)}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal", statusColors[orcamento.status])}>
                      {statusNames[orcamento.status]}
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
