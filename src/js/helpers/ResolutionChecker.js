class ResolutionChecker {
  constructor() {
    this.tabletResolution = 1024;
    this.mobileResolution = 640;
    this.extraMobileResolution = 370;
  }

  isTablet() {
    try {
      return (
        window?.matchMedia(`(max-width: ${this.tabletResolution}px)`)
          ?.matches || false
      );
    } catch (e) {
      return false;
    }
  }

  isMobile() {
    try {
      return (
        window?.matchMedia(`(max-width: ${this.mobileResolution}px)`)
          ?.matches || false
      );
    } catch (e) {
      return false;
    }
  }

  isExtra() {
    try {
      return (
        window?.matchMedia(`(max-width: ${this.extraMobileResolution}px)`)
          ?.matches || false
      );
    } catch (e) {
      return false;
    }
  }

  isCustom(resolution) {
    try {
      return (
        window?.matchMedia(`(max-width: ${resolution}px)`)?.matches || false
      );
    } catch (e) {
      return false;
    }
  }
}

export const resolutionChecker = new ResolutionChecker();
