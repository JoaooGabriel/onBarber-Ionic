import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface ISchedule{
  id: string;
  day: string;
  hour: string;
  barberName: string;
}

export interface IBarber {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private barbers: IBarber[] = [
    {
      name: 'João Gabriel'
    },
    {
      name: 'Felippe dos Santos'
    },
    {
      name: 'Tiago Turola'
    },
    {
      name: 'Bruno'
    }
  ];
  private schedules: ISchedule[] = [];
  constructor(private router: Router) { }

  public init(){
    return {
      id: '',
      day: '',
      hour: '',
      barberName: ''
    };
  }

  public delete(scheduleId: string) {
    if (this.schedules.length === 1) {
      this.schedules = [];
    }

    const indexSchedules = this.schedules.findIndex((schedule) => schedule.id === scheduleId );

    if (indexSchedules > -1) {
      this.schedules.splice(indexSchedules, 1);

      return this.schedules;
    }

    alert('Ocorreu um erro ao executar a operação!');
    throw Error('Ocorreu um erro ao executar a operação!');
  }

  public store(schedule: ISchedule){
    this.schedules.push(schedule);

    return this.schedules;
  }

  public findAll(){
    return this.schedules;
  }

  public findAllBarbers() {
    return this.barbers;
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
