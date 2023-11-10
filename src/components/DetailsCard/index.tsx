import { Link, useParams } from "react-router-dom";

import { Card } from "../Card";

import styles from "./details.module.scss";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../../providers/SearchProviders";
import { IData } from "../../interface";

export const DetailsCard = () => {
  const { name, search, page } = useParams();
  const { data } = useContext(SearchContext);
  const [person, setPerson] = useState<IData | null>(null);
  useEffect(() => {
    if (data) {
      const person = data?.results.find((person) => person.name === name);
      if (person) {
        setPerson(person);
      }
    }
  }, [data, name]);

  return (
    <div className={styles.wrapper}>
      {person && (
        <>
          <Card person={person} />
          <p>details:</p>
          <p>eye color: {person?.eye_color}</p>
          <p>birth year: {person?.birth_year}</p>
          <p>mass: {person?.mass} kg</p>
          <Link
            to={`/search/${search}/page/${page || ""}`}
            className={styles.btn}
          >
            Close details
          </Link>
        </>
      )}
    </div>
  );
};
