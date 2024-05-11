import '@styles/index.scss';
import { resolutionChecker } from '@/js/helpers/ResolutionChecker.js';
import { manageStagesSlides } from '@/js/helpers/manageStagesSlides.js';
import { store } from '@/store/store.js';
import { initSliders } from '@/js/Slider.js';

let stagesSlidesMobileState = null;
let groupedStagesIndexes = null;
let sliders = null;

const checkStagesSlides = () => {
  if (!groupedStagesIndexes) {
    groupedStagesIndexes = store.stages
      .map((stage, idx) => (stage.grouped ? idx : null))
      .filter((idx) => idx !== null);
  }

  stagesSlidesMobileState = manageStagesSlides(
    resolutionChecker.isCustom(640),
    stagesSlidesMobileState,
    groupedStagesIndexes,
  );
};

document.addEventListener('DOMContentLoaded', () => {
  checkStagesSlides();
  initSliders();

  window.addEventListener('resize', () => {
    checkStagesSlides();
  });
});
