import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from './../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user: IUser;
  public schedules = [
    {
      id: '3f4f8177-b9db-45ad-9bf8-16297ccc0e51',
      day: '26/09/2021',
      hour: '13:00',
      barberName: 'João'
    },
    {
      id: '124ff50c-3881-47fa-ae18-cb2fbf647e64',
      day: '29/09/2021',
      hour: '12:00',
      barberName: 'Samuka'
    },
    {
      id: 'd5eb8ca8-4582-43e8-aa16-e30d3242c261',
      day: '07/10/2021',
      hour: '17:00',
      barberName: 'Tiago'
    },
    {
      id: '6fc05cac-2993-43b2-a5a3-bfa94353abc7',
      day: '20/10/2021',
      hour: '09:00',
      barberName: 'Bruno'
    }
  ];

  constructor(private userService: UserService) {
    this.getLoggedUser();
  }

  public getLoggedUser() {
    const user = this.userService.findLoggedUser();

    this.user = user;
  }

  public getSchedules() {
    return this.schedules;
  }

  logout() {
    this.userService.logout();
  }

  delete(scheduleId: string) {
    if (this.schedules.length === 1) {
      this.schedules = [];
    }

    const indexSchedules = this.schedules.findIndex((schedule) => schedule.id === scheduleId );

    if (indexSchedules > -1) {
      this.schedules.splice(indexSchedules, 1);
    }

    throw Error('Ocorreu um erro ao executar a operação!');
  }
}
