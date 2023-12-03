import styles from "./displayItem.module.scss";
interface IProps {
  value: string;
  title: string;
  rhf: string;
}
export const DisplayItem: React.FC<IProps> = ({ value, title, rhf }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.row}>
        <p className={styles.item}>{rhf}</p>
        <p className={styles.item}>{value}</p>
      </div>
    </div>
  );
};
