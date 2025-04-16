
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const RoleSelector: React.FC = () => {
  const { userRole, updateUserRole } = useAuth();
  const { toast } = useToast();

  const handleRoleChange = (role: UserRole) => {
    updateUserRole(role);
    
    toast({
      title: "Papel atualizado",
      description: `Seu papel foi alterado para ${getRoleName(role)}.`,
    });
  };

  const getRoleName = (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      admin: "Administrador",
      gestor: "Gestor",
      supervisor: "Supervisor",
      rh: "Recursos Humanos",
      operador: "Operador",
      cliente: "Cliente"
    };
    
    return roleNames[role] || role;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulação de Papéis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Para fins de demonstração, você pode alternar entre diferentes papéis para ver como o sistema se comporta.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="role-select" className="text-sm font-medium">
              Papel atual:
            </label>
            <Select
              value={userRole || 'operador'}
              onValueChange={(value) => handleRoleChange(value as UserRole)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione um papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="gestor">Gestor</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="rh">Recursos Humanos</SelectItem>
                <SelectItem value="operador">Operador</SelectItem>
                <SelectItem value="cliente">Cliente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={() => handleRoleChange('operador')}
              className="ml-auto mt-1"
            >
              Redefinir para Operador
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
