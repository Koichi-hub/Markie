import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';
import { getMe } from './store/appSlice';
import { useAppDispatch, useAppSelector } from './store';
import { PageLoader } from './components/page-loader';

export const App = () => {
  const dispatch = useAppDispatch();

  const isUserLoading = useAppSelector(state => state.app.isUserLoading);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return isUserLoading ? (
    <PageLoader text="Идет загрузка данных, подождите..." />
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
};
