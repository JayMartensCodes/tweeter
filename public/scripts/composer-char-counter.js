$(document).ready(function () {
  // event handler for everytime the new tweet form receives an input that updates the character counter live and changes it's color if it ever goes above 140
  $("#tweet-text").on('input', function () {
    const counter = $(this).parent().find('.counter');
    counter.val(140 - $(this).val().length);
    if (counter.val() < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
});