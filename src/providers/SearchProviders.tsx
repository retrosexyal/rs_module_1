import React, { Component, createContext, ReactNode, ChangeEvent } from "react";

export interface SearchContextType {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  data: object | null;
}

const defaultValue: SearchContextType = {
  inputValue: "",
  handleInputChange: () => {},
  data: null,
};

const SearchContext = createContext<SearchContextType>(defaultValue);

interface SearchProviderProps {
  children: ReactNode;
}

export class SearchProvider extends Component<SearchProviderProps> {
  state = {
    inputValue: "",
    data: null,
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const contextValue: SearchContextType = {
      inputValue: this.state.inputValue,
      handleInputChange: this.handleInputChange,
      data: this.state.data,
    };

    return (
      <SearchContext.Provider value={contextValue}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContext;
