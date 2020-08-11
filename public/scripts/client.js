/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.
 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];



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

  const createTweetElement = (tweet) => {
    const tweetCreatedOn = new Date(tweet.created_at);
    const currentDate = new Date();
    const daysSinceTweet = (Math.floor((currentDate.getTime() - tweetCreatedOn.getTime()) / (1000 * 3600 * 24)));
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
      ${tweet.content.text}
    </div>
    <footer>
      <div>
        ${daysSinceTweet} days ago
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
    if (tweetText.length > 140 || !tweetText.length) {
      alert("Invalid tweet!");
    } else {
      $.ajax('/tweets/', { method: 'POST', data: formData })
      .then(function (tweet) {
        loadTweets();
      });
    }
  });
});