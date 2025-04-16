
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, ArrowUpDown, Building2, Phone, Mail } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Dados de exemplo
const clientesExemplo = [
  {
    id: "1",
    nome: "Tech Solutions Ltda",
    email: "contato@techsolutions.com.br",
    telefone: "(11) 3456-7890",
    empresa: "Tech Solutions Ltda",
    cnpj: "12.345.678/0001-90",
    cidade: "São Paulo",
    estado: "SP",
    representante: "Marcos Oliveira",
    dataCadastro: new Date("2022-03-10"),
    ultimoContato: new Date("2023-05-15"),
  },
  {
    id: "2",
    nome: "Indústrias Progresso S.A.",
    email: "comercial@progresso.ind.br",
    telefone: "(31) 3222-4567",
    empresa: "Indústrias Progresso S.A.",
    cnpj: "23.456.789/0001-12",
    cidade: "Belo Horizonte",
    estado: "MG",
    representante: "Carolina Mendes",
    dataCadastro: new Date("2021-11-05"),
    ultimoContato: new Date("2023-06-01"),
  },
  {
    id: "3",
    nome: "Condomínio Vista Verde",
    email: "sindico@vistaverde.com.br",
    telefone: "(21) 98765-4321",
    empresa: "Condomínio Vista Verde",
    cnpj: "34.567.890/0001-23",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    representante: "Roberto Almeida",
    dataCadastro: new Date("2022-07-20"),
    ultimoContato: new Date("2023-04-12"),
  },
  {
    id: "4",
    nome: "Sabores do Brasil S.A.",
    email: "contato@saboresdobrasil.com.br",
    telefone: "(41) 3333-8888",
    empresa: "Sabores do Brasil S.A.",
    cnpj: "45.678.901/0001-34",
    cidade: "Curitiba",
    estado: "PR",
    representante: "Luciana Ferreira",
    dataCadastro: new Date("2022-01-15"),
    ultimoContato: new Date("2023-05-30"),
  },
  {
    id: "5",
    nome: "Metalúrgica Nacional",
    email: "vendas@metalurgica.com.br",
    telefone: "(51) 3444-9999",
    empresa: "Metalúrgica Nacional",
    cnpj: "56.789.012/0001-45",
    cidade: "Porto Alegre",
    estado: "RS",
    representante: "Fernando Santos",
    dataCadastro: new Date("2021-09-30"),
    ultimoContato: new Date("2023-04-28"),
  },
];

export function ClientesPage() {
  const [clientes] = useState(clientesExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [visualizacao, setVisualizacao] = useState<'lista' | 'cards'>('lista');

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">Gerencie sua carteira de clientes</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Cliente
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant={visualizacao === 'lista' ? 'default' : 'outline'} 
              onClick={() => setVisualizacao('lista')}
            >
              Lista
            </Button>
            <Button 
              variant={visualizacao === 'cards' ? 'default' : 'outline'}
              onClick={() => setVisualizacao('cards')}
            >
              Cards
            </Button>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
          </div>
        </div>

        {visualizacao === 'lista' ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Cidade/UF</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                  <TableHead>Último Contato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{cliente.nome}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>{cliente.cidade}/{cliente.estado}</TableCell>
                    <TableCell>{formatarData(cliente.dataCadastro)}</TableCell>
                    <TableCell>{cliente.ultimoContato ? formatarData(cliente.ultimoContato) : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClientes.map((cliente) => (
              <Card key={cliente.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {cliente.nome.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{cliente.nome}</h3>
                    <p className="text-sm text-muted-foreground">{cliente.representante}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{cliente.cnpj}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{cliente.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{cliente.telefone}</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  Último contato: {cliente.ultimoContato ? formatarData(cliente.ultimoContato) : 'Não registrado'}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
