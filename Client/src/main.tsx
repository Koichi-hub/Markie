import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Main } from './pages/main';
import { Auth } from './pages/auth';
import { Provider } from 'react-redux';
import { store } from './store';

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
    path: '/auth',
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
