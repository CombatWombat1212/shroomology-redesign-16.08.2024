jQuery(document).ready(function ($) {
  $(".next-project h3 span").text(function () {
    return $(this).text().replace("Next Project", "Next Article");
  });

  $(".previous-project h3 span").text(function () {
    return $(this).text().replace("Previous Project", "Previous Article");
  });
});
