import React from "react";
import SearchContext from "../../providers/SearchProviders";
import { LocalStorageManager } from "../../helpers/LocalStorageManager";
import { FetchData } from "../../api/FetchData";
import { Card } from "../Card";
import { Wrapper } from "../UI/Wrapper";
import styles from "./content.module.scss";

export class Content extends React.Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  componentDidMount(): void {
    const lastSearch = LocalStorageManager.get("search");
    this.context.handleLoading(true);
    const fetchData = async () => {
      if (lastSearch) {
        const { data } = await FetchData.getSearch(lastSearch);
        this.context.handleData(data.results);
        this.context.handleLoading(false);
        console.log(data);
      } else {
        const { data } = await FetchData.getSearch();
        this.context.handleData(data.results);
        this.context.handleLoading(false);
        console.log(data);
      }
    };
    fetchData();
  }

  render() {
    const data = this.context.data;
    const { isLoading } = this.context;
    return (
      <Wrapper>
        <div className={styles["content-wrapper"]}>
          {isLoading ? (
            <div>Loading...</div>
          ) : data && data.length > 0 ? (
            <>
              {data.map((person) => (
                <div key={person.name}>
                  <Card person={person} />
                </div>
              ))}
            </>
          ) : (
            <div>not exist</div>
          )}
        </div>
      </Wrapper>
    );
  }
}
