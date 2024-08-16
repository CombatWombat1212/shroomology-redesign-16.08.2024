// document.addEventListener("DOMContentLoaded", productPageFix);
// function productPageFix() {
//   if (!window.location.pathname.includes("/product")) return;
//   const variations = document.querySelectorAll(".variations_form");
//   variations.forEach((variation) => productHandleVariations(variation));
// }

// function productHandleVariations(parent) {
//   // const dropdown = parent.querySelector(".select2-selection");
//   const selector = ".select2-selection";

//   // const runs = 10;

//   // let count = 0;
//   // let dropdown;
//   // while (!dropdown){
//   //     dropdown = parent.querySelector(selector);
//   //     count++;
//   //     setTimeout(()=>{}, 100);
//   //     console.log(dropdown);
//   //     if (dropdown || count > runs) break;
//   // }

//   //   let count = 0;
//   //   let dropdown = parent.querySelector(selector);

//   //   const interval = setInterval(() => {
//   //     dropdown = parent.querySelector(selector);
//   //     count++;
//   //     console.log(dropdown);
//   //     if (dropdown || count >= runs) {
//   //       clearInterval(interval);
//   //     }
//   //   }, 100);

//   const dropPromise = new Promise(function (resolve, reject) {
//     function checkDrop() {
//       let elem = parent.querySelector(selector);
//       if (elem) resolve(elem);
//       else setTimeout(() => resolve(getDropdown()), 50);
//     }
//     checkDrop();
//   });

//   dropPromise.then((dropdown) => {

//   })

//   const dropdown = getDropdown();
//   console.log(dropdown);

//   //   const dropdown = getDropdown().then((dropdown) => {
//   //     return dropdown;
//   //   });

//   //   function findDrop() {
//   //     return new Promise(function (myResolve, myReject) {
//   //       dropdown = parent.querySelector(selector);
//   //       if (dropdown) {
//   //         myResolve(dropdown);
//   //       } else {
//   //         setTimeout(() => {
//   //           myResolve(findDrop());
//   //         }, 50);
//   //       }
//   //     });
//   //   }

//   //   findDrop().then((dropdown) => {
//   //     console.log(dropdown);
//   //   });

//   //   if (!dropdown) return;

//   //   dropdown.addEventListener("click", handleClick);

//   //   function handleClick(e) {
//   //     console.log(e);
//   //   }
// }
