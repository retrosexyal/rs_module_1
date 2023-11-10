import { Outlet, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { useContext, useEffect } from "react";
import SearchContext from "../providers/SearchProviders";
import { FetchData } from "../api/FetchData";

export const MainLayout = () => {
  const { handleData, handleLoading } = useContext(SearchContext);
  const { page, search } = useParams();
  useEffect(() => {
    const searchParam = search === "getallcharacters" ? "" : search;
    handleLoading(true);
    const fetchData = async () => {
      const { data } = await FetchData.getSearch(searchParam || "", page || "");
      return data;
    };
    fetchData()
      .then((data) => {
        handleData(data);
      })
      .then(() => handleLoading(false));
  }, [page, search]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
