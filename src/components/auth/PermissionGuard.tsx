
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGuardProps {
  requiredPermission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  requiredPermission,
  children,
  fallback = null,
}) => {
  const { hasPermission } = useAuth();
  
  if (hasPermission(requiredPermission)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

export const PermissionButton: React.FC<{
  requiredPermission: string;
  component: React.ReactElement;
}> = ({ requiredPermission, component }) => {
  const { hasPermission } = useAuth();
  
  if (hasPermission(requiredPermission)) {
    return component;
  }
  
  return null;
};
