import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../UI/Input/indext";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import SearchContext from "../../providers/SearchProviders";
import styles from "./search.module.scss";

export const Search: React.FC = () => {
  const { inputValue, handleInputChange } = useContext(SearchContext);
  const handleInputChangeRef = useRef(handleInputChange);
  const navigate = useNavigate();

  const handleClick = async () => {
    LocalStorageManager.set("search", inputValue);
  };

  useEffect(() => {
    const value = LocalStorageManager.get("search");
    if (value) {
      handleInputChangeRef.current({
        target: { value },
      } as React.ChangeEvent<HTMLInputElement>);
      navigate(`search/${value}/page`);
    }
  }, [navigate]);

  return (
    <div className={styles["search-wrapper"]}>
      <Input onChange={handleInputChange} value={inputValue} />
      <NavLink
        to={`search/${inputValue || "getallcharacters"}/page`}
        onClick={handleClick}
        className={styles.btn}
      >
        Search
      </NavLink>
    </div>
  );
};
