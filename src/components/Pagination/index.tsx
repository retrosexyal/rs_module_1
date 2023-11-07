import { useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchContext from "../../providers/SearchProviders";
import styles from "./pagination.module.scss";

interface IProps {
  number: number;
}
export const Pagination: React.FC<IProps> = ({ number = 1 }) => {
  const { inputValue } = useContext(SearchContext);
  const array = Array(number).fill(undefined);
  return (
    <div className={styles["pagination-wrapper"]}>
      {array.map((_, ind) => (
        <NavLink
          to={`/search/${inputValue || "getallcharacters"}/page/${(
            ind + 1
          ).toString()}`}
          key={ind}
          className={styles["pagination-button"]}
        >
          {ind + 1}
        </NavLink>
      ))}
    </div>
  );
};
