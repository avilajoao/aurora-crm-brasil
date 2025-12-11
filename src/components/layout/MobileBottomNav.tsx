
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Calendar, CheckSquare, MessageSquare, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/projetos', icon: ClipboardList, label: 'Projetos' },
  { to: '/tarefas', icon: CheckSquare, label: 'Tarefas' },
  { to: '/calendario', icon: Calendar, label: 'Agenda' },
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
];

const moreNavItems = [
  { to: '/leads', label: 'Leads' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/orcamentos', label: 'Orçamentos' },
  { to: '/compras', label: 'Compras' },
  { to: '/fornecedores', label: 'Fornecedores' },
  { to: '/equipes', label: 'Equipes' },
  { to: '/financeiro', label: 'Financeiro' },
  { to: '/relatorios', label: 'Relatórios' },
  { to: '/configuracoes', label: 'Configurações' },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex items-center justify-around h-14">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-muted-foreground transition-colors min-w-0',
                isActive && 'text-primary'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium truncate">{item.label}</span>
          </NavLink>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-muted-foreground">
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">Mais</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 mb-2">
            {moreNavItems.map((item) => (
              <DropdownMenuItem key={item.to} asChild>
                <NavLink to={item.to} className="w-full cursor-pointer">
                  {item.label}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
