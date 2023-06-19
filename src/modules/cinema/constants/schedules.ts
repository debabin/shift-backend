import { halls } from './halls';

export const schedules = [
  {
    filmId: '1',
    schedule: [
      [
        {
          time: '10:00',
          hall: halls.red
        },
        {
          time: '15:30',
          hall: halls.green
        },
        {
          time: '21:10',
          hall: halls.blue
        }
      ],
      [
        {
          time: '10:30',
          hall: halls.red
        },
        {
          time: '14:00',
          hall: halls.green
        },
        {
          time: '20:40',
          hall: halls.blue
        }
      ]
    ]
  }
];
