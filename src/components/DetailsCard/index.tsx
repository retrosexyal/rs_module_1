import React from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../../api/FetchData";
import { IUrlParams } from "../../interface";

export const DetailsCard = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};
export const detailsLoader = async ({ params }: { params: IUrlParams }) => {
  const { search } = params;

  const { data } = await FetchData.getSearch(search);

  return data.results;
};
