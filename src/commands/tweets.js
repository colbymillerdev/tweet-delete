const { Command, flags } = require('@oclif/command');
//import './tweet.js';
var fs = require('fs');

class TweetCommand extends Command {
  async run() {
    const { flags } = this.parse(TweetCommand);
    const date = flags.date;

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
