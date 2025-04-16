
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, UserPlus, Phone, Mail, Building2, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dados de exemplo
const leadsExemplo = [
  {
    id: "1",
    nome: "Tech Inovações Ltda",
    email: "contato@techinovacoes.com.br",
    telefone: "(11) 98765-4321",
    empresa: "Tech Inovações",
    fonte: "Site",
    status: "novo",
    dataCadastro: new Date("2024-04-10"),
    ultimoContato: new Date("2024-04-12"),
  },
  {
    id: "2",
    nome: "Construções Modernas S.A.",
    email: "comercial@construcoesmodernas.com.br",
    telefone: "(21) 98888-7777",
    empresa: "Construções Modernas",
    fonte: "Indicação",
    status: "qualificado",
    dataCadastro: new Date("2024-04-08"),
    ultimoContato: new Date("2024-04-15"),
  },
  {
    id: "3",
    nome: "Incorporadora Futuro",
    email: "vendas@incorporadorafuturo.com.br",
    telefone: "(31) 97777-6666",
    empresa: "Incorporadora Futuro",
    fonte: "LinkedIn",
    status: "negociacao",
    dataCadastro: new Date("2024-04-05"),
    ultimoContato: new Date("2024-04-14"),
  },
];

const statusColors: Record<string, string> = {
  novo: "bg-blue-100 text-blue-800",
  qualificado: "bg-purple-100 text-purple-800",
  negociacao: "bg-amber-100 text-amber-800",
  convertido: "bg-green-100 text-green-800",
  perdido: "bg-red-100 text-red-800"
};

export function LeadsPage() {
  const [leads] = useState(leadsExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prospecção de Leads</h1>
            <p className="text-muted-foreground">Gerencie seus leads e acompanhe a jornada de conversão</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Novo Lead
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Novos</h3>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-sm text-muted-foreground">Leads para qualificar</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Qualificados</h3>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-sm text-muted-foreground">Em processo</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Em Negociação</h3>
            <div className="text-2xl font-bold text-amber-600">5</div>
            <p className="text-sm text-muted-foreground">Propostas enviadas</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Convertidos</h3>
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar leads..."
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
                <SelectItem value="novo">Novos</SelectItem>
                <SelectItem value="qualificado">Qualificados</SelectItem>
                <SelectItem value="negociacao">Em Negociação</SelectItem>
                <SelectItem value="convertido">Convertidos</SelectItem>
                <SelectItem value="perdido">Perdidos</SelectItem>
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
                <TableHead>Lead</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead>Último Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{lead.nome}</span>
                      <span className="text-sm text-muted-foreground">{lead.empresa}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.telefone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.fonte}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status]}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatarData(lead.dataCadastro)}</TableCell>
                  <TableCell>{formatarData(lead.ultimoContato)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
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
