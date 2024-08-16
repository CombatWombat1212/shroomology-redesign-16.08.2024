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
