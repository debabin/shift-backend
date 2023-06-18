import { Film } from '@/modules/cinema/entities';

export const films: Film[] = [
  {
    id: '1',
    name: 'Зеленая миля',
    originalName: 'The Green Mile',
    description:
      'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.',
    releaseDate: '6 декабря 1999',
    actors: [
      {
        id: '1',
        professions: [0, 1],
        fullName: 'Том Хэнкс'
      },
      {
        id: '2',
        professions: [0, 1],
        fullName: 'Дэвид Морс'
      },
      {
        id: '3',
        professions: [0, 1],
        fullName: 'Бонни Хант'
      },
      {
        id: '4',
        professions: [0, 1],
        fullName: 'Майкл Кларк Дункан'
      },
      {
        id: '5',
        professions: [0, 1],
        fullName: 'Джеймс Кромуэлл'
      },
      {
        id: '6',
        professions: [0, 1],
        fullName: 'Майкл Джитер'
      },
      {
        id: '7',
        professions: [0, 1],
        fullName: 'Грэм Грин'
      },
      {
        id: '8',
        professions: [0, 1],
        fullName: 'Даг Хатчисон'
      },
      {
        id: '9',
        professions: [0, 1],
        fullName: 'Сэм Рокуэлл'
      },
      {
        id: '10',
        professions: [0, 1],
        fullName: 'Барри Пеппер'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [0, 1],
        fullName: 'Фрэнк Дарабонт'
      }
    ],
    runtime: 189,
    ageRating: 4,
    genres: ['драма', 'фэнтези', 'криминал'],
    userRatings: {
      kinopoisk: '9.1',
      imdb: '8.6'
    },
    img: '/static/images/cinema/film_1.webp'
  }
];
