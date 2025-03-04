import { lazy, Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartItems from "./pages/CartItems";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorBoundary from "../src/error/ErrorBoundary";
import SuccessPage from "./pages/SuccessPage";
import { CartProvider } from "./context/CartContext";

// Lazy-loaded components
const QRcodeDisplay = lazy(() => import("./pages/QRcodeDisplay"));
const MenuItems = lazy(() => import("./pages/MenuItems"));

const Fallback = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md">
    <CircularProgress color="secondary" />
    <span className="text-gray-800 text-lg mt-2 font-semibold">
      loading your dish menu...
    </span>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary>
          <QRcodeDisplay />
        </ErrorBoundary>
      </Suspense>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/menu/:restaurantId/:tableNo",
    element: (
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary>
          <MenuItems />
        </ErrorBoundary>
      </Suspense>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<Fallback />}>
        <CartItems />
      </Suspense>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
  );
}

export default App;
