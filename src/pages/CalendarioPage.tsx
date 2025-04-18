
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Evento {
  id: string;
  titulo: string;
  data: Date;
  duracao: string;
  tipo: string;
  concluido: boolean;
}

export function CalendarioPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  
  // Dados de exemplo com useState para permitir a atualização do estado
  const [eventos, setEventos] = useState<Evento[]>([
    { 
      id: "1", 
      titulo: "Reunião com Cliente", 
      data: new Date(new Date().setHours(10, 0)), 
      duracao: "1h", 
      tipo: "reuniao",
      concluido: false
    },
    { 
      id: "2", 
      titulo: "Visita à Obra", 
      data: new Date(new Date().setHours(14, 30)), 
      duracao: "2h", 
      tipo: "visita",
      concluido: false
    },
    { 
      id: "3", 
      titulo: "Entrega de Material", 
      data: new Date(new Date().setHours(9, 0)), 
      duracao: "30min", 
      tipo: "entrega",
      concluido: true
    },
    { 
      id: "4", 
      titulo: "Aprovação de Orçamento", 
      data: new Date(new Date().setDate(new Date().getDate() + 1)), 
      duracao: "1h", 
      tipo: "reuniao",
      concluido: false
    },
    { 
      id: "5", 
      titulo: "Início da Obra", 
      data: new Date(new Date().setDate(new Date().getDate() + 3)), 
      duracao: "Dia todo", 
      tipo: "obra",
      concluido: false
    }
  ]);

  // Filtra eventos para o dia selecionado
  const eventosDoDia = eventos.filter(evento => 
    date && 
    evento.data.getDate() === date.getDate() && 
    evento.data.getMonth() === date.getMonth() && 
    evento.data.getFullYear() === date.getFullYear()
  );

  // Ordena eventos por hora
  const eventosOrdenados = [...eventosDoDia].sort((a, b) => a.data.getTime() - b.data.getTime());

  // Função para marcar evento como concluído
  const toggleEventoConcluido = (id: string) => {
    setEventos(eventos.map(evento => 
      evento.id === id 
        ? { ...evento, concluido: !evento.concluido } 
        : evento
    ));
    
    const evento = eventos.find(e => e.id === id);
    toast({
      title: evento?.concluido ? "Evento reaberto" : "Evento concluído",
      description: `${evento?.titulo} foi ${evento?.concluido ? "reaberto" : "marcado como concluído"}.`,
    });
  };

  // Formata hora para exibição
  const formatarHora = (data: Date) => {
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Avança/retrocede mês
  const mudarMes = (direcao: 'anterior' | 'proximo') => {
    const novoMes = new Date(month);
    if (direcao === 'anterior') {
      novoMes.setMonth(novoMes.getMonth() - 1);
    } else {
      novoMes.setMonth(novoMes.getMonth() + 1);
    }
    setMonth(novoMes);
  };

  // Cores para tipos de eventos
  const tipoEventoCores: Record<string, string> = {
    reuniao: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    visita: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    entrega: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    obra: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendário</h1>
            <p className="text-muted-foreground">Agenda e eventos do projeto</p>
          </div>
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" /> Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" onClick={() => mudarMes('anterior')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-medium">
                {month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="outline" size="sm" onClick={() => mudarMes('proximo')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={month}
              onMonthChange={setMonth}
              className="border rounded-md p-3"
              classNames={{
                day_today: "bg-primary/10 text-primary rounded-md",
                day_selected: "bg-primary text-primary-foreground rounded-md font-bold",
              }}
            />
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Legenda</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(tipoEventoCores).map(([tipo, cor]) => (
                  <Badge key={tipo} className={cor}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-4 col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">
                {date ? date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Selecione uma data'}
              </h2>
            </div>

            {eventosOrdenados.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-22rem)]">
                <div className="space-y-3">
                  {eventosOrdenados.map((evento) => (
                    <div 
                      key={evento.id} 
                      className="flex p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-16 text-sm text-right text-muted-foreground mr-4">
                        {formatarHora(evento.data)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              checked={evento.concluido} 
                              onCheckedChange={() => toggleEventoConcluido(evento.id)}
                              id={`evento-${evento.id}`}
                            />
                            <h3 className={`font-medium ${evento.concluido ? 'line-through text-muted-foreground' : ''}`}>
                              {evento.titulo}
                            </h3>
                          </div>
                          <Badge className={tipoEventoCores[evento.tipo]}>
                            {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{evento.duracao}</span>
                        </div>
                        {evento.concluido && (
                          <div className="flex gap-1 mt-1 text-sm text-success">
                            <CheckCircle className="h-4 w-4" />
                            <span>Concluído</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-22rem)] text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mb-2" />
                <p>Não há eventos para esta data</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
