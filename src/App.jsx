import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HomePage, Landing, Cart } from './Pages';

import { loader as landingLoader } from './Pages/Landing';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        // errorElement: <SingleError />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};
export default App;
