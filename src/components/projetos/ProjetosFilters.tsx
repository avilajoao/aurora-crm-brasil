
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { statusNames } from "@/data/projetos";

interface ProjetosFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filtroStatus: string;
  onStatusFilterChange: (value: string) => void;
}

export function ProjetosFilters({
  searchTerm,
  onSearchChange,
  filtroStatus,
  onStatusFilterChange
}: ProjetosFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar projetos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Select value={filtroStatus} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            {Object.entries(statusNames).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" /> Outros Filtros
        </Button>
      </div>
    </div>
  );
}
