
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Image, Send, Smile, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Mensagem } from "@/types";

// Dados de exemplo
const contatosExemplo = [
  { id: "1", nome: "Ana Silva", cargo: "Gerente de Projetos", online: true, ultimaMensagem: "Acabei de revisar o orçamento que você enviou" },
  { id: "2", nome: "Carlos Mendes", cargo: "Engenheiro Civil", online: false, ultimaMensagem: "Vou precisar de mais materiais para a obra" },
  { id: "3", nome: "Mariana Costa", cargo: "Arquiteta", online: true, ultimaMensagem: "Os desenhos estão prontos para revisão" },
  { id: "4", nome: "Ricardo Oliveira", cargo: "Supervisor de Obras", online: true, ultimaMensagem: "A equipe já começou a preparação do terreno" },
  { id: "5", nome: "Paulo Santos", cargo: "Eletricista", online: false, ultimaMensagem: "Instalação finalizada conforme solicitado" },
  { id: "6", nome: "Laura Ribeiro", cargo: "Financeiro", online: true, ultimaMensagem: "Pagamento aprovado" },
  { id: "7", nome: "Fernando Alves", cargo: "Suprimentos", online: false, ultimaMensagem: "Os materiais chegam amanhã pela manhã" },
  { id: "8", nome: "Juliana Martins", cargo: "Cliente", online: false, ultimaMensagem: "Podemos agendar uma visita na próxima semana?" },
];

const mensagensExemplo: Mensagem[] = [
  {
    id: "1",
    remetente: {
      id: "2",
      nome: "Ana Silva",
      email: "ana.silva@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Projetos",
      dataCriacao: new Date("2023-01-10")
    },
    texto: "Olá! Acabei de revisar o orçamento que você enviou para o projeto de reforma do escritório central.",
    dataCriacao: new Date("2023-06-10T09:30:00"),
    lida: true
  },
  {
    id: "2",
    remetente: {
      id: "1",
      nome: "Usuário Exemplo",
      email: "usuario@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Administrativo",
      dataCriacao: new Date("2023-01-05")
    },
    texto: "Oi Ana! Obrigado por revisar. Encontrou algum ponto que precisa ser ajustado?",
    dataCriacao: new Date("2023-06-10T09:35:00"),
    lida: true
  },
  {
    id: "3",
    remetente: {
      id: "2",
      nome: "Ana Silva",
      email: "ana.silva@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Projetos",
      dataCriacao: new Date("2023-01-10")
    },
    texto: "Sim, na verdade precisamos revisar os custos de material elétrico. Parece que os preços aumentaram desde a última cotação.",
    dataCriacao: new Date("2023-06-10T09:40:00"),
    lida: true
  },
  {
    id: "4",
    remetente: {
      id: "1",
      nome: "Usuário Exemplo",
      email: "usuario@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Administrativo",
      dataCriacao: new Date("2023-01-05")
    },
    texto: "Entendi. Vou solicitar novas cotações com nossos fornecedores e atualizar o orçamento ainda hoje.",
    dataCriacao: new Date("2023-06-10T09:45:00"),
    lida: true
  },
  {
    id: "5",
    remetente: {
      id: "2",
      nome: "Ana Silva",
      email: "ana.silva@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Projetos",
      dataCriacao: new Date("2023-01-10")
    },
    texto: "Perfeito! Assim que tiver a versão atualizada, podemos agendar uma reunião com o cliente para apresentação.",
    dataCriacao: new Date("2023-06-10T09:50:00"),
    lida: true
  },
  {
    id: "6",
    remetente: {
      id: "2",
      nome: "Ana Silva",
      email: "ana.silva@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Projetos",
      dataCriacao: new Date("2023-01-10")
    },
    texto: "Também precisamos revisar o cronograma de execução, pois o cliente solicitou que a obra seja finalizada uma semana antes do previsto inicialmente.",
    dataCriacao: new Date("2023-06-10T09:52:00"),
    lida: true
  },
  {
    id: "7",
    remetente: {
      id: "1",
      nome: "Usuário Exemplo",
      email: "usuario@auroracrm.com.br",
      cargo: "gestor",
      departamento: "Administrativo",
      dataCriacao: new Date("2023-01-05")
    },
    texto: "Vou verificar com a equipe de execução se conseguimos antecipar a conclusão. Isso pode implicar em custos adicionais com horas extras. Devo incluir essa possibilidade no orçamento revisado?",
    dataCriacao: new Date("2023-06-10T10:00:00"),
    lida: true
  }
];

export function ChatPage() {
  const [contatos] = useState(contatosExemplo);
  const [mensagens] = useState<Mensagem[]>(mensagensExemplo);
  const [contatoSelecionado, setContatoSelecionado] = useState(contatosExemplo[0]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContatos = contatos.filter((contato) =>
    contato.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;
    
    // Aqui seria o envio da mensagem para o backend
    console.log("Mensagem enviada:", novaMensagem);
    
    // Limpa o campo após enviar
    setNovaMensagem("");
  };

  const formatarHora = (data: Date) => {
    return new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Lista de contatos */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contatos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredContatos.map((contato) => (
              <div
                key={contato.id}
                className={cn(
                  "p-3 cursor-pointer hover:bg-muted/50",
                  contatoSelecionado.id === contato.id && "bg-muted"
                )}
                onClick={() => setContatoSelecionado(contato)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={`/avatars/${contato.id}.png`} alt={contato.nome} />
                      <AvatarFallback>{contato.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {contato.online && (
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm truncate">{contato.nome}</h4>
                      <span className="text-xs text-muted-foreground">09:50</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contato.cargo}</p>
                    <p className="text-xs truncate">{contato.ultimaMensagem}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Área de chat */}
        <div className="flex-1 flex flex-col">
          {/* Cabeçalho do chat */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`/avatars/${contatoSelecionado.id}.png`} alt={contatoSelecionado.nome} />
                <AvatarFallback>{contatoSelecionado.nome.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{contatoSelecionado.nome}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className={cn(
                    "inline-block h-2 w-2 rounded-full mr-1",
                    contatoSelecionado.online ? "bg-green-500" : "bg-gray-400"
                  )}></span>
                  {contatoSelecionado.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Área de mensagens */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs bg-muted px-2 py-1 rounded-full">Hoje</span>
              </div>
              
              {mensagens.map((mensagem) => {
                const isCurrentUser = mensagem.remetente.id === "1";
                
                return (
                  <div 
                    key={mensagem.id} 
                    className={cn(
                      "flex",
                      isCurrentUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className="flex gap-2 max-w-[70%]">
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/avatars/${mensagem.remetente.id}.png`} alt={mensagem.remetente.nome} />
                          <AvatarFallback>{mensagem.remetente.nome.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div 
                          className={cn(
                            "rounded-lg p-3",
                            isCurrentUser 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          )}
                        >
                          {mensagem.texto}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 px-1">
                          {formatarHora(mensagem.dataCriacao)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Área de digitação */}
          <div className="p-4 border-t">
            <form onSubmit={handleEnviarMensagem} className="flex gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Input 
                placeholder="Digite uma mensagem..." 
                className="flex-1"
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
