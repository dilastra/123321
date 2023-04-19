import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Trainer } from "./pages";
import { Suspense } from "react";
import KY from "./api/api";

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
(async function () {
  console.log(await KY.get("whois").json());
})();

export const App = () => <RouterProvider router={router} />;
