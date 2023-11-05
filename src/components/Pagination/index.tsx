import { NavLink } from "react-router-dom";

interface IProps {
  number: number;
}
export const Pagination: React.FC<IProps> = ({ number = 1 }) => {
  const array = Array(number).fill(undefined);
  return (
    <div>
      {array.map((_, ind) => (
        <NavLink to={`page/${(ind + 1).toString()}`} key={ind}>
          {ind + 1}
        </NavLink>
      ))}
    </div>
  );
};
