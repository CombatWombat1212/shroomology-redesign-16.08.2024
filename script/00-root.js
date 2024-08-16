const DEFAULT = {
  START: "top bottom-=100",
  DURATION: 1,
  DELAY: 0.2,
  DISTANCE: 100,
  EASE: "power2.out",
  OPACITY: { START: 0, END: 1 },
  SCALE: { START: 0.95, END: 1 },
  ROTATE: { START: 4, END: 0 },
  TRANSFORM_ORIGIN: "center center",
};

// const fade = {
//   up: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       y: DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       y: 0,
//     },
//   },
//   left: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       x: -DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       x: 0,
//     },
//   },
//   right: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       x: DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       x: 0,
//     },
//   },
//   down: {
//     from: {
//       opacity: DEFAULT.OPACITY.START,
//       duration: DEFAULT.DURATION,
//       y: -DEFAULT.DISTANCE,
//     },
//     to: {
//       opacity: DEFAULT.OPACITY.END,
//       duration: DEFAULT.DURATION,
//       ease: DEFAULT.EASE,
//       y: 0,
//     },
//   },
// };

// function createFade(overrides = {}) {
//   const omit = Array.isArray(overrides.omit) ? overrides.omit : [overrides.omit];
//   const customFade = JSON.parse(JSON.stringify(fade));

//   const applyOverrides = (obj, overrides) => {
//     for (const key in overrides) {
//       if (key !== 'omit') {
//         if (key === 'distance') {
//           if ('x' in obj) obj.x = obj.x < 0 ? -overrides.distance : overrides.distance;
//           if ('y' in obj) obj.y = obj.y < 0 ? -overrides.distance : overrides.distance;
//         } else {
//           obj[key] = overrides[key];
//         }
//       }
//     }
//   };

//   const removeOmitted = (obj, omit) => {
//     for (const key of omit) {
//       delete obj[key];
//     }
//   };

//   for (const direction in customFade) {
//     applyOverrides(customFade[direction].from, overrides);
//     applyOverrides(customFade[direction].to, overrides);
//     removeOmitted(customFade[direction].from, omit);
//     removeOmitted(customFade[direction].to, omit);
//   }

//   return customFade;
// }

function createFade(options = {}) {
  const distance = options.distance || DEFAULT.DISTANCE;
  const duration = options.duration || DEFAULT.DURATION;
  const delay = options.delay || 0;
  const omit = options.omit || [];
  const omits = Array.isArray(omit) ? omit : [omit];

  const fade = {
    up: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        y: distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        y: 0,
      },
    },
    left: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        x: -distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        x: 0,
      },
    },
    right: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        x: distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        x: 0,
      },
    },
    down: {
      from: {
        opacity: DEFAULT.OPACITY.START,
        y: -distance,
      },
      to: {
        duration,
        delay,
        opacity: DEFAULT.OPACITY.END,
        ease: DEFAULT.EASE,
        y: 0,
      },
    },
  };

  function omitProperties(obj, properties) {
    properties.forEach((property) => {
      if (property in obj) {
        delete obj[property];
      }
    });
  }

  Object.keys(fade).forEach((direction) => {
    omitProperties(fade[direction].from, omits);
    omitProperties(fade[direction].to, omits);
  });

  return fade;
}

const pop = {
  in: {
    from: {
      opacity: DEFAULT.OPACITY.START,
      scale: DEFAULT.SCALE.START,
      transformOrigin: DEFAULT.TRANSFORM_ORIGIN,
    },
    to: {
      opacity: DEFAULT.OPACITY.END,
      scale: DEFAULT.SCALE.END,
      duration: DEFAULT.DURATION,
      ease: DEFAULT.EASE,
    },
  },
  out: {
    from: {
      opacity: DEFAULT.OPACITY.END,
      scale: DEFAULT.SCALE.END,
      transformOrigin: DEFAULT.TRANSFORM_ORIGIN,
    },
    to: {
      opacity: DEFAULT.OPACITY.START,
      scale: DEFAULT.SCALE.START,
      duration: DEFAULT.DURATION,
      ease: DEFAULT.EASE,
    },
  },
};

function createDeal(options = {}) {
  const {
    distance = DEFAULT.DISTANCE,
    opacity = DEFAULT.OPACITY,
    duration = DEFAULT.DURATION,
    ease = DEFAULT.EASE,
    rotate = DEFAULT.ROTATE,
    omit = [],
  } = options;

  const omitArray = Array.isArray(omit) ? omit : [omit];

  const deal = {
    up: {
      from: {
        opacity: opacity.START,
        duration,
        y: distance,
        rotate: rotate.START,
        transformOrigin: "top center",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        y: 0,
        rotate: rotate.END,
        transformOrigin: "top center",
      },
    },
    down: {
      from: {
        opacity: opacity.START,
        duration,
        y: -distance,
        rotate: -rotate.START,
        transformOrigin: "bottom center",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        y: 0,
        rotate: rotate.END,
        transformOrigin: "bottom center",
      },
    },
    left: {
      from: {
        opacity: opacity.START,
        duration,
        x: -distance,
        rotate: -rotate.START,
        transformOrigin: "center left",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        x: 0,
        rotate: rotate.END,
        transformOrigin: "center left",
      },
    },
    right: {
      from: {
        opacity: opacity.START,
        duration,
        x: distance,
        rotate: rotate.START,
        transformOrigin: "center right",
      },
      to: {
        opacity: opacity.END,
        duration,
        ease,
        x: 0,
        rotate: rotate.END,
        transformOrigin: "center right",
      },
    },
  };

  omitArray.forEach((property) => {
    Object.values(deal).forEach((direction) => {
      delete direction.from[property];
      delete direction.to[property];
    });
  });

  return deal;
}

