
import {
  BarChart3,
  Building2,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Tag,
  UserPlus,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const location = useLocation();
  const [comprasOpen, setComprasOpen] = useState(
    location.pathname.includes('/compras')
  );

  // Verifica se o caminho atual corresponde ao link
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/" 
                    className={cn(
                      isActive('/') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/leads"
                    className={cn(
                      isActive('/leads') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <UserPlus />
                    <span>Prospecção</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/clientes"
                    className={cn(
                      isActive('/clientes') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <Building2 />
                    <span>Clientes</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/projetos"
                    className={cn(
                      isActive('/projetos') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <ClipboardList />
                    <span>Projetos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/orcamentos"
                    className={cn(
                      isActive('/orcamentos') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <FileText />
                    <span>Orçamentos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setComprasOpen(!comprasOpen)}
                  aria-expanded={comprasOpen}
                  className={cn(
                    (isActive('/compras') || isActive('/compras/solicitacoes')) 
                      ? "bg-sidebar-accent dark:bg-sidebar-accent/50" 
                      : ""
                  )}
                >
                  <ShoppingCart />
                  <span>Compras</span>
                  {comprasOpen ? (
                    <ChevronUp className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  )}
                </SidebarMenuButton>
                {comprasOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        asChild
                        isActive={isActive('/compras/solicitacoes')}
                      >
                        <a href="/compras/solicitacoes">Solicitações</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton 
                        asChild
                        isActive={location.pathname === '/compras'}
                      >
                        <a href="/compras">Pedidos de Compra</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/fornecedores"
                    className={cn(
                      isActive('/fornecedores') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <Tag />
                    <span>Fornecedores</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Equipe</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/equipes"
                    className={cn(
                      isActive('/equipes') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <Users />
                    <span>Equipes</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/calendario"
                    className={cn(
                      isActive('/calendario') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <Calendar />
                    <span>Calendário</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/tarefas"
                    className={cn(
                      isActive('/tarefas') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <ClipboardList />
                    <span>Tarefas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Comunicação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/chat"
                    className={cn(
                      isActive('/chat') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <MessageSquare />
                    <span>Chat</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/configuracoes"
                    className={cn(
                      isActive('/configuracoes') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <Settings />
                    <span>Configurações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="/relatorios"
                    className={cn(
                      isActive('/relatorios') ? "bg-sidebar-accent dark:bg-sidebar-accent/50" : ""
                    )}
                  >
                    <BarChart3 />
                    <span>Relatórios</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.png" alt="Usuário" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="truncate text-sm font-medium">Administrador</span>
            <span className="truncate text-xs text-muted-foreground">admin@auroracrm.com.br</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full hidden md:flex mt-2">
          <span className="mr-2">Recolher</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
