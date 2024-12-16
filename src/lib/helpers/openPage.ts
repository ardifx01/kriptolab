const openPage = (e: any, url: string) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  // IOS issue when open new pop window
  setTimeout(() => {
    if (window.navigator.userAgent?.toLowerCase().includes("metamask")) {
      window.location.assign(url);
    } else {
      window.open(url, "_blank");
    }
  });
};

export default openPage;
