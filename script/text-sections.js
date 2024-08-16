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
