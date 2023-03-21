const locations = () => {
  const inputs = document.querySelectorAll(".location-field");
  const dropdowns = document.querySelectorAll(".location-dropdowns");

  const getDropdownFromInput = (input) => {
    return null;
  };

  const showDropdown = (event) => {
    const dropdown = getDropdownFromInput(event.currentTarget);
    dropdown.removeAttribute("hidden");
    dropdown.querySelector("a, button, input, select, textarea").focus();
  };

  const hideDropdown = (event) => {
    const dropdown = getDropdownFromInput(event.currentTarget);
    dropdown.setAttribute("hidden", true);
  };

  const hideAllDropdowns = () => {
    dropdowns.forEach((element) => element.setAttribute("hidden"));
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      // if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        hideAllDropdowns();
      }
    }
  };

  const init = () => {
    inputs.forEach((button) => button.addEventListener("focus", showDropdown));
    document.addEventListener("keydown", handleKeydown);
  };

  return { init };
};

locations().init();
