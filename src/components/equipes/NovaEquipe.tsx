
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Team, TeamMember } from "@/types/teams";

// Sample data for leaders
const lideresSample: TeamMember[] = [
  {
    id: "l1",
    nome: "Amanda Costa",
    cargo: "Engenheira Civil Sênior",
    email: "amanda.costa@auroracrm.com.br",
    telefone: "(11) 95555-1234",
    avatar: "/avatars/amanda.png",
  },
  {
    id: "l2",
    nome: "Ricardo Mendes",
    cargo: "Arquiteto Chefe",
    email: "ricardo.mendes@auroracrm.com.br",
    telefone: "(11) 95555-4321",
    avatar: "/avatars/ricardo.png",
  },
  {
    id: "l3",
    nome: "Luiza Ferreira",
    cargo: "Supervisora de Obras",
    email: "luiza.ferreira@auroracrm.com.br",
    telefone: "(11) 95555-5678",
    avatar: "/avatars/luiza.png",
  },
];

// Sample data for members
const membrosSample: TeamMember[] = [
  {
    id: "m1",
    nome: "Felipe Santos",
    cargo: "Engenheiro Junior",
    email: "felipe.santos@auroracrm.com.br",
    avatar: "/avatars/felipe.png",
  },
  {
    id: "m2",
    nome: "Carolina Lima",
    cargo: "Arquiteta Junior",
    email: "carolina.lima@auroracrm.com.br",
    avatar: "/avatars/carolina.png",
  },
  {
    id: "m3",
    nome: "Bruno Oliveira",
    cargo: "Técnico em Edificações",
    email: "bruno.oliveira@auroracrm.com.br",
    avatar: "/avatars/bruno.png",
  },
  {
    id: "m4",
    nome: "Daniela Silva",
    cargo: "Designer de Interiores",
    email: "daniela.silva@auroracrm.com.br",
    avatar: "/avatars/daniela.png",
  },
];

interface NovaEquipeProps {
  onAddEquipe: (equipe: Team) => void;
}

export const NovaEquipe: React.FC<NovaEquipeProps> = ({ onAddEquipe }) => {
  const [nome, setNome] = useState("");
  const [liderId, setLiderId] = useState("");
  const [membrosIds, setMembrosIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddEquipe = () => {
    if (!nome || !liderId) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome da equipe e selecione um líder.",
        variant: "destructive",
      });
      return;
    }

    const lider = lideresSample.find((l) => l.id === liderId);
    if (!lider) {
      toast({
        title: "Erro",
        description: "Líder não encontrado.",
        variant: "destructive",
      });
      return;
    }

    const membros = membrosSample.filter((m) => membrosIds.includes(m.id));

    const novaEquipe: Team = {
      id: `e${Date.now()}`,
      nome,
      lider,
      membros,
      projetosAtivos: 0,
    };

    onAddEquipe(novaEquipe);
    setOpen(false);
    setNome("");
    setLiderId("");
    setMembrosIds([]);

    toast({
      title: "Equipe criada",
      description: `A equipe ${nome} foi criada com sucesso.`,
    });
  };

  const handleMembrosChange = (membroId: string) => {
    setMembrosIds((prevIds) => {
      const exists = prevIds.includes(membroId);
      if (exists) {
        return prevIds.filter((id) => id !== membroId);
      } else {
        return [...prevIds, membroId];
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Equipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Equipe</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar uma nova equipe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lider" className="text-right">
              Líder
            </Label>
            <Select value={liderId} onValueChange={setLiderId}>
              <SelectTrigger className="col-span-3" id="lider">
                <SelectValue placeholder="Selecione um líder" />
              </SelectTrigger>
              <SelectContent>
                {lideresSample.map((lider) => (
                  <SelectItem key={lider.id} value={lider.id}>
                    {lider.nome} - {lider.cargo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Membros</Label>
            <div className="col-span-3 space-y-2">
              {membrosSample.map((membro) => (
                <div key={membro.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`membro-${membro.id}`}
                    checked={membrosIds.includes(membro.id)}
                    onChange={() => handleMembrosChange(membro.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor={`membro-${membro.id}`} className="text-sm font-normal">
                    {membro.nome} - {membro.cargo}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleAddEquipe}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
