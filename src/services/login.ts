import { baseService } from "./baseService";

export const loginRequest = (body: any) => baseService().post("login", body);
