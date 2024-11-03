import { createContext, useState, useRef, useEffect, useCallback } from "react";
import SDK from "@uphold/uphold-sdk-javascript";
import { availableTickers } from "../../consts";

const CurrencyConverterContext = createContext({
  selectedTicker: "USD",
  setSelectedTicker: () => {},
  exchangeRates: [],
  exchangeValue: 0,
  setExchangeValue: () => {},
  loading: true,
});

const API_URL = "http://api-sandbox.uphold.com";

const CurrencyConverterProvider = ({ children }) => {
  const [selectedTicker, setSelectedTicker] = useState(availableTickers[0]);
  const [exchangeRates, setExchangeRates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [exchangeValue, setExchangeValue] = useState("");

  const sdkRef = useRef(null);

  useEffect(() => {
    const sdk = new SDK({
      baseUrl: API_URL,
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    });

    sdkRef.current = sdk;
  }, []);

  useEffect(() => {
    const fetchTicker = async () => {
      setLoading(true);

      const cachedData = localStorage.getItem(
        `exchangeRates_${selectedTicker}`
      );

      if (cachedData) {
        setExchangeRates(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const ticker = await sdkRef.current.getTicker(selectedTicker);
        if (ticker && ticker.length) {
          setExchangeRates(ticker);

          localStorage.setItem(
            `exchangeRates_${selectedTicker}`,
            JSON.stringify(ticker)
          );
        }
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }

      setLoading(false);
    };

    if (sdkRef.current) {
      fetchTicker();
    }
  }, [selectedTicker]);

  const setSelectedTickerFn = useCallback((selectedTicker) => {
    localStorage.removeItem(`exchangeRates_${selectedTicker}`);

    setSelectedTicker(selectedTicker);
  }, []);

  const setExchangeValueFn = useCallback((value) => {
    setExchangeValue(value);
  }, []);

  return (
    <CurrencyConverterContext.Provider
      value={{
        selectedTicker,
        setSelectedTicker: setSelectedTickerFn,
        exchangeRates,
        exchangeValue,
        setExchangeValue: setExchangeValueFn,
        loading,
      }}
    >
      {children}
    </CurrencyConverterContext.Provider>
  );
};

export { CurrencyConverterContext, CurrencyConverterProvider };
