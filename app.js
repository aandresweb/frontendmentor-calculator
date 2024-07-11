window.onload = function () {
  const keys = document.querySelectorAll(".keypad-item");
  const screenInput = document.getElementById("screen-input");

  const operations = ["+", "-", "*", "/", "."];

  function printScreen(value) {
    if (screenInput.textContent === "0" && !operations.includes(value)) {
      return (screenInput.innerText = value);
    }

    if (
      operations.includes(value) &&
      operations.includes(screenInput.textContent.slice(-1))
    )
      return;

    if (screenInput.textContent.length > 11) {
      return;
    }

    screenInput.innerText += value;
  }

  function removeValue() {
    if (screenInput.textContent === "0") return;

    let values = screenInput.textContent.slice(0, -1);

    if (values.length === 0) {
      return (screenInput.innerText = 0);
    }

    screenInput.innerText = values;
  }

  function calculate() {
    if (screenInput.textContent === "0") return;

    const values = screenInput.textContent;

    if (!operations.some((op) => values.includes(op))) return;

    screenInput.innerText = eval(screenInput.textContent);
  }

  function reset() {
    screenInput.innerText = "0";
  }

  keys.forEach((key) => {
    key.addEventListener("click", function (e) {
      const value = key.getAttribute("data-key");

      if (value == undefined) return;

      if (value == "delete") {
        return removeValue();
      }

      if (value == "=") {
        return calculate();
      }

      if (value == "reset") {
        return reset();
      }

      printScreen(value);
    });
  });

  document
    .getElementById("theme-selector")
    .addEventListener("click", function () {
      const switchSelector = document.getElementById("switch-body");
      const body = document.querySelector("body");

      if (switchSelector.classList.contains("first")) {
        switchSelector.classList.remove("first");
        switchSelector.classList.add("second");
        body.classList.remove("first-theme");
        body.classList.add("second-theme");

        return;
      }

      if (switchSelector.classList.contains("second")) {
        switchSelector.classList.remove("second");
        switchSelector.classList.add("third");
        body.classList.remove("second-theme");
        body.classList.add("third-theme");
        return;
      }

      if (switchSelector.classList.contains("third")) {
        switchSelector.classList.remove("third");
        switchSelector.classList.add("first");
        body.classList.remove("third-theme");
        body.classList.add("first-theme");
        return;
      }
    });
};
