import { Header } from "@/components/Header";

interface IProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
