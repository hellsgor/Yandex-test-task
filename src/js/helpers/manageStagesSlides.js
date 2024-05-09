import { store } from '@/store/store.js';
import { createElement } from '@/js/helpers/create-element.js';

/**
 * Управляет слайдами этапов в зависимости от текущего состояния экрана.
 * @param {boolean} isMobile - Флаг, указывающий, является ли текущее состояние экрана мобильным.
 * @param {boolean} currentSlidesState - Текущее состояние слайдов.
 * @param {Array<number>} groupedStagesIndexes - Массив индексов группированных этапов.
 * @returns {boolean} - Новое состояние экрана.
 */
export function manageStagesSlides(
  isMobile,
  currentSlidesState,
  groupedStagesIndexes,
) {
  if (isMobile === currentSlidesState) {
    return isMobile;
  }

  const createLi = (stage) => {
    const liClasses =
      stage.mod && !isMobile
        ? ['stages__item', `stages__item_${stage.mod}`]
        : ['stages__item'];
    !isMobile && liClasses.push('slider-slide');

    return createElement({
      tag: 'li',
      classes: liClasses,
      text: stage.value,
    });
  };

  const ol = document.querySelector('.stages__list');
  ol.innerHTML = '';

  store.stages.forEach((stage, idx) => {
    const li = createLi(stage);
    const isGroupable = !!groupedStagesIndexes.find((index) => idx === index);

    const img =
      !isGroupable || !isMobile
        ? createElement({
            tag: 'img',
            classes: 'stages__item-overlay',
            attributes: [
              { name: 'alt', value: '' },
              { name: 'src', value: '/images/stages/overlay.png' },
            ],
          })
        : null;

    let container =
      !isGroupable && isMobile
        ? createElement({
            tag: 'div',
            classes: ['stages__items-group', 'slider-slide'],
          })
        : null;

    if (isMobile) {
      if (!container) {
        container = Array.from(
          ol.querySelectorAll('.stages__items-group'),
        ).pop();
      }

      container.appendChild(li);
      img && container.appendChild(img);
    } else {
      li.appendChild(img);
    }

    ol.appendChild(container || li);
  });

  return isMobile;
}
