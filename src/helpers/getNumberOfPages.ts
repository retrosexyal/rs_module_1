import { IResponse } from "../interface";

export const getNumberOfPages = (data: IResponse) => {
  return Math.ceil(data.count / 10);
};
