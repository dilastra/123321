import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Trainer } from "./pages";
import { Suspense } from "react";
import { getTextFromSound } from "./api";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<></>}>
        <Trainer />
      </Suspense>
    ),
  },
]);

export const App = () => <RouterProvider router={router} />;
