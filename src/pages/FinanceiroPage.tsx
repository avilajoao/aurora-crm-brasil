
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransacaoFinanceira } from "@/types";
import { CalendarIcon, ChevronDown, Plus, Search, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PermissionGuard } from '@/components/auth/PermissionGuard';

// Dados de exemplo para transações
const transacoesExemplo: TransacaoFinanceira[] = [
  {
    id: "1",
    tipo: "saida",
    categoria: "Fornecedor",
    descricao: "Pagamento Fornecedor Aço",
    valor: 12500,
    dataTransacao: new Date("2023-06-14"),
    data: new Date("2023-06-14"),
    dataPrevista: new Date("2023-06-15"),
    dataEfetivada: new Date("2023-06-14"),
    status: "paga",
    referencia: {
      tipo: "fornecedor",
      id: "3",
      nome: "Aço Brasil LTDA",
    },
  },
  {
    id: "2",
    tipo: "entrada",
    categoria: "Cliente",
    descricao: "Pagamento Projeto Reforma Escritório",
    valor: 45000,
    dataTransacao: new Date("2023-06-20"),
    data: new Date("2023-06-20"),
    dataPrevista: new Date("2023-06-20"),
    dataEfetivada: new Date("2023-06-20"),
    status: "paga",
    referencia: {
      tipo: "cliente",
      id: "1",
      nome: "Empresa XYZ",
    },
  },
  {
    id: "3",
    tipo: "saida",
    categoria: "Funcionário",
    descricao: "Folha de Pagamento Junho",
    valor: 35000,
    dataTransacao: new Date("2023-06-30"),
    data: new Date("2023-06-30"),
    dataPrevista: new Date("2023-06-30"),
    status: "pendente",
    referencia: {
      tipo: "outro",
      id: "0",
      nome: "Folha de Pagamento",
    },
  },
  {
    id: "4",
    tipo: "saida",
    categoria: "Fornecedor",
    descricao: "Pagamento Fornecedor Material Elétrico",
    valor: 4800,
    dataTransacao: new Date("2023-06-11"),
    data: new Date("2023-06-11"),
    dataPrevista: new Date("2023-06-10"),
    dataEfetivada: new Date("2023-06-11"),
    status: "paga",
    referencia: {
      tipo: "fornecedor",
      id: "5",
      nome: "Eletro Supply LTDA",
    },
  },
  {
    id: "5",
    tipo: "entrada",
    categoria: "Cliente",
    descricao: "Adiantamento Projeto Galpão Industrial",
    valor: 120000,
    dataTransacao: new Date("2023-06-25"),
    data: new Date("2023-06-25"),
    dataPrevista: new Date("2023-06-25"),
    status: "pendente",
    referencia: {
      tipo: "cliente",
      id: "2",
      nome: "Indústria ABC",
    },
  },
  {
    id: "6",
    tipo: "saida",
    categoria: "Operacional",
    descricao: "Aluguel Equipamentos",
    valor: 7500,
    dataTransacao: new Date("2023-06-05"),
    data: new Date("2023-06-05"),
    dataPrevista: new Date("2023-06-05"),
    dataEfetivada: new Date("2023-06-05"),
    status: "paga",
    referencia: {
      tipo: "outro",
      id: "0",
      nome: "Locadora de Equipamentos",
    },
  },
  {
    id: "7",
    tipo: "entrada",
    categoria: "Cliente",
    descricao: "Pagamento Final Projeto Elétrico",
    valor: 18500,
    dataTransacao: new Date("2023-06-18"),
    data: new Date("2023-06-18"),
    dataPrevista: new Date("2023-06-18"),
    status: "atrasada",
    referencia: {
      tipo: "cliente",
      id: "3",
      nome: "Comercial Delta",
    },
  },
];

// Dados para gráficos
const dadosMensais = [
  { mes: 'Jan', receitas: 85000, despesas: 65000 },
  { mes: 'Fev', receitas: 92000, despesas: 68000 },
  { mes: 'Mar', receitas: 110000, despesas: 72000 },
  { mes: 'Abr', receitas: 105000, despesas: 70000 },
  { mes: 'Mai', receitas: 120000, despesas: 90000 },
  { mes: 'Jun', receitas: 140000, despesas: 85000 },
];

const valoresPorCategoria = [
  { categoria: 'Fornecedores', valor: 45000 },
  { categoria: 'Mão de Obra', valor: 65000 },
  { categoria: 'Equipamentos', valor: 23000 },
  { categoria: 'Impostos', valor: 18000 },
  { categoria: 'Administrativo', valor: 12000 },
];

