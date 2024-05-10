import { createElement } from '@/js/helpers/create-element.js';

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

  constructor(slider) {
    this.sliderElem = slider || null;
    this.params =
      slidersParams[slider.getAttribute(`${sliderNameAttr}`)] || null;

    this.setBasicParams();
    this.checkCustomClassNames();

    this.getElements();
    this.createPagination();
    this.manageActivityClass('add');
    this.setButtonsAvailability();
  }

  /**
   * @description Получает элементы слайдера по заданным классам.
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
    this.nextButton.disabled = maxIdx - idx === 0;
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
        `${this.classNames.default.paginationWrapper}_bulits`,
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
        `${this.classNames.default.slide}_${this.modifiers.active}`,
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

  checkCustomClassNames() {
    Object.keys(this.classNames.default).forEach((key) => {
      this.params[key] && (this.classNames.default[key] = this.params[key]);
    });
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
   * openingSlide - начальный слайд, необязательный параметр. Значение по умолчанию - 0;
   * */
  stages: {
    wrapper: 'stages__list',
    loop: false,
  },
};

export function initSliders() {
  document
    .querySelectorAll(`[${sliderNameAttr}]`)
    .forEach((slider) => new Slider(slider));
}
