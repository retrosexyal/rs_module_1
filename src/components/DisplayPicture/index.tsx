import styles from "./displayItem.module.scss";
interface IProps {
  value: string;
  title: string;
  rhf: string;
}
export const DisplayPicture: React.FC<IProps> = ({ value, title, rhf }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.row}>
        {rhf ? (
          <img src={rhf} alt="picture" className={styles.item} />
        ) : (
          <div className={styles.item}>no uploaded</div>
        )}
        {value ? (
          <img src={value} alt="picture" className={styles.item} />
        ) : (
          <div className={styles.item}>no uploaded</div>
        )}
      </div>
    </div>
  );
};
