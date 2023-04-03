import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DialogTrainer, Main } from "./pages";
import { Suspense, useState } from "react";

export const App = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<></>}>
          <Main onSelectSituation={setCurrentPrompt} />
        </Suspense>
      ),
    },
    {
      path: "/dialog-trainer",
      element: (
        <Suspense fallback={<></>}>
          <DialogTrainer currentPrompt={currentPrompt ?? ""} />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
