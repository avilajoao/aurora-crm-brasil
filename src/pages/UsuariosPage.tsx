
import { AppLayout } from '@/components/layout/AppLayout';
import { GerenciarUsuarios } from '@/components/usuarios/GerenciarUsuarios';
import { PermissionGuard } from '@/components/auth/PermissionGuard';
import { AlertTriangle } from 'lucide-react';

export function UsuariosPage() {
  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">Adicione, edite e gerencie as permissões dos usuários do sistema</p>
        </div>

        <PermissionGuard 
          requiredPermission="add_user"
          fallback={
            <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md flex gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <p className="text-yellow-700">
                Você não tem permissão para gerenciar usuários. Entre em contato com um administrador.
              </p>
            </div>
          }
        >
          <GerenciarUsuarios />
        </PermissionGuard>
      </div>
    </AppLayout>
  );
}
