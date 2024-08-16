document.addEventListener("DOMContentLoaded", () => {
    const childSelectors = [
      "#how-to--hero .hero--col > .vc_column-inner > .wpb_wrapper > *",
    ];
  
    const fadeUp = createFade({ distance: 20, easing: "power2.out" }).up;
  
    defaultStackAnimation(
      {
        parent: "#how-to--hero .hero--col > .vc_column-inner",
        inner: "#how-to--hero .hero--col > .vc_column-inner > .wpb_wrapper",
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
  