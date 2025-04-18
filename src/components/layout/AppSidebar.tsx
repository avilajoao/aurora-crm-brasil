
import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Calendar,
  CheckSquare,
  CircleDollarSign,
  ClipboardList,
  Contact,
  FileText,
  Home,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

// Main sidebar component with props interface
interface AppSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const { hasPermission } = useAuth();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar isOpen={isOpen} onToggle={onToggle}>
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <div className="flex items-center gap-2 font-semibold">
            <Building2 className="h-6 w-6" />
            <span className="text-lg">Aurora CRM</span>
          </div>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Home className="h-[1.2rem] w-[1.2rem]" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/leads" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Contact className="h-[1.2rem] w-[1.2rem]" />
                  <span>Leads</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/clientes" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Users className="h-[1.2rem] w-[1.2rem]" />
                  <span>Clientes</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/projetos" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <ClipboardList className="h-[1.2rem] w-[1.2rem]" />
                  <span>Projetos</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/orcamentos" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <FileText className="h-[1.2rem] w-[1.2rem]" />
                  <span>Orçamentos</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/compras" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                  <span>Compras</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/compras/solicitacoes" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Package className="h-[1.2rem] w-[1.2rem]" />
                  <span>Solicitações</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/fornecedores" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Truck className="h-[1.2rem] w-[1.2rem]" />
                  <span>Fornecedores</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/equipes" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Users className="h-[1.2rem] w-[1.2rem]" />
                  <span>Equipes</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/calendario" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <Calendar className="h-[1.2rem] w-[1.2rem]" />
                  <span>Calendário</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/tarefas" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <CheckSquare className="h-[1.2rem] w-[1.2rem]" />
                  <span>Tarefas</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/chat" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <MessageSquare className="h-[1.2rem] w-[1.2rem]" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink to="/relatorios" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <BarChart3 className="h-[1.2rem] w-[1.2rem]" />
                  <span>Relatórios</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
            {hasPermission('add_user') && (
              <SidebarMenuItem>
                <NavLink to="/usuarios" className={({ isActive }) => isActive ? "active" : ""}>
                  <SidebarMenuButton>
                    <Users className="h-[1.2rem] w-[1.2rem]" />
                    <span>Usuários</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <NavLink to="/financeiro" className={({ isActive }) => isActive ? "active" : ""}>
                <SidebarMenuButton>
                  <CircleDollarSign className="h-[1.2rem] w-[1.2rem]" />
                  <span>Financeiro</span>
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between p-4">
            <NavLink to="/configuracoes">
              <Button variant="ghost" size="icon">
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Configurações</span>
              </Button>
            </NavLink>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
