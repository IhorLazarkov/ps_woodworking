import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductsPage from '../components/AllProductsPage';
import ProductDetails from '../components/ProductDetailsPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import CartPage from "../components/CartPage";
import FavoritesPage from '../components/FavoritesPage/FavoritesPage';
import MyProductsPage from '../components/MyProductsPage';
import ProductForm from '../components/ProductForm/ProductForm';
import MyReviewsPage from '../components/MyReviewsPage/MyReviewsPage';
import OrderConfirmation from "../components/OrderConfirmation/OrderConfirmation";

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
        path: 'products/:productId',
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/favorites",
        element: <FavoritesPage />
      },
      {
        path:"products/current",
        element: <MyProductsPage />
      },
      {
        path:"products/edit/:productId",
        element: <ProductForm />
      },
      {
        path:"reviews",
        element: <MyReviewsPage />
      },
      {
        path:"orders/:orderId",
        element: <OrderConfirmation />
      }
      // {
      //   path: 'session',
      //   element: <UserAccountPage />
      // }
    ],
  },
]);
