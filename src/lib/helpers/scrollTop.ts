export const scrollToTop = (offset: number = 300) => {
  setTimeout(function () {
    window.scrollTo({
      top: offset,
      left: 0,
      behavior: "smooth",
    });
  }, 2);
};
