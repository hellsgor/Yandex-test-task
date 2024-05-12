import { createElement } from '@/js/helpers/create-element.js';
import { resolutionChecker } from '@/js/helpers/ResolutionChecker.js';

class Slider {
  sliderElem = null;
  params = null;

  prewButton = null;
  nextButton = null;
  paginationWrapper = null;
  wrapper = null;
  slides = null;
  bulits = null;

  defaultSliderClassName = 'slider';
  classNames = {
    default: {
      prewButton: `${this.defaultSliderClassName}-button_prew`,
      nextButton: `${this.defaultSliderClassName}-button_next`,
      paginationWrapper: `${this.defaultSliderClassName}-pagination`,
      wrapper: `${this.defaultSliderClassName}-wrapper`,
      slide: `${this.defaultSliderClassName}-slide`,
    },
    paginationBulit: `${this.defaultSliderClassName}-pagination__bulit`,
  };
  modifiers = {
    active: 'active',
  };

  columnGap = null;

  defaultParams = {
    loop: false,
    pagination: 'bulits',
    openingSlideIndex: 0,
    slidesPerView: {
      desktop: 1,
      tablet: 1,
      mobile: 1,
    },
    transition: 300,
  };

  constructor(slider) {
    this.sliderElem = slider || null;
    this.params =
      slidersParams[slider.getAttribute(`${sliderNameAttr}`)] || null;

    this.setDefaultParams();
    this.checkCustomClassNames();

    this.getElements();
    this.createPagination();
    this.manageActivityClass('add');
    this.setButtonsAvailability();

    this.addEvents();
  }

  /**
   * Получает элементы слайдера по заданным классам.
   */
  getElements() {
    const getElement = (className) => {
      return this.sliderElem.querySelector(`.${className}`);
    };

    this.prewButton = getElement(this.classNames.default.prewButton);
    this.nextButton = getElement(this.classNames.default.nextButton);
    this.paginationWrapper = getElement(
      this.classNames.default.paginationWrapper,
    );
    this.wrapper = getElement(this.classNames.default.wrapper);
    this.slides = Array.from(
      this.sliderElem.querySelectorAll(`.${this.classNames.default.slide}`),
    );
  }

  /**
   * Устанавливает доступность кнопок в зависимости от индекса активного слайда.
   * @param {number|null} activeIdx - Индекс активного слайда. Если не указан, будет использован индекс активного слайда.
   */
  setButtonsAvailability(activeIdx = null) {
    if (this.params.loop) return;

    const idx = activeIdx || this.getActiveSlideIndex();
    const maxIdx = this.slides.length - 1;

    this.prewButton.disabled = idx === 0;
    this.nextButton.disabled =
      maxIdx === idx || idx + this.getSlidesPerView() - 1 === maxIdx;
  }

  /**
   * Устанавливает пагинацию для слайдера в зависимости от параметров.
   */
  createPagination() {
    /**
     * Создает элементы пагинации в виде точек.
     */
    const setBulits = () => {
      const slidesPerView = this.getSlidesPerView();
      for (let i = 1; i <= this.slides.length; i++) {
        if (i % slidesPerView === 0) {
          this.paginationWrapper.appendChild(
            createElement({
              tag: 'span',
              classes: this.classNames.paginationBulit,
            }),
          );
        }
      }

      this.bulits = this.paginationWrapper.querySelectorAll(
        `.${this.classNames.paginationBulit}`,
      );
    };

    /**
     * Создает элементы пагинации в виде цифр.
     */
    const setNums = () => {
      [
        '',
        '/',
        Math.ceil(this.slides.length / this.getSlidesPerView()),
      ].forEach((item) => {
        this.paginationWrapper.appendChild(
          createElement({
            tag: 'span',
            text: item,
          }),
        );
      });
    };

    // очистка контейнера пагинации
    this.paginationWrapper.innerHTML = '';

    // добавление класса контейнеру пагинации соответствующего типу пагинации
    if (
      !this.paginationWrapper.classList.contains(
        `${this.classNames.default.paginationWrapper}_${this.params.pagination}`,
      )
    ) {
      this.paginationWrapper.classList.add(
        `${this.classNames.default.paginationWrapper}_${this.params.pagination}`,
      );
    }

    // Выбор функции наполнения контейнера пагинации
    switch (this.params.pagination) {
      case 'bulits':
        setBulits();
        break;

      case 'nums':
        setNums();
        break;

      default:
        break;
    }
  }

