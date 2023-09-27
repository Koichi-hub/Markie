import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Main } from './pages/main';
import { Auth } from './pages/auth';
import { Provider } from 'react-redux';
import { store } from './store';
import { Note } from './pages/note';

const router = createBrowserRouter([
  {
    path: '',
    element: <Welcome />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/note',
    element: <Note />,
    children: [
      {
        path: '/note/:noteGuid',
        element: <Note />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
