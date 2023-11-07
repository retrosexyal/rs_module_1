import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { dataLoader } from "./components/Content";
import { SearchProvider } from "./providers/SearchProviders";
import { MainLayout } from "./layouts/MainLayout";
import { ContentLayout } from "./layouts/ContentLayout";
import { DetailsCard } from "./components/DetailsCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        path="search?/:search?/page?/:page?"
        element={<ContentLayout />}
        loader={dataLoader}
      >
        <Route
          path="details/:name?"
          element={<DetailsCard />}
          loader={dataLoader}
        />
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <div>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </div>
  );
}

export default App;
