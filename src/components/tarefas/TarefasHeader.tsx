
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TarefasHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
        <p className="text-muted-foreground">Acompanhe e gerencie suas tarefas</p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
      </Button>
    </div>
  );
}
