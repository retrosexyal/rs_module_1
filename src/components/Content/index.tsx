import React, { Suspense, useContext } from "react";
import { FetchData } from "../../api/FetchData";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import { IResponse, IUrlParams } from "../../interface";
import { Pagination } from "../Pagination";
import { getNumberOfPages } from "../../helpers/getNumberOfPages";
import SearchContext from "../../providers/SearchProviders";

export const Content: React.FC = () => {
  const data = useLoaderData() as IResponse;
  const dataFetched = data.results;
  const pages = getNumberOfPages(data);
  const { inputValue } = useContext(SearchContext);
  const { page } = useParams();

  return (
    <Wrapper>
      <div className={styles["content-wrapper"]}>
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={dataFetched}
            errorElement={<div>Could not load data 😬</div>}
          >
            {dataFetched.map((person) => (
              <Link
                to={`/search/${inputValue || "getallcharacters"}/${
                  page ? "page/" + page : "page"
                }/details/${person.name}`}
                key={person.name}
              >
                <Card person={person} />
              </Link>
            ))}
          </Await>
        </Suspense>
      </div>
      {pages > 1 && <Pagination number={pages} />}
    </Wrapper>
  );
};

export const dataLoader = async ({ params }: { params: IUrlParams }) => {
  const { search, page } = params;
  const searchParam = search === "getallcharacters" ? "" : search;
  const { data } = await FetchData.getSearch(searchParam || "", page || "");
  return data;
};
