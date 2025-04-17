
import { AppLayout } from '@/components/layout/AppLayout';
import { useToast } from "@/hooks/use-toast";
import { TarefasBoard } from "@/components/tarefas/TarefasBoard";
import { TarefasHeader } from "@/components/tarefas/TarefasHeader";
import { TarefasSearchFilters } from "@/components/tarefas/TarefasSearchFilters";
import { TasksProvider } from "@/contexts/TasksContext";
import { statusList, statusTarefas, prioridadeTarefas } from "./tarefas.constants";
import { tarefasExemplo } from '@/data/tarefas-exemplo';

export function TarefasPage() {
  const { toast } = useToast();

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
