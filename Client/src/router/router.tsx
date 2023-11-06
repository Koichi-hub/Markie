import { createBrowserRouter } from 'react-router-dom';
import { AuthorizedRoute } from './AuthorizedRoute';
import { Auth } from '../pages/auth';
import { Notes } from '../pages/notes';
import { StatusCode } from '../pages/status-code';
import { Welcome } from '../pages/welcome';

type Routes = {
  root: '';
  welcome: '/welcome';
  notes: '/notes';
  auth: '/auth';
  statusCode: '/status-code';
};

export const routes: Routes = {
  root: '',
  welcome: '/welcome',
  notes: '/notes',
  auth: '/auth',
  statusCode: '/status-code',
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
    element: <AuthorizedRoute />,
    children: [
      {
        path: routes.notes,
        element: <Notes />,
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
  {
    path: '*',
    element: <StatusCode />,
  },
]);
