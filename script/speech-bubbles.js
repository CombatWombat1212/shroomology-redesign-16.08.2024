document.addEventListener("DOMContentLoaded", () => {
  const bubbles = document.querySelectorAll(".speech-bubble");
  if (!bubbles[0]) return;

  gsap.utils.toArray(bubbles).forEach((bubble) => {


    const scrollTrigger = {
      trigger: bubble,
      start: DEFAULT.START,
    };


    const opacity = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger,
      },
    };

    const animation = {
      from: {
        rotate: 10,
        scale: 0.85,
      },
      to: {
        rotate: 0,
        scale: 1,
        ease: "power4.out",
        duration: 1.2,
        scrollTrigger,
      },
    };

    gsap.fromTo(bubble, opacity.from, opacity.to);
    gsap.fromTo(bubble, animation.from, animation.to);
  });
});
