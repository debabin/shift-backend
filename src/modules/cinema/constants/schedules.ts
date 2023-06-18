import { Schedule } from '../entities/schedule.entity';

import { halls } from './halls';

export const schedules: Schedule[] = [
  {
    filmId: '1',
    schedule: {
      [new Date()]: [
        {
          // payedTikects сюда добавить для каждого сеанса
          time: '10:00',
          hall: halls.red
        },
        {
          // payedTikects сюда добавить для каждого сеанса
          time: '15:30',
          hall: halls.green
        },
        {
          // payedTikects сюда добавить для каждого сеанса
          time: '21:10',
          hall: halls.blue
        }
      ]
    }
  }
];
