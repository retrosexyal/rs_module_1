import { Link, useLoaderData, useParams } from "react-router-dom";

import { Card } from "../Card";
import { IResponse } from "../../interface";

import styles from "./details.module.scss";

export const DetailsCard = () => {
  const { name } = useParams();
  const data = useLoaderData() as IResponse;
  const { search, page } = useParams();
  const person = data.results.find((person) => person.name === name);

  return (
    <div className={styles.wrapper}>
      <Card person={person || data.results[0]} />
      <p>details:</p>
      <p>eye color: {person?.eye_color}</p>
      <p>birth year: {person?.birth_year}</p>
      <p>mass: {person?.mass} kg</p>
      <Link to={`/search/${search}/page/${page || ""}`} className={styles.btn}>
        Close details
      </Link>
    </div>
  );
};
