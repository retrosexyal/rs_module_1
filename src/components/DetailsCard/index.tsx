import { Link, useParams } from "react-router-dom";

import { Card } from "../Card";

import styles from "./details.module.scss";
import { useGetCharQuery } from "../../store/services/strarWras";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeDetailsIsLoading } from "../../store/slices/loadingSlice";
import { useEffect } from "react";

export const DetailsCard = () => {
  const { id, search, page } = useParams();
  const dispatch = useAppDispatch();
  const { detailsIsLoading } = useAppSelector((state) => state.loading);

  const { data, isFetching } = useGetCharQuery(id || "1");

  useEffect(() => {
    if (isFetching) {
      dispatch(changeDetailsIsLoading(true));
    } else dispatch(changeDetailsIsLoading(false));
  }, [dispatch, isFetching, data, id]);

  return (
    <div className={styles.wrapper} data-testid="details">
      {detailsIsLoading ? (
        <div data-testid="person-loading">loading...</div>
      ) : (
        data && (
          <>
            <Card person={data} />
            <p>details:</p>
            <p>eye color: {data?.eye_color}</p>
            <p>birth year: {data?.birth_year}</p>
            <p>mass: {data?.mass} kg</p>
            <Link
              to={`/search/${search}/page/${page || ""}`}
              className={styles.btn}
            >
              Close details
            </Link>
          </>
        )
      )}
    </div>
  );
};
