/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};


$(document).ready(function() {
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

  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);
});