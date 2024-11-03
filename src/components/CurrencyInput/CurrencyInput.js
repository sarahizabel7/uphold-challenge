import "./CurrencyInput.css";
import { useContext, useState } from "react";
import Select from "react-select";
import { CurrencyConverterContext } from "../../providers/CurrencyConverterProvider";
import { availableTickers } from "../../consts";

const CurrencyInput = () => {
  const { selectedTicker, setSelectedTicker, exchangeValue, setExchangeValue } =
    useContext(CurrencyConverterContext);

  const [isFocused, setIsFocused] = useState(false);

  const onChangeInputValue = (e) => {
    setExchangeValue(e.target.value);

    e.stopPropagation();
  };

  const onFocusInput = () => setIsFocused(true);
  const onBlurInput = () => setIsFocused(false);

  const tickerOptions = availableTickers.map((ticker) => ({
    value: ticker,
    label: (
      <div className="currency-option">
        <img
          src={`/assets/${ticker}.png`}
          alt={`${ticker} icon`}
          className="currency-option-icon"
        />
        {ticker}
      </div>
    ),
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "16px",
      border: "none",
      backgroundColor: "#fff",
      minWidth: "120px",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1a1a2e",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px",
      backgroundColor: state.isFocused ? "#f1f1f1" : "#ffffff",
      color: "#1a1a2e",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#1a1a2e",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      overflow: "hidden",
    }),
  };

  return (
    <div
      className={`currency-input-container ${
        isFocused ? "currency-input-container-focused" : ""
      }`}
    >
      <input
        type="number"
        className="currency-input"
        placeholder="0.00"
        value={exchangeValue}
        onChange={onChangeInputValue}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
      />

      <Select
        options={tickerOptions}
        value={tickerOptions.find((option) => option.value === selectedTicker)}
        onChange={(selectedOption) => setSelectedTicker(selectedOption.value)}
        styles={customStyles}
        isSearchable={false}
        className="currency-select"
      />
    </div>
  );
};

export default CurrencyInput;
