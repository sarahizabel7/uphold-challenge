// import logo from './logo.svg';
import "./App.css";
import SDK from "@uphold/uphold-sdk-javascript";
import { useEffect } from "react";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";

const currencies = [
  "USD",
  "EUR",
  "BTC",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
];

function App() {
  useEffect(() => {
    const sdk = new SDK({
      baseUrl: "http://api-sandbox.uphold.com",
      clientId: "foo",
      clientSecret: "bar",
    });

    sdk
      .authorize("code")
      .then(() => sdk.getMe())
      .then((user) => {
        console.log("user:", user);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>Currency Converter</h2>
        <p>
          Receive competitive and transparent pricing with no hidden spreads.
          See how we compare.
        </p>
        <CurrencyInput
          currencies={currencies}
          onChange={(value, currency) => console.log(value, currency)}
        />
      </header>
    </div>
  );
}

export default App;
