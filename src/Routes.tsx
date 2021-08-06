import { Redirect, Router } from "@reach/router";
import Login from "pages/Login";
import UserLogged from "pages/UserLogged";

interface IRoutes {
  isLogged?: boolean;
}

const PrivateRoute = ({ component: Component, isLogged, ...props }: any) =>
  isLogged ? <Component {...props} /> : <Redirect to="/" noThrow />;

export const Routes = ({ isLogged }: IRoutes) => (
  <Router>
    <Login path="/" default />
    <PrivateRoute
      path="/user-logged"
      isLogged={isLogged}
      component={UserLogged}
    />
  </Router>
);
