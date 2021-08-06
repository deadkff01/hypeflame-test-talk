import GlobalStyles from "components/GlobalStyles";
import "./App.css";
import { Routes } from "Routes";
import { LoginProvider, LoginConsumer } from "./contexts/Login";

function App() {
  return (
    <LoginProvider>
      <LoginConsumer>
        {({ state }) => (
          <>
            <GlobalStyles />
            <Routes isLogged={state?.isLogged} />
          </>
        )}
      </LoginConsumer>
    </LoginProvider>
  );
}

export default App;