const deal = createDeal();
const fade = createFade();

const RESIZE_TIMEOUT = 250;

function defaultAnimateGroup(selector, options = {}) {
  gsap.registerPlugin(ScrollTrigger);

  const {
    group = selector,
    addedDelay = 0,
    delay = DEFAULT.DELAY,
    overlap = 0,
    trigger,
    animation = fade.up,
  } = options;

  const ease = animation.ease || DEFAULT.EASE;
  const selectors = Array.isArray(selector) ? selector : [selector];

  let index = 0;
  selectors.forEach((sel) => {
    if (!document.querySelector(sel)) return;
    gsap.utils.toArray(sel).forEach((elem, i) => {
      const groupSelector = Array.isArray(group) ? group[index] : group;

      // const triggerElement =
      //   elem.closest(trigger) ||
      //   document.querySelector(trigger) ||
      //   elem.closest(`${groupSelector}--row`) ||
      //   elem.closest(groupSelector) ||
      //   elem.closest(`${sel}--row`) ||
      //   elem.closest(".section") ||
      //   elem;

      const triggerElement = (() => {
        if (trigger instanceof HTMLElement) return trigger;
        if (elem instanceof HTMLElement) return elem;
        if (elem.closest(trigger)) return elem.closest(trigger);
        if (document.querySelector(trigger)) return document.querySelector(trigger);
        if (elem.closest(`${groupSelector}--row`)) return elem.closest(`${groupSelector}--row`);
        if (elem.closest(groupSelector)) return elem.closest(groupSelector);
        if (elem.closest(`${sel}--row`)) return elem.closest(`${sel}--row`);
        if (elem.closest(".section")) return elem.closest(".section");
        return elem;
      })();

      // Calculate the actual delay considering the overlap
      const actualDelay = delay * index + addedDelay - overlap * index;

      const main = {
        from: animation.from,
        to: {
          ...animation.to,
          delay: actualDelay > 0 ? actualDelay : 0,
          ease,
          scrollTrigger: {
            trigger: triggerElement,
            start: DEFAULT.START,
          },
        },
      };

      // console.log(triggerElement);

      gsap.fromTo(elem, main.from, main.to);

      index++;
    });
  });
}

function defaultAnimateSplit(selector, options = {}) {
  gsap.registerPlugin(ScrollTrigger);

  const {
    first = "graphic",
    second = "body",
    group = "container",
    trigger = null,
    addedDelay = 0,
    delay = DEFAULT.DELAY,
  } = options;

  gsap.utils.toArray(selector).forEach((split) => {
    const container = safeQuerySelector(split, group);
    if (!container) return;

    const body = safeQuerySelector(container, first);
    const graphic = safeQuerySelector(container, second);

    if (!body) return;
    const isBodyFirst = container.children[0] === body;

    container.classList.add("split-animation");

    let triggerElement = split.closest(trigger) || split;

    const bodyAnimation = {
      from: isBodyFirst ? fade.left.from : fade.right.from,
      to: {
        ...(isBodyFirst ? fade.left.to : fade.right.to),
        delay: delay + addedDelay,
        scrollTrigger: {
          trigger: triggerElement,
          start: DEFAULT.START,
        },
      },
    };


    gsap.fromTo(body, bodyAnimation.from, bodyAnimation.to);

    if (!graphic) return;

    const graphicAnimation = {
      from: isBodyFirst ? fade.right.from : fade.left.from,
      to: {
        ...(isBodyFirst ? fade.right.to : fade.left.to),
        delay: addedDelay,
        scrollTrigger: {
          trigger: triggerElement,
          start: DEFAULT.START,
        },
      },
    };

    gsap.fromTo(graphic, graphicAnimation.from, graphicAnimation.to);
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  // call scrollTrigger refresh once every 500ms for 5 seconds
  let i = 0;
  const interval = setInterval(() => {
    i++;
    ScrollTrigger.refresh();
    if (i === 30) clearInterval(interval);
  }, 500);
}

function safeQuerySelector(element, selector) {
  try {
    return element.querySelector(selector) || element.querySelector(`[class*='${selector}']`);
  } catch (error) {
    // console.error(`Invalid selector for ${selector}:`, error);
    return null;
  }
}
