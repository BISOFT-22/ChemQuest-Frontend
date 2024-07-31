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

// IChemTest.ts
export interface IChemTest {
  id?: number;
  module: string;
  questions: Array<IQuestion>;
  createdAt?: string;
  updatedAt?: string;
}

// IQuestion.ts
export interface IQuestion {
  type: string;
  questionText: string;
  options: Array<IOption>;
  correctAnswer: any; // Puede ser un índice o un texto dependiendo del tipo de pregunta
}

// IOption.ts
export interface IOption {
  text: string;
  match?: string; // Solo para preguntas de pareo
}

// IChemTestAnswer.ts
export interface IChemTestAnswer {
  id?: number;
  chemTestId: number;
  answerText: string;
  isCorrect: boolean;
  createdAt?: string;
  updatedAt?: string;
}