export function FinanceiroPage() {
  const [transacoes] = useState<TransacaoFinanceira[]>(transacoesExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabAtual, setTabAtual] = useState("resumo");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "entrada" | "saida">("todos");

  const totalEntradas = transacoes
    .filter(t => t.tipo === "entrada")
    .reduce((sum, t) => sum + t.valor, 0);
  
  const totalSaidas = transacoes
    .filter(t => t.tipo === "saida")
    .reduce((sum, t) => sum + t.valor, 0);
  
  const saldo = totalEntradas - totalSaidas;

  const transacoesFiltradas = transacoes.filter((transacao) => {
    const matchesSearch = transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (transacao.referencia?.nome.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    if (filtroTipo === "todos") return matchesSearch;
    return matchesSearch && transacao.tipo === filtroTipo;
  });

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status: 'pendente' | 'paga' | 'atrasada' | 'cancelada' | 'concluida') => {
    switch (status) {
      case 'pendente': return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          Pendente
        </Badge>
      );
      case 'paga': 
      case 'concluida': return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          {status === 'concluida' ? 'Concluída' : 'Paga'}
        </Badge>
      );
      case 'atrasada': return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
          Atrasada
        </Badge>
      );
      case 'cancelada': return (
        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
          Cancelada
        </Badge>
      );
    }
  };

  return (
    <PermissionGuard
      requiredPermission="view_financials"
      fallback={
        <AppLayout>
          <div className="container py-6">
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
              <p>Você não tem permissão para acessar as informações financeiras.</p>
            </div>
          </div>
        </AppLayout>
      }
    >
      <AppLayout>
        <div className="container py-6 space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
              <p className="text-muted-foreground">Controle e gestão financeira da empresa</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Transação
            </Button>
          </div>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Recebimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalEntradas)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSaidas)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Próximo Vencimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bold">30/06/2023</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Folha de Pagamento</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs para organização de conteúdo */}
          <Tabs value={tabAtual} onValueChange={setTabAtual}>
            <TabsList>
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="transacoes">Transações</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            </TabsList>
            
            {/* Tab de Resumo com gráficos */}
            <TabsContent value="resumo" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Receitas vs Despesas (Últimos 6 meses)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={dadosMensais}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
                        <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Despesas por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={valoresPorCategoria}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="categoria" type="category" />
                        <Tooltip formatter={(value) => [
                          new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value as number),
                          "Valor"
                        ]}/>
                        <Bar dataKey="valor" fill="#6366f1" name="Valor" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={dadosMensais}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="receitas" stroke="#10b981" name="Receitas" />
                      <Line type="monotone" dataKey="despesas" stroke="#ef4444" name="Despesas" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab de Transações com tabela */}
            <TabsContent value="transacoes" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transações..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="flex gap-2"
                    onClick={() => setFiltroTipo(
                      filtroTipo === "todos" ? "entrada" : 
                      filtroTipo === "entrada" ? "saida" : "todos"
                    )}
                  >
                    <Filter className="h-4 w-4" /> 
                    {filtroTipo === "todos" ? "Todos" : 
                     filtroTipo === "entrada" ? "Entradas" : "Saídas"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Referência</TableHead>
                      <TableHead>Data Prevista</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transacoesFiltradas.map((transacao) => (
                      <TableRow key={transacao.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>{transacao.descricao}</TableCell>
                        <TableCell>{transacao.categoria}</TableCell>
                        <TableCell>{transacao.referencia?.nome}</TableCell>
                        <TableCell>{transacao.dataPrevista && formatarData(transacao.dataPrevista)}</TableCell>
                        <TableCell>
                          <div className={transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}>
                            {transacao.tipo === 'entrada' ? '+' : '-'} 
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valor)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusLabel(transacao.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Tab de Relatórios */}
            <TabsContent value="relatorios">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Relatório de Fluxo de Caixa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Relatório detalhado das entradas e saídas financeiras no período selecionado.</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Análise de Despesas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Análise detalhada das despesas por categoria e projeto.</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Previsão Orçamentária</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Previsão de receitas e despesas para os próximos meses.</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Contas a Pagar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Listagem das contas a pagar com datas de vencimento e valores.</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Contas a Receber</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Listagem das contas a receber com datas previstas e status.</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Desempenho Financeiro</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Análise de desempenho financeiro por projeto e período.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </PermissionGuard>
  );
}
