document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector("#home--accordion .toggles.accordion");
  defaultAnimateGroup("#home--accordion .toggle", {
    animation: fade.up,
    trigger: trigger,
    duration: 0.75,
    delay: 0.45,
    overlap: 0.1,
    easing: "power3.out",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".journey-begins--row");
  defaultAnimateGroup(".journey-begins--highlight-row, .journey-begins--header-row", {
    animation: fade.up,
    trigger: trigger,
    duration: 0.75,
    delay: 0.45,
    overlap: 0.1,
    easing: "power3.out",
  });
});
