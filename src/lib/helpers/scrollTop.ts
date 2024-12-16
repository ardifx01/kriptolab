export const scrollToTop = () => {
  setTimeout(function () {
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: "smooth",
    });
  }, 2);
};
