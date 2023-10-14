import { createBrowserRouter } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Main } from './pages/main';
import { Note } from './pages/note';
import { Auth } from './pages/auth';

type Routes = {
  root: '';
  welcome: '/welcome';
  main: '/main';
  notes: '/notes';
  auth: '/auth';
};

export const routes: Routes = {
  root: '',
  welcome: '/welcome',
  main: '/main',
  notes: '/notes',
  auth: '/auth',
};

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <Welcome />,
  },
  {
    path: routes.welcome,
    element: <Welcome />,
  },
  {
    path: routes.main,
    element: <Main />,
  },
  {
    path: routes.notes,
    element: <Note />,
    children: [
      {
        path: `${routes.notes}/:noteGuid`,
        element: <Note />,
      },
    ],
  },
  {
    path: routes.auth,
    element: <Auth />,
  },
]);
