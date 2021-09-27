import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: IUser[] = [
    {
      id: 'ff8feb01-76c3-41dd-a1ae-9933974ed7b4',
      name: 'Test',
      phone: '+5511999999999',
      city: 'São Paulo',
      email: 'test.email@gmail.com',
      password: 'test1234',
    },
  ];

  private loggedUser: IUser;
  constructor(private router: Router) {}

  public init(): IUser {
    return {
      id: '',
      name: '',
      email: '',
      phone: '',
      city: '',
      password: '',
    };
  }

  public findAll(): Readonly<Array<Readonly<IUser>>> {
    return this.users;
  }

  public find(userId: string): IUser {
    return { ...this.users.find((u) => u.id === userId) };
  }

  public findLoggedUser(): IUser {
    return this.loggedUser;
  }

  public login(email: string, password: string): IUser {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert('E-mail ou senha inválidos!');
      throw Error('E-mail ou senha inválidos!');
    }

    this.loggedUser = user;

    alert('Autenticado com sucesso!');

    return user;
  }

  public logout() {
    this.loggedUser = null;

    this.navigate('/authenticate/login');
  }

  public store(user: IUser) {
    const userExists = this.users.find(
      (u) => u.email === user.email && u.phone === user.phone
    );

    if (userExists) {
      alert('Este usuário já existe!');
      throw Error('Este usuário já existe!');
    }

    this.users.push(user);

    alert('Usuário criado com sucesso!');

    return user;
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
