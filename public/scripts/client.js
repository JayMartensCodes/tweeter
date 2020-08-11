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
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
]

$(document).ready(function() {

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
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

  renderTweets(data);
});