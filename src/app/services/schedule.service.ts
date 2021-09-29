import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface ISchedule{
  id: string;
  day: string;
  hour: string;
  barberName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedules: ISchedule[] = [
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

    throw Error('Ocorreu um erro ao executar a operação!');
  }

  public store(schedule: ISchedule){
    this.schedules.push(schedule);

    alert('agendamento criado com sucesso!');
    return schedule;
  }

  public findAll(){
    return this.schedules;
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
