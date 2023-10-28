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
    this.context.handleLoading(true);
    LocalStorageManager.set("search", this.context.inputValue);
    const { data } = await FetchData.getSearch(this.context.inputValue);
    this.context.handleData(data.results);
    this.context.handleLoading(false);
  };

  render() {
    return (
      <div>
        <Input onChange={this.handleInputChange} />
        <Button onClick={this.handleClick} />
      </div>
    );
  }
}
