const { Command, flags } = require('@oclif/command');
const fs = require('fs');

class TweetCommand extends Command {
  async run() {
    const { flags } = this.parse(TweetCommand);
    const date = flags.date;
    let deleteCount = 0;

    // Read in file and replace assignment to create parsed JSON.
    // TODO: Change back to tweet.js
    let originalFile = fs.readFileSync('tweet-copy.js', 'utf8');
    originalFile = originalFile.replace('window.YTD.tweet.part0 = ', '');
    const tweets = JSON.parse(originalFile);

    try {
      tweets.forEach(({ tweet }) => {
        // Check for retweet, don't delete.
        if (tweet.full_text.startsWith('RT')) return console.log('RETWEET');

        console.log(tweet.id);
      });
    } catch (e) {
      this.error(
        'It is likely Twitter has updated the JSON structure of tweet.js. Please create an issue at https://github.com/colbymillerdev/tweet-delete/issues so tweet-delete can be updated :)'
      );
    }

    this.log(`Delete all tweets on and before ${date}`);
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
