import { rest } from "msw";
import { setupServer } from "msw/node";

const responseMock = {
  username: "hypeflame",
};

export const server = setupServer(
  rest.post(`${process.env.REACT_APP_BACKEND}/login`, (_, res, ctx) => {
    return res(ctx.json(responseMock));
  })
);

export { rest };
