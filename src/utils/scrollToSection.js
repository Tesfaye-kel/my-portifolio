const scrollToSection = (section) => {
  const documentElement = document.documentElement;
  const scrollPaddingTop = Number.parseFloat(
    window.getComputedStyle(documentElement).scrollPaddingTop
  ) || 0;
  const scrollMarginTop = Number.parseFloat(
    window.getComputedStyle(section).scrollMarginTop
  ) || 0;
  const top = window.scrollY + section.getBoundingClientRect().top - scrollPaddingTop - scrollMarginTop;

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
};

export default scrollToSection;
