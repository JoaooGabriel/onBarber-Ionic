import { Component, OnInit } from '@angular/core';
import { ISchedule, ScheduleService } from 'src/app/services/schedule.service';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public user: IUser;
  public schedules: ISchedule[] = this.findAll();
  constructor(private userService: UserService, private scheduleService: ScheduleService) {
    this.getLoggedUser();
  }

  ngOnInit() {
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
