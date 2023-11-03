import { createBrowserRouter } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Auth } from './pages/auth';
import { Notes } from './pages/notes';
import { NotFound } from './pages/not-found';

type Routes = {
  root: '';
  welcome: '/welcome';
  notes: '/notes';
  auth: '/auth';
  notFound: '/not-found';
};

export const routes: Routes = {
  root: '',
  welcome: '/welcome',
  notes: '/notes',
  auth: '/auth',
  notFound: '/not-found',
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
    path: routes.notes,
    element: <Notes />,
  },
  {
    path: routes.auth,
    element: <Auth />,
    children: [
      {
        path: `${routes.auth}/:variant`,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
