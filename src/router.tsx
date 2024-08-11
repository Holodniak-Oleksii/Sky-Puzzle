import { Base } from "@/components/layouts/Base";

import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;