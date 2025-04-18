
import { TeamMember } from "@/types/teams";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MemberCardProps {
  membro: TeamMember;
  isLider?: boolean;
  isDraggable?: boolean;
}

export function MemberCard({ membro, isLider = false, isDraggable = true }: MemberCardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("memberId", membro.id);
    e.dataTransfer.setData("memberName", membro.nome);
    e.dataTransfer.setData("memberCargo", membro.cargo);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div 
      className={`flex items-start justify-between p-3 border rounded-lg bg-background ${isDraggable ? 'cursor-move' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
    >
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
    </div>
  );
}
