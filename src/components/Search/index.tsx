import React, { useContext, useEffect } from "react";
import { Input } from "../UI/Input/indext";
import { Button } from "../UI/Button";
import { FetchData } from "../../api/FetchData";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import SearchContext from "../../providers/SearchProviders";
import styles from "./search.module.scss";

export const Search: React.FC = () => {
  const { inputValue, handleInputChange, handleLoading, handleData } =
    useContext(SearchContext);

  const handleClick = async () => {
    handleLoading(true);
    LocalStorageManager.set("search", inputValue);

    try {
      const { data } = await FetchData.getSearch(inputValue);
      handleData(data.results);
      handleLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleLoading(false);
    }
  };

  useEffect(() => {
    const value = LocalStorageManager.get("search");
    if (value) {
      handleInputChange({
        target: { value },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);

  return (
    <div className={styles["search-wrapper"]}>
      <Input onChange={handleInputChange} value={inputValue} />
      <Button onClick={handleClick} text="find" />
    </div>
  );
};