  /**
   * Управляет классом активности элементов.
   * @param {string} action - Действие ('add' для добавления класса, 'remove' для удаления класса).
   * @param {number|null} index - Индекс элемента (необязательный). Если не указан, будет определён автоматически.
   */
  manageActivityClass(action, index = null) {
    /**
     * Изменяет класс активности элемента.
     * @param {string} action - Действие ('add' для добавления класса, 'remove' для удаления класса).
     * @param {HTMLElement} entity - HTML-элемент.
     * @param {string} className - Имя класса.
     */
    const changeActiveClass = (action, entity, className) => {
      entity.classList[action](`${className}_${this.modifiers.active}`);
    };

    // Определение индекса активного элемента
    const idx = index
      ? index
      : action === 'add'
        ? this.params.openingSlideIndex
        : this.getActiveSlideIndex();

    /**
     * Возвращает массив активных элементов.
     * @returns {Array} - Массив объектов, содержащих активные элементы и их классы.
     */
    const getActiveElementsArray = () => {
      const activeElementsArray = [
        {
          entity: this.slides[idx],
          className: this.classNames.default.slide,
        },
      ];

      if (this.params?.pagination === 'bulits') {
        activeElementsArray.push({
          entity: this.bulits[Math.floor(idx / this.getSlidesPerView())],
          className: this.classNames.paginationBulit,
        });
      }

      return activeElementsArray;
    };

    getActiveElementsArray().forEach((entityObj) => {
      if (entityObj.entity) {
        changeActiveClass(action, entityObj.entity, entityObj.className);
      }

      if (this.params?.pagination === 'nums') {
        this.paginationWrapper.querySelector('span').innerText =
          Math.floor(idx / this.getSlidesPerView()) + 1;
      }
    });
  }

  /**
   * Возвращает индекс активного слайда.
   * @returns {number} Возвращает индекс активного слайда или -1, если активный слайд не найден.
   */
  getActiveSlideIndex() {
    return this.slides.findIndex((slide) =>
      slide.classList.contains(
        `${this.classNames.default.slide}_${this.modifiers.active}`,
      ),
    );
  }

  /**
   * Устанавливает базовым параметры слайдера значения по умолчанию.
   */
  setDefaultParams() {
    if (!this.params) {
      this.params = this.defaultParams;
      return;
    }

    if (this.params.pagination !== false && !this.params.pagination) {
      this.params.pagination = this.defaultParams.pagination;
    }

    this.params.loop = this.params.loop || this.defaultParams.loop;
    this.params.openingSlideIndex =
      this.params.openingSlideIndex || this.defaultParams.openingSlideIndex;
    this.params.transition =
      this.params.transition || this.defaultParams.transition;
    this.params.slidesPerView = this.params.slidesPerView || {};
    this.params.slidesPerView.desktop = this.params.slidesPerView.desktop || 1;
    this.params.slidesPerView.tablet = this.params.slidesPerView.tablet || 1;
    this.params.slidesPerView.mobile = this.params.slidesPerView.mobile || 1;
  }

  /**
   * Проверяет пользовательские классы и применяет их, если они установлены в параметрах.
   */
  checkCustomClassNames() {
    Object.keys(this.classNames.default).forEach((key) => {
      this.params[key] && (this.classNames.default[key] = this.params[key]);
    });
  }

