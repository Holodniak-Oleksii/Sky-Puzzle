import { Base } from '@/components/layouts/Base';
import { Details } from '@/pages/Details';
import { Home } from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ':id',
        element: <Details />,
      },
    ],
  },
]);

export default router;
