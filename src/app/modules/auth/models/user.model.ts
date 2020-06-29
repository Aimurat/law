export interface IUserData {
  username: string;
  full_name: string;
  address: string;
}

export interface IUser {
  id: number;
  username: string;
  full_name: string;
  role: number;
  department: string;
  company: string;
}

export interface IAuth {
  token: string;
  user: IUser;
}
