
import { AppLayout } from '@/components/layout/AppLayout';
import { useToast } from "@/hooks/use-toast";
import { TarefasBoard } from "@/components/tarefas/TarefasBoard";
import { TarefasHeader } from "@/components/tarefas/TarefasHeader";
import { TarefasSearchFilters } from "@/components/tarefas/TarefasSearchFilters";
import { TasksProvider } from "@/contexts/TasksContext";
import { statusList, statusTarefas, prioridadeTarefas } from "@/components/tarefas/tarefas.constants";
import { tarefasExemplo } from '@/data/tarefas-exemplo';
import { useTasks } from '@/contexts/TasksContext';

export function TarefasPage() {
  const { toast } = useToast();
  const { tarefas, setTarefas, searchTerm } = useTasks();
  
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("tarefaId", id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, novoStatus: string) => {
    e.preventDefault();
    const tarefaId = e.dataTransfer.getData("tarefaId");
    
    const tarefasAtualizadas = tarefas.map(tarefa => {
      if (tarefa.id === tarefaId) {
        return { ...tarefa, status: novoStatus as any };
      }
      return tarefa;
    });
    
    setTarefas(tarefasAtualizadas);
    toast({
      title: "Tarefa atualizada",
      description: `Status da tarefa atualizado com sucesso.`,
    });
  };

  return (
    <TasksProvider initialTarefas={tarefasExemplo}>
      <AppLayout>
        <div className="container py-6 space-y-6 max-w-7xl">
          <TarefasHeader />
          <TarefasSearchFilters />
          
          {/* Layout de quadros para tarefas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[calc(100vh-16rem)]">
            {statusList.map((status) => (
              <div key={status} className="border rounded-md p-4">
                <TarefasBoard 
                  status={status}
                  tarefas={tarefas.filter(t => searchTerm ? t.titulo.toLowerCase().includes(searchTerm.toLowerCase()) : true)}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragStart={handleDragStart}
                  prioridadeTarefas={prioridadeTarefas}
                  statusTarefas={statusTarefas}
                />
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    </TasksProvider>
  );
}
