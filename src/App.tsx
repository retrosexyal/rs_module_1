import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Content, dataLoader } from "./components/Content";
import { SearchProvider } from "./providers/SearchProviders";
import { MainLayout } from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="search/" element={<Content />} loader={dataLoader} />
      <Route path="search/:search?" element={<Content />} loader={dataLoader}>
        {/*         <Route path=":page" element={<DetailsCard />} loader={detailsLoader} /> */}
        <Route path="page/:page" element={<Content />} loader={dataLoader} />
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
