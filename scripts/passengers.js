const passengers = () => {
  const input = document.getElementById("passengers-button");
  const form = document.querySelector("form");
  const decreaseButtons = document.querySelectorAll("[data-js-decrease]");
  const increaseButtons = document.querySelectorAll("[data-js-increase]");

  const getNumber = (element) => {
    return element.parentElement.querySelector("input");
  };

  const decrease = (event) => {
    const number = getNumber(event.currentTarget);
    let value = parseInt(number.value);

    if (value === 0) {
      return;
    }

    value--;
    number.value = value;
  };

  const increase = (event) => {
    const number = getNumber(event.currentTarget);
    let value = parseInt(number.value);

    value++;
    number.value = value;
  };

  const showForm = () => {
    form.removeAttribute("hidden");
    form.querySelector("a, button, input, select, textarea").focus();
  };

  const hideForm = () => {
    form.setAttribute("hidden", true);
  };

  const handleKeydown = (event) => {
    if (form.hasAttribute("hidden")) {
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
        hideForm();
      }
    }
  };

  const init = () => {
    decreaseButtons.forEach((button) =>
      button.addEventListener("click", decrease)
    );
    increaseButtons.forEach((button) =>
      button.addEventListener("click", increase)
    );

    input.addEventListener("focus", showForm);
    document.addEventListener("keydown", handleKeydown);
  };

  return { init };
};

passengers().init();
