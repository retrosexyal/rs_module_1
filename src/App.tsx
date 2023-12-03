import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Main } from "./pages/Main";
import { routes } from "./constants/routes";
import { UncontrolPage } from "./pages/UncontrolPage";
import { RHFPage } from "./pages/RHFPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Main />} />
      <Route path={routes.RHF} element={<RHFPage />} />
      <Route path={routes.UNCONTROL} element={<UncontrolPage />} />
      <Route path="/notfound" element={<h2>Page not found</h2>} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
