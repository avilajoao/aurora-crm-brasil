
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGuardProps {
  requiredPermission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  requiredPermission,
  children,
  fallback = null,
}) => {
  const { hasPermission } = useAuth();
  
  // Check if user has any of the required permissions
  const hasRequiredPermission = () => {
    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(permission => hasPermission(permission));
    }
    return hasPermission(requiredPermission);
  };
  
  if (hasRequiredPermission()) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

export const PermissionButton: React.FC<{
  requiredPermission: string | string[];
  component: React.ReactElement;
}> = ({ requiredPermission, component }) => {
  const { hasPermission } = useAuth();
  
  // Check if user has any of the required permissions
  const hasRequiredPermission = () => {
    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(permission => hasPermission(permission));
    }
    return hasPermission(requiredPermission);
  };
  
  if (hasRequiredPermission()) {
    return component;
  }
  
  return null;
};
