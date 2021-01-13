export interface IUser {
  id?: string,
  username?: string,
  password?: string,
  email?: string,
}

export class User implements IUser {
  constructor(
    public id?: string,
    public username?: string,
    public password?: string,
    public email?: string,
  ) {
  }
}
