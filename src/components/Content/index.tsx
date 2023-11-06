import React, { Suspense } from "react";
import { FetchData } from "../../api/FetchData";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import { Await, useLoaderData } from "react-router-dom";
import { IResponse, IUrlParams } from "../../interface";
import { Pagination } from "../Pagination";
import { getNumberOfPages } from "../../helpers/getNumberOfPages";

export const Content: React.FC = () => {
  const data = useLoaderData() as IResponse;
  const dataFetched = data.results;
  const pages = getNumberOfPages(data);

  return (
    <Wrapper>
      <div className={styles["content-wrapper"]}>
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={dataFetched}
            errorElement={<div>Could not load data 😬</div>}
          >
            {dataFetched.map((person) => (
              <div key={person.name}>
                <Card person={person} />
              </div>
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
  console.log(data);
  return data;
};
