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
  public schedules: ISchedule[];
  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService
  ) {
    this.getLoggedUser();
    this.findAllSchedulesByLoggedUser(this.user.id);
  }

  async ngOnInit() {
    await this.findAllSchedulesByLoggedUser(this.user.id);
  }

  public async findAll() {
    const schedules = await this.scheduleService.findAll();

    return schedules;
  }

  public async findAllSchedulesByLoggedUser(userId: string) {
    const schedules = await this.scheduleService.findAllSchedulesByLoggedUser(userId);

    this.schedules = schedules;
    return schedules;
  }

  public getLoggedUser() {
    const user = this.userService.findLoggedUser();

    this.user = user;
  }

  public logout() {
    this.userService.logout();
  }

  public async delete(scheduleId: string) {
    await this.scheduleService.delete(scheduleId);
    const schedules = await this.findAllSchedulesByLoggedUser(this.user.id);

    this.schedules = schedules;
  }
}
