import { createBrowserRouter } from "react-router-dom";
import Aside from "../../Components/Aside";
import CategoryLayout from "../../Layout/CategoryLayout";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AllPhones from "../../Pages/CategoryProducts/CategoryProducts/AllPhones";
import CategoryProducts from "../../Pages/CategoryProducts/CategoryProducts/CategoryProducts";
import AddProduct from "../../Pages/DashBoard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/DashBoard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/DashBoard/AllSellers/AllSellers";
import MyBuyers from "../../Pages/DashBoard/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../../Pages/DashBoard/MyProducts/MyProducts";
import ProductEdit from "../../Pages/DashBoard/MyProducts/ProductEdit";
import MyWishList from "../../Pages/DashBoard/MyWishList/MyWishList";
import Payment from "../../Pages/DashBoard/Payment/Payment";
import ReportedProducts from "../../Pages/DashBoard/ReportedProducts/ReportedProducts";
import UserProfile from "../../Pages/DashBoard/UserProfile/UserProfile";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/category",
        element: <CategoryLayout />,
        children: [
          {
            path: "/category",
            element: <AllPhones />,
          },
          {
            path: "/category/:id",
            element: <CategoryProducts />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/myOrders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addProducts",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myBuyer",
        element: (
          <SellerRoute>
            <MyBuyers></MyBuyers>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allSeller",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allBuyer",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedProducts",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(
            `https://used-products-resale-server.vercel.app/order/${params.id}`
          ),
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/myWishList",
        element: (
          <BuyerRoute>
            <MyWishList />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/productEdit/:id",
        element: (
          <SellerRoute>
            <ProductEdit />
          </SellerRoute>
        ),
      },
    ],
  },
  // {
  //   path: "/side",
  //   element: <Aside />,
  // },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
