import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

export interface ISchedule{
  id: string;
  day: string;
  hour: string;
  barberName: string;
  userId: string;
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
      barberName: '',
      userId: ''
    };
  }

  public delete(scheduleId: string) {
    if (this.schedules.length === 1) {
      this.schedules = [];

      return this.schedules;
    }

    const indexSchedules = this.schedules.findIndex((schedule) => schedule.id === scheduleId );

    if (indexSchedules > -1) {
      this.schedules.splice(indexSchedules, 1);

      return this.schedules;
    }

    alert('Ocorreu um erro ao executar a operação!');
    throw Error('Ocorreu um erro ao executar a operação!');
  }

  public store(schedule: ISchedule) {
    schedule.day = format(new Date(schedule.day), 'dd/MM/yyyy');
    this.schedules.push(schedule);

    console.log(schedule);

    return this.schedules;
  }

  public findAll() {
    return this.schedules;
  }

  public async findAllScheduleByLoggedUser(userId: string) {
    return this.schedules.filter((schedule) => schedule.userId === userId);
  }

  public findAllBarbers() {
    return this.barbers;
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
