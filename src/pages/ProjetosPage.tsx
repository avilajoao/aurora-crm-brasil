
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, ArrowUpDown, Edit, Trash2, Calendar, Users, Building2 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Projeto {
  id: string;
  titulo: string;
  cliente: string;
  responsavel: string;
  valor: number;
  status: StatusProjeto;
  dataPrevista: string;
  descricao?: string;
}

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

// Dados de exemplo
const projectsData: Projeto[] = [
  {
    id: '1',
    titulo: 'Reforma Escritório Central',
    cliente: 'Tech Solutions Ltda',
    responsavel: 'Ana Silva',
    valor: 85000,
    status: 'em_andamento' as StatusProjeto,
    dataPrevista: '15/06/2023',
    descricao: 'Projeto de reforma completa do escritório central com substituição de mobiliário e adequações estruturais.'
  },
  {
    id: '2',
    titulo: 'Construção Galpão Industrial',
    cliente: 'Indústrias Progresso S.A.',
    responsavel: 'Carlos Mendes',
    valor: 420000,
    status: 'aguardando_aprovacao' as StatusProjeto,
    dataPrevista: '30/10/2023',
    descricao: 'Construção de galpão industrial com 1.200m² incluindo área administrativa e estacionamento.'
  },
  {
    id: '3',
    titulo: 'Instalação Elétrica Predial',
    cliente: 'Condomínio Vista Verde',
    responsavel: 'Mariana Costa',
    valor: 38500,
    status: 'concluido' as StatusProjeto,
    dataPrevista: '22/04/2023',
    descricao: 'Revisão e modernização de toda a instalação elétrica do condomínio, incluindo áreas comuns.'
  },
  {
    id: '4',
    titulo: 'Ampliação Fábrica de Alimentos',
    cliente: 'Sabores do Brasil S.A.',
    responsavel: 'Ricardo Oliveira',
    valor: 650000,
    status: 'em_analise' as StatusProjeto,
    dataPrevista: '10/12/2023',
    descricao: 'Projeto de ampliação da fábrica de alimentos com construção de novas linhas de produção.'
  },
  {
    id: '5',
    titulo: 'Manutenção Preventiva Maquinário',
    cliente: 'Metalúrgica Nacional',
    responsavel: 'Paulo Santos',
    valor: 22000,
    status: 'em_andamento' as StatusProjeto,
    dataPrevista: '05/05/2023',
    descricao: 'Manutenção preventiva em todo o maquinário da linha de produção principal.'
  },
];

// Lista de responsáveis
const responsaveis = [
  "Ana Silva",
  "Carlos Mendes",
  "Mariana Costa",
  "Ricardo Oliveira",
  "Paulo Santos",
  "Juliana Ferreira",
  "Roberto Almeida"
];

// Lista de clientes
const clientes = [
  "Tech Solutions Ltda",
  "Indústrias Progresso S.A.",
  "Condomínio Vista Verde",
  "Sabores do Brasil S.A.",
  "Metalúrgica Nacional",
  "Construtora Horizonte",
  "Distribuidora Regional",
  "Supermercados Unidos"
];

