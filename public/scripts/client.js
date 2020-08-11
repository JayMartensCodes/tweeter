/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const loadTweets = () => {
    $.ajax('/tweets/', { method: 'GET'})
      .then(function(response) {
        renderTweets(response);
      });
  };

  const renderTweets = (tweets) => {
    const sortedTweets = tweets.sort((a, b) => a.created_at - b.created_at);
    for (const tweet of sortedTweets) {
      renderTweet(tweet);
    }
  };

  const renderTweet = (tweet) => {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
    <div class="tweet-container">
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

  loadTweets();

  $('#submit-tweet-form').submit(function(event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();
    const formData = $(this).serialize();
    if (tweetText.length > 140) {
      $('#tweet-submit-error').html("Tweet is too long!");
      $('#tweet-submit-error').removeClass("hidden");
    } else if (!tweetText.length) { 
      $('#tweet-submit-error').html("Please enter some text to tweet!");
      $('#tweet-submit-error').removeClass("hidden");
    } else {
      $('#tweet-submit-error').addClass("hidden");
      $('#tweet-submit-error').html("");
      $('#tweet-text').val("");
      $.ajax('/tweets/', { method: 'POST', data: formData })
        .then(function(response) {
          loadTweets();
        });
    }
  });
});