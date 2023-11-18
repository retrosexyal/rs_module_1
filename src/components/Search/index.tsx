import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Input } from "../UI/Input/indext";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import styles from "./search.module.scss";
import { changeSearchValue } from "../../store/slices/searchSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.search);

  const handleClick = async () => {
    LocalStorageManager.set("search", value);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValue(e.target.value));
  };

  return (
    <div className={styles["search-wrapper"]}>
      <Input onChange={handleInputChange} value={value} />
      <Link
        to={`search/${value || "getallcharacters"}/page`}
        onClick={handleClick}
        className={styles.btn}
        data-testid="search-btn"
      >
        Search
      </Link>
    </div>
  );
};
