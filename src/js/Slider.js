import { createElement } from '@/js/helpers/create-element.js';

class Slider {
  sliderElem = null;
  params = null;

  defaultSliderClassName = 'slider';
  classNames = {
    prewButton: `${this.defaultSliderClassName}-button_prew`,
    nextButton: `${this.defaultSliderClassName}-button_next`,
    paginationWrapper: `${this.defaultSliderClassName}-pagination`,
    paginationBulit: `${this.defaultSliderClassName}-pagination__bulit`,
    wrapper: `${this.defaultSliderClassName}-wrapper`,
    slide: `${this.defaultSliderClassName}-slide`,
  };
  modifiers = {
    active: 'active',
  };

  prewButton = null;
  nextButton = null;
  paginationWrapper = null;
  wrapper = null;
  slides = null;
  bulits = null;

  constructor(slider) {
    this.sliderElem = slider || null;
    this.params =
      slidersParams[slider.getAttribute(`${sliderNameAttr}`)] || null;

    this.setBasicParams();
    this.getElements();
    this.createPagination();
    this.manageActivityClass('add');
    this.setButtonsUnavailability();
  }

  /**
   * @description Получает элементы слайдера по заданным классам.
   */
  getElements() {
    /**
     * @description Возвращает класс элемента слайдера в зависимости от наличия пользовательского параметра. Если пользовательский параметр не указан, возвращает класс по умолчанию.
     * @param {string} customParamName - Название пользовательского параметра.
     * @param {string} defaultClassnameKey - Ключ класса по умолчанию.
     * @returns {string} - Класс элемента слайдера.
     */
    const getSelector = (customParamName, defaultClassnameKey) => {
      return this.params[customParamName]
        ? this.params[customParamName]
        : this.classNames[defaultClassnameKey];
    };

    /**
     * @description Получает элемент слайдера по заданному классу.
     * @param {string} customParamName - Название пользовательского параметра.
     * @param {string} defaultClassnameKey - Ключ класса по умолчанию.
     * @returns {HTMLElement} - Элемент слайдера.
     */
    const getElement = (customParamName, defaultClassnameKey) => {
      return this.sliderElem.querySelector(
        `.${getSelector(customParamName, defaultClassnameKey)}`,
      );
    };

    this.prewButton = getElement('prewButtonClassName', 'prewButton');
    this.nextButton = getElement('nextButtonClassName', 'nextButton');
    this.paginationWrapper = getElement(
      'paginationWrapperClassName',
      'paginationWrapper',
    );
    this.wrapper = getElement('wrapperClassName', 'wrapper');
    this.slides = Array.from(
      this.sliderElem.querySelectorAll(
        `.${getSelector('slideClassName', 'slide')}`,
      ),
    );
  }

  /**
   * @description Устанавливает недоступность кнопок слайдера в зависимости от параметров.
   */
  setButtonsUnavailability() {
    if (!this.params.loop) {
      this.prewButton.setAttribute('disabled', true);
    }
  }

  /**
   * @description Устанавливает пагинацию для слайдера в зависимости от параметров.
   */
  createPagination() {
    /**
     * @description Создает элементы пагинации в виде точек.
     */
    const setBulits = () => {
      this.paginationWrapper.classList.add(
        `${this.classNames.paginationWrapper}_bulits`,
      );
      for (let i = 0; i < this.slides.length; i++) {
        this.paginationWrapper.appendChild(
          createElement({
            tag: 'span',
            classes: this.classNames.paginationBulit,
          }),
        );
      }

      this.bulits = this.paginationWrapper.querySelectorAll(
        `.${this.classNames.paginationBulit}`,
      );
    };

    // Выбор типа пагинации
    switch (this.params.pagination) {
      case 'bulits':
        setBulits();
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

    // Определение индекса элемента
    const idx = index
      ? index
      : action === 'add'
        ? 0
        : this.slides.findIndex((slide) =>
            slide.className.contains(
              `${this.classNames.slide}_${this.modifiers.active}`,
            ),
          );

    /**
     * Возвращает массив активных элементов.
     * @returns {Array} - Массив объектов, содержащих активные элементы и их классы.
     */
    const getActiveElementsArray = () => {
      const activeElementsArray = [
        {
          entity: this.slides[idx],
          className: this.classNames.slide,
        },
      ];

      if (this.params?.pagination === 'bulits') {
        activeElementsArray.push({
          entity: this.bulits[idx],
          className: this.classNames.paginationBulit,
        });
      }

      return activeElementsArray;
    };

    getActiveElementsArray().forEach((entityObj) => {
      changeActiveClass(action, entityObj.entity, entityObj.className);
    });
  }

  getActiveSlideIndex() {
    return this.slides.findIndex((slide) =>
      slide.classList.contains(
        `${this.classNames.slide}_${this.modifiers.active}`,
      ),
    );
  }

  setBasicParams() {
    if (!this.params.loop) this.params.loop = false;

    if (this.params.pagination !== false && !this.params.pagination) {
      this.params.pagination = 'bulits';
    }

    if (!this.params.openingSlideIndex) this.params.openingSlideIndex = 0;
  }
}

const sliderNameAttr = 'data-slider-name';

const slidersParams = {
  /**
   * возможные параметры:
   *
   * ключом является имя слайдера
   *
   * элементы:
   * prewButtonClassName - css-класс кнопки предыдущего слайда. Необязательный параметр, предусмотрено значение по умолчанию;
   * nextButtonClassName - css-класс кнопки следующего слайда. Необязательный параметр, предусмотрено значение по умолчанию;
   * paginationWrapperClassName - css-класс контейнера пагинации. Необязательный параметр, предусмотрено значение по умолчанию;
   * wrapperClassName - css-класс контейнера слайдов. Необязательный параметр, предусмотрено значение по умолчанию;
   * slideClassName - css-класс контейнера слайдов. Необязательный параметр, предусмотрено значение по умолчанию;
   *
   * loop - зацикленность слайдера. Необязательный параметр. Значение по умолчанию - false.
   *
   * pagination - тип пагинации. Возможные значения: 'bulits' || 'nums' || true || false.
   * true - пагинация включена. Тип пагинации по умолчанию - 'bulits'.
   * false - пагинация отключена. Falsy-значения включат пагинацию с типом по умолчанию.
   *
   * openingSlide - начальный слайд, необязательный параметр. Значение по умолчанию - 0;
   * */
  stages: {
    wrapperClassName: 'stages__list',
    loop: false,
  },
};

export function initSliders() {
  document
    .querySelectorAll(`[${sliderNameAttr}]`)
    .forEach((slider) => new Slider(slider));
}
