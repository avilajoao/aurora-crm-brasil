
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart3, LineChart, PieChart, Download, Calendar, ArrowDownUp } from 'lucide-react';
import { ChartCard } from '@/components/dashboard/ChartCard';

// Dados de exemplo para os gráficos
const vendasPorMes = [
  { name: 'Jan', valor: 65000 },
  { name: 'Fev', valor: 75000 },
  { name: 'Mar', valor: 100000 },
  { name: 'Abr', valor: 85000 },
  { name: 'Mai', valor: 110000 },
  { name: 'Jun', valor: 95000 },
  { name: 'Jul', valor: 120000 },
  { name: 'Ago', valor: 140000 },
  { name: 'Set', valor: 115000 },
  { name: 'Out', valor: 125000 },
  { name: 'Nov', valor: 135000 },
  { name: 'Dez', valor: 150000 },
];

const projetosPorStatus = [
  { name: 'Em análise', valor: 4 },
  { name: 'Aguardando aprovação', valor: 8 },
  { name: 'Aprovado', valor: 6 },
  { name: 'Em andamento', valor: 24 },
  { name: 'Em pausa', valor: 3 },
  { name: 'Concluído', valor: 18 },
  { name: 'Cancelado', valor: 2 },
];

const lucroPorProjeto = [
  { name: 'Residenciais', valor: 320000 },
  { name: 'Comerciais', valor: 580000 },
  { name: 'Industriais', valor: 420000 },
  { name: 'Infraestrutura', valor: 680000 },
];

const desempenhoEquipes = [
  { name: 'Equipe A', valor: 92 },
  { name: 'Equipe B', valor: 88 },
  { name: 'Equipe C', valor: 95 },
  { name: 'Equipe D', valor: 78 },
  { name: 'Equipe E', valor: 85 },
];

export function RelatoriosPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("anual");

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground">Visualize e exporte dados analíticos do sistema</p>
          </div>
          <div className="flex gap-2">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="financeiro">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <TabsTrigger value="financeiro">
              <BarChart3 className="mr-2 h-4 w-4" /> Financeiro
            </TabsTrigger>
            <TabsTrigger value="projetos">
              <PieChart className="mr-2 h-4 w-4" /> Projetos
            </TabsTrigger>
            <TabsTrigger value="vendas">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Vendas
            </TabsTrigger>
            <TabsTrigger value="desempenho">
              <LineChart className="mr-2 h-4 w-4" /> Desempenho
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="financeiro">
              <div className="grid gap-6 md:grid-cols-2">
                <ChartCard
                  title="Faturamento Mensal"
                  data={vendasPorMes}
                  dataKey="valor"
                  height={300}
                />
                <ChartCard
                  title="Lucro por Tipo de Projeto"
                  data={lucroPorProjeto}
                  dataKey="valor"
                  height={300}
                  strokeColor="hsl(var(--secondary))"
                  fillColor="hsl(var(--secondary) / 0.1)"
                />
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Resumo Financeiro</CardTitle>
                  <CardDescription>
                    Visão geral das métricas financeiras principais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Faturamento Total</Label>
                      <div className="text-2xl font-bold">R$ 1.250.000,00</div>
                      <div className="text-sm text-success">+12% em relação ao período anterior</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Custos Operacionais</Label>
                      <div className="text-2xl font-bold">R$ 780.000,00</div>
                      <div className="text-sm text-destructive">+8% em relação ao período anterior</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Margem de Lucro</Label>
                      <div className="text-2xl font-bold">37,6%</div>
                      <div className="text-sm text-success">+2.3% em relação ao período anterior</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projetos">
              <div className="grid gap-6 md:grid-cols-2">
                <ChartCard
                  title="Projetos por Status"
                  data={projetosPorStatus}
                  dataKey="valor"
                  height={300}
                  strokeColor="hsl(var(--primary))"
                  fillColor="hsl(var(--primary) / 0.1)"
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Projetos</CardTitle>
                    <CardDescription>Visão geral dos projetos ativos e concluídos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Total de Projetos</p>
                          <p className="text-2xl font-bold">65</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                          <p className="text-2xl font-bold text-primary">24</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                          <p className="text-2xl font-bold text-success">18</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Taxa de Conclusão no Prazo</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Taxa de Satisfação do Cliente</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-success h-full rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Projetos Dentro do Orçamento</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="vendas">
              <div className="grid gap-6 md:grid-cols-2">
                <ChartCard
                  title="Vendas Mensais"
                  data={vendasPorMes}
                  dataKey="valor"
                  height={300}
                  strokeColor="hsl(var(--success))"
                  fillColor="hsl(var(--success) / 0.1)"
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Vendas</CardTitle>
                    <CardDescription>Informações sobre orçamentos e taxas de conversão</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Orçamentos Enviados</p>
                          <p className="text-2xl font-bold">127</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Orçamentos Aprovados</p>
                          <p className="text-2xl font-bold text-success">78</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Taxa de Conversão</span>
                          <span className="font-medium">61.4%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-success h-full rounded-full" style={{ width: '61.4%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Ticket Médio</span>
                          <span className="font-medium">R$ 86.500,00</span>
                        </div>
                      </div>
                      <div className="space-y-1 pt-2">
                        <p className="text-sm font-medium">Top Clientes</p>
                        <div className="text-sm">
                          <div className="flex justify-between py-1 border-b">
                            <span>Tech Solutions Ltda</span>
                            <span className="font-medium">R$ 285.000,00</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span>Indústrias Progresso S.A.</span>
                            <span className="font-medium">R$ 420.000,00</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span>Sabores do Brasil S.A.</span>
                            <span className="font-medium">R$ 175.000,00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="desempenho">
              <div className="grid gap-6 md:grid-cols-2">
                <ChartCard
                  title="Desempenho das Equipes"
                  data={desempenhoEquipes}
                  dataKey="valor"
                  height={300}
                  strokeColor="hsl(var(--secondary))"
                  fillColor="hsl(var(--secondary) / 0.1)"
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Desempenho</CardTitle>
                    <CardDescription>Análise de produtividade e eficiência</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Produtividade Média</span>
                          <span className="font-medium">87.6%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '87.6%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Cumprimento de Prazos</span>
                          <span className="font-medium">92.3%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-success h-full rounded-full" style={{ width: '92.3%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Qualidade (Retrabalho)</span>
                          <span className="font-medium">4.7%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-destructive h-full rounded-full" style={{ width: '4.7%' }}></div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-2">Desempenho por Função</p>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Engenheiros</span>
                            <div className="space-x-1">
                              <span className="px-2 py-1 rounded-md bg-success/20 text-success">96%</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Eletricistas</span>
                            <div className="space-x-1">
                              <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">88%</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Pedreiros</span>
                            <div className="space-x-1">
                              <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">84%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
