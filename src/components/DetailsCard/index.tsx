import { useLoaderData, useParams } from "react-router-dom";

import { Card } from "../Card";
import { IResponse } from "../../interface";

import styles from "./details.module.scss";

export const DetailsCard = () => {
  const { name } = useParams();
  console.log(name);
  const data = useLoaderData() as IResponse;
  const person = data.results.find((person) => person.name === name);

  return (
    <div className={styles.wrapper}>
      <Card person={person || data.results[0]} />
      <p>details:</p>
      <p>eye color: {person?.eye_color}</p>
      <p>birth year: {person?.birth_year}</p>
      <p>mass: {person?.mass} kg</p>
    </div>
  );
};
