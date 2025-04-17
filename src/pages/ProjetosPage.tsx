import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Edit, Trash2, Calendar, Users, Building2, MoveHorizontal } from 'lucide-react';
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  const [draggingId, setDraggingId] = useState<string | null>(null);
  
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

  // Filtragem de projetos
  const projetosFiltrados = projetos
    .filter((projeto) => {
      const matchesSearch = projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filtroStatus === "todos" || projeto.status === filtroStatus;
      
      return matchesSearch && matchesStatus;
    });

  // Função para iniciar o arrastar
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("id", id);
    setDraggingId(id);
  };
  
  // Função para permitir soltar
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  // Função para finalizar a movimentação
  const handleDrop = (e: React.DragEvent, status: StatusProjeto) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    
    // Atualiza o status do projeto arrastado
    const projetosAtualizados = projetos.map(projeto => {
      if (projeto.id === id) {
        return { ...projeto, status };
      }
      return projeto;
    });
    
    setProjetos(projetosAtualizados);
    setDraggingId(null);
    
    toast({
      title: "Status atualizado",
      description: `Projeto movido para ${statusNames[status]}.`,
    });
  };

  // Agrupamento dos projetos por status
  const projetosPorStatus = (status: StatusProjeto) => {
    return projetosFiltrados.filter(projeto => projeto.status === status);
  };

  // Lista de todos os status para exibir as colunas
  const statusList: StatusProjeto[] = ["em_analise", "aguardando_aprovacao", "aprovado", "em_andamento", "em_pausa", "concluido", "cancelado"];

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
                  <label htmlFor="titulo" className="text-sm font-medium">Título do Projeto*</label>
                  <Input
                    id="titulo"
                    value={novoProjeto.titulo}
                    onChange={(e) => handleNovoProjetoChange('titulo', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="cliente" className="text-sm font-medium">Cliente*</label>
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
                    <label htmlFor="responsavel" className="text-sm font-medium">Responsável</label>
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
                    <label htmlFor="data-prevista" className="text-sm font-medium">Data Prevista*</label>
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
                    <label htmlFor="valor" className="text-sm font-medium">Valor Orçado (R$)</label>
                    <Input
                      id="valor"
                      type="number"
                      value={novoProjeto.valor || ''}
                      onChange={(e) => handleNovoProjetoChange('valor', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
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
                  <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
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
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Outros Filtros
            </Button>
          </div>
        </div>

        {/* Layout de quadros - modelo Kanban */}
        <div className="flex gap-4 overflow-x-auto pb-6">
          {statusList.map((status) => (
            <div 
              key={status}
              className="flex-shrink-0 w-80 flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="mb-3 sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Badge className={cn("font-normal text-sm", statusColors[status])}>
                    {statusNames[status]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {projetosPorStatus(status).length} projeto(s)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {projetosPorStatus(status).map((projeto) => (
                  <Card 
                    key={projeto.id}
                    className={cn(
                      "cursor-move shadow-sm hover:shadow-md transition-all",
                      draggingId === projeto.id ? "opacity-50" : "opacity-100"
                    )}
                    draggable
                    onDragStart={(e) => handleDragStart(e, projeto.id)}
                    onDragEnd={() => setDraggingId(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-base">{projeto.titulo}</h3>
                        <MoveHorizontal className="h-4 w-4 text-muted-foreground opacity-50" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>{projeto.cliente}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{projeto.responsavel}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{projeto.dataPrevista}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="font-medium text-sm">
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(projeto.valor)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 py-2 flex justify-end gap-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentProjeto(projeto);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          excluirProjeto(projeto.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                {projetosPorStatus(status).length === 0 && (
                  <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <p className="text-sm">Sem projetos neste status</p>
                  </div>
                )}
              </div>
            </div>
          ))}
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
                <label htmlFor="edit-titulo" className="text-sm font-medium">Título do Projeto</label>
                <Input
                  id="edit-titulo"
                  value={currentProjeto.titulo}
                  onChange={(e) => setCurrentProjeto({...currentProjeto, titulo: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="edit-cliente" className="text-sm font-medium">Cliente</label>
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
                  <label htmlFor="edit-responsavel" className="text-sm font-medium">Responsável</label>
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
                  <label htmlFor="edit-data-prevista" className="text-sm font-medium">Data Prevista</label>
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
                  <label htmlFor="edit-valor" className="text-sm font-medium">Valor Orçado (R$)</label>
                  <Input
                    id="edit-valor"
                    type="number"
                    value={currentProjeto.valor}
                    onChange={(e) => setCurrentProjeto({...currentProjeto, valor: parseFloat(e.target.value) || 0})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
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
                <label htmlFor="edit-descricao" className="text-sm font-medium">Descrição</label>
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
