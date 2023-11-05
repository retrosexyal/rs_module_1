import React, { Suspense } from "react";
import { FetchData } from "../../api/FetchData";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import { Await, useLoaderData } from "react-router-dom";
import { IData, IUrlParams } from "../../interface";
import { Pagination } from "../Pagination";

export const Content: React.FC = () => {
  const dataFetched = useLoaderData() as IData[];

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
          <Pagination number={3} />
        </Suspense>
      </div>
    </Wrapper>
  );
};

export const dataLoader = async ({ params }: { params: IUrlParams }) => {
  const { search, page } = params;
  const { data } = await FetchData.getSearch(search || "", page || "");
  return data.results;
};
