import useAuthorization from '../../hooks/useAuthorization';

export default function ShowFor({
  roles = [],
  fallback = null,
  children,
}) {
  const { hasRole } = useAuthorization();

  const roleOk = roles.length ? hasRole(...roles) : true;

  if (roleOk) return children;
  return fallback;
}