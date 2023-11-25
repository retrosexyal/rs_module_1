import React from "react";
import { Search } from "../Search";
import styles from "./header.module.scss";
import { Wrapper } from "../UI/Wrapper";
import { ErrorBtn } from "../ErrorBtn";

export const Header: React.FC = () => {
  return (
    <div className={styles["header-wrapper"]}>
      <Wrapper>
        <div className={styles["content-wrapper"]}>
          <h1>Star Wars Characters</h1>
          <Search />
          <ErrorBtn />
        </div>
      </Wrapper>
    </div>
  );
};
