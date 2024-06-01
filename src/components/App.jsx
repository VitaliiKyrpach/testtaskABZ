import { Catalog } from "./Catalog/Catalog";
import { Register } from "./Register/Register";
import { Header } from "./Header/Header";
import { Hero } from "./Hero/Hero";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../redux/catalogSelectors";
import { Loader } from "./Loader/Loader";

export const App = () => {
  const isLoad = useSelector(selectIsLoading);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Register />
        {isLoad && <Loader />}
      </main>
    </>
  );
};
