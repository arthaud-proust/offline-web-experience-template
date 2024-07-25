const canOpenNewTab = window.opener != null || window.history.length == 1;

export const tryOpenNewTab = (path: string) => {
  if (canOpenNewTab) {
    window.open(path);
    window.close();
    return;
  }

  window.location.href = path;
};

(() => {
  document.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLElement;

    if (target instanceof HTMLAnchorElement) {
      tryOpenNewTab(target.href);
    }
  });
})();
