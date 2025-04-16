import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Plus, Filter, UserPlus, Phone, Mail, 
  Building2, ArrowRight, Trash2, Edit, CheckCircle, X 
} from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type LeadStatus = "novo" | "qualificado" | "negociacao" | "convertido" | "perdido";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  fonte: string;
  status: LeadStatus;
  dataCadastro: Date;
  ultimoContato: Date;
}

// Dados de exemplo
const leadsExemplo: Lead[] = [
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

const statusNomes: Record<string, string> = {
  novo: "Novo",
  qualificado: "Qualificado",
  negociacao: "Em Negociação",
  convertido: "Convertido",
  perdido: "Perdido"
};

export function LeadsPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(leadsExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isEditLeadOpen, setIsEditLeadOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  // Novo lead
  const [novoLead, setNovoLead] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    fonte: "Site",
  });

  const handleNovoLeadChange = (field: string, value: string) => {
    setNovoLead({
      ...novoLead,
      [field]: value
    });
  };

  const adicionarLead = () => {
    const id = (leads.length + 1).toString();
    const novoLeadCompleto: Lead = {
      id,
      ...novoLead,
      status: "novo",
      dataCadastro: new Date(),
      ultimoContato: new Date(),
    };

    setLeads([...leads, novoLeadCompleto]);
    setNovoLead({
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      fonte: "Site",
    });
    setIsAddLeadOpen(false);
    toast({
      title: "Lead adicionado",
      description: "O lead foi adicionado com sucesso.",
    });
  };

  const atualizarLead = () => {
    if (currentLead) {
      const updatedLeads = leads.map(lead => 
        lead.id === currentLead.id ? currentLead : lead
      );
      setLeads(updatedLeads);
      setIsEditLeadOpen(false);
      toast({
        title: "Lead atualizado",
        description: "As informações do lead foram atualizadas com sucesso.",
      });
    }
  };

  const excluirLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    toast({
      title: "Lead excluído",
      description: "O lead foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const atualizarStatusLead = (id: string, novoStatus: LeadStatus) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, status: novoStatus, ultimoContato: new Date() } : lead
    );
    setLeads(updatedLeads);
    
    if (novoStatus === "convertido") {
      toast({
        title: "Lead convertido em cliente",
        description: "O lead foi promovido para cliente com sucesso.",
        variant: "default",
      });
    } else {
      toast({
        title: "Status atualizado",
        description: `O lead foi atualizado para "${statusNomes[novoStatus]}".`,
      });
    }
  };

  // Dashboard cards
  const quantidadePorStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status).length;
  };

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
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Novo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Lead</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo lead para adicioná-lo ao sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome/Empresa</Label>
                  <Input 
                    id="nome" 
                    value={novoLead.nome} 
                    onChange={(e) => handleNovoLeadChange("nome", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={novoLead.email} 
                    onChange={(e) => handleNovoLeadChange("email", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    value={novoLead.telefone} 
                    onChange={(e) => handleNovoLeadChange("telefone", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Nome da Empresa</Label>
                  <Input 
                    id="empresa" 
                    value={novoLead.empresa} 
                    onChange={(e) => handleNovoLeadChange("empresa", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonte">Fonte</Label>
                  <Select 
                    value={novoLead.fonte} 
                    onValueChange={(value) => handleNovoLeadChange("fonte", value)}
                  >
                    <SelectTrigger id="fonte">
                      <SelectValue placeholder="Selecione a fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Site">Site</SelectItem>
                      <SelectItem value="Indicação">Indicação</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Evento">Evento</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddLeadOpen(false)}>Cancelar</Button>
                <Button onClick={adicionarLead}>Adicionar Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Novos</h3>
            <div className="text-2xl font-bold text-blue-600">{quantidadePorStatus("novo")}</div>
            <p className="text-sm text-muted-foreground">Leads para qualificar</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Qualificados</h3>
            <div className="text-2xl font-bold text-purple-600">{quantidadePorStatus("qualificado")}</div>
            <p className="text-sm text-muted-foreground">Em processo</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Em Negociação</h3>
            <div className="text-2xl font-bold text-amber-600">{quantidadePorStatus("negociacao")}</div>
            <p className="text-sm text-muted-foreground">Propostas enviadas</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Convertidos</h3>
            <div className="text-2xl font-bold text-green-600">{quantidadePorStatus("convertido")}</div>
            <p className="text-sm text-muted-foreground">Clientes conquistados</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Perdidos</h3>
            <div className="text-2xl font-bold text-red-600">{quantidadePorStatus("perdido")}</div>
            <p className="text-sm text-muted-foreground">Oportunidades perdidas</p>
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

        {filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">Nenhum lead encontrado</h3>
            <p className="text-muted-foreground mt-2">
              Não existem leads que correspondam aos critérios de pesquisa.
            </p>
            <Button onClick={() => setIsAddLeadOpen(true)} variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" /> Adicionar um novo lead
            </Button>
          </div>
        ) : (
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
                  <TableRow key={lead.id} className="hover:bg-muted/50">
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
                        {statusNomes[lead.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatarData(lead.dataCadastro)}</TableCell>
                    <TableCell>{formatarData(lead.ultimoContato)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => {
                              setCurrentLead(lead);
                              setIsEditLeadOpen(true);
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Atualizar Status do Lead</DialogTitle>
                              <DialogDescription>
                                Selecione o novo status para este lead.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                  defaultValue={lead.status}
                                  onValueChange={(value: LeadStatus) => atualizarStatusLead(lead.id, value)}
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue placeholder="Selecione o status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="novo">Novo</SelectItem>
                                    <SelectItem value="qualificado">Qualificado</SelectItem>
                                    <SelectItem value="negociacao">Em Negociação</SelectItem>
                                    <SelectItem value="convertido">Convertido para Cliente</SelectItem>
                                    <SelectItem value="perdido">Perdido</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {lead.status !== "convertido" && (
                                <div className="flex justify-end mt-4 gap-2">
                                  <Button 
                                    onClick={() => atualizarStatusLead(lead.id, "convertido")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Converter para Cliente
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => excluirLead(lead.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Dialog para editar lead */}
      <Dialog open={isEditLeadOpen} onOpenChange={setIsEditLeadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
            <DialogDescription>
              Atualize as informações do lead.
            </DialogDescription>
          </DialogHeader>
          {currentLead && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nome">Nome/Empresa</Label>
                <Input 
                  id="edit-nome" 
                  value={currentLead.nome} 
                  onChange={(e) => setCurrentLead({...currentLead, nome: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={currentLead.email} 
                  onChange={(e) => setCurrentLead({...currentLead, email: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-telefone">Telefone</Label>
                <Input 
                  id="edit-telefone" 
                  value={currentLead.telefone} 
                  onChange={(e) => setCurrentLead({...currentLead, telefone: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-empresa">Nome da Empresa</Label>
                <Input 
                  id="edit-empresa" 
                  value={currentLead.empresa} 
                  onChange={(e) => setCurrentLead({...currentLead, empresa: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-fonte">Fonte</Label>
                <Select 
                  value={currentLead.fonte} 
                  onValueChange={(value) => setCurrentLead({...currentLead, fonte: value})}
                >
                  <SelectTrigger id="edit-fonte">
                    <SelectValue placeholder="Selecione a fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Evento">Evento</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={currentLead.status} 
                  onValueChange={(value: LeadStatus) => setCurrentLead({...currentLead, status: value})}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="qualificado">Qualificado</SelectItem>
                    <SelectItem value="negociacao">Em Negociação</SelectItem>
                    <SelectItem value="convertido">Convertido</SelectItem>
                    <SelectItem value="perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLeadOpen(false)}>Cancelar</Button>
            <Button onClick={atualizarLead}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
