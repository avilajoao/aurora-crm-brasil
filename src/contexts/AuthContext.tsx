
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, Notificacao } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  hasPermission: (permission: string) => boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
  notificacoes: Notificacao[];
  addNotificacao: (notificacao: Omit<Notificacao, 'id' | 'dataCriacao'>) => void;
  marcarNotificacaoComoLida: (id: string) => void;
}

// Default user for demo purposes
const defaultUser: User = {
  id: '1',
  nome: 'Administrador Sistema',
  email: 'admin@auroracrm.com.br',
  cargo: 'admin',
  dataCriacao: new Date(),
  avatar: '/avatars/admin.png',
  departamento: 'Administração',
  telefone: '(11) 99999-9999',
  ultimoAcesso: new Date(),
  nivelAcesso: ['admin'],
  ativo: true,
};

// Permission map based on user roles
const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    'all',
    'view_financials',
    'edit_financials',
    'add_user',
    'edit_user',
    'delete_user',
    'view_purchase_requests',
    'edit_purchase_requests',
    'approve_purchase_requests',
    'view_team_allocation',
    'edit_team_allocation',
    'change_budget_status',
    'view_budget_values',
    'edit_budget_values',
    'view_purchase_values',
    'edit_purchase_values'
  ],
  gestor: [
    'view_financials',
    'edit_financials',
    'add_user',
    'edit_user',
    'view_purchase_requests',
    'edit_purchase_requests',
    'approve_purchase_requests',
    'view_team_allocation',
    'edit_team_allocation',
    'change_budget_status',
    'view_budget_values',
    'edit_budget_values',
    'view_purchase_values',
    'edit_purchase_values'
  ],
  supervisor: [
    'view_financials',
    'view_purchase_requests',
    'edit_purchase_requests',
    'approve_purchase_requests',
    'view_team_allocation',
    'edit_team_allocation',
    'change_budget_status',
    'view_budget_values',
    'view_purchase_values'
  ],
  rh: [
    'add_user',
    'edit_user',
    'view_team_allocation',
    'edit_team_allocation',
    'view_financials'
  ],
  operador: [
    'view_purchase_requests',
    'view_team_allocation',
  ],
  cliente: [
    'view_own_projects',
  ],
  vendas: [
    'view_budget_values',
    'edit_budget_values',
    'change_budget_status',
    'view_team_allocation'
  ],
  comprador: [
    'view_purchase_requests',
    'edit_purchase_requests',
    'approve_purchase_requests',
    'view_purchase_values',
    'edit_purchase_values',
    'change_purchase_status',
    'view_team_allocation'
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser); // Using default user for demo
  const [userRole, setUserRole] = useState<UserRole | null>(defaultUser.cargo as UserRole);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  
  // Check if the user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!currentUser || !userRole) return false;
    
    // Admin has all permissions
    if (userRole === 'admin') return true;
    
    // Check if the role has the specific permission
    return rolePermissions[userRole].includes(permission) || 
           rolePermissions[userRole].includes('all');
  };

  const login = (user: User) => {
    setCurrentUser(user);
    setUserRole(user.cargo as UserRole);
    // In a real app, you would also store the auth token and user info in localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    // In a real app, you would also clear the auth token and user info from localStorage
  };

  const updateUserRole = (role: UserRole) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, cargo: role };
      setCurrentUser(updatedUser as User);
      setUserRole(role);
    }
  };

  const addNotificacao = (notificacao: Omit<Notificacao, 'id' | 'dataCriacao'>) => {
    const novaNotificacao: Notificacao = {
      ...notificacao,
      id: Date.now().toString(),
      dataCriacao: new Date(),
      lida: false
    };
    
    setNotificacoes(prev => [novaNotificacao, ...prev]);
  };

  const marcarNotificacaoComoLida = (id: string) => {
    setNotificacoes(prev => prev.map(notificacao => 
      notificacao.id === id ? {...notificacao, lida: true} : notificacao
    ));
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated: !!currentUser, 
      userRole, 
      hasPermission,
      login,
      logout,
      updateUserRole,
      notificacoes,
      addNotificacao,
      marcarNotificacaoComoLida
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
