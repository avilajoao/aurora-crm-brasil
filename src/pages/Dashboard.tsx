import { BarChart3, Building2, CreditCard, ShoppingCart } from 'lucide-react';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { AppLayout } from '@/components/layout/AppLayout';

// Sample data for projects list
const projectsData = [
  {
    id: '1',
    titulo: 'Reforma Escritório Central',
    cliente: 'Tech Solutions Ltda',
    responsavel: 'Ana Silva',
    valor: 85000,
    status: 'em_andamento',
    dataPrevista: '15/06/2023'
  },
  {
    id: '2',
    titulo: 'Construção Galpão Industrial',
    cliente: 'Indústrias Progresso S.A.',
    responsavel: 'Carlos Mendes',
    valor: 420000,
    status: 'aguardando_aprovacao',
    dataPrevista: '30/10/2023'
  },
  {
    id: '3',
    titulo: 'Instalação Elétrica Predial',
    cliente: 'Condomínio Vista Verde',
    responsavel: 'Mariana Costa',
    valor: 38500,
    status: 'concluido',
    dataPrevista: '22/04/2023'
  },
  {
    id: '4',
    titulo: 'Ampliação Fábrica de Alimentos',
    cliente: 'Sabores do Brasil S.A.',
    responsavel: 'Ricardo Oliveira',
    valor: 650000,
    status: 'em_analise',
    dataPrevista: '10/12/2023'
  },
  {
    id: '5',
    titulo: 'Manutenção Preventiva Maquinário',
    cliente: 'Metalúrgica Nacional',
    responsavel: 'Paulo Santos',
    valor: 22000,
    status: 'em_andamento',
    dataPrevista: '05/05/2023'
  },
];

export function Dashboard() {
  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral e estatísticas do sistema</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Projetos Ativos"
            value="24"
            trend={{ value: 12, isPositive: true }}
            icon={Building2}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatusCard
            title="Orçamentos Pendentes"
            value="8"
            trend={{ value: 4, isPositive: false }}
            icon={BarChart3}
            iconClassName="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
          />
          <StatusCard
            title="Compras em Aprovação"
            value="6"
            icon={ShoppingCart}
            description="Aguardando aprovação de gestores"
            iconClassName="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
          />
          <StatusCard
            title="Total de Orçamentos"
            value="R$ 1,8M"
            trend={{ value: 18, isPositive: true }}
            icon={CreditCard}
            iconClassName="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          />
        </div>

        <RecentProjects projects={projectsData} />
      </div>
    </AppLayout>
  );
}
