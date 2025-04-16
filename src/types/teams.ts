
export interface TeamMember {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone?: string;
  avatar: string;
  projetosAlocados?: string[];
}

export interface Team {
  id: string;
  nome: string;
  lider: TeamMember;
  membros: TeamMember[];
  projetosAtivos: number;
}

export interface Project {
  id: string;
  nome: string;
  status: 'em_andamento' | 'concluido' | 'pausado';
  membrosAlocados: TeamMember[];
}
