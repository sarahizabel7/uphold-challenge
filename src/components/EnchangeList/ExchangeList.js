import "./ExchangeList.css";
import { useContext } from "react";
import { CurrencyConverterContext } from "../../providers/CurrencyConverterProvider";
import { availableTickers } from "../../consts";

const ExchangeList = () => {
  const { selectedTicker, exchangeValue, exchangeRates } = useContext(
    CurrencyConverterContext
  );

  const listTickers = availableTickers.filter(
    (ticker) => ticker !== selectedTicker
  );

  if (!exchangeValue || exchangeValue === 0)
    return (
      <p className="empty-state-text">Enter an amount to check the rates.</p>
    );

  return (
    <div className="exchange-list-container">
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {listTickers.map((ticker) => {
          const exchangeRate = exchangeRates.find(
            (rate) => rate.pair === `${selectedTicker}${ticker}`
          );

          const value = Number(exchangeValue) * Number(exchangeRate?.ask || 0);

          return (
            <li key={ticker} className="exchange-list-item">
              <span>{value.toFixed(6)}</span>

              <div className="exchange-list-symbol">
                <img
                  src={`/assets/${ticker}.png`}
                  alt={`${ticker} icon`}
                  className="exchange-list-symbol-icon"
                />
                {ticker}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { ExchangeList };
