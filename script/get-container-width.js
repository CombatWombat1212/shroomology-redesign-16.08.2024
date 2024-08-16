document.addEventListener("DOMContentLoaded", () => {
  // Create the invisible container elements
  const createContainer = (className) => {
    const container = document.createElement("div");
    container.className = className;
    container.style.width = "100%";
    container.style.opacity = "0";
    container.style.visibility = "hidden";
    container.style.pointerEvents = "none";
    container.style.zIndex = "-1";
    document.body.insertAdjacentElement("afterbegin", container);
    return container;
  };

  const container = createContainer("container");

  // Function to set the CSS variables
  const setMaxWidth = () => {
    const computedStyle = getComputedStyle(container);
    const maxWidth = computedStyle.width;
    const marginLeft = parseFloat(computedStyle.marginLeft);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);

    const margin = `${marginLeft + paddingLeft}px`;
    document.documentElement.style.setProperty(
      "--site--max-width__px",
      maxWidth,
    );
    document.documentElement.style.setProperty(
      "--site--container-margin__px",
      margin,
    );
  };

  // Debounce function to limit the rate of function calls
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Run the setMaxWidth function after a timeout of 0s to ensure everything is loaded
  setTimeout(setMaxWidth, 0);

  // Add a resize event listener with debounce
  window.addEventListener("resize", debounce(setMaxWidth, 0));
});
