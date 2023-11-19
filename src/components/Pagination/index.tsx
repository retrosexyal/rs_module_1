import { NavLink } from "react-router-dom";
import styles from "./pagination.module.scss";
import { useAppSelector } from "../../hooks/redux";

interface IProps {
  number: number;
}
export const Pagination: React.FC<IProps> = ({ number = 1 }) => {
  const { value: inputValue } = useAppSelector((state) => state.search);
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
