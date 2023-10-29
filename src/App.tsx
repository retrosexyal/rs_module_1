import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { SearchProvider } from "./providers/SearchProviders";

function App() {
  return (
    <div>
      <SearchProvider>
        <Header />
        <Content />
      </SearchProvider>
    </div>
  );
}

export default App;
