const { Command, flags } = require('@oclif/command');

class TweetDeleteCommand extends Command {
  async run() {
    const { flags } = this.parse(TweetDeleteCommand);
    const date = flags.date;

    // TODO: All logic will go here.

    this.log(`Delete all tweets on and before ${data}`);
  }
}

TweetDeleteCommand.description = `Keep your Twitter feed clean by removing all tweets before a specified date!
...
Specify a date and tweet-delete will remove all tweets you've ever sent before that date.
`;

TweetDeleteCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  date: flags.string({ char: 'd', description: 'delete all tweets before this date' }),
};

module.exports = TweetDeleteCommand;
