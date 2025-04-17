
import React, { useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { NotificacoesDialog } from './NotificacoesDialog';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isMobile } = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fecha a barra lateral automaticamente em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Redirecionar para a página inicial se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Alternar navegação</span>
          </Button>
          <div className="flex items-center gap-2">
            <NotificacoesDialog />
            
            {currentUser && (
              <div className="flex items-center gap-2 pl-2 text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.nome} />
                  <AvatarFallback>{currentUser.nome[0]}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="font-medium">{currentUser.nome}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.cargo}</div>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
