import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { api } from 'src/config/api';
import { UserService, IUser } from 'src/app/services/user.service';

export interface ISchedule {
  id: string;
  day: string;
  hour: string;
  barberName: string;
  userId: string;
}

export interface IRegisterSchedule {
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
      image:
        // eslint-disable-next-line max-len
        'https://pps.whatsapp.net/v/t61.24694-24/158394251_304919947728221_6673908805942503455_n.jpg?ccb=11-4&oh=f2b2533cd6b5ef2c68c4fe1495b46374&oe=6188579C',
    },
  ];
  private schedules: ISchedule[] = [];
  private user: IUser;

  constructor(private router: Router, private userService: UserService) {
    // this.user = this.userService.findLoggedUser();
    // this.findAllScheduleByLoggedUser(this.user.id);
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
    await api.delete(`schedules/${scheduleId}`)
    .catch((err) => {
      alert(err);
      throw new Error(err);
    });
  }

  public async store(data: IRegisterSchedule) {
    const schedule = await api
      .post('schedules/', data)
      .then((response) => {
        alert('Agendamento criado com sucesso!');

        return response.data;
      })
      .catch((err) => {
        alert(err);

        throw new Error(err);
      });

    this.schedules.push(schedule);
    return schedule;
  }

  public async findAllScheduleByLoggedUser(userId: string) {
    const schedules = await api
      .get(`schedules/user/${userId}`)
      .then((response) => response.data)
      .catch((err) => {
        alert(err);

        throw new Error(err);
      });

    this.schedules.push(schedules);

    return schedules;
  }

  public async findById(scheduleId: string) {
    const schedule = await api
      .get(`schedules/${scheduleId}`)
      .then((response) => response.data)
      .catch((err) => {
        alert(err);

        throw new Error(err);
      });

    return schedule;
  }

  public async findAll() {
    const schedules = await api
      .get(`schedules/list`)
      .then((response) => response.data)
      .catch((err) => {
        alert(err);

        throw new Error(err);
      });

    return schedules;
  }

  public findAllBarbers() {
    return this.barbers;
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
