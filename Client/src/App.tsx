import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';
import { getMe } from './store/appSlice';
import { useAppDispatch } from './store';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
};
