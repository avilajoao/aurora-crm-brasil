
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Edit, MoveHorizontal, FileText, Building2, User, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
import { PermissionGuard, PermissionButton } from "@/components/auth/PermissionGuard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredCompras = compras.filter((compra) =>
    compra.id.includes(searchTerm) || 
    compra.numeroNotaFiscal?.includes(searchTerm) ||
    compra.projetoId.includes(searchTerm)
  );

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

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

  // Função para iniciar o arrastar
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("id", id);
    setDraggingId(id);
  };
  
  // Função para permitir soltar
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  // Função para finalizar a movimentação
  const handleDrop = (e: React.DragEvent, status: StatusCompra) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    
    if (!id) return;
    
    // Atualiza o status da compra arrastada
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

  // Agrupamento das compras por status
  const comprasPorStatus = (status: StatusCompra) => {
    return filteredCompras.filter(compra => compra.status === status);
  };

  // Lista de todos os status para exibir as colunas
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
              <Button>
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

        {/* Layout de quadros para compras */}
        <div className="flex gap-4 overflow-x-auto pb-6">
          {statusList.map((status) => (
            <div 
              key={status}
              className="flex-shrink-0 w-80 flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="mb-3 sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Badge className={cn("font-normal text-sm", statusColors[status])}>
                    {statusNames[status]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {comprasPorStatus(status).length} compra(s)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {comprasPorStatus(status).map((compra) => (
                  <Card 
                    key={compra.id}
                    className={cn(
                      "cursor-move shadow-sm hover:shadow-md transition-all",
                      draggingId === compra.id ? "opacity-50" : "opacity-100"
                    )}
                    draggable
                    onDragStart={(e) => handleDragStart(e, compra.id)}
                    onDragEnd={() => setDraggingId(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-base">Compra #{compra.id}</h3>
                        <MoveHorizontal className="h-4 w-4 text-muted-foreground opacity-50" />
                      </div>
                      <div className="space-y-1.5 my-2">
                        <div className="flex items-center gap-1 text-sm">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>NF: {compra.numeroNotaFiscal || "Pendente"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Projeto #{compra.projetoId}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Responsável #{compra.responsavelId}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{formatarData(compra.dataCompra)}</span>
                        </div>
                      </div>
                      <PermissionGuard
                        requiredPermission="view_purchase_values"
                        fallback={<div className="mt-3 text-sm text-muted-foreground">Valor: Restrito</div>}
                      >
                        <div className="mt-3 font-medium">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(compra.valorTotal)}
                        </div>
                      </PermissionGuard>
                    </CardContent>
                    <CardFooter className="px-4 py-2 flex justify-end gap-2 border-t">
                      <PermissionGuard requiredPermission="change_purchase_status">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCompra(compra);
                            setIsStatusDialogOpen(true);
                          }}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </PermissionGuard>
                    </CardFooter>
                  </Card>
                ))}
                {comprasPorStatus(status).length === 0 && (
                  <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <p className="text-sm">Sem compras neste status</p>
                  </div>
                )}
              </div>
            </div>
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
      </div>
    </AppLayout>
  );
}
