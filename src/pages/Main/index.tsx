import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import { Display } from "../../components/Display";
import styles from "./main.module.scss";

export const Main = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.link_cont}>
        <Link to={routes.RHF} className={styles.link}>
          Reack Hook Form
        </Link>
        <Link to={routes.UNCONTROL} className={styles.link}>
          Uncontrolled Form
        </Link>
      </div>
      <Display />
    </div>
  );
};
