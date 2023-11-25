import { ChangeEvent, useCallback, useEffect } from "react";
import Link from "next/link";
import { Input } from "../UI/Input/indext";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import styles from "./search.module.scss";
import { changeSearchValue } from "../../store/slices/searchSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useRouter } from "next/router";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.search);
  const router = useRouter();
  const path = router.pathname;
  useEffect(() => {
    const value = LocalStorageManager.get("search");
    if (path === "/" && value) {
      router.push({ pathname: "/search/", query: { character: value } });
    }
  }, [path, router]);

  useEffect(() => {
    const value = LocalStorageManager.get("search");
    if (value) {
      dispatch(changeSearchValue(value));
    }
  }, [dispatch]);

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
        href={{
          pathname: "/search/",
          query: { character: value, page: "1" },
        }}
        onClick={handleClick}
        className={styles.btn}
        data-testid="search-btn"
      >
        Search
      </Link>
    </div>
  );
};
