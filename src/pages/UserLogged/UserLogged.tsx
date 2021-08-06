import { RouteComponentProps } from "@reach/router";
import { tw } from "twind";

export const UserLogged: React.FC<RouteComponentProps> = () => {
  return (
    <h1 className={tw`my-10 text-3xl text-center font-bold`}>Usuário logado</h1>
  );
};
