import React from "react";
import SearchContext from "../../providers/SearchProviders";

export class Content extends React.Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  componentDidMount(): void {
    console.log(this.context.data);
  }

  render() {
    return <div>test</div>;
  }
}
