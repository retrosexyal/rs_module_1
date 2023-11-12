import React, { createContext, ReactNode, useState, ChangeEvent } from "react";
import { IResponse } from "../interface";

export interface SearchContextType {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  data: IResponse | null;
  handleData: (data: IResponse) => void;
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

export const SearchContext = createContext<SearchContextType>(defaultValue);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<IResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleData = (data: IResponse) => {
    setData(data);
  };

  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const contextValue: SearchContextType = {
    inputValue,
    handleInputChange,
    data,
    handleData,
    isLoading,
    handleLoading,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
