import React, { useContext, useEffect, useState } from "react";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import { Pagination } from "../Pagination";
import { getNumberOfPages } from "../../helpers/getNumberOfPages";
import SearchContext from "../../providers/SearchProviders";
import { getPersonId } from "../../helpers/getPersonId";

export const Content: React.FC = () => {
  const { inputValue, isLoading, data } = useContext(SearchContext);
  const [pages, setPages] = useState(0);
  const { page } = useParams();
  const location = useLocation();
  const isNotRootUrl = location.pathname !== "/";
  useEffect(() => {
    if (data) {
      setPages(getNumberOfPages(data));
    }
  }, [data]);

  return (
    <Wrapper>
      <div className={styles["content-wrapper"]}>
        {isLoading ? (
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
      {pages > 1 && <Pagination number={pages} />}
    </Wrapper>
  );
};
