
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { Send, PaperclipIcon, ImagePlus } from 'lucide-react';
import { Mensagem } from '@/types';
import { format } from 'date-fns';

export function ChatPage() {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const [chatMessages, setChatMessages] = useState<Mensagem[]>([
    {
      id: "1",
      texto: "Olá, como posso ajudar com o projeto?",
      remetenteId: "2",
      destinatarioId: "1",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      lida: true
    },
    {
      id: "2",
      texto: "Precisamos revisar o cronograma da obra.",
      remetenteId: "1",
      destinatarioId: "2",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5),
      lida: true
    },
    {
      id: "3",
      texto: "Claro! Podemos marcar uma reunião para amanhã às 10h?",
      remetenteId: "2",
      destinatarioId: "1",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24),
      lida: true
    },
    {
      id: "4",
      texto: "Perfeito. Vou preparar os documentos necessários.",
      remetenteId: "1",
      destinatarioId: "2",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 23),
      lida: true
    },
    {
      id: "5",
      texto: "Você pode enviar o relatório de progresso também?",
      remetenteId: "2",
      destinatarioId: "1",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 2),
      lida: true
    },
    {
      id: "6",
      texto: "Já estou finalizando e envio até o fim do dia.",
      remetenteId: "1",
      destinatarioId: "2",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 30),
      lida: true
    },
    {
      id: "7",
      texto: "Ótimo! Aguardo o documento para revisarmos na reunião.",
      remetenteId: "2",
      destinatarioId: "1",
      dataCriacao: new Date(Date.now() - 1000 * 60 * 15),
      lida: false
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Mensagem = {
      id: (chatMessages.length + 1).toString(),
      texto: message,
      remetenteId: currentUser?.id || "1",
      destinatarioId: "2", // ID fixo para o exemplo
      dataCriacao: new Date(),
      lida: false
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // Se a mensagem for de hoje, mostra apenas a hora
    if (messageDate.toDateString() === now.toDateString()) {
      return format(messageDate, 'HH:mm');
    }
    // Se a mensagem for de ontem, mostra "Ontem" e a hora
    else if (
      messageDate.getDate() === now.getDate() - 1 &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear()
    ) {
      return `Ontem ${format(messageDate, 'HH:mm')}`;
    }
    // Caso contrário, mostra a data completa
    else {
      return format(messageDate, 'dd/MM/yyyy HH:mm');
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-6xl h-[calc(100vh-70px)] py-4 flex flex-col">
        <div className="mb-4 pb-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/joao.png" alt="João" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">João Silva</h2>
              <p className="text-sm text-muted-foreground">Gestor de Projetos • Online</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-grow pr-4 mb-4">
          <div className="flex flex-col gap-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.remetenteId === (currentUser?.id || "1") ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    src={msg.remetenteId === (currentUser?.id || "1") ? "/avatars/admin.png" : "/avatars/joao.png"}
                    alt={msg.remetenteId === (currentUser?.id || "1") ? "Você" : "João"}
                  />
                  <AvatarFallback>{msg.remetenteId === (currentUser?.id || "1") ? "ME" : "JS"}</AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    msg.remetenteId === (currentUser?.id || "1")
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  <p>{msg.texto}</p>
                  <p className={`text-xs mt-1 ${
                    msg.remetenteId === (currentUser?.id || "1")
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}>
                    {formatMessageDate(msg.dataCriacao)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="pt-2 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button type="button" size="icon" variant="outline">
                <ImagePlus className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" disabled={message.trim() === ""}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
