import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { api } from 'src/config/api';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  password?: string;
}

export interface IRegisterUser {
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
      password: 'T&st_1234',
    },
  ];

  private loggedUser: IUser;
  constructor(private router: Router, private storage: Storage) {
    this.getUsers();
  }

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

  public async findAll() {
    const users = await api.get('users/list')
      .then(async (response) => response.data)
      .catch((err) => {
        alert(err);

        throw new Error(err);
      });

    return users;
  }

  public async getUsers() {
    const getUsers = await this.findAll();

    if (getUsers.length === 0) {
      return;
    }

    getUsers.forEach((user: IUser) => {
      this.users.push(user);
    });
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

    return user;
  }

  public logout() {
    this.loggedUser = null;

    this.navigate('/authenticate/login');
  }

  public async store(data: IRegisterUser) {
    // const userExists = this.users.find(
    //   (u) => u.email === user.email || u.phone === user.phone
    // );

    // if (userExists) {
    //   alert('Este usuário já existe!');
    //   throw Error('Este usuário já existe!');
    // }

    // this.storage.set('users', user);
    // this.users.push(user);

    const user = await api.post('users/', data)
      .then(async (response) => {
        alert('Usuário criado com sucesso!');
        await this.findAll();
        return response.data;
      })
      .catch((err) => {
        alert(err);

        throw new Error(err);
      });

    return user;
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
