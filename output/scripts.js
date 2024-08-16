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

class Stack {
  constructor(parent, inner, children) {
    this.parent = parent;
    this.inner = getSubElements(parent, inner);
    this.children = this.getInnerChildren(this.inner, children);
  }

  getInnerChildren(inner, children) {
    // array of length equal to inner, with each item being an array of children
    // the inner array is a flat array of all the children of the inner element
    return inner.map((innerElement) => {
      return getSubElements(innerElement, children);
    });
  }
}

function parseSelector(selector) {
  // if no selector is provided
  if (!selector) {
    return [];
  }

  // if its an html element
  if (selector instanceof HTMLElement) {
    return [selector];
  }

  // if its a string
  if (typeof selector === "string") {
    return Array.from(document.querySelectorAll(selector));
  }

  // if its an array of html elements
  if (Array.isArray(selector) && selector.every((el) => el instanceof HTMLElement)) {
    return selector;
  }

  // if its an array of strings
  if (Array.isArray(selector) && selector.every((el) => typeof el === "string")) {
    const search = selector.join(", ");
    return Array.from(document.querySelectorAll(search));
  }
}

function getSubElements(parent, sub) {
  // if no sub is provided, get all children
  if (!sub) {
    return Array.from(parent.children);
  }

  // get sub elements based on the selector
  const elements = parseSelector(sub);

  // filter elements to be within the parent
  return elements.filter((el) => parent.contains(el));
}

function defaultStackAnimation(selectors = {}, options = {}) {
  let { parent = null, inner = null, children = null } = selectors;

  let {
    parentDelay = 0,
    innerDelay = DEFAULT.DELAY,
    childDelay = DEFAULT.DELAY / 2,
    duration = DEFAULT.DURATION,
    animation = fade.up,
  } = options;

  const parents = parseSelector(parent);
  if (parents.length === 0) return;

  const rows = Array.from(parents).map((parent) => new Stack(parent, inner, children));

  rows.forEach((row) => row.inner.forEach((inner, i) => handleRowInner(row, inner, i)));

  function handleRowInner(row, inner, i) {
    const children = row.children[i];
    row.index = i;

    children.forEach((child, j) => {
      const delay = parentDelay + innerDelay * i + childDelay * j;
      animation = getAnimation(row, delay);
      gsap.fromTo(child, animation.from, animation.to);
    });
  }

  function getAnimation(row, delay) {
    let ani = animation;

    // if animation is an array, get the animation based on the index
    if (Array.isArray(ani) && ani.length === row.inner.length) {
      ani = ani[row.index];
    }

    const scrollTrigger = {
      trigger: row.parent,
      start: DEFAULT.START,
    };

    ani = {
      from: {
        ...ani.from,
      },
      to: {
        ...ani.to,
        delay,
        duration,
      },
    };

    ani.to = {
      ...ani.to,
      scrollTrigger,
    };

    return ani;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const updateElementProperty = ({ watch, target, property = "width", name, all = false }) => {
    const watchedElements = all
      ? document.querySelectorAll(watch)
      : [document.querySelector(watch)];
    if (!watchedElements.length) return;

    watchedElements.forEach((watchedElement) => {
      const computedValue = window.getComputedStyle(watchedElement)[property];
      const targetElements = all
        ? document.querySelectorAll(target)
        : [document.querySelector(target)];
      targetElements.forEach((targetElement) => {
        if (targetElement) {
          if (name) {
            targetElement.style.setProperty(name, computedValue);
          } else {
            targetElement.style[property] = computedValue;
          }
        }
      });
    });
  };

  const createObserver = ({ watch, target, property = "width", name, all = false }) => {
    const debouncedUpdateProperty = debounce(
      () => updateElementProperty({ watch, target, property, name, all }),
      100,
    );

    const observer = new MutationObserver(debouncedUpdateProperty);
    const config = { attributes: true, childList: true, subtree: true };

    const watchedElements = all
      ? document.querySelectorAll(watch)
      : [document.querySelector(watch)];
    watchedElements.forEach((watchedElement) => {
      if (watchedElement) {
        observer.observe(watchedElement, config);
      }
    });

    window.addEventListener("resize", debouncedUpdateProperty);
    debouncedUpdateProperty();
  };

  window.createObserver = createObserver;
});

