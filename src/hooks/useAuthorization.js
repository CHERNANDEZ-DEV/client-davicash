import { useAuth } from '../context/AuthContext';

export default function useAuthorization() {
  const { userData, user } = useAuth();

  /** Comprueba si el usuario tiene (al menos) uno de los roles indicados */
  const hasRole = (...roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return { hasRole };
}