import React, { Component, ChangeEvent } from "react";
import { Input } from "../UI/Input/indext";
import { Button } from "../UI/Button";
import { FetchData } from "../../api/FetchData";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import SearchContext from "../../providers/SearchProviders";
import styles from "./search.module.scss";

export class Search extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.context.handleInputChange(event);
  };

  handleClick = async () => {
    this.context.handleLoading(true);
    LocalStorageManager.set("search", this.context.inputValue);
    const { data } = await FetchData.getSearch(this.context.inputValue);
    this.context.handleData(data.results);
    this.context.handleLoading(false);
  };
  componentDidMount(): void {
    const value = LocalStorageManager.get("search");
    if (value) {
      const event = {
        target: {
          value: value,
        },
      };
      this.context.handleInputChange(event as ChangeEvent<HTMLInputElement>);
    }
  }

  render() {
    return (
      <div className={styles["search-wrapper"]}>
        <Input
          onChange={this.handleInputChange}
          value={this.context.inputValue}
        />
        <Button onClick={this.handleClick} text="find" />
      </div>
    );
  }
}
