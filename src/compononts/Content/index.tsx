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
import { useGetSearchQuery } from "../../store/services/strarWras";
import { changeContentIsLoading } from "../../store/slices/loadingSlice";
import { changeItemsPerPageValue } from "../../store/slices/itemsPerPageSlice";
import { DetailsCard } from "../DetailsCard";

export const Content = () => {
  const { value: inputValue } = useAppSelector((state) => state.search);
  const { contentIsLoading } = useAppSelector((state) => state.loading);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState(0);
  const { page, character, id } = router.query;
  const searchParam = character === "getallcharacters" ? "" : character;
  const { data, isFetching } = useGetSearchQuery({
    search: (searchParam as string) || "",
    page: (page as string) || "1",
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
