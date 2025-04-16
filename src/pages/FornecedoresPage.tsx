
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados de exemplo
const fornecedoresExemplo = [
  {
    id: "1",
    nome: "Construtop Materiais",
    cnpj: "12.345.678/0001-90",
    email: "vendas@construtop.com.br",
    telefone: "(11) 3456-7890",
    cidade: "São Paulo",
    estado: "SP",
    contato: "Marcelo Silva",
    dataCadastro: new Date("2021-10-15")
  },
  {
    id: "2",
    nome: "Elétrica Master Ltda",
    cnpj: "23.456.789/0001-12",
    email: "contato@eletricamaster.com.br",
    telefone: "(31) 3222-4567",
    cidade: "Belo Horizonte",
    estado: "MG",
    contato: "Amanda Oliveira",
    dataCadastro: new Date("2022-01-20")
  },
  {
    id: "3",
    nome: "Ferragens Brasil S.A.",
    cnpj: "34.567.890/0001-23",
    email: "comercial@ferragensbrasil.com.br",
    telefone: "(21) 2233-4455",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    contato: "Ricardo Almeida",
    dataCadastro: new Date("2021-08-05")
  },
  {
    id: "4",
    nome: "Tintas & Cores",
    cnpj: "45.678.901/0001-34",
    email: "vendas@tintasecores.com.br",
    telefone: "(41) 3333-8888",
    cidade: "Curitiba",
    estado: "PR",
    contato: "Fernanda Santos",
    dataCadastro: new Date("2022-03-12")
  },
  {
    id: "5",
    nome: "Hidráulica Express",
    cnpj: "56.789.012/0001-45",
    email: "atendimento@hidraulicaexpress.com.br",
    telefone: "(51) 3444-9999",
    cidade: "Porto Alegre",
    estado: "RS",
    contato: "Carlos Mendes",
    dataCadastro: new Date("2021-11-30")
  },
];

export function FornecedoresPage() {
  const [fornecedores] = useState(fornecedoresExemplo);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cnpj.includes(searchTerm)
  );

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
            <p className="text-muted-foreground">Gerencie seus fornecedores de produtos e serviços</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Fornecedor
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar fornecedores..."
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
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead>Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFornecedores.map((fornecedor) => (
                <TableRow key={fornecedor.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{fornecedor.nome}</TableCell>
                  <TableCell>{fornecedor.cnpj}</TableCell>
                  <TableCell>{fornecedor.contato}</TableCell>
                  <TableCell>{fornecedor.email}</TableCell>
                  <TableCell>{fornecedor.telefone}</TableCell>
                  <TableCell>{fornecedor.cidade}/{fornecedor.estado}</TableCell>
                  <TableCell>{formatarData(fornecedor.dataCadastro)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
