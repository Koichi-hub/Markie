import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { useCallback, useEffect } from 'react';
import { routes } from '.';
import { PageLoader } from '../components/page-loader';
import { isAccessTokenValid } from '../utils';
import { getMe } from '../store/appSlice';

export const AuthorizedRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(state => state.app.user);
  const isUserLoading = useAppSelector(state => state.app.isUserLoading);

  const checkUser = useCallback(async () => {
    if ((isAccessTokenValid() && user) || isUserLoading) return;

    try {
      const userDto = await dispatch(getMe()).unwrap();
      if (!userDto) navigate(`${routes.statusCode}?status_code=401`);
    } catch (e) {
      navigate(`${routes.statusCode}?status_code=401`);
    }
  }, [dispatch, isUserLoading, navigate, user]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return isUserLoading ? (
    <PageLoader text="Идет загрузка данных, подождите..." />
  ) : (
    <Outlet />
  );
};
