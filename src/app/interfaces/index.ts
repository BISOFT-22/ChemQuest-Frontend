import { ListFormat } from "typescript";

export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  streak?: number;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole;
}

export interface IRole {
  id?: number;
  description?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
  superAdmin = 'ROLE_SUPER_ADMIN'
}

export interface IGame {
  id?: number;
  description?: string;
  name?: string;
  imgURL?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

export interface IGame {
  id?: number;
  description?: string;
  name?: string;
  imgURL?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}
export interface IElement {
  id?: number;
  name?: string;
  description?: string;
  atomicNumber?: number;
  symbol?: string;
  group?: number;
  period?: number;
  block?: string;
  series?: string;
  discover?: string;
  discoveredBy?: string;
  origin?: string;
  image?: string;
  source?: string;
  proton?: string ;
  neutron?: string ;
  electron?: string;
}

export interface IHistory{
  userWords?: string[];
  typeColor?: string[];
  wrong?: number;
}