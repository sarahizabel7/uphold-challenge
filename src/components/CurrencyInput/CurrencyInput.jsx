import React, { useState } from "react";

const CurrencyInput = ({ currencies, onChange }) => {
  const [currency, setCurrency] = useState("USD");
  const [value, setValue] = useState(0);

  const onSelectCurrency = (e) => {
    setCurrency(e.target.value);
    onChange(value, e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value, currency);

          e.stopPropagation();
        }}
      />
      <select value={currency} onChange={onSelectCurrency}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
