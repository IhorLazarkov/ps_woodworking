import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductsPage from '../components/AllProductsPage';
import ProductDetails from '../components/ProductDetailsPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/c/:department',
        element: <ProductsPage />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetails />,
      },
      // {
      //   path: 'session',
      //   element: <UserAccountPage />
      // }
    ],
  },
]);
