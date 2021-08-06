import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "../../testUtils";
import { Login } from "./Login";
import { LoginContext, LoginConsumer } from "contexts/Login";
import { server, rest } from "mocks/server";
import App from "../../App";

const dispatch = () => {};
const state = {
  isLogged: false,
};

const store = { state, dispatch };

describe("Test Login", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Snapshot", () => {
    const { container } = renderWithRouter(
      <LoginContext.Provider value={store}>
        <LoginConsumer>{() => <Login />}</LoginConsumer>
      </LoginContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  test("fill inputs success", async () => {
    renderWithRouter(
      <LoginContext.Provider value={store}>
        <LoginConsumer>{() => <Login />}</LoginConsumer>
      </LoginContext.Provider>
    );

    const username = await screen.findByTestId("username");
    userEvent.type(username, "hypeflame");

    const password = await screen.findByTestId("password");
    userEvent.type(password, "test123");

    const btnLogin = await screen.findByTestId("btn-login");

    expect(btnLogin).not.toBeDisabled();
  });

  test("fill inputs error", async () => {
    renderWithRouter(
      <LoginContext.Provider value={store}>
        <LoginConsumer>{() => <Login />}</LoginConsumer>
      </LoginContext.Provider>
    );

    const username = await screen.findByTestId("username");
    userEvent.type(username, "hy");

    const password = await screen.findByTestId("password");
    userEvent.type(password, "test");

    userEvent.click(username);

    const usernameError = await screen.findByText(
      "O Username deve ter no mínimo 3 caracteres"
    );

    const passwordError = await screen.findByText(
      "O Password deve ter no mínimo 6 caracteres"
    );

    expect(usernameError).toBeDefined();

    expect(passwordError).toBeDefined();
  });

  test("login success", async () => {
    const {
      history: { navigate },
    } = renderWithRouter(<App />);

    const username = await screen.findByTestId("username");
    userEvent.type(username, "hypeflame");

    const password = await screen.findByTestId("password");
    userEvent.type(password, "test123");

    const btnLogin = await screen.findByTestId("btn-login");
    userEvent.click(btnLogin);

    await act(async () => {
      await navigate("/user-logged");
    });

    const userLogged = await screen.findByText("Usuário logado");
    expect(userLogged).toBeDefined();
  });

  test("login error", async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_BACKEND}/login`, (_, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    renderWithRouter(
      <LoginContext.Provider value={store}>
        <LoginConsumer>{() => <Login />}</LoginConsumer>
      </LoginContext.Provider>
    );

    const username = await screen.findByTestId("username");
    userEvent.type(username, "hypeflame");

    const password = await screen.findByTestId("password");
    userEvent.type(password, "test123");

    const btnLogin = await screen.findByTestId("btn-login");
    userEvent.click(btnLogin);

    const errorMessage = await screen.findByText("Erro ao efetuar o login!");
    expect(errorMessage).toBeDefined();
  });
});
