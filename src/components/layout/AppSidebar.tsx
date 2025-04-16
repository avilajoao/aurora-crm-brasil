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

export function AppSidebar() {
  const { hasPermission } = useAuth();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
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
              <SidebarMenuButton asChild tooltip="Dashboard">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                  <Home className="h-[1.2rem] w-[1.2rem]" />
                  <span>Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Leads">
                <NavLink to="/leads" className={({ isActive }) => isActive ? "active" : ""}>
                  <Contact className="h-[1.2rem] w-[1.2rem]" />
                  <span>Leads</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Clientes">
                <NavLink to="/clientes" className={({ isActive }) => isActive ? "active" : ""}>
                  <Users className="h-[1.2rem] w-[1.2rem]" />
                  <span>Clientes</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Projetos">
                <NavLink to="/projetos" className={({ isActive }) => isActive ? "active" : ""}>
                  <ClipboardList className="h-[1.2rem] w-[1.2rem]" />
                  <span>Projetos</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Orçamentos">
                <NavLink to="/orcamentos" className={({ isActive }) => isActive ? "active" : ""}>
                  <FileText className="h-[1.2rem] w-[1.2rem]" />
                  <span>Orçamentos</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Compras">
                <NavLink to="/compras" className={({ isActive }) => isActive ? "active" : ""}>
                  <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                  <span>Compras</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Solicitações">
                <NavLink to="/compras/solicitacoes" className={({ isActive }) => isActive ? "active" : ""}>
                  <Package className="h-[1.2rem] w-[1.2rem]" />
                  <span>Solicitações</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Fornecedores">
                <NavLink to="/fornecedores" className={({ isActive }) => isActive ? "active" : ""}>
                  <Truck className="h-[1.2rem] w-[1.2rem]" />
                  <span>Fornecedores</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Equipes">
                <NavLink to="/equipes" className={({ isActive }) => isActive ? "active" : ""}>
                  <Users className="h-[1.2rem] w-[1.2rem]" />
                  <span>Equipes</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Calendário">
                <NavLink to="/calendario" className={({ isActive }) => isActive ? "active" : ""}>
                  <Calendar className="h-[1.2rem] w-[1.2rem]" />
                  <span>Calendário</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Tarefas">
                <NavLink to="/tarefas" className={({ isActive }) => isActive ? "active" : ""}>
                  <CheckSquare className="h-[1.2rem] w-[1.2rem]" />
                  <span>Tarefas</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Chat">
                <NavLink to="/chat" className={({ isActive }) => isActive ? "active" : ""}>
                  <MessageSquare className="h-[1.2rem] w-[1.2rem]" />
                  <span>Chat</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Relatórios">
                <NavLink to="/relatorios" className={({ isActive }) => isActive ? "active" : ""}>
                  <BarChart3 className="h-[1.2rem] w-[1.2rem]" />
                  <span>Relatórios</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {hasPermission('add_user') && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Usuários">
                  <NavLink to="/usuarios" className={({ isActive }) => isActive ? "active" : ""}>
                    <Users className="h-[1.2rem] w-[1.2rem]" />
                    <span>Usuários</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Financeiro">
                <NavLink to="/financeiro" className={({ isActive }) => isActive ? "active" : ""}>
                  <CircleDollarSign className="h-[1.2rem] w-[1.2rem]" />
                  <span>Financeiro</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" asChild>
              <NavLink to="/configuracoes">
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Configurações</span>
              </NavLink>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
