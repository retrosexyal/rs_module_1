import { Link, useParams } from "react-router-dom";

import { Card } from "../Card";

import styles from "./details.module.scss";
import { useContext, useEffect } from "react";
import SearchContext from "../../providers/SearchProviders";
import { FetchData } from "../../api/FetchData";

export const DetailsCard = () => {
  const { id, search, page } = useParams();
  const { person, handlePerson, handlePersonLoading, personIsLoading } =
    useContext(SearchContext);

  useEffect(() => {
    handlePersonLoading(true);
    FetchData.getChar(id).then(({ data }) => {
      handlePerson(data);
      handlePersonLoading(false);
    });
  }, [handlePerson, handlePersonLoading, id]);

  return (
    <div className={styles.wrapper} data-testid="details">
      {personIsLoading ? (
        <div data-testid="person-loading">loading...</div>
      ) : (
        person && (
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
        )
      )}
    </div>
  );
};
