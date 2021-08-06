import { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { tw } from "twind";
import Container from "components/Container";
import Input from "components/Input";
import { useLoginContext, ACTIONS } from "contexts/Login";
import { navigate } from "@reach/router";
import { loginRequest } from "services/login";
import Button from "components/Button";
import Loader from "components/Loader";

export const Login: React.FC<RouteComponentProps> = () => {
  const { dispatch } = useLoginContext();
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const blurUsername = () => setUsernameError(username.length < 3);

  const blurPassword = () => setPasswordError(password.length < 6);

  const btnLoginDisabled = username.length < 3 || password.length < 6;

  const doLogin = async () => {
    try {
      setIsLoading(true);
      const body = {
        username,
        password,
      };
      await loginRequest(body);
      dispatch({ type: ACTIONS.LOGIN, payload: true });
      navigate("/user-logged");
    } catch {
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <h1 className={tw`font-bold text-4xl my-5`}>Login</h1>
        <div className={tw`flex justify-center px-3`}>
          <div className={tw`w-full md:w-6/12 lg:w-4/12`}>
            <Input
              value={username}
              placeholder="Username"
              id="username"
              onBlur={blurUsername}
              error={usernameError}
              errorMessage={"O Username deve ter no mínimo 3 caracteres"}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(target.value);
                setUsernameError(false);
                setLoginError(false);
              }}
            />
            <Input
              value={password}
              placeholder="Password"
              id="password"
              type="password"
              error={passwordError}
              errorMessage={"O Password deve ter no mínimo 6 caracteres"}
              onBlur={blurPassword}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(target.value);
                setPasswordError(false);
                setLoginError(false);
              }}
            />
          </div>
        </div>
        {loginError ? (
          <div className={tw`font-bold my-2 text-red-500`}>
            Erro ao efetuar o login!
          </div>
        ) : null}
        <Button
          id="btn-login"
          data-testid="btn-login"
          className={tw`mt-2`}
          disabled={btnLoginDisabled}
          onClick={doLogin}
        >
          Entrar
        </Button>
      </div>

      {isLoading ? <Loader /> : null}
    </Container>
  );
};
