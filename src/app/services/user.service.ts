import { Injectable } from '@angular/core';

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
  private users: IUser[] = [
    {
      id: 'ff8feb01-76c3-41dd-a1ae-9933974ed7b4',
      name: 'Test',
      email: 'test.email@gmail.com',
      phone: '+5511999999999',
      password: 'test1234'
    }
  ];
  constructor() { }

  public init(): IUser {
    return {
      id: '',
      name: '',
      email: '',
      phone: '',
      password: ''
    };
  }

  public find(userId: string): IUser {
    return { ...this.users.find((u) => u.id === userId)};
  }

  public login(email: string, password: string): IUser {
    const user = this.users.find((u) => u.email === email && u.password === password);

    return user;
  }
}