  /**
   * Добавляет слушателей событий для кнопок переключения и изменения размера окна.
   */
  addEvents() {
    this.nextClickHandler = (event) => {
      this.switchSlide('next', event);
    };

    this.prewClickHandler = (event) => {
      this.switchSlide('prew', event);
    };

    this.resizeHandler = () => {
      this.getColumnGap();
      this.wrapper.style.transform = 'translateX(0px)';
      this.manageActivityClass('remove');
      this.slides = Array.from(
        this.sliderElem.querySelectorAll(`.${this.classNames.default.slide}`),
      );
      this.createPagination();
      this.manageActivityClass('add');
      this.setButtonsAvailability(0);
    };

    this.debouncedResizeHendler = this.resizeDebounce(this.resizeHandler, 300);

    this.nextButton.addEventListener('click', this.nextClickHandler);
    this.prewButton.addEventListener('click', this.prewClickHandler);
  }

  /**
   * Переключает слайд в слайдере в зависимости от заданного направления.
   * @param {string} direction - Направление, в котором необходимо переключить слайд ('next' или 'prev').
   * @param {Event} event - Событие, которое вызвало переключение слайдов.
   */

  switchSlide(direction, event) {
    this.disableSliderButton(event);

    this.setTransition();
    this.wrapper.style.transform = `translateX(${this.getTranslate(direction)}px)`;

    const activeIndex = this.getActiveSlideIndex();
    const newActiveIndex =
      direction === 'next'
        ? activeIndex + this.getSlidesPerView()
        : activeIndex - this.getSlidesPerView();
    this.manageActivityClass('remove', activeIndex);
    this.manageActivityClass('add', newActiveIndex);
    this.setButtonsAvailability(newActiveIndex);
  }

  /**
   * Получает значение пространства между колонками (column-gap) элемента-обертки слайдов.
   * @returns {number} - Значение пространства между колонками в пикселях. Если значение не найдено или равно 'normal', возвращается 0.
   */
  getColumnGap() {
    const columnGapValue = window
      .getComputedStyle(this.wrapper)
      .getPropertyValue('column-gap');

    let columnGap = 0;

    if (columnGapValue && columnGapValue !== 'normal') {
      const matchedValue = columnGapValue.match(/\d+/);
      if (matchedValue && matchedValue.length > 0) {
        columnGap = parseInt(matchedValue[0], 10);
      }
    }

    this.columnGap = columnGap;
    return columnGap;
  }

  /**
   * Вычисляет значение смещения (translate) для прокрутки следующего или предыдущего слайда.
   * @param {string} direction - Направление прокрутки: 'next' для следующего, 'prew' для предыдущего.
   * @returns {number} - Значение смещения для прокрутки слайдов.
   */
  getTranslate(direction) {
    // Рассчитываем значение смещения на основе ширины активного слайда и промежутка между колонками
    const translateValue =
      (this.slides[this.getActiveSlideIndex()].offsetWidth +
        (this.columnGap || this.getColumnGap())) *
      this.getSlidesPerView();

    // Получаем текущее значение смещения по X из стиля wrapper
    const currentTranslateX = parseInt(
      this.wrapper.style.transform.match(/translateX\(([-+]?\d+)px\)/)?.[1] ||
        0,
      10,
    );

    // Возвращаем значение смещения в зависимости от направления
    return direction === 'next'
      ? currentTranslateX - translateValue
      : currentTranslateX + translateValue;
  }

  /**
   * Устанавливает длительность и кривую промежуточных точек прокрутки слайдов.
   */
  setTransition() {
    this.wrapper.style.transition = `transform ${this.params.transition / 1000}s ease-in-out`;

    setTimeout(() => {
      this.wrapper.style.transition = '';
    }, this.params.transition + 5);
  }

  /**
   * Отключает события мыши для кнопки слайдера на заданное время.
   * @param {MouseEvent} event - Событие, которое вызвало метод.
   */
  disableSliderButton({ target }) {
    target.style.pointerEvents = 'none';
    setTimeout(() => {
      target.style.pointerEvents = '';
    }, this.params.transition + 1);
  }

  /**
   * Уничтожает слайдер, удаляя все обработчики событий и возвращая исходное состояние элементов.
   */
  destroy() {
    this.removeEvents();
    this.resetButtonsAvailability();
    this.resetPagination();
    this.clearProperties();
  }

