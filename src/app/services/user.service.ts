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
  private users: IUser[] = [];

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

  public async findById(userId: string) {
    const user = await api.get(`users/${userId}`);

    return user;
  }

  public findLoggedUser() {
    return this.loggedUser;
  }

  public async login(email: string, password: string) {
    const user = await api.post('users/login', { email, password })
    .then((response) => response.data)
    .catch((err) => {
      alert(err);

      throw new Error(err);
    });

    this.loggedUser = user;

    return user;
  }

  public logout() {
    this.loggedUser = null;

    this.navigate('/authenticate/login');
  }

  public async store(data: IRegisterUser) {
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
