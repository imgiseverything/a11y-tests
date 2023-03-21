const privacySettings = () => {
  const dialog = document.getElementById("privacy_dialog");
  const backdrop = document.querySelector(".backdrop");
  const acceptButton = document.getElementById("accept-button");
  const manageButton = document.getElementById("manage-button");
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  const showDialog = () => {
    backdrop.removeAttribute("hidden");
    dialog.removeAttribute("hidden");
    header.setAttribute("inert", true);
    footer.setAttribute("inert", true);
    main.setAttribute("inert", true);
  };

  const hideDialog = () => {
    backdrop.setAttribute("hidden", true);
    dialog.setAttribute("hidden", true);
    header.removeAttribute("inert");
    footer.removeAttribute("inert");
    main.removeAttribute("inert");
  };

  const init = () => {
    showDialog();
    manageButton.addEventListener("click", () =>
      alert("this feature is a work in progress")
    );
    acceptButton.addEventListener("click", hideDialog);
  };

  return {
    init,
  };
};

privacySettings().init();
