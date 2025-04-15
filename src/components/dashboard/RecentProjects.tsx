
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

interface Project {
  id: string;
  titulo: string;
  cliente: string;
  responsavel: string;
  valor: number;
  status: string;
  dataPrevista: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle>Projetos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projeto</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Data Prevista</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.titulo}</TableCell>
                <TableCell>{project.cliente}</TableCell>
                <TableCell>{project.responsavel}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(project.valor)}
                </TableCell>
                <TableCell>
                  <Badge className={cn("font-normal", statusColors[project.status])}>
                    {statusNames[project.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{project.dataPrevista}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
