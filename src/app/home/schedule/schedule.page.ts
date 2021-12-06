import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from 'src/app/services/user.service';
import { v4 as uuid } from 'uuid';
import { IBarber, ISchedule, ScheduleService } from './../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public barbers: IBarber[] = this.scheduleService.findAllBarbers();
  public schedule: ISchedule;
  private loggedUser: IUser;
  constructor(private scheduleService: ScheduleService, private userService: UserService) {
    this.getLoggedUser();
   }

  ngOnInit() {
    this.schedule = this.scheduleService.init();
  }

  public getLoggedUser() {
    const user = this.userService.findLoggedUser();

    this.loggedUser = user;
  }

  public getBarberName(barberName: string){
    this.schedule.barberName = barberName;
  }

  public create() {
    if (!this.schedule.day || !this.schedule.hour || !this.schedule.barberName) {
      alert('Por favor, preencha todos os campos e selecione um barbeiro!');
      throw Error('Por favor, preencha todos os campos e selecione um barbeiro!');
    }

    this.schedule.id = uuid();
    this.schedule.userId = this.loggedUser.id;
    this.scheduleService.store(this.schedule);
    this.ngOnInit();
    this.goHome();
  }

  public goHome() {
    this.scheduleService.navigate('/home/main');
  }
}
