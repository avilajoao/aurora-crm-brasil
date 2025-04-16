
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
import { StatusProjeto } from "@/types";

const statusColors: Record<string, string> = {
  em_analise: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  aguardando_aprovacao: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  aprovado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  em_andamento: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  em_pausa: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  concluido: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusNames: Record<string, string> = {
  em_analise: "Em análise",
  aguardando_aprovacao: "Aguardando aprovação",
  aprovado: "Aprovado",
  em_andamento: "Em andamento",
  em_pausa: "Em pausa",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

// Dados de exemplo idênticos aos do Dashboard
const projectsData = [
  {
    id: '1',
    titulo: 'Reforma Escritório Central',
    cliente: 'Tech Solutions Ltda',
    responsavel: 'Ana Silva',
    valor: 85000,
    status: 'em_andamento' as StatusProjeto,
    dataPrevista: '15/06/2023'
  },
  {
    id: '2',
    titulo: 'Construção Galpão Industrial',
    cliente: 'Indústrias Progresso S.A.',
    responsavel: 'Carlos Mendes',
    valor: 420000,
    status: 'aguardando_aprovacao' as StatusProjeto,
    dataPrevista: '30/10/2023'
  },
  {
    id: '3',
    titulo: 'Instalação Elétrica Predial',
    cliente: 'Condomínio Vista Verde',
    responsavel: 'Mariana Costa',
    valor: 38500,
    status: 'concluido' as StatusProjeto,
    dataPrevista: '22/04/2023'
  },
  {
    id: '4',
    titulo: 'Ampliação Fábrica de Alimentos',
    cliente: 'Sabores do Brasil S.A.',
    responsavel: 'Ricardo Oliveira',
    valor: 650000,
    status: 'em_analise' as StatusProjeto,
    dataPrevista: '10/12/2023'
  },
  {
    id: '5',
    titulo: 'Manutenção Preventiva Maquinário',
    cliente: 'Metalúrgica Nacional',
    responsavel: 'Paulo Santos',
    valor: 22000,
    status: 'em_andamento' as StatusProjeto,
    dataPrevista: '05/05/2023'
  },
];

export function ProjetosPage() {
  const [projetos] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjetos = projetos.filter((projeto) =>
    projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
            <p className="text-muted-foreground">Gerencie e acompanhe todos os projetos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Projeto
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos..."
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
                <TableHead>Projeto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Data Prevista</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjetos.map((projeto) => (
                <TableRow key={projeto.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{projeto.titulo}</TableCell>
                  <TableCell>{projeto.cliente}</TableCell>
                  <TableCell>{projeto.responsavel}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(projeto.valor)}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal", statusColors[projeto.status])}>
                      {statusNames[projeto.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{projeto.dataPrevista}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
