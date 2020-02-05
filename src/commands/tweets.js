const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const moment = require('moment');
const OAuth = require('oauth');

const config = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
};

const deleteTweet = (tweetId, oauth) => {
  return new Promise(resolve => {
    oauth.post(
      `https://api.twitter.com/1.1/statuses/destroy/${tweetId}.json`,
      config.access_token_key,
      config.access_token_secret,
      {},
      () => {
        resolve();
      }
    );
  });
};

const unretweet = (tweetId, oauth) => {
  return new Promise(resolve => {
    oauth.post(
      `https://api.twitter.com/1.1/statuses/unretweet/${tweetId}.json`,
      config.access_token_key,
      config.access_token_secret,
      {},
      () => {
        resolve();
      }
    );
  });
};

class TweetCommand extends Command {
  async run() {
    const { flags } = this.parse(TweetCommand);
    const inputDate = new Date(flags.date);
    let deleteCount = 0;
    let retweetCount = 0;

    // TODO: Change back to tweet.js
    let originalFile = fs.readFileSync('tweet-copy.js', 'utf8');
    originalFile = originalFile.replace('window.YTD.tweet.part0 = ', '');
    const tweets = JSON.parse(originalFile);

    // TODO: Add in user friendly prompts to gather information.

    // Authenticate.
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      config.consumer_key,
      config.consumer_secret,
      '1.0A',
      null,
      'HMAC-SHA1'
    );

    try {
      await Promise.all(
        tweets.map(async ({ tweet }) => {
          const tweetDate = new Date(tweet.created_at);
          if (moment(tweetDate).isAfter(moment(inputDate))) return;

          if (tweet.full_text.startsWith('RT') || tweet.retweet_status) {
            return unretweet(tweet.id, oauth).then(() => {
              this.log(`Unretweeted tweet ${tweet.id}`);
              retweetCount += 1;
            });
          }

          return deleteTweet(tweet.id, oauth).then(() => {
            this.log(`Deleted tweet ${tweet.id}`);
            deleteCount += 1;
          });
        })
      );
    } catch (e) {
      this.error(
        'It is likely Twitter has updated the JSON structure of tweet.js. Please create an issue at https://github.com/colbymillerdev/tweet-delete/issues so tweet-delete can be updated :)'
      );
    }

    this.log(`${deleteCount} tweet(s) successfully deleted.`);
    this.log(`${retweetCount} tweet(s) successfull unretweeted.`);
  }
}

TweetCommand.description = `Keep your Twitter feed clean by removing all tweets before a specified date!
...
Specify a date and tweet-delete will remove all tweets you've ever sent before that date.
`;

TweetCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  date: flags.string({ char: 'd', description: 'delete all tweets before this date' }),
};

module.exports = TweetCommand;
