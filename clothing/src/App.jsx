import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders"; 
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import Shop from "./pages/Shop";
import ProtectedAdmin from "./components/ProtectedAdmin";
import BlogDetails from "./pages/BlogDetails";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="flex justify-center mt-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> }, 
      { path: "/orders", element: <Orders /> }, 
      { path: "/blog", element: <Blog /> }, 
      { path: "/faq", element: <FAQ /> }, 
      { path: "/about-us", element: <AboutUs /> }, 
      { path: "/shop-now", element: <Shop /> }, 
      {path:"/blog/:id" ,element:<BlogDetails />}

    ],
  },
  // Admin Route moved OUTSIDE the Layout (No Navbar/Footer)
  {
    path: "/admin",
    element: <ProtectedAdmin />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;