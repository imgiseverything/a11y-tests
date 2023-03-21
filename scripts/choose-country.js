const chooseCountry = () => {
  const dialog = document.getElementById("dialog-country");
  const title = document.getElementById("dialog-country-label");
  const backdrop = document.querySelector(".backdrop");
  const openButton = document.getElementById("open-country");
  const closeButton = document.getElementById("close-country");
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  const showDialog = () => {
    backdrop.removeAttribute("hidden");
    dialog.removeAttribute("hidden");
    header.setAttribute("inert", true);
    footer.setAttribute("inert", true);
    main.setAttribute("inert", true);
    title.setAttribute("tabindex", -1);
    title.focus();
  };

  const hideDialog = () => {
    backdrop.setAttribute("hidden", true);
    dialog.setAttribute("hidden", true);
    header.removeAttribute("inert");
    footer.removeAttribute("inert");
    main.removeAttribute("inert");
    title.removeAttribute("tabindex");
    open.focus();
  };

  const handleKeydown = (event) => {
    if (dialog.hasAttribute("hidden")) {
      return;
    }

    if (event.key === "Escape") {
      // if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        hideDialog();
      }
    }
  };

  const init = () => {
    openButton.addEventListener("click", showDialog);
    closeButton.addEventListener("click", hideDialog);
    document.addEventListener("keydown", handleKeydown);
  };

  return {
    init,
  };
};

chooseCountry().init();
