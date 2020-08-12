/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  //make a request for the tweets then call the render function
  const loadTweets = () => {
    $.ajax('/tweets/', {
        method: 'GET'
      })
      .then(function (response) {
        renderTweets(response);
      });
  };
  // renders all tweets
  const renderTweets = (tweets) => {
    const sortedTweets = tweets.sort((a, b) => a.created_at - b.created_at);
    for (const tweet of sortedTweets) {
      renderTweet(tweet);
    }
  };
  // parses a tweet based on the template
  const renderTweet = (tweet) => {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  };
  // escapes user inputed code to avoid XSS attacks
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // tweet template
  const createTweetElement = (tweet) => {
    return (`
    <article>
    <header>
      <div>
        <div>
          <img src="${tweet.user.avatars}">
        </div>
        <div>
          ${tweet.user.name}
        </div>
      </div>
      <div class="handle">
        ${tweet.user.handle}
      </div>
    </header>
    <div class="tweet-text-container">
      ${escape(tweet.content.text)}
    </div>
    <footer>
      <div>
        ${moment(tweet.created_at).fromNow()}
      </div>
      <div>
        <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
    `);
  };
  // handles the form submit (validates, sends errors if neccesarry, posts if no errors) then reloads tweets
  $('#submit-tweet-form').submit(function (event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();
    const formData = $(this).serialize();
    if (tweetText.length > 140) {
      $('#tweet-submit-error').html("Tweet is too long!");
      $('#tweet-submit-error').slideDown("slow");
    } else if (!tweetText.length) {
      $('#tweet-submit-error').html("Please enter some text to tweet!");
      $('#tweet-submit-error').slideDown("slow");
    } else {
      $('#tweet-submit-error').slideUp("slow");
      $('#tweet-text').val("");
      $('.counter').val(140);
      $.ajax('/tweets/', {
          method: 'POST',
          data: formData
        })
        .then(function (response) {
          loadTweets();
        });
    }
  });
  // event handler for the write tweet button that shows and hides the new tweet form
  $('#write-tweet').on('click', function () {
    const $newTweet = $("#new-tweet");
    if ($newTweet.is(":hidden")) {
      $newTweet.slideDown("slow");
      $('#tweet-text').focus();
    } else {
      $newTweet.slideUp("slow");
    }
  });

  loadTweets();
});