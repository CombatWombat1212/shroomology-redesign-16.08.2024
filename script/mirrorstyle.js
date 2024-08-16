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
