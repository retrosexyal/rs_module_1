import { Component } from "react";
import { IData } from "../../interface";
import { getPersonId } from "../../helpers/getPersonId";
import { URL } from "../../api/url";
import styles from "./card.module.scss";

interface CardProps {
  person: IData;
}

export class Card extends Component<CardProps> {
  render() {
    const { name, mass, height, url } = this.props.person;
    const id = getPersonId(url);
    return (
      <div className={styles["card-wrapper"]}>
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
  }
}
