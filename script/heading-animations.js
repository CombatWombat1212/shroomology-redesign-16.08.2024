// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   const stipulations = [":not(#home--speech-bubbles h1)", ":not(#home--speech-bubbles h3)"];

//   const h3s = document.querySelectorAll(
//     "h1" + stipulations.join("") + ", h3" + stipulations.join(""),
//   );

//   h3s.forEach((h3) => {
//     const words = SplitType.create(h3, { types: "words" }).words;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: h3,
//         start: DEFAULT.START,
//       },
//     });

//     let fadeUp = {
//       from: fade.up.from,
//       to: {
//         ...fade.up.to,
//         stagger: 0.25,
//         ease: "power3.out",
//         duration: 0.75,
//       },
//     };

//     tl.fromTo(words, fadeUp.from, fadeUp.to);
//   });
// });
