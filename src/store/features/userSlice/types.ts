export interface UserState extends User {
  isLogged: boolean;
}

export interface User {
  username: string;
  token: string;
  id: string;
}
