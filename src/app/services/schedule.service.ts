import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

export interface ISchedule {
  id: string;
  day: string;
  hour: string;
  barberName: string;
  userId: string;
}

export interface IBarber {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private barbers: IBarber[] = [
    {
      name: 'João Gabriel',
      image:
        'https://avatars.githubusercontent.com/u/56719166?s=400&u=d8a94923f3a5d485110158976b1bae998ed3f26c&v=4',
    },
    {
      name: 'Felippe dos Santos',
      image:
        'https://avatars.githubusercontent.com/u/75647162?s=400&u=82a9ba0605de95a96bed703fa841408a4eea3913&v=4',
    },
    {
      name: 'Tiago Turola',
      image:
        // eslint-disable-next-line max-len
        'https://media-exp1.licdn.com/dms/image/C4D03AQESo6ecF3uOAg/profile-displayphoto-shrink_800_800/0/1582833096300?e=1638403200&v=beta&t=uQBzn1uAY6xEFAknI6xcyNdiXTyxyyOj8EYAQ3REJ2o',
    },
    {
      name: 'Bruno',
      // eslint-disable-next-line max-len
      image: 'https://pps.whatsapp.net/v/t61.24694-24/116347142_774635739944801_2645334856715129436_n.jpg?ccb=11-4&oh=a22c05f8fb8eb4f5cea711020cca52d8&oe=615A7A5B',
    },
  ];
  private schedules: ISchedule[] = [];
  constructor(private router: Router) {}

  public init() {
    return {
      id: '',
      day: '',
      hour: '',
      barberName: '',
      userId: '',
    };
  }

  public delete(scheduleId: string) {
    if (this.schedules.length === 1) {
      this.schedules = [];

      return this.schedules;
    }

    const indexSchedules = this.schedules.findIndex(
      (schedule) => schedule.id === scheduleId
    );

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
