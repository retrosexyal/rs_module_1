import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import { Pagination } from "../Pagination";
import { getNumberOfPages } from "../../helpers/getNumberOfPages";
import { getPersonId } from "../../helpers/getPersonId";
import { CardDisplayControl } from "../CardDisplayControl";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetSearchQuery } from "../../store/services/strarWras";
import { changeContentIsLoading } from "../../store/slices/loadingSlice";

export const Content: React.FC = () => {
  const { value: inputValue } = useAppSelector((state) => state.search);
  const { contentIsLoading } = useAppSelector((state) => state.loading);
  const { value } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState(0);
  const { page, search } = useParams();
  const location = useLocation();
  const isNotRootUrl = location.pathname !== "/";

  const searchParam = search === "getallcharacters" ? "" : search;
  const { data, isFetching } = useGetSearchQuery({
    search: searchParam || "",
    page: page || "1",
  });
  useEffect(() => {
    if (isFetching) {
      dispatch(changeContentIsLoading(true));
    } else dispatch(changeContentIsLoading(false));
    if (data) {
      setPages(getNumberOfPages(data));
    }
  }, [data, dispatch, isFetching]);

  return (
    <Wrapper>
      <CardDisplayControl />
      <div className={styles["content-wrapper"]}>
        {contentIsLoading ? (
          <div>loading</div>
        ) : data ? (
          data.results.map(
            (person, ind) =>
              ind < value && (
                <Link
                  to={`/search/${inputValue || "getallcharacters"}/${
                    page ? "page/" + page : "page"
                  }/details/${getPersonId(person.url)}`}
                  key={person.name}
                >
                  <Card person={person} />
                </Link>
              ),
          )
        ) : (
          <>{isNotRootUrl && <Navigate to="/notfound" />}</>
        )}
      </div>
      {pages > 1 && <Pagination number={pages} />}
    </Wrapper>
  );
};
