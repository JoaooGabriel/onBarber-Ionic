import { Component } from '@angular/core';
import { ISchedule, ScheduleService } from '../services/schedule.service';
import { IUser, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user: IUser;
  public schedules: ISchedule[] = this.findAll();

  constructor(private userService: UserService, private scheduleService: ScheduleService) {
    this.getLoggedUser();
  }

  public findAll(){
    return this.scheduleService.findAll();
  }

  public getLoggedUser() {
    const user = this.userService.findLoggedUser();

    this.user = user;
  }

  public getSchedules() {
    return this.schedules;
  }

  public logout() {
    this.userService.logout();
  }

  public delete(scheduleId: string) {
    const schedules = this.scheduleService.delete(scheduleId);

    this.schedules = schedules;
  }
}
