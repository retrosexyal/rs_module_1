import React, {
  createContext,
  ReactNode,
  useState,
  ChangeEvent,
  useCallback,
} from "react";
import { IData, IResponse } from "../interface";

export interface SearchContextType {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  data: IResponse | null;
  handleData: (data: IResponse) => void;
  isLoading: boolean;
  handleLoading: (isLoading: boolean) => void;
  personIsLoading: boolean;
  handlePersonLoading: (isLoading: boolean) => void;
  person: IData | null;
  handlePerson: (data: IData) => void;
}

const defaultValue: SearchContextType = {
  inputValue: "",
  handleInputChange: () => {},
  data: null,
  handleData: () => {},
  isLoading: false,
  handleLoading: () => {},
  personIsLoading: false,
  handlePersonLoading: () => {},
  person: null,
  handlePerson: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultValue);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IResponse | null>(null);
  const [person, setPerson] = useState<IData | null>(null);
  const [personIsLoading, setPersonIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleData = useCallback((data: IResponse) => {
    setData(data);
  }, []);
  const handleLoading = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);
  const handlePersonLoading = useCallback((personIsLoading: boolean) => {
    setPersonIsLoading(personIsLoading);
  }, []);
  const handlePerson = useCallback((data: IData) => {
    setPerson(data);
  }, []);

  const contextValue: SearchContextType = {
    inputValue,
    handleInputChange,
    data,
    handleData,
    isLoading,
    handleLoading,
    personIsLoading,
    handlePersonLoading,
    person,
    handlePerson,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
