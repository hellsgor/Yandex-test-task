export const store = {
  tickerSlides: [
    'Дело помощи утопающим — дело рук самих утопающих!',
    'Шахматы двигают вперед не только культуру, но и экономику!',
    'Лед тронулся, господа присяжные заседатели!',
  ],

  tournamentTable: [
    {
      label: 'Место проведения:',
      value: ['Клуб &laquo;Картонажник&raquo;'],
    },
    {
      label: 'Дата и&nbsp;время мероприятия:',
      value: ['22&nbsp;июня 1927&nbsp;г.&nbsp;в&nbsp;18:00'],
    },
    { label: 'Стоимость входных билетов:', value: ['20&nbsp;коп.'] },
    { label: 'Плата за&nbsp;игру:', value: ['50&nbsp;коп.'] },
    {
      label: 'Взнос на&nbsp;телеграммы:',
      value: ['100&nbsp;руб.', '21&nbsp;руб.&nbsp;16&nbsp;коп.'],
    },
  ],

  stages: [
    { value: 'Строительство железнодорожной магистрали Москва-Васюки' },
    {
      value:
        'Открытие фешенебельной гостиницы &laquo;Проходная пешка&raquo; и&nbsp;других небоскрёбов',
      grouped: true,
    },
    {
      value:
        'Поднятие сельского хозяйства в&nbsp;радиусе на&nbsp;тысячу километров: производство овощей, фруктов, икры, шоколадных конфет',
      mod: 'high',
    },
    { value: 'Строительство дворца для&nbsp;турнира' },
    {
      value: 'Размещение гаражей для&nbsp;гостевого автотранспорта',
      grouped: true,
    },
    {
      value:
        'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов',
    },
    {
      value:
        'Создание аэропорта &laquo;Большие Васюки&raquo; с&nbsp;регулярным отправлением почтовых самолётов и&nbsp;дирижаблей во&nbsp;все концы света, включая Лос-Анжелос и&nbsp;Мельбурн',
      mod: 'long',
    },
  ],

  members: [
    {
      name: 'Хозе-Рауль Капабланка',
      rank: 'Чемпион мира по&nbsp;шахматам',
      url: '#',
      photo: '',
    },
    {
      name: 'Эммануил Ласкер',
      rank: 'Чемпион мира по&nbsp;шахматам',
      url: '#',
      photo: '',
    },
    {
      name: 'Александр Алехин',
      rank: 'Чемпион мира по&nbsp;шахматам',
      url: '#',
      photo: '',
    },
    {
      name: 'Арон Нимцович',
      rank: 'Чемпион мира по&nbsp;шахматам',
      url: '#',
      photo: '',
    },
    {
      name: 'Рихард Рети',
      rank: 'Чемпион мира по&nbsp;шахматам',
      url: '#',
      photo: '',
    },
    { name: 'Остап Бендер', rank: 'Гроссмейстер', url: '#', photo: '' },
  ],
};
