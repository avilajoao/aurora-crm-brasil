
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const NotificacoesDialog = () => {
  const { notificacoes, marcarNotificacaoComoLida, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Filter notifications for current user
  const userNotificacoes = notificacoes.filter(
    notificacao => currentUser && notificacao.destinatarioIds.includes(currentUser.id)
  );

  const notificacoesNaoLidas = userNotificacoes.filter(n => !n.lida);

  const handleNotificacaoClick = (id: string) => {
    marcarNotificacaoComoLida(id);
  };

  const getNotificacaoTipoClasses = (tipo: 'info' | 'success' | 'warning' | 'error') => {
    switch (tipo) {
      case 'success': return 'bg-green-50 border-green-300';
      case 'warning': return 'bg-amber-50 border-amber-300';
      case 'error': return 'bg-red-50 border-red-300';
      default: return 'bg-blue-50 border-blue-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificacoesNaoLidas.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
              {notificacoesNaoLidas.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notificações</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-80">
          {userNotificacoes.length > 0 ? (
            <div className="space-y-2">
              {userNotificacoes.map((notificacao) => (
                <Card 
                  key={notificacao.id}
                  className={`border ${notificacao.lida ? 'bg-white' : getNotificacaoTipoClasses(notificacao.tipo)} cursor-pointer`}
                  onClick={() => handleNotificacaoClick(notificacao.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{notificacao.titulo}</h4>
                      <Badge variant="outline" className="text-xs">
                        {formatDistanceToNow(new Date(notificacao.dataCriacao), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notificacao.mensagem}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Não há notificações.
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
