import React, { useContext, useEffect, useRef } from "react";
import SearchContext from "../../providers/SearchProviders";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import { FetchData } from "../../api/FetchData";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";

export const Content: React.FC = () => {
  const { data, isLoading, handleLoading, handleData } =
    useContext(SearchContext);
  const handleLoadingRef = useRef(handleLoading);
  const handleDataRef = useRef(handleData);

  useEffect(() => {
    const lastSearch = LocalStorageManager.get("search");
    handleLoadingRef.current(true);

    const fetchData = async () => {
      try {
        const { data: searchData } = lastSearch
          ? await FetchData.getSearch(lastSearch)
          : await FetchData.getSearch();

        handleDataRef.current(searchData.results);
        handleLoadingRef.current(false);
        console.log(searchData);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleLoadingRef.current(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <div className={styles["content-wrapper"]}>
        {isLoading ? (
          <div>Loading...</div>
        ) : data && data.length > 0 ? (
          <>
            {data.map((person) => (
              <div key={person.name}>
                <Card person={person} />
              </div>
            ))}
          </>
        ) : (
          <div>not exist</div>
        )}
      </div>
    </Wrapper>
  );
};
