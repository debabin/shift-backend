import { Schedule } from '../entities/schedule.entity';

import { halls } from './halls';

const oneDayInMs = 24 * 3600 * 1000;

export const schedules: Schedule[] = [
  {
    filmId: '1',
    schedule: {
      [new Date().getTime()]: [
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
      ],
      [new Date().getTime() + oneDayInMs]: [
        {
          // payedTikects сюда добавить для каждого сеанса
          time: '10:30',
          hall: halls.red
        },
        {
          // payedTikects сюда добавить для каждого сеанса
          time: '14:00',
          hall: halls.green
        },
        {
          // payedTikects сюда добавить для каждого сеанса
          time: '20:40',
          hall: halls.blue
        }
      ],
    }
  }
];
