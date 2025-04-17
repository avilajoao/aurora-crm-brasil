
import { Search, Filter, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/contexts/TasksContext';

export function TarefasSearchFilters() {
  const { searchTerm, setSearchTerm } = useTasks();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar tarefas..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" /> Filtrar
        </Button>
        <Button variant="outline" className="flex gap-2">
          <User className="h-4 w-4" /> Minhas Tarefas
        </Button>
      </div>
    </div>
  );
}
