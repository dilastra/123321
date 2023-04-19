import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Trainer } from "./pages";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/trainer",
    element: (
      <Suspense fallback={<></>}>
        <Trainer />
      </Suspense>
    ),
  },
]);

export const App = () => <RouterProvider router={router} />;
