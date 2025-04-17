
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Edit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusCompra, Compra } from "@/types";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Nota Fiscal</TableHead>
                <TableHead>Data da Compra</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <PermissionGuard requiredPermission="change_purchase_status">
                  <TableHead className="w-24">Ações</TableHead>
                </PermissionGuard>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompras.map((compra) => (
                <TableRow key={compra.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{compra.id}</TableCell>
                  <TableCell>Projeto #{compra.projetoId}</TableCell>
                  <TableCell>{compra.numeroNotaFiscal || '-'}</TableCell>
                  <TableCell>{formatarData(compra.dataCompra)}</TableCell>
                  <PermissionGuard
                    requiredPermission="view_purchase_values"
                    fallback={<TableCell>Restrito</TableCell>}
                  >
                    <TableCell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(compra.valorTotal)}</TableCell>
                  </PermissionGuard>
                  <TableCell>
                    <Badge className={cn("font-normal", statusColors[compra.status])}>
                      {statusNames[compra.status]}
                    </Badge>
                  </TableCell>
                  <PermissionGuard requiredPermission="change_purchase_status">
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCompra(compra);
                          setIsStatusDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </PermissionGuard>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
