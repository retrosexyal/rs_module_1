interface IProps {
  values: string[];
  value: number;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<IProps> = ({ values, value = "", onChange }) => {
  return (
    <select onChange={onChange} value={value}>
      {values.map((item) => (
        <option value={Number(item)} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
