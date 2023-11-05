import { Outlet } from "react-router-dom";
import { Content } from "../components/Content";

export const ContentLayout = () => {
  return (
    <>
      <Content />
      <Outlet />
    </>
  );
};
