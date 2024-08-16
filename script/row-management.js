document.addEventListener("DOMContentLoaded", function () {
  // Get all rows
  const rows = document.querySelectorAll(".main-content > .row > .wpb_row");
  let previousColor = null;
  let previousImage = null;
  let groupStart = null;

  const addStartEndClasses = (startRow, endRow) => {
    if (startRow) {
      startRow.classList.add("row__bg-change-start");
    }
    if (endRow) {
      endRow.classList.add("row__bg-change-end");
    }
  };

  const checkBackgroundColor = (rowBg) => {
    return window.getComputedStyle(rowBg).backgroundColor;
  };

  const extractUrlFromComputedStyle = (styleValue) => {
    const urlMatch = styleValue.match(/url\(["']?([^"']*)["']?\)/);
    return urlMatch ? urlMatch[1] : null;
  };

  const checkBackgroundImage = (rowBg) => {
    const dataSrc = rowBg.getAttribute("data-nectar-img-src");
    const computedStyleImage = extractUrlFromComputedStyle(window.getComputedStyle(rowBg).backgroundImage);
    return dataSrc || computedStyleImage;
  };

  const handleRow = (row, index) => {
    const rowBg = row.querySelector(".row-bg");
    if (rowBg) {
      const currentColor = checkBackgroundColor(rowBg);

      // Skip image checking if .using-bg-color is present and .using-image is not
      if (!rowBg.classList.contains('using-bg-color') || rowBg.classList.contains('using-image')) {
        const currentImage = checkBackgroundImage(rowBg);

        if (previousImage !== null && currentImage !== previousImage) {
          // If the background image changed, mark the end of that group
          addStartEndClasses(groupStart, rows[index - 1]);
          // Start a new group
          groupStart = row;
        }

        previousImage = currentImage;
      }

      if (previousColor !== null && currentColor !== previousColor) {
        // If there was a previous group, mark the end of that group
        addStartEndClasses(groupStart, rows[index - 1]);
        // Start a new group
        groupStart = row;
      }

      // Update the previous color
      previousColor = currentColor;

      const observer = new MutationObserver(() => {
        handleAllRows();
      });

      observer.observe(rowBg, {
        attributes: true,
        attributeFilter: ["style", "data-nectar-img-src"],
      });
    }
  };

  const handleAllRows = () => {
    previousColor = null;
    previousImage = null;
    groupStart = null;

    rows.forEach((row, index) => {
      handleRow(row, index);
    });

    // Mark the last group if it exists
    if (groupStart) {
      addStartEndClasses(groupStart, rows[rows.length - 1]);
    }
  };

  handleAllRows();

  let counter = 0;
  const interval = setInterval(() => {
    handleAllRows();
    counter++;
    if (counter >= 10) {
      clearInterval(interval);
    }
  }, 500);
});
