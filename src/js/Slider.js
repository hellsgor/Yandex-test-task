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

    this.getElements();
    this.setButtonsUnavailability();
    this.createPagination();
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
    this.slides = this.sliderElem.querySelectorAll(
      `.${getSelector('slideClassName', 'slide')}`,
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
        setBulits();
        break;
    }
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
   * prewButtonClassName - css-класс кнопки предыдущего слайда;
   * nextButtonClassName - css-класс кнопки следующего слайда;
   * paginationWrapperClassName - css-класс контейнера пагинации;
   * wrapperClassName - css-класс контейнера слайдов;
   * slideClassName - css-класс контейнера слайдов;
   *
   * loop - зацикленность слайдера
   *
   * pagination - тип пагинации. Возможные значения: 'bulits' || 'nums' || true || false.
   * true - пагинация включена. Тип пагинации по умолчанию - 'bulits'.
   * false (или falsy-значение) - пагинация отключена.
   * */
  stages: {
    wrapperClassName: 'stages__list',
    loop: false,
    pagination: 'bulits',
  },
};

export function initSliders() {
  document
    .querySelectorAll(`[${sliderNameAttr}]`)
    .forEach((slider) => new Slider(slider));
}
