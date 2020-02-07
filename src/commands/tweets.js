const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const moment = require('moment');
const OAuth = require('oauth');
const inquirer = require('inquirer');
const { cli } = require('cli-ux');
const chalk = require('chalk');

const config = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
};

const deleteTweet = (tweetId, oauth) => {
  return new Promise((resolve, reject) => {
    oauth.post(
      `https://api.twitter.com/1.1/statuses/destroy/${tweetId}.json`,
      config.access_token_key,
      config.access_token_secret,
      {},
      (e, data) => {
        if (e) {
          reject();
        } else {
          resolve();
        }
      }
    );
  });
};

const unretweet = (tweetId, oauth) => {
  return new Promise((resolve, reject) => {
    oauth.post(
      `https://api.twitter.com/1.1/statuses/unretweet/${tweetId}.json`,
      config.access_token_key,
      config.access_token_secret,
      {},
      (e, data) => {
        if (e) {
          reject();
        } else {
          resolve();
        }
      }
    );
  });
};

const inputValidator = value => {
  if (value === '') return 'Please enter a value';
  return true;
};

const dateValidator = value => {
  const validDate = moment(value, 'MM-DD-YYYY', true).isValid();
  if (validDate) return true;
  return 'Please enter a valid date (MM-DD-YYYY)';
};

class TweetCommand extends Command {
  async run() {
    let deleteCount = 0;
    let retweetCount = 0;

    // TODO: Change back to tweet.js
    let originalFile = fs.readFileSync('tweet-copy.js', 'utf8');
    originalFile = originalFile.replace('window.YTD.tweet.part0 = ', '');
    const tweets = JSON.parse(originalFile);

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
      // Provide user with a set of prompts.
      const responses = await inquirer.prompt([
        {
          type: 'input',
          name: 'inputDate',
          message: chalk.blue('Delete tweets starting from what date?'),
          default: moment().format('MM-DD-YYYY'),
          validate: dateValidator,
        },
        {
          type: 'input',
          name: 'consumerKey',
          message: chalk.magenta('Enter your "API Key" value:'),
          validate: inputValidator,
        },
        {
          type: 'input',
          name: 'consumerSecret',
          message: chalk.blue('Enter your "API Secret Key" value:'),
          validate: inputValidator,
        },
        {
          type: 'input',
          name: 'accessTokenKey',
          message: chalk.magenta('Enter your "Access Token" value:'),
          validate: inputValidator,
        },
        {
          type: 'input',
          name: 'accessTokenSecret',
          message: chalk.blue('Enter your "Access Token Secret" value:'),
          validate: inputValidator,
        },
      ]);

      // Set config properties.
      config.consumer_key = responses.consumerKey;
      config.consumer_secret = responses.consumerSecret;
      config.access_token_key = responses.accessTokenKey;
      config.access_token_secret = responses.accessTokenSecret;

      const inputDate = new Date(responses.inputDate);

      cli.action.start(chalk.red('Deleting tweets 💥'));

      await Promise.all(
        tweets.map(async ({ tweet }) => {
          const tweetDate = new Date(tweet.created_at);
          if (moment(tweetDate).isAfter(moment(inputDate))) return;

          if (tweet.full_text.startsWith('RT') || tweet.retweet_status) {
            return unretweet(tweet.id, oauth)
              .then(() => {
                this.log(`Unretweeted tweet ${tweet.id}`);
                retweetCount += 1;
              })
              .catch(() => this.log(chalk.gray(`There was an issue trying to unretweet tweet ${tweet.id}`)));
          }

          return deleteTweet(tweet.id, oauth)
            .then(() => {
              this.log(`Deleted tweet ${tweet.id}`);
              deleteCount += 1;
            })
            .catch(() => this.log(chalk.gray(`There was an issue trying to delete tweet ${tweet.id}`)));
        })
      );

      cli.action.stop(chalk.white('done'));
    } catch (e) {
      this.error(
        `It is possible Twitter has updated the JSON structure of tweet.js. Please create an issue at ${chalk.underline.bold(
          'https://github.com/colbymillerdev/tweet-delete/issues'
        )} so tweet-delete can be updated 🙂`
      );
    }

    this.log(chalk.white(`${deleteCount} tweet(s) successfully deleted.`));
    this.log(chalk.white(`${retweetCount} tweet(s) successfull unretweeted.`));
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
};

module.exports = TweetCommand;
