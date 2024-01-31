import type { Film } from '../entities';
import { Profession, Rating } from '../entities';

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
    img: '/static/images/cinema/film_1.webp',
    country: {
      id: 1,
      code: 'USA',
      code2: 'US',
      name: 'США'
    }
  },
  {
    id: '2',
    name: 'Голова',
    originalName: 'Голова',
    description:
      'Новому русскому достается в наследство голова. Вопреки ожиданиям отсутствие тела не мешает голове нормально существовать и даже давать новому русскому мудрые советы. Новый русский следует ее советам беспрекословно.',
    releaseDate: '-',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR],
        fullName: 'Александр Маслаев'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Сергей Пахомов'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Анатолий Осмоловский'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Денис Геймур'
      },
      {
        id: '5',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Леонид Машинский'
      },
      {
        id: '6',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Рустам Мосафир'
      },
      {
        id: '7',
        professions: [Profession.ACTOR],
        fullName: 'Георгий Острецов'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Данила Константинов'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Светлана Баскова'
      }
    ],
    runtime: 90,
    ageRating: Rating.NC17,
    genres: ['драма', 'комедия', 'фэнтези'],
    userRatings: {
      kinopoisk: '5.1',
      imdb: '4.9'
    },
    img: '/static/images/cinema/film_2.webp',
    country: {
      id: 2,
      code: 'RUS',
      code2: 'RU',
      name: 'Россия'
    }
  },
  {
    id: '3',
    name: 'Горбатая гора',
    originalName: 'Brokeback Mountain',
    description:
      'На фоне живописных просторов штата Вайоминг разворачивается история сложных взаимоотношений двух молодых людей – помощника владельца ранчо и ковбоя родео. Герои случайно встречаются и скоро понимают, что не могут жить друг без друга. Однако судьба упрямо испытывает их на прочность.',
    releaseDate: '2 сентября 2005',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Хит Леджер'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Джейк Джилленхол'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Рэнди Куэйд'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Мишель Уильямс'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'Энн Хэтэуэй'
      },
      {
        id: '6',
        professions: [Profession.ACTOR],
        fullName: 'Линда Карделлини'
      },
      {
        id: '7',
        professions: [Profession.ACTOR],
        fullName: 'Анна Фэрис'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Дэвид Харбор'
      },
      {
        id: '9',
        professions: [Profession.ACTOR],
        fullName: 'Кейт Мара'
      },
      {
        id: '10',
        professions: [Profession.ACTOR],
        fullName: 'Грэм Беккел'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Энг Ли'
      }
    ],
    runtime: 134,
    ageRating: Rating.R,
    genres: ['вестерн', 'мелодрама', 'драма'],
    userRatings: {
      kinopoisk: '7.6',
      imdb: '7.7'
    },
    img: '/static/images/cinema/film_3.webp',
    country: {
      id: 3,
      code: 'USA',
      code2: 'US',
      name: 'США'
    }
  },
  {
    id: '4',
    name: 'Я люблю тебя, Филлип Моррис',
    originalName: 'I Love You Phillip Morris',
    description:
      'Стивен Расселл — образцовый отец семейства — в результате дерзкой аферы оказывается в техасской тюрьме. Там он без памяти влюбляется в другого заключенного, Филлипа Морриса.',
    releaseDate: '18 января 2009',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR],
        fullName: 'Джим Керри'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Юэн Макгрегор'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Лесли Манн'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Родриго Санторо'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'Энтони Короне'
      },
      {
        id: '6',
        professions: [Profession.ACTOR],
        fullName: 'Майкл Манделл'
      },
      {
        id: '7',
        professions: [Profession.ACTOR],
        fullName: 'Энни Голден'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Мэрилуиз Бёрк'
      },
      {
        id: '9',
        professions: [Profession.ACTOR],
        fullName: 'Бреннан Браун'
      },
      {
        id: '10',
        professions: [Profession.ACTOR],
        fullName: 'Дэвид Дженсен'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Гленн Фикарра'
      },
      {
        id: '2',
        professions: [Profession.DIRECTOR],
        fullName: 'Джон Рекуа'
      }
    ],
    runtime: 102,
    ageRating: Rating.R,
    genres: ['драма', 'мелодрама', 'комедия', 'криминал', 'биография'],
    userRatings: {
      kinopoisk: '6.9',
      imdb: '6.6'
    },
    img: '/static/images/cinema/film_4.webp',
    country: {
      id: 4,
      code: 'FRA',
      code2: 'FR',
      name: 'Франция'
    }
  },
  {
    id: '5',
    name: 'Бруно',
    originalName: 'Brüno',
    description:
      'Неудачливый ведущий передачи о моде, австрийский гей Бруно, едет за славой в Америку.',
    releaseDate: '25 июня 2009',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Саша Барон Коэн'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Густаф Хаммарстен'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Клиффорд Бэнэгейл'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Чибунду Оруквову'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'Чигози Оруквову'
      },
      {
        id: '6',
        professions: [Profession.ACTOR],
        fullName: 'Джош Мейерс'
      },
      {
        id: '7',
        professions: [Profession.ACTOR],
        fullName: 'Тоби Холгин'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Роберт Уэрта'
      },
      {
        id: '9',
        professions: [Profession.ACTOR],
        fullName: 'Гилберт Розалес'
      },
      {
        id: '10',
        professions: [Profession.ACTOR],
        fullName: 'Томас Розалес мл.'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Ларри Чарльз'
      }
    ],
    runtime: 81,
    ageRating: Rating.R,
    genres: ['комедия'],
    userRatings: {
      kinopoisk: '5.8',
      imdb: '5.9'
    },
    img: '/static/images/cinema/film_5.webp',
    country: {
      id: 5,
      code: 'USA',
      code2: 'US',
      name: 'США'
    }
  },
  {
    id: '6',
    name: 'Олдбой',
    originalName: 'Oldeuboi',
    description:
      '1988 год. Обыкновенный и ничем непримечательный бизнесмен О Дэ-cу в день трёхлетия дочери по пути домой напивается, начинает хулиганить и закономерно попадает в полицейский участок. Из участка его под своё поручительство забирает друг детства. Пока тот звонит жене незадачливого пьяницы, О Дэ-су пропадает. Неизвестные похищают его и помещают в комнату без окон на 15 лет.',
    releaseDate: '21 ноября 2003',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR],
        fullName: 'Чхве Мин-сик'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Ю Джи-тхэ'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Кан Хе-джон'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Ким Бён-ок'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'О Даль-су'
      },
      {
        id: '6',
        professions: [Profession.ACTOR],
        fullName: 'Чи Дэ-хан'
      },
      {
        id: '7',
        professions: [Profession.ACTOR],
        fullName: 'Ли Сын-щин'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Юн Джин-со'
      },
      {
        id: '9',
        professions: [Profession.ACTOR],
        fullName: 'Ли Дэ-ён'
      },
      {
        id: '10',
        professions: [Profession.ACTOR],
        fullName: 'О Гван-нок'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Пак Чхан-ук'
      }
    ],
    runtime: 120,
    ageRating: Rating.R,
    genres: ['триллер', 'детектив', 'драма', 'боевик', 'криминал'],
    userRatings: {
      kinopoisk: '8.1',
      imdb: '8.4'
    },
    img: '/static/images/cinema/film_6.webp',
    country: {
      id: 6,
      code: 'KOR',
      code2: 'KR',
      name: 'Южная Корея'
    }
  },
  {
    id: '7',
    name: 'Пять бутылок водки',
    originalName: 'Пять бутылок водки',
    description:
      'Фильм о закулисной жизни обычного московского бара, где отношения между хозяином, «крышей» и работниками очень напоминают семейные. Однако в отличие от семьи этих людей связывает совместное дело, роли в котором далеко не равноценны. Отношения подчинения и угнетения пронизывают собой всю жизнь героев этого фильма.',
    releaseDate: '2002',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR],
        fullName: 'Александр Маслаев'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Денис Васильев'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Сергей Пахомов'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Владимир Епифанцев'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'Диллон Олойеде'
      },
      {
        id: '6',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Мария Болтнева'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Светлана Баскова'
      }
    ],
    runtime: 90,
    ageRating: Rating.NC17,
    genres: ['драма', 'комедия'],
    userRatings: {
      kinopoisk: '6.1',
      imdb: '6.0'
    },
    img: '/static/images/cinema/film_7.webp',
    country: {
      id: 7,
      code: 'RUS',
      code2: 'RU',
      name: 'Россия'
    }
  },
  {
    id: '8',
    name: 'Зелёный слоник',
    originalName: 'Зелёный слоник',
    description:
      'Два младших офицера, сидя в одной камере на гауптвахте, вынуждены решать острые социальные и психологические вопросы в небольшом пространстве.',
    releaseDate: '1999',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Владимир Епифанцев'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Сергей Пахомов'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Александр Маслаев'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Анатолий Осмоловский'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Светлана Баскова'
      }
    ],
    runtime: 86,
    ageRating: Rating.NC17,
    genres: ['ужасы', 'триллер'],
    userRatings: {
      kinopoisk: '5.6',
      imdb: '5.3'
    },
    img: '/static/images/cinema/film_8.webp',
    country: {
      id: 8,
      code: 'RUS',
      code2: 'RU',
      name: 'Россия'
    }
  },
  {
    id: '9',
    name: 'Человеческая многоножка',
    originalName: 'The Human Centipede III (Final Sequence)',
    description:
      'Надзиратель американской тюрьмы, у которого не получается заслужить уважение заключенных и губернатора штата, решается на внедрение революционного наказания, способного не только навести порядок, но и сэкономить миллионы долларов, — в буквальном смысле поставить заключенных на колени, сшив их в гигантскую многоножку из 500 человек.',
    releaseDate: '22 мая 2015',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR],
        fullName: 'Дитер Лазер'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Лоуренс Р. Харви'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'Эрик Робертс'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Роберт ЛаСардо'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'Том ’Тайни’ Листер мл.'
      },
      {
        id: '6',
        professions: [Profession.ACTOR],
        fullName: 'Джей Таваре'
      },
      {
        id: '7',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Клэйтон Ронер'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Бри Олсон'
      },
      {
        id: '9',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Акихиро Китамура'
      },
      {
        id: '10',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Билл Хатченс'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.DIRECTOR],
        fullName: 'Том Сикс'
      }
    ],
    runtime: 102,
    ageRating: Rating.NC17,
    genres: ['ужасы', 'комедия', 'криминал'],
    userRatings: {
      kinopoisk: '3.9',
      imdb: '2.8'
    },
    img: '/static/images/cinema/film_9.webp',
    country: {
      id: 9,
      code: 'NLD',
      code2: 'NL',
      name: 'Нидерланды'
    }
  },
  {
    id: '10',
    name: 'Кокаиновый медведь',
    originalName: 'Cocaine Bear',
    description:
      '1985 год. Из пролетающего над лесами штата Джорджия самолёта наркокурьер выбрасывает несколько пакетов кокаина, часть из них находит барибал и съедает содержимое. Животное приходит в неистовство, и теперь всем туристам, рейнджерам и случайно попавшимся ему на пути бедолагам сильно не поздоровится.',
    releaseDate: '22 февраля 2023',
    actors: [
      {
        id: '1',
        professions: [Profession.ACTOR],
        fullName: 'Кери Рассел'
      },
      {
        id: '2',
        professions: [Profession.ACTOR],
        fullName: 'Олден Эренрайк'
      },
      {
        id: '3',
        professions: [Profession.ACTOR],
        fullName: 'О’Ши Джексон мл.'
      },
      {
        id: '4',
        professions: [Profession.ACTOR],
        fullName: 'Рэй Лиотта'
      },
      {
        id: '5',
        professions: [Profession.ACTOR],
        fullName: 'Исайя Уитлок мл.'
      },
      {
        id: '6',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Бруклин Принс'
      },
      {
        id: '7',
        professions: [Profession.ACTOR],
        fullName: 'Кристиан Конвери'
      },
      {
        id: '8',
        professions: [Profession.ACTOR],
        fullName: 'Марго Мартиндейл'
      },
      {
        id: '9',
        professions: [Profession.ACTOR],
        fullName: 'Джесси Тайлер Фергюсон'
      },
      {
        id: '10',
        professions: [Profession.ACTOR],
        fullName: 'Ханна Хукстра'
      }
    ],
    directors: [
      {
        id: '1',
        professions: [Profession.ACTOR, Profession.DIRECTOR],
        fullName: 'Элизабет Бэнкс'
      }
    ],
    runtime: 95,
    ageRating: Rating.R,
    genres: ['триллер', 'комедия'],
    userRatings: {
      kinopoisk: '5.9',
      imdb: '6.0'
    },
    img: '/static/images/cinema/film_10.webp',
    country: {
      id: 10,
      code: 'USA',
      code2: 'US',
      name: 'США'
    }
  }
];
