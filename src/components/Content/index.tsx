import React from "react";
import SearchContext from "../../providers/SearchProviders";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import { FetchData } from "../../api/FetchData";

export class Content extends React.Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  componentDidMount(): void {
    const lastSearch = LocalStorageManager.get("search");
    const fetchData = async () => {
      if (lastSearch) {
        const { data } = await FetchData.getSearch(lastSearch);
        this.context.handleData(data.results);
      } else {
        const { data } = await FetchData.getSearch();
        this.context.handleData(data.results);
      }
    };
    fetchData();
  }

  render() {
    const data = this.context.data;
    const { isLoading } = this.context;
    console.log(data);
    if (data && data.length > 0 && !isLoading) {
      return (
        <div>
          {data.map((person) => (
            <div key={person.name}>{person.name}</div>
          ))}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
