import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';
import { StatusCode } from '../pages/status-code';

export const AuthorizedRoute = () => {
  const user = useAppSelector(state => state.app.user);
  const isUserLoading = useAppSelector(state => state.app.isUserLoading);

  if (!user && !isUserLoading) return <StatusCode statusCode="401" />;
  return <Outlet />;
};
