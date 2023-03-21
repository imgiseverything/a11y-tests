const StationSelector = () => {
  const dropdowns = document.querySelectorAll("[data-js-station-selector]");
  const init = () => {
    if (!dropdowns) {
      return;
    }
  };

  return {
    init,
  };
};

StationSelector.init();
