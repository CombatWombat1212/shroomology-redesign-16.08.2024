$(document).ready(function () {
  let resizeTimeout;
  let currentWidth = $(window).width(); // Store the initial window width

  let headingMaxHeight = 0;

  function synchronizeColumnHeights() {
    headingMaxHeight = 0; // Reset max height before calculating
    $(".highlight-card--heading").each(function () {
      var height = $(this).height();
      if (height > headingMaxHeight) {
        headingMaxHeight = height;
      }
    });
    $(".highlight-card--heading").css(
      "--highlight-card--heading-max-height",
      `${headingMaxHeight}px`
    );
  }

  function syncCardHeight() {
    let collapsedHeight = 0;
    let expandedHeight = 0;
    let maxHeight = 0;

    $(".highlight-card").each(function () {
      const column = $(this).find(".vc_column-inner");
      const columnPadding =
        parseFloat(column.css("padding-top")) + parseFloat(column.css("padding-bottom"));
      const wrapper = column.find(".wpb_wrapper");
      const height = wrapper.height();
      const rowPadding =
        parseFloat($(this).css("padding-top")) + parseFloat($(this).css("padding-bottom"));

      const collapsedChildren =
        ".highlight-card > .vc_column-inner > .wpb_wrapper > *:not(.divider-wrap):not(.divider-wrap ~ *)";
      const children = Array.from(wrapper[0].querySelectorAll(collapsedChildren));
      const childrenHeight = children.reduce((acc, child) => {
        return (
          acc +
          (child.classList.contains("highlight-card--heading")
            ? headingMaxHeight
            : parseFloat(window.getComputedStyle(child).height)) +
          parseFloat(window.getComputedStyle(child).marginTop) +
          parseFloat(window.getComputedStyle(child).marginBottom)
        );
      }, 0);

      collapsedHeight = childrenHeight + columnPadding;
      expandedHeight = height + columnPadding;
      if (expandedHeight > maxHeight) {
        maxHeight = expandedHeight;
      }

      $(this).css("--highlight-card--collapsed-max-height", `${collapsedHeight}px`);
      $(this).css("--highlight-card--expanded-max-height", `${expandedHeight}px`);
    });

    $("#home--highlights .row_col_wrap_12_inner").css(
      "--highlight-card--expanded-max-height",
      `${maxHeight}px`
    );
    $("#home--highlights .row-bg").css("--highlight-card--expanded-max-height", `${maxHeight}px`);
  }

  function removeInlineHeight() {
    $(".highlight-card--heading").css("height", "");
    $(".highlight-card").css("height", "");
    $(".highlight-card").css("opacity", "");
  }

  synchronizeColumnHeights();
  setTimeout(syncCardHeight, 0);

  // Add click events
  $(".highlight-card").each(function () {
    $(this).click(function () {
      if ($(this).hasClass("expanded")) {
        $(this).removeClass("expanded");
      } else {
        $(".highlight-card").removeClass("expanded");
        $(this).addClass("expanded");
      }
    });
  });

  $(window).resize(function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      let newWidth = $(window).width(); // Get the new window width
      if (newWidth !== currentWidth) { // Check if width has changed
        currentWidth = newWidth; // Update the stored width
        $(".highlight-card--heading").height("auto");
        $(".highlight-card").height("auto");
        $(".highlight-card").css("opacity", "0");
        synchronizeColumnHeights();
        syncCardHeight();
        removeInlineHeight();
      }
    }, RESIZE_TIMEOUT);
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
