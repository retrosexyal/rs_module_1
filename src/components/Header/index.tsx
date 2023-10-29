import { Component } from "react";
import { Search } from "../Search";
import styles from "./header.module.scss";
import { Wrapper } from "../UI/Wrapper";

export class Header extends Component {
  render() {
    return (
      <div className={styles["header-wrapper"]}>
        <Wrapper>
          <div className={styles["content-wrapper"]}>
            <h1>Star Wars Charactars</h1>
            <Search />
          </div>
        </Wrapper>
      </div>
    );
  }
}
