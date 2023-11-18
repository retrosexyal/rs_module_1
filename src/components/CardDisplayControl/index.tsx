import React from "react";
import { Select } from "../UI/Select";
import { itemLimit } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeItemsPerPageValue } from "../../store/slices/itemsPerPageSlice";
import styles from "./cardDisplayControl.module.scss";

export const CardDisplayControl = () => {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.items);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeItemsPerPageValue(Number(e.target.value)));
  };
  return (
    <div className={styles.wrapper}>
      <Select values={itemLimit} onChange={handleChange} value={value} />
    </div>
  );
};
