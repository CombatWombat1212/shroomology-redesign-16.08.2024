$(document).ready(function () {
  const parent = ".day-night--row";
  const property = "height";
  const variable = "--day-night-row--max-height";

  let resizeTimeout;
  let prevWidth = $(window).width();

  function synchronizeColumnHeights() {
    let maxHeight = 0;
    $(parent).each(function () {
      var height = $(this).height();
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    $(parent).css(variable, `${maxHeight}px`);
  }

  function removeInlineHeight() {
    $(parent).css(property, "");
  }

  synchronizeColumnHeights();

  $(window).resize(function () {
    let currentWidth = $(window).width();
    if (currentWidth !== prevWidth) {
      $(parent).height("auto");
      synchronizeColumnHeights();

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(removeInlineHeight, RESIZE_TIMEOUT);

      prevWidth = currentWidth;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  defaultAnimateGroup(".highlight-card", {
    animation: deal.up,
    trigger: ".wpb_row",
    duration: 0.75,
    delay: 0.35,
    overlap: 0.1,
    easing: "power3.out",
  });
});
