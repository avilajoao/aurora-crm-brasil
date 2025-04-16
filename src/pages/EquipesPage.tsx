
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users, Phone, Mail, Briefcase } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo
const equipesExemplo = [
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
  const [equipes] = useState(equipesExemplo);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipes = equipes.filter((equipe) =>
    equipe.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipe.lider.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipe.membros.some(membro => membro.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Equipes</h1>
            <p className="text-muted-foreground">Gerencie as equipes da empresa</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Equipe
          </Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipes.map((equipe) => (
            <Card key={equipe.id} className="overflow-hidden">
              <div className="bg-primary/10 p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{equipe.nome}</h3>
                  <Badge>{equipe.membros.length + 1} membros</Badge>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={equipe.lider.avatar} alt={equipe.lider.nome} />
                    <AvatarFallback>{equipe.lider.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{equipe.lider.nome}</div>
                    <div className="text-sm text-muted-foreground">Líder da Equipe</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{equipe.lider.cargo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{equipe.lider.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{equipe.lider.telefone}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Membros da equipe</span>
                    <Badge variant="outline">{equipe.projetosAtivos} projetos ativos</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {equipe.membros.map((membro) => (
                      <Avatar key={membro.id} className="h-8 w-8 border border-border" title={membro.nome}>
                        <AvatarImage src={membro.avatar} alt={membro.nome} />
                        <AvatarFallback className="text-xs">{membro.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
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
