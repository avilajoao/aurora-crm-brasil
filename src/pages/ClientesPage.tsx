
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Building2, Phone, Mail, Calendar, User, MapPin } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    categoria: "empresa",
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
    categoria: "empresa",
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
    categoria: "condominio",
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
    categoria: "empresa",
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
    categoria: "empresa",
  },
];

// Categorias de clientes
const categorias = {
  "empresa": { label: "Empresa", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  "condominio": { label: "Condomínio", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  "pessoa_fisica": { label: "Pessoa Física", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
  "orgao_publico": { label: "Órgão Público", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
};

export function ClientesPage() {
  const [clientes] = useState(clientesExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.empresa?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = !filtroCategoria || cliente.categoria === filtroCategoria;
    
    return matchesSearch && matchesCategoria;
  });

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
          <div className="flex gap-2 w-full sm:w-auto flex-wrap">
            <Button 
              variant={filtroCategoria === null ? 'default' : 'outline'} 
              onClick={() => setFiltroCategoria(null)}
              className="text-xs h-8"
            >
              Todos
            </Button>
            {Object.entries(categorias).map(([key, { label }]) => (
              <Button 
                key={key}
                variant={filtroCategoria === key ? 'default' : 'outline'}
                onClick={() => setFiltroCategoria(key)}
                className="text-xs h-8"
              >
                {label}
              </Button>
            ))}
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Mais Filtros
            </Button>
          </div>
        </div>

        {/* Cards de clientes organizados em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="border-b p-4 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {cliente.nome.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{cliente.nome}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={cliente.categoria ? categorias[cliente.categoria as keyof typeof categorias].color : ""}>
                      {cliente.categoria ? categorias[cliente.categoria as keyof typeof categorias].label : "Outro"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{cliente.cnpj}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{cliente.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{cliente.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{cliente.cidade}/{cliente.estado}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{cliente.representante}</span>
                </div>
              </div>
              
              <div className="border-t p-3 bg-muted/20 flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Cadastro: {formatarData(cliente.dataCadastro)}</span>
                </div>
                <div>
                  Contato: {cliente.ultimoContato ? formatarData(cliente.ultimoContato) : 'Não registrado'}
                </div>
              </div>
            </Card>
          ))}
          
          {filteredClientes.length === 0 && (
            <div className="col-span-full p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Building2 className="h-10 w-10 text-muted-foreground" />
                <h3 className="font-medium">Nenhum cliente encontrado</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  Não foram encontrados clientes com os filtros selecionados. Tente ajustar sua busca ou adicione novos clientes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
