import React from "react";
import { render, screen } from "@testing-library/react";
import { CurrencyConverterContext } from "../../../providers/CurrencyConverterProvider";
import { ExchangeList } from "../ExchangeList";
import { availableTickers } from "../../../consts";

const renderComponent = (contextValues = {}) => {
  const defaultContext = {
    selectedTicker: "USD",
    exchangeValue: "",
    exchangeRates: [
      { pair: "USDEUR", ask: 0.85 },
      { pair: "USDMXN", ask: 110.5 },
    ],
  };

  return render(
    <CurrencyConverterContext.Provider
      value={{ ...defaultContext, ...contextValues }}
    >
      <ExchangeList />
    </CurrencyConverterContext.Provider>
  );
};

describe("ExchangeList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays empty state message when exchange value is empty", () => {
    renderComponent({ exchangeValue: "" });

    expect(
      screen.getByText("Enter an amount to check the rates.")
    ).toBeInTheDocument();
  });

  test("displays empty state message when exchange value is zero", () => {
    renderComponent({ exchangeValue: 0 });

    expect(
      screen.getByText("Enter an amount to check the rates.")
    ).toBeInTheDocument();
  });

  test("renders exchange rates correctly", () => {
    renderComponent({ exchangeValue: "100" });

    const eurValue = (100 * 0.85).toFixed(6);
    const mxnValue = (100 * 110.5).toFixed(6);

    expect(screen.getByText(eurValue)).toBeInTheDocument();
    expect(screen.getByText(mxnValue)).toBeInTheDocument();

    const eurIcon = screen.getByAltText("EUR icon");
    const mxnIcon = screen.getByAltText("MXN icon");

    expect(eurIcon).toBeInTheDocument();
    expect(mxnIcon).toBeInTheDocument();
  });

  test("does not render selected ticker in list", () => {
    renderComponent({ selectedTicker: "USD", exchangeValue: "100" });

    const usdItems = screen.queryByText("USD");
    expect(usdItems).not.toBeInTheDocument();
  });

  test("displays correct number of exchange rate items", () => {
    renderComponent({ selectedTicker: "USD", exchangeValue: "100" });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(availableTickers.length - 1);
  });

  test("handles missing exchange rates gracefully", () => {
    renderComponent({
      selectedTicker: "USD",
      exchangeValue: "",
    });

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
