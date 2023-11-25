import React from "react";
import { IData } from "../../interface";
import { getPersonId } from "../../helpers/getPersonId";
import { URL } from "../../api/url";
import styles from "./card.module.scss";

interface CardProps {
  person: IData;
}

export const Card: React.FC<CardProps> = ({ person }) => {
  const { name, mass, height, url } = person;
  const id = getPersonId(url);

  return (
    <div className={styles["card-wrapper"]} data-testid="card">
      <div>name: {name}</div>
      <div>mass: {mass}</div>
      <div>height: {height}</div>
      <div className={styles["img-wrapper"]}>
        <img
          src={`${URL.IMG}${id}.jpg`}
          alt={`picture of ${name}`}
          className={styles.img}
        />
      </div>
    </div>
  );
};
