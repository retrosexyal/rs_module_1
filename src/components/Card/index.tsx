import React from "react";
import { IData } from "../../interface";
import { getPersonId } from "../../helpers/getPersonId";
import { URL } from "../../api/url";
import styles from "./card.module.scss";
import Image from "next/image";
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
        <Image
          src={`${URL.IMG}${id}.jpg`}
          alt={`picture of ${name}`}
          className={styles.img}
          width={300}
          height={300}
          priority={false}
        />
      </div>
    </div>
  );
};
