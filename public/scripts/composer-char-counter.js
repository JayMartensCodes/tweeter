$(document).ready(function () {
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