jQuery(document).ready(function ($) {
  $(".next-project h3 span").text(function () {
    return $(this).text().replace("Next Project", "Next Article");
  });

  $(".previous-project h3 span").text(function () {
    return $(this).text().replace("Previous Project", "Previous Article");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Create the invisible container elements
  const createContainer = (className) => {
    const container = document.createElement("div");
    container.className = className;
    container.style.width = "100%";
    container.style.opacity = "0";
    container.style.visibility = "hidden";
    container.style.pointerEvents = "none";
    container.style.zIndex = "-1";
    document.body.insertAdjacentElement("afterbegin", container);
    return container;
  };

  const container = createContainer("container");

  // Function to set the CSS variables
  const setMaxWidth = () => {
    const computedStyle = getComputedStyle(container);
    const maxWidth = computedStyle.width;
    const marginLeft = parseFloat(computedStyle.marginLeft);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);

    const margin = `${marginLeft + paddingLeft}px`;
    document.documentElement.style.setProperty(
      "--site--max-width__px",
      maxWidth,
    );
    document.documentElement.style.setProperty(
      "--site--container-margin__px",
      margin,
    );
  };

  // Debounce function to limit the rate of function calls
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Run the setMaxWidth function after a timeout of 0s to ensure everything is loaded
  setTimeout(setMaxWidth, 0);

  // Add a resize event listener with debounce
  window.addEventListener("resize", debounce(setMaxWidth, 0));
});

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

document.addEventListener('DOMContentLoaded', function() {
    // Check if the current path is the home page
    if (window.location.pathname === '/') {
        // Wait for 500ms
        setTimeout(function() {
            // Trigger a resize event
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }
});

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
  
document.addEventListener("DOMContentLoaded", () => {
  defaultAnimateGroup(".logo-row--col", {animation: pop.in, trigger: ".wpb_row"});
});

function mirrorstyle(parentSelector, matchSelector) {
  const RESIZE_TIMEOUT = 150; // Adjust as needed
  const allMirrorstyleParents = document.querySelectorAll(parentSelector);
  const allMirrorstyleMatches = document.querySelectorAll(matchSelector);

  function clearMirrorstylesOnElement(element) {
    const affectedProperty = element.getAttribute("mirrorstyle-properties");
    let styleAttr = element.getAttribute("style") || "";
    const propertyRegExp = new RegExp(`\\s*${affectedProperty}\\s*:\\s*[^;]+;?`, "i");
    const updatedStyleAttr = styleAttr.replace(propertyRegExp, "");
    element.setAttribute("style", updatedStyleAttr);
    element.removeAttribute("mirrorstyle-properties");
  }

  function clearMirrorStyles() {
    const elementsWithMirrorStyleProp = document.querySelectorAll("[mirrorstyle-properties]");
    const elementsToClear = Array.from(elementsWithMirrorStyleProp).filter(
      (element) => !Array.from(allMirrorstyleMatches).includes(element),
    );
    elementsToClear.forEach(clearMirrorstylesOnElement);
  }

  function attachMirrorStyleObservers(elements) {
    elements.forEach((element) => {
      if (element.getAttribute("mirrorstyle-observing") === "true") return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "mirrorstyle") {
            handleMirrorstyleChange(mutation);
          }
        });
      });

      observer.observe(element, {
        attributes: true,
        attributeFilter: ["mirrorstyle"],
        attributeOldValue: true,
      });
      element.setAttribute("mirrorstyle-observing", "true");
    });
  }

  function handleMirrorstyleChange(mutation) {
    const prevValue = mutation.oldValue;
    const newValue = mutation.target.getAttribute("mirrorstyle");

    if (prevValue && !newValue) {
      clearMirrorstylesOnElement(mutation.target);
    }
  }

  function addStyleNonDestructive(element, property, value) {
    let styleAttr = element.getAttribute("style") || "";
    const propertyRegExp = new RegExp(`\\s*${property}\\s*:\\s*[^;]+;?`, "i");
    const updatedStyleAttr = styleAttr.replace(propertyRegExp, "");
    element.setAttribute("style", `${updatedStyleAttr} ${property}: ${value};`);
  }

  function splitPx(value) {
    return parseFloat(value.replace("px", ""));
  }

  function mirrorstyle() {
    clearMirrorStyles();
    attachMirrorStyleObservers(allMirrorstyleParents);
    attachMirrorStyleObservers(allMirrorstyleMatches);

    const allMirrorstyleMatchGroups = [];
    const allMirrorstyleMatchGroupIDs = [];

    allMirrorstyleMatches.forEach((element) => {
      const mirrorstyleMatchGroupID = element.getAttribute("mirrorstyle-group");
      if (!allMirrorstyleMatchGroupIDs.includes(mirrorstyleMatchGroupID)) {
        allMirrorstyleMatchGroupIDs.push(mirrorstyleMatchGroupID);
      }
    });

    allMirrorstyleMatchGroupIDs.forEach((groupID) => {
      const mirrorstyleMatchGroup = document.querySelectorAll(`[mirrorstyle-group="${groupID}"]`);
      allMirrorstyleMatchGroups.push(mirrorstyleMatchGroup);
    });

    allMirrorstyleMatchGroups.forEach((group) => {
      const property = group[0].getAttribute("mirrorstyle-property");
      let maxVal = 0;

      group.forEach((element) => {
        addStyleNonDestructive(element, property, "fit-content");
        element.setAttribute("mirrorstyle-properties", property);
      });

      group.forEach((element) => {
        const matchChildPropertyVal = splitPx(
          window.getComputedStyle(element, null).getPropertyValue(property),
        );
        if (matchChildPropertyVal > maxVal) {
          maxVal = matchChildPropertyVal;
        }
      });

      group.forEach((element) => {
        addStyleNonDestructive(element, property, `${maxVal}px`);
        element.setAttribute("mirrorstyle-properties", property);
      });
    });
  }

  mirrorstyle();
}

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

// document.addEventListener("DOMContentLoaded", () => {
//   // Create a temporary element to get the pixel value of var(--font-size--h1)
//   const tempElement = document.createElement("div");
//   tempElement.style.fontSize = "var(--font-size--h1)";
//   document.body.appendChild(tempElement);
//   const h1FontSize = getComputedStyle(tempElement).fontSize;
//   document.body.removeChild(tempElement);

//   // Function to check if an element has the specified font size
//   function hasH1FontSize(element) {
//     const computedFontSize = getComputedStyle(element).fontSize;
//     return computedFontSize === h1FontSize;
//   }

//   // Get all elements in the document
//   const allElements = document.querySelectorAll("*");

//   // Filter elements that have the specified font size
//   let elementsWithH1FontSize = Array.from(allElements).filter(hasH1FontSize);

//   // Replace sub-elements <b>, <em>, <i> with their parent elements
//   elementsWithH1FontSize = elementsWithH1FontSize.map((element) => {
//     if (["B", "EM", "I"].includes(element.tagName)) {
//       return element.parentElement;
//     }
//     return element;
//   });

//   // Remove duplicates
//   const uniqueElements = [...new Set(elementsWithH1FontSize)];
// });

