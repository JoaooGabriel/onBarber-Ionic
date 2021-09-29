import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IBarber, ISchedule, ScheduleService } from './../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public barbers: IBarber[] = this.scheduleService.findAllBarbers();
  private schedule: ISchedule;
  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.schedule = this.scheduleService.init();
  }

  public getBarberName(barberName: string){
    this.schedule.barberName = barberName;
  }

  public create() {
    if (!this.schedule.day || !this.schedule.hour || !this.schedule.barberName) {
      alert('Por favor, preencha todos os campos ou selecione um barbeiro!');
      throw Error('Por favor, preencha todos os campos ou selecione um barbeiro!');
    }

    this.schedule.id = uuid();
    this.scheduleService.store(this.schedule);
    this.ngOnInit();
    this.goHome();
  }

  public goHome() {
    this.scheduleService.navigate('/home');
  }
}
