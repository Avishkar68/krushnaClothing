import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders"; 
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center mt-6">
      <Outlet />
      </div>
      {/* <Footer /> */}
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
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
