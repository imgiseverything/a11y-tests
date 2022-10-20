const inputNumber = () => {
  /** @var {NodeListOf<HTMLButtonElement>} */
  const decreaseButtons = document.querySelectorAll("[data-js-decrease]");

  /** @var {NodeListOf<HTMLButtonElement>} */
  const increaseButtons = document.querySelectorAll("[data-js-increase]");

  /**
   * Send a custom event so other scripts can listen for it
   * @param {HTMLButtonElement} element
   *
   * @return {void}
   */
  const publishChangeEvent = (element) => {
    const event = new Event("input-number", {
      bubbles: true,
      cancelable: false,
    });
    element.dispatchEvent(event);
  };

  /**
   * Get the current input value
   * @param {HTMLButtonElement} element
   *
   * @return {void}
   */
  const getNumber = (element) => {
    return element.parentElement.querySelector("input");
  };

  /**
   * Decrease the value of the relevant input by 1
   * @param {Event} event
   *
   * @return {void}
   */
  const decrease = (event) => {
    const number = getNumber(event.currentTarget);
    let value = parseInt(number.value);

    if (value === 0) {
      return;
    }

    value--;
    number.value = value;

    publishChangeEvent(event.target);
  };

  /**
   * Increase the value of the relevant input by 1
   * @param {Event} event
   *
   * @return {void}
   */
  const increase = (event) => {
    const number = getNumber(event.currentTarget);
    let value = parseInt(number.value);

    value++;
    number.value = value;

    publishChangeEvent(event.target);
  };

  /**
   * Functions we run on load
   *
   * @return {void}
   */
  const init = () => {
    if (decreaseButtons.length === 0 || increaseButtons.length === 0) {
      return;
    }

    decreaseButtons.forEach((button) =>
      button.addEventListener("click", decrease)
    );

    increaseButtons.forEach((button) =>
      button.addEventListener("click", increase)
    );
  };

  return { init };
};

inputNumber().init();
