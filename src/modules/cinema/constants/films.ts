import { Film, Profession, Rating } from '../entities';

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
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Том Хэнкс'
      },
      {
        id: '2',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Дэвид Морс'
      },
      {
        id: '3',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Бонни Хант'
      },
      {
        id: '4',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Майкл Кларк Дункан'
      },
      {
        id: '5',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Джеймс Кромуэлл'
      },
      {
        id: '6',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Майкл Джитер'
      },
      {
        id: '7',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Грэм Грин'
      },
      {
        id: '8',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Даг Хатчисон'
      },
      {
        id: '9',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Сэм Рокуэлл'
      },
      {
        id: '10',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Барри Пеппер'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Фрэнк Дарабонт'
      }
    ],
    runtime: 189,
    ageRating: Rating.R,
    genres: ['драма', 'фэнтези', 'криминал'],
    userRatings: {
      kinopoisk: '9.1',
      imdb: '8.6'
    },
    img: '/static/images/cinema/film_1.webp'
  }
];
