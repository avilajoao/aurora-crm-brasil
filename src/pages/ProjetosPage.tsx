import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { useToast } from "@/hooks/use-toast";
import { ProjetosHeader } from "@/components/projetos/ProjetosHeader";
import { ProjetosFilters } from "@/components/projetos/ProjetosFilters";
import { ProjetoFormDialog } from "@/components/projetos/ProjetoFormDialog";
import { ProjetosBoard } from "@/components/projetos/ProjetosBoard";
import { Projeto, projectsData, clientes, responsaveis, statusList, statusNames, statusColors } from "@/data/projetos";
import { StatusProjeto } from "@/types";

export function ProjetosPage() {
  const { toast } = useToast();
  const [projetos, setProjetos] = useState<Projeto[]>(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProjeto, setCurrentProjeto] = useState<Projeto | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  
  const [novoProjeto, setNovoProjeto] = useState<Omit<Projeto, 'id'>>({
    titulo: '',
    cliente: '',
    responsavel: '',
    valor: 0,
    status: 'em_analise',
    dataPrevista: '',
    descricao: ''
  });

  const adicionarProjeto = () => {
    if (!novoProjeto.titulo || !novoProjeto.cliente || !novoProjeto.dataPrevista) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const novoProjCompleto: Projeto = {
      id: (projetos.length + 1).toString(),
      ...novoProjeto
    };

    setProjetos([...projetos, novoProjCompleto]);
    setNovoProjeto({
      titulo: '',
      cliente: '',
      responsavel: '',
      valor: 0,
      status: 'em_analise',
      dataPrevista: '',
      descricao: ''
    });
    setIsDialogOpen(false);
    toast({
      title: "Projeto adicionado",
      description: "O projeto foi adicionado com sucesso.",
    });
  };

  const atualizarProjeto = () => {
    if (currentProjeto) {
      const projetosAtualizados = projetos.map(proj =>
        proj.id === currentProjeto.id ? currentProjeto : proj
      );
      setProjetos(projetosAtualizados);
      setIsEditDialogOpen(false);
      toast({
        title: "Projeto atualizado",
        description: "As informações do projeto foram atualizadas com sucesso.",
      });
    }
  };

  const excluirProjeto = (id: string) => {
    setProjetos(projetos.filter(projeto => projeto.id !== id));
    toast({
      title: "Projeto excluído",
      description: "O projeto foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const projetosFiltrados = projetos.filter((projeto) => {
    const matchesSearch = projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filtroStatus === "todos" || projeto.status === filtroStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("id", id);
    setDraggingId(id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent, status: StatusProjeto) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    
    const projetosAtualizados = projetos.map(projeto => {
      if (projeto.id === id) {
        return { ...projeto, status };
      }
      return projeto;
    });
    
    setProjetos(projetosAtualizados);
    setDraggingId(null);
    
    toast({
      title: "Status atualizado",
      description: `Projeto movido para ${status}.`,
    });
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <ProjetosHeader onNewProject={() => setIsDialogOpen(true)} />
        
        <ProjetosFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filtroStatus={filtroStatus}
          onStatusFilterChange={setFiltroStatus}
        />

        <div className="flex gap-4 overflow-x-auto pb-6">
          {statusList.map((status) => (
            <ProjetosBoard
              key={status}
              status={status}
              projetos={projetosFiltrados}
              draggingId={draggingId}
              onDragStart={handleDragStart}
              onDragEnd={() => setDraggingId(null)}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onEditClick={(projeto) => {
                setCurrentProjeto(projeto);
                setIsEditDialogOpen(true);
              }}
              onDeleteClick={excluirProjeto}
              statusNames={statusNames}
              statusColors={statusColors}
            />
          ))}
        </div>

        <ProjetoFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          projeto={novoProjeto}
          setProjeto={setNovoProjeto}
          onSubmit={adicionarProjeto}
          title="Adicionar Novo Projeto"
          description="Preencha os dados do projeto para adicioná-lo ao sistema."
          submitLabel="Adicionar Projeto"
          clientes={clientes}
          responsaveis={responsaveis}
        />

        <ProjetoFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          projeto={currentProjeto || {}}
          setProjeto={setCurrentProjeto}
          onSubmit={atualizarProjeto}
          title="Editar Projeto"
          description="Atualize as informações do projeto."
          submitLabel="Salvar Alterações"
          clientes={clientes}
          responsaveis={responsaveis}
        />
      </div>
    </AppLayout>
  );
}
