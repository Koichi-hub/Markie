import { createBrowserRouter } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Auth } from './pages/auth';
import { Notes } from './pages/notes';

type Routes = {
  root: '';
  welcome: '/welcome';
  notes: '/notes';
  auth: '/auth';
};

export const routes: Routes = {
  root: '',
  welcome: '/welcome',
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
    path: routes.notes,
    element: <Notes />,
    children: [
      {
        path: `${routes.notes}/:noteGuid`,
      },
    ],
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
]);
