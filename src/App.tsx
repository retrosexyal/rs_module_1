import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SearchProvider } from "./providers/SearchProviders";
import { MainLayout } from "./layouts/MainLayout";
import { ContentLayout } from "./layouts/ContentLayout";
import { DetailsCard } from "./components/DetailsCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="search?/:search?/page?/:page?" element={<ContentLayout />}>
        <Route path="details/:id?" element={<DetailsCard />} />
      </Route>
      <Route path="/notfound" element={<h2>Page not found</h2>} />
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
