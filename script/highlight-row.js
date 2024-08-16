document.addEventListener("DOMContentLoaded", () => {
  const childSelectors = [
    ".highlight-row--graphic-row",
    ".highlight-row--col .img-with-aniamtion-wrap:not(.highlight-row--graphic-row .img-with-aniamtion-wrap)",
    ".highlight-row--col .highlight-row--body > .wpb_wrapper *",
  ];

  const fadeUp = createFade({ distance: 20, easing: "power2.out" }).up;

  defaultStackAnimation(
    {
      parent: ".highlight-row--row",
      inner: ".highlight-row--col",
      children: childSelectors,
    },
    {
      animation: fadeUp,
      duration: 0.65,
      innerDelay: 0.40,
      childDelay: 0.10,
    },
  );
});
