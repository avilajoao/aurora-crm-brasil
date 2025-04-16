import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Phone, Mail, Briefcase, PlusCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Team, TeamMember, Project } from "@/types/teams";
import { useAuth } from "@/contexts/AuthContext";
import { PermissionGuard, PermissionButton } from "@/components/auth/PermissionGuard";
import { NovaEquipe } from "@/components/equipes/NovaEquipe";

const projetosExemplo: Project[] = [
  {
    id: "1",
    nome: "Construção Residencial Vila Nova",
    status: "em_andamento",
    membrosAlocados: []
  },
  {
    id: "2",
    nome: "Reforma Comercial Centro",
    status: "em_andamento",
    membrosAlocados: []
  },
  {
    id: "3",
    nome: "Edifício Corporativo Tower",
    status: "em_andamento",
    membrosAlocados: []
  }
];

const equipesExemplo: Team[] = [
  {
    id: "1",
    nome: "Equipe de Construção Civil",
    lider: {
      id: "1",
      nome: "Carlos Mendes",
      cargo: "Engenheiro Civil",
      email: "carlos.mendes@auroracrm.com.br",
      telefone: "(11) 98765-4321",
      avatar: "/avatars/carlos.png"
    },
    membros: [
      {
        id: "2",
        nome: "Paulo Santos",
        cargo: "Mestre de Obras",
        email: "paulo.santos@auroracrm.com.br",
        avatar: "/avatars/paulo.png"
      },
      {
        id: "3",
        nome: "Roberto Oliveira",
        cargo: "Técnico em Edificações",
        email: "roberto.oliveira@auroracrm.com.br",
        avatar: "/avatars/roberto.png"
      },
      {
        id: "4",
        nome: "Marcos Silva",
        cargo: "Pedreiro",
        email: "marcos.silva@auroracrm.com.br",
        avatar: "/avatars/marcos.png"
      }
    ],
    projetosAtivos: 3
  },
  {
    id: "2",
    nome: "Equipe de Instalações Elétricas",
    lider: {
      id: "5",
      nome: "Mariana Costa",
      cargo: "Engenheira Eletricista",
      email: "mariana.costa@auroracrm.com.br",
      telefone: "(11) 97654-3210",
      avatar: "/avatars/mariana.png"
    },
    membros: [
      {
        id: "6",
        nome: "Lucas Ferreira",
        cargo: "Eletricista Chefe",
        email: "lucas.ferreira@auroracrm.com.br",
        avatar: "/avatars/lucas.png"
      },
      {
        id: "7",
        nome: "Rodrigo Lima",
        cargo: "Eletricista",
        email: "rodrigo.lima@auroracrm.com.br",
        avatar: "/avatars/rodrigo.png"
      }
    ],
    projetosAtivos: 2
  },
  {
    id: "3",
    nome: "Equipe de Arquitetura e Design",
    lider: {
      id: "8",
      nome: "Ana Silva",
      cargo: "Arquiteta",
      email: "ana.silva@auroracrm.com.br",
      telefone: "(11) 96543-2109",
      avatar: "/avatars/ana.png"
    },
    membros: [
      {
        id: "9",
        nome: "Fernanda Santos",
        cargo: "Designer de Interiores",
        email: "fernanda.santos@auroracrm.com.br",
        avatar: "/avatars/fernanda.png"
      },
      {
        id: "10",
        nome: "Gustavo Pereira",
        cargo: "Projetista 3D",
        email: "gustavo.pereira@auroracrm.com.br",
        avatar: "/avatars/gustavo.png"
      },
      {
        id: "11",
        nome: "Juliana Martins",
        cargo: "Arquiteta Júnior",
        email: "juliana.martins@auroracrm.com.br",
        avatar: "/avatars/juliana.png"
      }
    ],
    projetosAtivos: 4
  }
];

export function EquipesPage() {
  const [equipes, setEquipes] = useState<Team[]>(equipesExemplo);
  const [projetos, setProjetos] = useState<Project[]>(projetosExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { hasPermission } = useAuth();

  const filteredEquipes = equipes.filter((equipe) =>
    equipe.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipe.lider.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipe.membros.some(membro => membro.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const alocarMembro = (membroId: string, projetoId: string, equipeId: string) => {
    if (!hasPermission('edit_team_allocation')) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para alocar membros em projetos.",
        variant: "destructive",
      });
      return;
    }

    const projetoAtualizado = projetos.map(projeto => {
      if (projeto.id === projetoId) {
        const equipe = equipes.find(e => e.id === equipeId);
        const membro = equipe?.membros.find(m => m.id === membroId) || 
                      equipe?.lider.id === membroId ? equipe.lider : null;
        
        if (membro && !projeto.membrosAlocados.find(m => m.id === membroId)) {
          return {
            ...projeto,
            membrosAlocados: [...projeto.membrosAlocados, membro]
          };
        }
      }
      return projeto;
    });

    setProjetos(projetoAtualizado);
    toast({
      title: "Membro alocado",
      description: "Membro foi alocado ao projeto com sucesso.",
      variant: "default",
    });
  };

  const handleAddEquipe = (novaEquipe: Team) => {
    setEquipes([...equipes, novaEquipe]);
  };

  const AlocacaoDialog = ({ membro, equipeId }: { membro: TeamMember; equipeId: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Alocar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alocar Membro a Projeto</DialogTitle>
          <DialogDescription>
            Selecione o projeto para alocar {membro.nome}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Select onValueChange={(projetoId) => alocarMembro(membro.id, projetoId, equipeId)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                {projetos.map((projeto) => (
                  <SelectItem key={projeto.id} value={projeto.id}>
                    {projeto.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderMemberCard = (membro: TeamMember, equipeId: string, isLider: boolean = false) => (
    <div key={membro.id} className="flex items-start justify-between p-3 border rounded-lg bg-background">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={membro.avatar} alt={membro.nome} />
          <AvatarFallback>{membro.nome.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium flex items-center gap-2">
            {membro.nome}
            {isLider && <Badge variant="outline">Líder</Badge>}
          </div>
          <div className="text-sm text-muted-foreground">{membro.cargo}</div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{membro.email}</span>
          </div>
          {membro.telefone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{membro.telefone}</span>
            </div>
          )}
        </div>
      </div>
      <PermissionGuard requiredPermission="edit_team_allocation">
        <AlocacaoDialog membro={membro} equipeId={equipeId} />
      </PermissionGuard>
    </div>
  );

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Equipes</h1>
            <p className="text-muted-foreground">Gerencie as equipes da empresa</p>
          </div>
          <PermissionGuard requiredPermission="edit_team_allocation">
            <NovaEquipe onAddEquipe={handleAddEquipe} />
          </PermissionGuard>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar equipes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredEquipes.map((equipe) => (
            <Card key={equipe.id} className="overflow-hidden">
              <div className="bg-primary/10 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{equipe.nome}</h3>
                    <Badge variant="outline" className="mt-1">
                      {equipe.projetosAtivos} projetos ativos
                    </Badge>
                  </div>
                  <Badge>{equipe.membros.length + 1} membros</Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Líder da Equipe</h4>
                    {renderMemberCard(equipe.lider, equipe.id, true)}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Membros da Equipe</h4>
                    <div className="space-y-3">
                      {equipe.membros.map((membro) => renderMemberCard(membro, equipe.id))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
