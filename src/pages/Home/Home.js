import "./Home.css";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import { ExchangeList } from "../../components/EnchangeList/ExchangeList";
import { Title } from "../../components/Title/Title";

const texts = {
  title: "Currency Converter",
  subtitle: `Receive competitive and transparent pricing with no hidden spreads. See
      how we compare.`,
};

const Home = () => {
  return (
    <div className="home">
      <Title title={texts.title} subtitle={texts.subtitle} />

      <CurrencyInput />
      <ExchangeList />
    </div>
  );
};

export default Home;
