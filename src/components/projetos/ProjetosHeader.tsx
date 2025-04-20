
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProjetosHeaderProps {
  onNewProject: () => void;
}

export function ProjetosHeader({ onNewProject }: ProjetosHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
        <p className="text-muted-foreground">Gerencie e acompanhe todos os projetos</p>
      </div>
      <Button onClick={onNewProject}>
        <Plus className="mr-2 h-4 w-4" /> Novo Projeto
      </Button>
    </div>
  );
}
