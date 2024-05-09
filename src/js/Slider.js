class Slider {
  sliderElem = null;
  params = null;

  defaultSliderClassName = 'slider';
  classNames = {
    prewButton: `${this.defaultSliderClassName}-button_prew`,
    nextButton: `${this.defaultSliderClassName}-button_next`,
    paginationWrapper: `${this.defaultSliderClassName}-pagination`,
    wrapper: `${this.defaultSliderClassName}-wrapper`,
    slide: `${this.defaultSliderClassName}-slide`,
  };

  prewButton = null;
  nextButton = null;
  paginationWrapper = null;
  wrapper = null;
  slides = null;

  constructor(slider) {
    this.sliderElem = slider || null;
    this.params =
      slidersParams[slider.getAttribute(`${sliderNameAttr}`)] || null;

    this.getElements();
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
   * */
  stages: {
    wrapperClassName: 'stages__list',
  },
};

export function initSliders() {
  document
    .querySelectorAll(`[${sliderNameAttr}]`)
    .forEach((slider) => new Slider(slider));
}
