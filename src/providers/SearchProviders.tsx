import React, { Component, createContext, ReactNode, ChangeEvent } from "react";
import { IData } from "../interface";

export interface SearchContextType {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  data: IData[] | null;
  handleData: (data: IData[]) => void;
  isLoading: boolean;
  handleLoading: (isLoading: boolean) => void;
}

const defaultValue: SearchContextType = {
  inputValue: "",
  handleInputChange: () => {},
  data: null,
  handleData: () => {},
  isLoading: false,
  handleLoading: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultValue);

interface SearchProviderProps {
  children: ReactNode;
}

export class SearchProvider extends Component<SearchProviderProps> {
  state = {
    inputValue: "",
    data: null,
    isLoading: false,
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };
  handleData = (data: IData[]) => {
    this.setState({ data: data });
  };
  handleLoading = (isLoading: boolean) => {
    this.setState({ isLoading: isLoading });
  };

  render() {
    const contextValue: SearchContextType = {
      inputValue: this.state.inputValue,
      handleInputChange: this.handleInputChange,
      data: this.state.data,
      handleData: this.handleData,
      isLoading: this.state.isLoading,
      handleLoading: this.handleLoading,
    };

    return (
      <SearchContext.Provider value={contextValue}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContext;
