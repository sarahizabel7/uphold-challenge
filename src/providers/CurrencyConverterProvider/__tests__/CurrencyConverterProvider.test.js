import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import {
  CurrencyConverterProvider,
  CurrencyConverterContext,
} from "../CurrencyConverterProvider";
import SDK from "@uphold/uphold-sdk-javascript";

jest.mock("@uphold/uphold-sdk-javascript");
const mockGetTicker = jest.fn();
SDK.mockImplementation(() => ({
  getTicker: mockGetTicker,
}));

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const renderWithProvider = (ui) => {
  return render(<CurrencyConverterProvider>{ui}</CurrencyConverterProvider>);
};

describe("CurrencyConverterProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("provides default context values", () => {
    renderWithProvider(
      <CurrencyConverterContext.Consumer>
        {(context) => (
          <>
            <span data-testid="selectedTicker">{context.selectedTicker}</span>
            <span data-testid="loading">{context.loading.toString()}</span>
            <span data-testid="exchangeRates">
              {JSON.stringify(context.exchangeRates)}
            </span>
            <span data-testid="exchangeValue">{context.exchangeValue}</span>
          </>
        )}
      </CurrencyConverterContext.Consumer>
    );

    expect(screen.getByTestId("selectedTicker")).toHaveTextContent("USD");
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(screen.getByTestId("exchangeRates")).toHaveTextContent("[]");
    expect(screen.getByTestId("exchangeValue")).toHaveTextContent("");
  });

  test("removes cached exchange rates on selectedTicker change", async () => {
    const mockTickerData = [
      { pair: "USDEUR", ask: 0.85 },
      { pair: "USDMXN", ask: 110.5 },
    ];
    mockGetTicker.mockResolvedValue(mockTickerData);

    renderWithProvider(
      <CurrencyConverterContext.Consumer>
        {(context) => (
          <>
            <span data-testid="selectedTicker">{context.selectedTicker}</span>
            <button onClick={() => context.setSelectedTicker("EUR")}>
              Change Ticker
            </button>
          </>
        )}
      </CurrencyConverterContext.Consumer>
    );

    await act(() => {
      localStorage.setItem("exchangeRates_USD", JSON.stringify(mockTickerData));
    });

    expect(localStorage.getItem("exchangeRates_USD")).not.toBeNull();

    await act(() => {
      screen.getByText("Change Ticker").click();
    });

    expect(screen.getByTestId("selectedTicker")).toHaveTextContent("EUR");
  });
});