  /**
   * Удаляет все обработчики событий, добавленные к слайдеру.
   */
  removeEvents() {
    this.prewButton.removeEventListener('click', this.prewClickHandler);
    this.prewClickHandler = null;

    this.nextButton.removeEventListener('click', this.nextClickHandler);
    this.nextClickHandler = null;

    window.removeEventListener('resize', this.resizeHandler);
    this.resizeHandler = null;
  }

  /**
   * Сбрасывает доступность кнопок слайдера.
   */
  resetButtonsAvailability() {
    this.prewButton.disabled = false;
    this.nextButton.disabled = false;
  }

  /**
   * Удаляет пагинацию из слайдера.
   */
  resetPagination() {
    this.paginationWrapper.innerHTML = '';
    this.paginationWrapper.classList.remove(
      `${this.classNames.default.paginationWrapper}_bulits`,
    );
  }

  /**
   * Очищает свойства.
   */
  clearProperties() {
    Object.keys(this).forEach((key) => {
      const value = this[key];
      if (value !== null && typeof value !== 'function') {
        this[key] = null;
      }
    });
  }

  /**
   * Откладывает выполнения переданной функции.
   * @param {Function} callee - Функция, которую нужно отложенно выполнить.
   * @param {number} timeoutMs - Время задержки (в миллисекундах) перед выполнением функции.
   * @returns {Function} - Функция обертка, которая реализует механизм отложенного выполнения.
   */
  resizeDebounce(callee, timeoutMs) {
    return function perform(...args) {
      let previousCall = this.lastCall;

      this.lastCall = Date.now();

      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }

      this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
  }

  /**
   * Определяет количество слайдов для отображения в зависимости от текущего разрешения экрана.
   * @returns {number} Количество слайдов для отображения на экране.
   */
  getSlidesPerView() {
    if (resolutionChecker.isMobile()) return this.params.slidesPerView.mobile;
    if (resolutionChecker.isTablet()) return this.params.slidesPerView.tablet;
    return this.params.slidesPerView.desktop;
  }
}

const sliderNameAttr = 'data-slider-name';

const slidersParams = {
  /**
   * возможные параметры:
   *
   * ключом является имя слайдера
   *
   * prewButton- css-класс кнопки предыдущего слайда. Необязательный параметр, предусмотрено значение по умолчанию;
   * nextButton - css-класс кнопки следующего слайда. Необязательный параметр, предусмотрено значение по умолчанию;
   * paginationWrapper - css-класс контейнера пагинации. Необязательный параметр, предусмотрено значение по умолчанию;
   * wrapper - css-класс контейнера слайдов. Необязательный параметр, предусмотрено значение по умолчанию;
   * slide - css-класс контейнера слайдов. Необязательный параметр, предусмотрено значение по умолчанию;
   *
   * loop - зацикленность слайдера. Необязательный параметр. Значение по умолчанию - false.
   *
   * pagination - тип пагинации. Возможные значения: 'bulits' || 'nums' || true || false.
   * true - пагинация включена. Тип пагинации по умолчанию - 'bulits'.
   * false - пагинация отключена. Falsy-значения включат пагинацию с типом по умолчанию.
   *
   * openingSlide - начальный слайд, необязательный параметр.
   * Значение по умолчанию - 0;
   *
   * slidesPerView - количество одновременно видимых слайдов для отдельных брэйкпоинтов (desktop, tablet, mobile).
   * Значение по умолчанию - 1
   *
   * transition - время, в миллисекундах, за которое слайды должны переключиться.
   * Значение по умолчанию - 300ms
   * */
  stages: {
    wrapper: 'stages__list',
  },

  members: {
    slidesPerView: {
      desktop: 3,
      tablet: 2,
      mobile: 1,
    },
    pagination: 'nums',
  },
};

export function initSliders() {
  return Array.from(document.querySelectorAll(`[${sliderNameAttr}]`)).map(
    (slider) => new Slider(slider),
  );
}
