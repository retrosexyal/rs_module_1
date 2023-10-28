import React, { Component, ChangeEvent } from "react";
import { Input } from "../UI/Input/indext";
import { Button } from "../UI/Button";
import { FetchData } from "../../api/FetchData";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import SearchContext from "../../providers/SearchProviders";

export class Search extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.context.handleInputChange(event);
  };
  handleClick = async () => {
    LocalStorageManager.set("search", this.context.inputValue);
    const { data } = await FetchData.getSearch(this.context.inputValue);
    this.context.data = data.result;
  };
  componentDidMount(): void {
    const lastSearch = LocalStorageManager.get("search");
    const fetchData = async () => {
      if (lastSearch) {
        const { data } = await FetchData.getSearch(this.context.inputValue);
        this.context.data = data.result;
      } else {
        const { data } = await FetchData.getSearch();
        this.context.data = data.result;
      }
    };
    fetchData();
  }
  render() {
    return (
      <div>
        <Input onChange={this.handleInputChange} />
        <Button onClick={this.handleClick} />
      </div>
    );
  }
}
