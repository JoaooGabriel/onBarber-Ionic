import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { Storage } from '@ionic/storage-angular';

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
      image: 'https://pps.whatsapp.net/v/t61.24694-24/158394251_304919947728221_6673908805942503455_n.jpg?ccb=11-4&oh=f2b2533cd6b5ef2c68c4fe1495b46374&oe=6188579C',
    },
  ];

  private schedules: ISchedule[] = [];

  constructor(private router: Router, private storage: Storage) {
    this.getSchedules();
  }

  public async getSchedules() {
    const keys = await this.storage.keys();

    keys.forEach(async (key: string) => {
      if (key.split(':')[0] === 'schedule') {
        const getSchedule = await this.storage.get(key);
        this.schedules.push(getSchedule);
      }
    });
  }

  public init() {
    return {
      id: '',
      day: '',
      hour: '',
      barberName: '',
      userId: '',
    };
  }

  public async delete(scheduleId: string) {
    if (this.schedules.length === 1) {
      await this.storage.remove(`schedule:${scheduleId}`);
      this.schedules = [];

      return this.schedules;
    }

    const indexSchedules = this.schedules.findIndex(
      (schedule) => schedule.id === scheduleId
    );

    if (indexSchedules > -1) {
      await this.storage.remove(`schedule:${scheduleId}`);

      this.schedules.splice(indexSchedules, 1);

      return this.schedules;
    }

    alert('Ocorreu um erro ao executar a operação!');
    throw Error('Ocorreu um erro ao executar a operação!');
  }

  public store(schedule: ISchedule) {
    schedule.day = format(new Date(schedule.day), 'dd/MM/yyyy');

    this.storage.set(`schedule:${schedule.id}`, schedule);

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
