import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import { StatusCompra, Compra } from "@/types";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PermissionButton } from "@/components/auth/PermissionGuard";
import { ComprasBoard } from "@/components/compras/ComprasBoard";
import { NovaCompraDialog } from "@/components/compras/NovaCompraDialog";

const statusColors: Record<string, string> = {
  pendente: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  parcialmente_recebida: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  recebida: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelada: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusNames: Record<string, string> = {
  pendente: "Pendente",
  parcialmente_recebida: "Parcialmente Recebida",
  recebida: "Recebida",
  cancelada: "Cancelada",
};

// Dados de exemplo
const comprasExemplo = [
  {
    id: "1",
    solicitacaoId: "1",
    projetoId: "1",
    fornecedorId: "3",
    responsavelId: "1",
    numeroNotaFiscal: "NF-12345",
    valorTotal: 12500,
    dataCompra: new Date("2023-05-18"),
    dataEntrega: new Date("2023-05-25"),
    status: "recebida" as StatusCompra,
    itens: []
  },
  {
    id: "2",
    solicitacaoId: "2",
    projetoId: "2",
    fornecedorId: "4",
    responsavelId: "1",
    valorTotal: 85600,
    dataCompra: new Date("2023-06-02"),
    status: "pendente" as StatusCompra,
    itens: []
  },
  {
    id: "3",
    solicitacaoId: "3",
    projetoId: "1",
    fornecedorId: "2",
    responsavelId: "1",
    numeroNotaFiscal: "NF-12378",
    valorTotal: 4200,
    dataCompra: new Date("2023-05-23"),
    dataEntrega: new Date("2023-05-30"),
    status: "parcialmente_recebida" as StatusCompra,
    itens: []
  },
  {
    id: "4",
    solicitacaoId: "5",
    projetoId: "4",
    fornecedorId: "1",
    responsavelId: "2",
    valorTotal: 27800,
    dataCompra: new Date("2023-06-03"),
    status: "pendente" as StatusCompra,
    itens: []
  },
  {
    id: "5",
    projetoId: "3",
    fornecedorId: "5",
    responsavelId: "1",
    numeroNotaFiscal: "NF-5678",
    valorTotal: 2950,
    dataCompra: new Date("2023-04-05"),
    dataEntrega: new Date("2023-04-15"),
    status: "cancelada" as StatusCompra,
    itens: []
  },
];

export function ComprasPage() {
  const [compras, setCompras] = useState<Compra[]>(comprasExemplo);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompra, setSelectedCompra] = useState<Compra | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isNovaCompraDialogOpen, setIsNovaCompraDialogOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredCompras = compras.filter((compra) =>
    compra.id.includes(searchTerm) || 
    compra.numeroNotaFiscal?.includes(searchTerm) ||
    compra.projetoId.includes(searchTerm)
  );

  const handleStatusChange = (status: StatusCompra) => {
    if (selectedCompra) {
      const updatedCompras = compras.map(compra => 
        compra.id === selectedCompra.id ? { ...compra, status } : compra
      );
      
      setCompras(updatedCompras);
      setIsStatusDialogOpen(false);
      
      toast({
        title: "Status atualizado",
        description: `A compra #${selectedCompra.id} agora está com status "${statusNames[status]}"`,
        variant: "default",
      });
    }
  };

  const adicionarCompra = (novaCompra: Compra) => {
    setCompras([...compras, novaCompra]);
    toast({
      title: "Compra adicionada",
      description: `A compra #${novaCompra.id} foi adicionada com sucesso.`,
      variant: "default",
    });
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("id", id);
    setDraggingId(id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent, status: StatusCompra) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    
    if (!id) return;
    
    const comprasAtualizadas = compras.map(compra => {
      if (compra.id === id) {
        return { ...compra, status };
      }
      return compra;
    });
    
    setCompras(comprasAtualizadas);
    setDraggingId(null);
    
    toast({
      title: "Status atualizado",
      description: `Compra #${id} movida para ${statusNames[status]}.`,
    });
  };

  const statusList: StatusCompra[] = ["pendente", "parcialmente_recebida", "recebida", "cancelada"];

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
            <p className="text-muted-foreground">Gerencie todas as compras da empresa</p>
          </div>
          <PermissionButton
            requiredPermission={["edit_purchase_values", "edit_purchase_requests"]}
            component={
              <Button onClick={() => setIsNovaCompraDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Nova Compra
              </Button>
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar compras..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filtrar
            </Button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6">
          {statusList.map((status) => (
            <ComprasBoard
              key={status}
              status={status}
              compras={filteredCompras}
              draggingId={draggingId}
              onDragStart={handleDragStart}
              onDragEnd={() => setDraggingId(null)}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onEditClick={(compra) => {
                setSelectedCompra(compra);
                setIsStatusDialogOpen(true);
              }}
              statusNames={statusNames}
              statusColors={statusColors}
            />
          ))}
        </div>

        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizar Status da Compra</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Compra #{selectedCompra?.id}</label>
                <Select
                  defaultValue={selectedCompra?.status}
                  onValueChange={(value) => handleStatusChange(value as StatusCompra)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="parcialmente_recebida">Parcialmente Recebida</SelectItem>
                    <SelectItem value="recebida">Recebida</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>Cancelar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <NovaCompraDialog
          open={isNovaCompraDialogOpen}
          onOpenChange={setIsNovaCompraDialogOpen}
          onCompraAdicionada={adicionarCompra}
        />
      </div>
    </AppLayout>
  );
}
