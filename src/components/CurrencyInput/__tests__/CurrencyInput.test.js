/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyInput from "../CurrencyInput";
import { CurrencyConverterContext } from "../../../providers/CurrencyConverterProvider";
import { availableTickers } from "../../../consts";

const mockSetSelectedTicker = jest.fn();
const mockSetExchangeValue = jest.fn();

const renderComponent = (contextValues = {}) => {
  const defaultContext = {
    selectedTicker: "USD",
    setSelectedTicker: mockSetSelectedTicker,
    exchangeValue: "",
    setExchangeValue: mockSetExchangeValue,
  };

  return render(
    <CurrencyConverterContext.Provider
      value={{ ...defaultContext, ...contextValues }}
    >
      <CurrencyInput />
    </CurrencyConverterContext.Provider>
  );
};

describe("CurrencyInput component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and select elements", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("updates input value on typing", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("0.00");
    act(() => {
      userEvent.type(input, "100");
    });

    expect(mockSetExchangeValue).toHaveBeenCalledTimes(3);
    expect(mockSetExchangeValue).toHaveBeenCalledWith("1");
    expect(mockSetExchangeValue).toHaveBeenCalledWith("10");
    expect(mockSetExchangeValue).toHaveBeenCalledWith("100");
  });

  test("adds focus class on input focus and removes it on blur", () => {
    renderComponent();

    const inputContainer = screen.getByPlaceholderText("0.00").parentElement;

    fireEvent.focus(screen.getByPlaceholderText("0.00"));
    expect(inputContainer).toHaveClass("currency-input-container-focused");

    fireEvent.blur(screen.getByPlaceholderText("0.00"));
    expect(inputContainer).not.toHaveClass("currency-input-container-focused");
  });

  test("displays the correct selected ticker in dropdown", () => {
    renderComponent({ selectedTicker: availableTickers[0] });

    const selectedOption = screen.getByText(availableTickers[0]);
    expect(selectedOption).toBeInTheDocument();
  });
});
