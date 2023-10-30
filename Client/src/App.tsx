import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './store';
import { router } from './router';
import { useEffect } from 'react';
import { getMe } from './store/appSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
};
