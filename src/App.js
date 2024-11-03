import "./App.css";
import { CurrencyConverterProvider } from "./providers/CurrencyConverterProvider";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <CurrencyConverterProvider>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <Home />
      </div>
    </CurrencyConverterProvider>
  );
}

export default App;
