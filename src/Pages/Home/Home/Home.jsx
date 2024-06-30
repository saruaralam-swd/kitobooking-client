import useTittle from "../../../hooks/useTittle";
import Footer from "../../Shared/Footer/Footer";
import Advertisement from "../Advertisement.js/Advertisement";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FAQ from "../FAQ/FAQ";
import UserDocument from "../UserDocument/UserDocument";
import { ScrollToTop } from "../../../Components/ScrollToTop";

const Home = () => {
  useTittle("Home");
  return (
    <>
      <ScrollToTop />
      <Banner></Banner>
      <Categories></Categories>
      <UserDocument></UserDocument>
      <Advertisement></Advertisement>
      <FAQ></FAQ>
      <Footer></Footer>
    </>
  );
};

export default Home;
