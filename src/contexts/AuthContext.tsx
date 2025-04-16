
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  hasPermission: (permission: string) => boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
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
  ],
  supervisor: [
    'view_financials',
    'view_purchase_requests',
    'edit_purchase_requests',
    'approve_purchase_requests',
    'view_team_allocation',
    'edit_team_allocation',
  ],
  rh: [
    'add_user',
    'edit_user',
    'view_team_allocation',
    'edit_team_allocation',
  ],
  operador: [
    'view_purchase_requests',
    'view_team_allocation',
  ],
  cliente: [
    'view_own_projects',
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser); // Using default user for demo
  const [userRole, setUserRole] = useState<UserRole | null>(defaultUser.cargo as UserRole);
  
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

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated: !!currentUser, 
      userRole, 
      hasPermission,
      login,
      logout,
      updateUserRole
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
