document.addEventListener("DOMContentLoaded", () => {
  const pills = document.querySelectorAll(".split-section__pill");
  if (!pills[0]) return;

  defaultAnimateSplit(".split-section__pill", {
    first: ".split-section--body",
    second: "split-section--graphic",
    group: ".row-bg-wrap + [class*='row_col']",
    trigger: ".split-section",
    delay: 0.5,
  });


});