export function ProjetosPage() {
  const { toast } = useToast();
  const [projetos, setProjetos] = useState<Projeto[]>(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProjeto, setCurrentProjeto] = useState<Projeto | null>(null);
  
  // Ordenação
  const [ordenacao, setOrdenacao] = useState<{campo: keyof Projeto, ordem: 'asc' | 'desc'}>({
    campo: 'dataPrevista',
    ordem: 'asc'
  });

  // Filtros
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  
  // Novo projeto
  const [novoProjeto, setNovoProjeto] = useState<Omit<Projeto, 'id'>>({
    titulo: '',
    cliente: '',
    responsavel: '',
    valor: 0,
    status: 'em_analise',
    dataPrevista: '',
    descricao: ''
  });

  const handleNovoProjetoChange = (campo: keyof Omit<Projeto, 'id'>, valor: any) => {
    setNovoProjeto({
      ...novoProjeto,
      [campo]: valor
    });
  };

  const adicionarProjeto = () => {
    if (!novoProjeto.titulo || !novoProjeto.cliente || !novoProjeto.dataPrevista) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const novoProjCompleto: Projeto = {
      id: (projetos.length + 1).toString(),
      ...novoProjeto
    };

    setProjetos([...projetos, novoProjCompleto]);
    setNovoProjeto({
      titulo: '',
      cliente: '',
      responsavel: '',
      valor: 0,
      status: 'em_analise',
      dataPrevista: '',
      descricao: ''
    });
    setIsDialogOpen(false);
    toast({
      title: "Projeto adicionado",
      description: "O projeto foi adicionado com sucesso.",
    });
  };

  const atualizarProjeto = () => {
    if (currentProjeto) {
      const projetosAtualizados = projetos.map(proj =>
        proj.id === currentProjeto.id ? currentProjeto : proj
      );
      setProjetos(projetosAtualizados);
      setIsEditDialogOpen(false);
      toast({
        title: "Projeto atualizado",
        description: "As informações do projeto foram atualizadas com sucesso.",
      });
    }
  };

  const excluirProjeto = (id: string) => {
    setProjetos(projetos.filter(projeto => projeto.id !== id));
    toast({
      title: "Projeto excluído",
      description: "O projeto foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const ordenarProjetos = (campo: keyof Projeto) => {
    const novaOrdem = ordenacao.campo === campo && ordenacao.ordem === 'asc' ? 'desc' : 'asc';
    setOrdenacao({
      campo,
      ordem: novaOrdem
    });
  };

  // Filtragem de projetos
  const projetosFiltrados = projetos
    .filter((projeto) => {
      const matchesSearch = projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filtroStatus === "todos" || projeto.status === filtroStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (ordenacao.campo === 'valor') {
        return ordenacao.ordem === 'asc' ? a.valor - b.valor : b.valor - a.valor;
      } else if (ordenacao.campo === 'dataPrevista') {
        const dataA = a.dataPrevista.split('/').reverse().join('-');
        const dataB = b.dataPrevista.split('/').reverse().join('-');
        return ordenacao.ordem === 'asc' 
          ? dataA.localeCompare(dataB)
          : dataB.localeCompare(dataA);
      } else {
        const valorA = a[ordenacao.campo]?.toString().toLowerCase() || '';
        const valorB = b[ordenacao.campo]?.toString().toLowerCase() || '';
        return ordenacao.ordem === 'asc' 
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }
    });

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
            <p className="text-muted-foreground">Gerencie e acompanhe todos os projetos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Projeto</DialogTitle>
                <DialogDescription>
                  Preencha os dados do projeto para adicioná-lo ao sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="titulo">Título do Projeto*</Label>
                  <Input
                    id="titulo"
                    value={novoProjeto.titulo}
                    onChange={(e) => handleNovoProjetoChange('titulo', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="cliente">Cliente*</Label>
                  <Select
                    value={novoProjeto.cliente}
                    onValueChange={(value) => handleNovoProjetoChange('cliente', value)}
                  >
                    <SelectTrigger id="cliente">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map(cliente => (
                        <SelectItem key={cliente} value={cliente}>{cliente}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Select
                      value={novoProjeto.responsavel}
                      onValueChange={(value) => handleNovoProjetoChange('responsavel', value)}
                    >
                      <SelectTrigger id="responsavel">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {responsaveis.map(resp => (
                          <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-prevista">Data Prevista*</Label>
                    <Input
                      id="data-prevista"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      value={novoProjeto.dataPrevista}
                      onChange={(e) => handleNovoProjetoChange('dataPrevista', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Orçado (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      value={novoProjeto.valor || ''}
                      onChange={(e) => handleNovoProjetoChange('valor', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={novoProjeto.status}
                      onValueChange={(value: StatusProjeto) => handleNovoProjetoChange('status', value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Status do projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em_analise">Em análise</SelectItem>
                        <SelectItem value="aguardando_aprovacao">Aguardando aprovação</SelectItem>
                        <SelectItem value="aprovado">Aprovado</SelectItem>
                        <SelectItem value="em_andamento">Em andamento</SelectItem>
                        <SelectItem value="em_pausa">Em pausa</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Detalhes do projeto"
                    value={novoProjeto.descricao || ''}
                    onChange={(e) => handleNovoProjetoChange('descricao', e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={adicionarProjeto}>Adicionar Projeto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="em_analise">Em análise</SelectItem>
                <SelectItem value="aguardando_aprovacao">Aguardando aprovação</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="em_pausa">Em pausa</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="flex gap-2"
              onClick={() => ordenarProjetos('valor')}
            >
              <ArrowUpDown className="h-4 w-4" /> Ordenar por Valor
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
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projetosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center">
                      <ClipboardList className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium">Nenhum projeto encontrado</h3>
                      <p className="text-muted-foreground text-sm">
                        Não há projetos que correspondam aos critérios de busca.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                projetosFiltrados.map((projeto) => (
                  <TableRow key={projeto.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{projeto.titulo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {projeto.cliente}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {projeto.responsavel}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(projeto.valor)}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", statusColors[projeto.status])}>
                        {statusNames[projeto.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {projeto.dataPrevista}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentProjeto(projeto);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => excluirProjeto(projeto.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog para editar projeto */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
            <DialogDescription>
              Atualize as informações do projeto.
            </DialogDescription>
          </DialogHeader>
          {currentProjeto && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-titulo">Título do Projeto</Label>
                <Input
                  id="edit-titulo"
                  value={currentProjeto.titulo}
                  onChange={(e) => setCurrentProjeto({...currentProjeto, titulo: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-cliente">Cliente</Label>
                <Select
                  value={currentProjeto.cliente}
                  onValueChange={(value) => setCurrentProjeto({...currentProjeto, cliente: value})}
                >
                  <SelectTrigger id="edit-cliente">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map(cliente => (
                      <SelectItem key={cliente} value={cliente}>{cliente}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-responsavel">Responsável</Label>
                  <Select
                    value={currentProjeto.responsavel}
                    onValueChange={(value) => setCurrentProjeto({...currentProjeto, responsavel: value})}
                  >
                    <SelectTrigger id="edit-responsavel">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {responsaveis.map(resp => (
                        <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-data-prevista">Data Prevista</Label>
                  <Input
                    id="edit-data-prevista"
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={currentProjeto.dataPrevista}
                    onChange={(e) => setCurrentProjeto({...currentProjeto, dataPrevista: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-valor">Valor Orçado (R$)</Label>
                  <Input
                    id="edit-valor"
                    type="number"
                    value={currentProjeto.valor}
                    onChange={(e) => setCurrentProjeto({...currentProjeto, valor: parseFloat(e.target.value) || 0})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentProjeto.status}
                    onValueChange={(value: StatusProjeto) => setCurrentProjeto({...currentProjeto, status: value})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Status do projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em_analise">Em análise</SelectItem>
                      <SelectItem value="aguardando_aprovacao">Aguardando aprovação</SelectItem>
                      <SelectItem value="aprovado">Aprovado</SelectItem>
                      <SelectItem value="em_andamento">Em andamento</SelectItem>
                      <SelectItem value="em_pausa">Em pausa</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-descricao">Descrição</Label>
                <Textarea
                  id="edit-descricao"
                  placeholder="Detalhes do projeto"
                  value={currentProjeto.descricao || ''}
                  onChange={(e) => setCurrentProjeto({...currentProjeto, descricao: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={atualizarProjeto}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AppLayout>
  );
}

// Component to render ClipboardList icon as a fallback
function ClipboardList(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}
