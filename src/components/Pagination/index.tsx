import Link from "next/link";
import styles from "./pagination.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { useRouter } from "next/router";

interface IProps {
  number: number;
}
export const Pagination: React.FC<IProps> = ({ number = 1 }) => {
  const { value: inputValue } = useAppSelector((state) => state.search);
  const array = Array(number).fill(undefined);
  const router = useRouter();
  const { page } = router.query;
  return (
    <div className={styles["pagination-wrapper"]}>
      {array.map((_, ind) => (
        <Link
          href={{
            pathname: `/search/`,
            query: {
              page: (ind + 1).toString(),
              character: inputValue || "getallcharacters",
            },
          }}
          key={ind}
          className={
            page === (ind + 1).toString() || page === undefined && (ind + 1) === 1
              ? styles.active
              : styles["pagination-button"]
          }
        >
          {ind + 1}
        </Link>
      ))}
    </div>
  );
};
