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
      day: '26/09/2021',
      hour: '13:00',
      barberName: 'João'
    },
    {
      day: '29/09/2021',
      hour: '12:00',
      barberName: 'Samuka'
    },
    {
      day: '07/10/2021',
      hour: '17:00',
      barberName: 'Tiago'
    },
    {
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
}
