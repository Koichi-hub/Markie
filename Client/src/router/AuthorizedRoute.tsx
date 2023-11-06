import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { useCallback, useEffect } from 'react';
import { routes } from '.';
import { getMe } from '../store/appSlice';
import { PageLoader } from '../components/page-loader';

export const AuthorizedRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(state => state.app.user);
  const isUserLoading = useAppSelector(state => state.app.isUserLoading);

  const checkUser = useCallback(async () => {
    try {
      const user = await dispatch(getMe()).unwrap();
      if (!user) navigate(`${routes.statusCode}?status_code=401`);
    } catch (e) {
      navigate(`${routes.statusCode}?status_code=401`);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) checkUser();
  }, [checkUser, user]);

  return !user && isUserLoading ? (
    <PageLoader text="Идет загрузка данных, подождите..." />
  ) : (
    <Outlet />
  );
};
