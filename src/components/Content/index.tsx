import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import { Pagination } from "../Pagination";
import { getNumberOfPages } from "../../helpers/getNumberOfPages";
import { getPersonId } from "../../helpers/getPersonId";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetSearchQuery } from "../../store/services/strarWras";
import { changeContentIsLoading } from "../../store/slices/loadingSlice";
import { changeItemsPerPageValue } from "../../store/slices/itemsPerPageSlice";

export const Content: React.FC = () => {
  const { value: inputValue } = useAppSelector((state) => state.search);
  const { contentIsLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState(0);
  const { page, search } = useParams();
  const location = useLocation();
  const isNotRootUrl =
    location.pathname !== "/" && !/^\/search\/?(.+)/.test(location.pathname);

  const searchParam = search === "getallcharacters" ? "" : search;
  const { data, isFetching } = useGetSearchQuery({
    search: searchParam || "",
    page: page || "1",
  });
  useEffect(() => {
    if (isFetching) {
      dispatch(changeContentIsLoading(true));
    } else {
      dispatch(changeContentIsLoading(false));
      if (data?.results) {
        dispatch(changeItemsPerPageValue(data.results));
      }
    }
    if (data) {
      setPages(getNumberOfPages(data));
    }
  }, [data, dispatch, isFetching]);

  return (
    <Wrapper>
      {pages > 1 && <Pagination number={pages} />}
      <div className={styles["content-wrapper"]}>
        {contentIsLoading ? (
          <div>loading</div>
        ) : data ? (
          data.results.map((person) => (
            <Link
              to={`/search/${inputValue || "getallcharacters"}/${
                page ? "page/" + page : "page"
              }/details/${getPersonId(person.url)}`}
              key={person.name}
            >
              <Card person={person} />
            </Link>
          ))
        ) : (
          <>{isNotRootUrl && <Navigate to="/notfound" />}</>
        )}
      </div>
    </Wrapper>
  );
};
