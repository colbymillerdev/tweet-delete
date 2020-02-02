const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const moment = require('moment');

class TweetCommand extends Command {
  async run() {
    const { flags } = this.parse(TweetCommand);
    const inputDate = new Date(flags.date);
    let deleteCount = 0;
    let retweetCount = 0;
    let afterDateCount = 0;

    // Read in file and replace assignment to create parsed JSON.
    // TODO: Change back to tweet.js
    let originalFile = fs.readFileSync('tweet-copy.js', 'utf8');
    originalFile = originalFile.replace('window.YTD.tweet.part0 = ', '');
    const tweets = JSON.parse(originalFile);

    // TODO: Add in user friendly prompts to gather information.
    // TODO: Setup Twitter API connections and keys.
    try {
      tweets.forEach(({ tweet }) => {
        // If tweet date is after the input date, don't delete.
        const tweetDate = new Date(tweet.created_at);
        if (moment(tweetDate).isAfter(moment(inputDate))) {
          afterDateCount += 1;
          return;
        }

        // If retweet, don't attempt delete.
        if (tweet.full_text.startsWith('RT')) {
          retweetCount += 1;
          return;
        }

        // TODO: Make call to Twitter API to delete tweet.
        console.log(`Deteting tweet with ID = ${tweet.id}`);
        deleteCount += 1;
        return;
      });
    } catch (e) {
      console.log(e);
      this.error(
        'It is likely Twitter has updated the JSON structure of tweet.js. Please create an issue at https://github.com/colbymillerdev/tweet-delete/issues so tweet-delete can be updated :)'
      );
    }

    this.log(`${deleteCount} tweets were successfully deleted.`);
    this.log(`${afterDateCount} tweets were after the specified date and NOT deleted.`);
    this.log(`${retweetCount} tweets were retweeted from other users and NOT deleted.`);
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
