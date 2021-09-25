import { Injectable } from '@angular/core';

// export interface IUserLogin {
//   email: string;
//   password: string;
// }

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = [];
  constructor() { }

  public find(userId: string): IUser {
    return { ...this.users.find((u) => u.id === userId)};
  }

  public login(email: string, password: string): IUser {
    const user = { ...this.users.find((u) => u.email === email && u.password === password)};

    if (!user) {
      return undefined;
    }

    user.password = undefined;

    return user;
  }
}
