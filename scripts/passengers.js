// @ts-check

/**
 * Scripts to run on the passengers demo.
 * Show/Hide the passengers dropdowns and add keyboard functionality too
 *
 * @return { {init: () => void}}
 */
const passengers = () => {
  /** @var {HTMLInputElement | null } the button that toggles the dropdowns (and displays a summary of content) */
  const button = document.querySelector("#passengers-button");

  /** @var {HTMLDivElement | null } the containing element for passenger options */
  const dropdown = document.querySelector("#passengers-dropdown");

  /** @var {NodeListOf<HTMLInputElement>} the checkbox that toggles the wheelchair form options */
  const buttonsWheelchair = document.querySelectorAll(".wheelchair-button");

  /** @var {HTMLDivElement | null } the containing element for wheelchair passenger dropdown options */
  const dropdownWheelchair = document.querySelector(
    "#passengers-wheelchair-dropdown"
  );

  /** @var {NodeListOf<HTMLInputElement>} */
  const inputs = document.querySelectorAll("[inputmode=numeric]");

  /** @var {HTMLDivElement | null } */
  const liveRegion = document.querySelector("#passengers-live-region");

  /**
   * Total up the input values for the active dropdown
   * @param {Event} event
   *
   * @return {number}
   */
  const calculateCount = (event) => {
    const inputs = event.target
      ?.closest("ul")
      ?.querySelectorAll("[inputmode=numeric]");

    let count = 0;

    inputs.forEach((input) => (count += parseInt(input.value)));

    return count;
  };

  /**
   * As the user changes the count, inform the screen-reader via our hidden liveRegion
   * @param {Event} event
   *
   * @return {void}
   */
  const handleCountChange = (event) => {
    if (!liveRegion) {
      return;
    }

    const count = calculateCount(event);

    liveRegion.innerHTML = `You have selected ${count} passengers`;
  };

  /**
   * Display the dropdown
   *
   * @return {void}
   */
  const showDropdown = () => {
    dropdown?.removeAttribute("hidden");
  };

  /**
   * Hide the dropdown
   *
   * @return {void}
   */
  const hideDropdown = () => {
    dropdown?.setAttribute("hidden", "");
  };

  /**
   * Display the wheelchair dropdown
   *
   * @return {void}
   */
  const showWheelchairDropdown = () => {
    dropdownWheelchair?.removeAttribute("hidden");
  };

  /**
   * Hide the wheelchair dropdown
   *
   * @return {void}
   */
  const hideWheelchairDropdown = () => {
    dropdownWheelchair?.setAttribute("hidden", "");
  };

  /**
   * Show or hide the right dropdown based upon whether the active wheelchair checkbox is checked
   * @param {Event} event
   *
   * @return {void}
   */
  const toggleDropdownType = (event) => {
    if (event.target?.checked === true) {
      hideDropdown();
      showWheelchairDropdown();
    } else {
      hideWheelchairDropdown();
      showDropdown();
    }

    // keep the buttons aligned
    buttonsWheelchair.forEach(
      (button) => (button.checked = event.target?.checked)
    );
  };

  /**
   * Handle when the user presses a key whilst the button is in focus
   * @param {KeyboardEvent} keyboardEvent
   *
   * @return {void}
   */
  const handleButtonKeyDown = (keyboardEvent) => {
    switch (keyboardEvent.key) {
      default:
        break;
      // Hide the dropdown on ESC press... because it is easier for Keyboard users to close
      case "Escape":
        hideDropdown();
        break;
      // Show our dropdown when the user presses SPACE, ENTER or the DOWN ARROW
      // preventDefault stops ENTER from submitting the form when pressed on this element
      case "Enter":
      case " ":
      case "ArrowDown":
        keyboardEvent.preventDefault();
        toggleDropdownType(keyboardEvent);
        break;
    }
  };

  /**
   * Handle when the user presses a key on the document/window
   * @param {KeyboardEvent} keyboardEvent
   *
   * @return {void}
   */
  const handleDocumentKeyDown = (keyboardEvent) => {
    switch (keyboardEvent.key) {
      default:
        break;
      // Hide the dropdown on ESC press... because it is easier for Keyboard users to close this way
      case "Escape":
        hideDropdown();
        hideWheelchairDropdown();
        break;
    }
  };

  /**
   * Handle when the user releases a key on the document/window
   * @param {KeyboardEvent} keyboardEvent
   *
   * @return {void}
   */
  const handleDocumentKeyUp = (keyboardEvent) => {
    switch (keyboardEvent.key) {
      default:
        break;
      // After the TAB key is released if the focus is not within our dropdowns or our button
      // then hide the dropdowns because we assuem the user has tabbed out of them
      case "Tab":
        if (
          !button?.matches(":focus") &&
          !dropdown?.matches(":focus-within") &&
          !dropdownWheelchair?.matches(":focus-within")
        ) {
          hideDropdown();
          hideWheelchairDropdown();
        }

        break;
    }
  };

  /**
   * Close the dropdown when the user clicks outside of it
   * @param {Event} event
   *
   * @return {void}
   */
  const handleDocumentClick = (event) => {
    if (
      !dropdown?.contains(event.target) &&
      button !== event.target &&
      !dropdownWheelchair?.contains(event.target)
    ) {
      hideDropdown();
      hideWheelchairDropdown();
    }
  };

  /**
   * Functions we run on load
   *
   * @return {void}
   */
  const init = () => {
    if (!button) {
      return;
    }

    button.addEventListener("keydown", handleButtonKeyDown);
    button.addEventListener("click", toggleDropdownType);

    if (buttonsWheelchair.length > 0) {
      buttonsWheelchair.forEach((button) =>
        button.addEventListener("change", toggleDropdownType)
      );
    }

    if (inputs.length > 0) {
      inputs.forEach((input) => {
        input.addEventListener("change", handleCountChange);
      });
    }

    document.addEventListener("input-number", handleCountChange);

    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("keyup", handleDocumentKeyUp);
    document.addEventListener("click", handleDocumentClick);
  };

  return {
    init,
  };
};

passengers().init();
