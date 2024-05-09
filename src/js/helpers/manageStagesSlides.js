import { store } from '@/store/store.js';
import { createElement } from '@/js/helpers/create-element.js';

export function manageStagesSlides(isMobile, currentSlidesState) {
  if (isMobile === currentSlidesState) {
    return isMobile;
  }

  const olElement = document.querySelector('.stages__list');
  olElement.innerHTML = '';

  store.stages.forEach((stage, idx) => {
    const img = createElement({
      tag: 'img',
      classes: 'stages__item-overlay',
      attributes: [
        { name: 'alt', value: '' },
        { name: 'src', value: '/images/stages/overlay.png' },
      ],
    });

    const liClasses = stage.mod
      ? ['stages__item', `stages__item_${stage.mod}`]
      : ['stages__item'];
    !isMobile && liClasses.push('slider-slide');
    const li = createElement({
      tag: 'li',
      classes: liClasses,
      text: stage.value,
    });

    li.appendChild(img);
    olElement.appendChild(li);
  });

  return isMobile;
}

// <li className="stages__item{{#if this.mod}} stages__item_{{this.mod}}{{/if}}">
//   {{{this.value}}}
//   <img className="stages__item-overlay" alt="" src="/images/stages/overlay.png"/>
// </li>

// <div className="testLi">
//   <li className="stages__item{{#if this.mod}} stages__item_{{this.mod}}{{/if}}">
//     {{{this.value}}}
//     <img className="stages__item-overlay" alt="" src="/images/stages/overlay.png"/>
//   </li>
// </div>
