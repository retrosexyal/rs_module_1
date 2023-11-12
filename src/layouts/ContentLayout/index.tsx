import { Outlet } from "react-router-dom";
import { Content } from "../../components/Content";
import styles from "./contentLayout.module.scss";

export const ContentLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Content />
      <Outlet />
    </div>
  );
};
