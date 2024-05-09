import '@styles/index.scss';
import ResolutionChecker from '@/js/helpers/ResolutionChecker.js';
import { manageStagesSlides } from '@/js/helpers/manageStagesSlides.js';

let stagesSlidesMobileState = null;

const resolutionChecker = new ResolutionChecker();

const checkStagesSlides = () => {
  stagesSlidesMobileState = manageStagesSlides(
    resolutionChecker.isCustom(640),
    stagesSlidesMobileState,
  );
};

document.addEventListener('DOMContentLoaded', () => {
  checkStagesSlides();

  window.addEventListener('resize', () => {
    checkStagesSlides();
  });
});
