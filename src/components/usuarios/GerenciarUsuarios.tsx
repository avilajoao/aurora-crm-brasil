
import React, { useState } from 'react';
import { User, UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';

// Sample user data
const usuariosExemplo: User[] = [
  {
    id: '1',
    nome: 'Administrador Sistema',
    email: 'admin@auroracrm.com.br',
    cargo: 'admin',
    dataCriacao: new Date(),
    avatar: '/avatars/admin.png',
    departamento: 'Administração',
    ultimoAcesso: new Date(),
  },
  {
    id: '2',
    nome: 'João Silva',
    email: 'joao@auroracrm.com.br',
    cargo: 'gestor',
    dataCriacao: new Date(2023, 1, 15),
    avatar: '/avatars/joao.png',
    departamento: 'Gerência',
    ultimoAcesso: new Date(2024, 3, 10),
  },
  {
    id: '3',
    nome: 'Maria Santos',
    email: 'maria@auroracrm.com.br',
    cargo: 'supervisor',
    dataCriacao: new Date(2023, 3, 20),
    avatar: '/avatars/maria.png',
    departamento: 'Supervisão',
    ultimoAcesso: new Date(2024, 3, 12),
  },
  {
    id: '4',
    nome: 'Carlos Ferreira',
    email: 'carlos@auroracrm.com.br',
    cargo: 'operador',
    dataCriacao: new Date(2023, 5, 10),
    avatar: '/avatars/carlos.png',
    departamento: 'Operações',
    ultimoAcesso: new Date(2024, 3, 15),
  },
];

const cargoLabel: Record<UserRole, string> = {
  admin: 'Administrador',
  gestor: 'Gestor',
  supervisor: 'Supervisor',
  rh: 'Recursos Humanos',
  operador: 'Operador',
  cliente: 'Cliente',
  vendas: 'Vendas',
  comprador: 'Comprador'
};

const cargoColor: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  gestor: 'bg-blue-100 text-blue-800',
  supervisor: 'bg-purple-100 text-purple-800',
  rh: 'bg-green-100 text-green-800',
  operador: 'bg-yellow-100 text-yellow-800',
  cliente: 'bg-gray-100 text-gray-800',
  vendas: 'bg-pink-100 text-pink-800',
  comprador: 'bg-teal-100 text-teal-800'
};

export const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>(usuariosExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Form state for new user
  const [novoUsuario, setNovoUsuario] = useState<Partial<User>>({
    nome: '',
    email: '',
    cargo: 'operador',
    departamento: '',
  });
  
  const { toast } = useToast();

  const filteredUsuarios = usuarios.filter((usuario) => 
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.departamento?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.cargo) {
      toast({
        title: "Erro ao adicionar usuário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const newUser: User = {
      id: (usuarios.length + 1).toString(),
      nome: novoUsuario.nome || '',
      email: novoUsuario.email || '',
      cargo: novoUsuario.cargo as UserRole,
      departamento: novoUsuario.departamento || '',
      dataCriacao: new Date(),
      ultimoAcesso: new Date(),
      avatar: '/avatars/default.png',
    };

    setUsuarios([...usuarios, newUser]);
    setNovoUsuario({
      nome: '',
      email: '',
      cargo: 'operador',
      departamento: '',
    });
    setIsAddUserOpen(false);
    
    toast({
      title: "Usuário adicionado",
      description: `${newUser.nome} foi adicionado com sucesso.`,
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUsers = usuarios.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );

    setUsuarios(updatedUsers);
    setIsEditUserOpen(false);
    
    toast({
      title: "Usuário atualizado",
      description: `${selectedUser.nome} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = usuarios.filter(user => user.id !== userId);
    setUsuarios(updatedUsers);
    
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuários..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo usuário.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="nome">Nome Completo</label>
                <Input
                  id="nome"
                  value={novoUsuario.nome || ''}
                  onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email">E-mail</label>
                <Input
                  id="email"
                  type="email"
                  value={novoUsuario.email || ''}
                  onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cargo">Cargo</label>
                <Select 
                  value={novoUsuario.cargo} 
                  onValueChange={(value) => setNovoUsuario({...novoUsuario, cargo: value as UserRole})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
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
              
              <div className="space-y-2">
                <label htmlFor="departamento">Departamento</label>
                <Input
                  id="departamento"
                  value={novoUsuario.departamento || ''}
                  onChange={(e) => setNovoUsuario({...novoUsuario, departamento: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddUser}>Adicionar Usuário</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Lista de usuários cadastrados no sistema</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={usuario.avatar} alt={usuario.nome} />
                        <AvatarFallback>{usuario.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{usuario.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.departamento || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cargoColor[usuario.cargo as UserRole]}>
                      {cargoLabel[usuario.cargo as UserRole]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {usuario.ultimoAcesso ? new Date(usuario.ultimoAcesso).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditUserOpen && selectedUser?.id === usuario.id} onOpenChange={(open) => {
                        setIsEditUserOpen(open);
                        if (open) setSelectedUser(usuario);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => {
                            setSelectedUser(usuario);
                            setIsEditUserOpen(true);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Usuário</DialogTitle>
                            <DialogDescription>
                              Modifique as informações do usuário.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedUser && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label htmlFor="edit-nome">Nome Completo</label>
                                <Input
                                  id="edit-nome"
                                  value={selectedUser.nome}
                                  onChange={(e) => setSelectedUser({...selectedUser, nome: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="edit-email">E-mail</label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={selectedUser.email}
                                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="edit-cargo">Cargo</label>
                                <Select 
                                  value={selectedUser.cargo} 
                                  onValueChange={(value) => setSelectedUser({...selectedUser, cargo: value as UserRole})}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um cargo" />
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
                              
                              <div className="space-y-2">
                                <label htmlFor="edit-departamento">Departamento</label>
                                <Input
                                  id="edit-departamento"
                                  value={selectedUser.departamento || ''}
                                  onChange={(e) => setSelectedUser({...selectedUser, departamento: e.target.value})}
                                />
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>Cancelar</Button>
                            <Button onClick={handleEditUser}>Salvar Alterações</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDeleteUser(usuario.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
