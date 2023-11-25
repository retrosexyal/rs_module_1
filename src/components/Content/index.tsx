import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Pagination } from "../Pagination";
import { getNumberOfPages } from "../../helpers/getNumberOfPages";
import { getPersonId } from "../../helpers/getPersonId";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  getRunningQueriesThunk,
  getSearch,
  useGetSearchQuery,
} from "../../store/services/strarWras";
import { changeContentIsLoading } from "../../store/slices/loadingSlice";
import { changeItemsPerPageValue } from "../../store/slices/itemsPerPageSlice";
import { DetailsCard } from "../DetailsCard";
import { wrapper } from "@/store";

type QueryObject = {
  search?: string;
  page?: string;
};

export const Content: React.FC = () => {
  const { contentIsLoading } = useAppSelector((state) => state.loading);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState(0);
  const { page, character, id } = router.query;
  const queryObject: QueryObject = {};
  if (typeof page === "string") {
    queryObject.page = page;
  }
  const searchParam = character === "getallcharacters" ? "" : character;
  if (typeof searchParam === "string") {
    queryObject.search = searchParam;
  }
  const { data, isFetching } = useGetSearchQuery(queryObject, {
    skip: router.isFallback,
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
  }, [data, dispatch, isFetching, character]);

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        {pages > 1 && <Pagination number={pages} />}
        <div className={styles["content-wrapper"]}>
          {contentIsLoading ? (
            <div>loading</div>
          ) : (
            data &&
            data.results.map((person) => (
              <Link
                href={{
                  pathname: `/search`,
                  query: {
                    id: getPersonId(person.url),
                    page: page,
                    character: character,
                  },
                }}
                key={person.name}
              >
                <Card person={person} />
              </Link>
            ))
          )}
        </div>
      </Wrapper>
      {id && <DetailsCard />}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, character } = context.query;
    const searchParam = character === "getallcharacters" ? "" : character;
    const data = store.dispatch(
      getSearch.initiate({
        search: (searchParam as string) || "",
        page: (page as string) || "",
      })
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
