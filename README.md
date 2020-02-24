[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tweet-delete.svg)](https://npmjs.org/package/tweet-delete)

# tweet-delete

Simple to use CLI tool to help keep your twitter feed clean by removing old tweets and retweets!

- Unlike the various third-party services available, _tweet-delete_ will remove tweets beyond the unfortunate 3200 tweet limit.
- _tweet-delete_ is also more secure by allowing you to not have to send your data to a third-party service. Your tweets stay locally on your computer and never need to be uploaded anywhere.

# Prerequisites

As of 2018, a Twitter development account is needed for this tool to work. Luckily this is a very easy process and anyone can create an account!

Below we will run through all the steps needed to get setup for successfully running the _tweet-delete_ CLI tool.

### Apply for a Twitter Developer Account

Go [here](https://developer.twitter.com/en/apply) to request your a Twitter Developer Account.

1. Under the **Hobbyist** column, select the **Building tools for Twitter Users** option then click **Next**
2. Fill out the rest of the questions and forms as required.
3. When you reach the intended use section, enter something similar to the following:

```
A tool that will be used to remove a Twitter users tweets and retweets after a specified date. This tool will not store any Twitter or user data. Also, there will be no analytics done on any Twitter data.
```

4. Submit the application. The review process is normally very quick and you should be approved within minutes.

### Create Twitter API Keys for Authentication

Once you have been approved for a developer account, go [here](https://apps.twitter.com/app/new) to create an app and generate API keys.

1. Login to the Twitter account that you want to delete tweets from.
2. Click **create an app** in the upper right corner.
3. You will be prompted to Apply for a Twitter developer account if you don't already have one (See above section).
4. Fill out all the required fields in the form.
   1. **App name:** This can be anything.
   2. **Application desceiption:** This can be anything as long as its more than 10 characters.
   3. **Website URL:** I would suggest using this github repo URL [https://github.com/colbymillerdev/tweet-delete](https://github.com/colbymillerdev/tweet-delete)
   4. **Tell us how this app will be used:** This can be anything as long as its more than 100 characters. I would suggest using the description we used in the above section
   ```
   A tool that will be used to remove a Twitter users tweets and retweets after a specified date. This tool will not store any Twitter or user data. Also, there will be no analytics done on any Twitter data.
   ```
5. Click the **Create** button.
6. Click the **Keys and Tokens** tab on the next screen to view the API keys. These will be needed when running the _tweet-delete_ CLI tool.
   1. Make note of the **API key** and the **API secret key** under the **Consumer API Keys** section.
   2. Click **Generate** under the **Access token & access token secret** section. Please copy down the **Access token** and **Access token secret** keys because you won't be able to see them again after closing the popup window without regenerating.

### Download Twitter Data

The next step is to download an archive of all Twitter data for the account.

1. Open the [Your Twitter data](https://twitter.com/settings/your_twitter_data) page.
2. Under the **Download your Twitter data** section, enter your account password.
3. Click the **Download archive** button next to **Twitter**.
4. Wait for Twitter to send you an email saying your archive is ready, then download it.
5. Create a folder on your computer where you will run this CLI tool OR it can be run directly in the unzipped Twitter archive.
   1. If deciding to create a separate folder, open the archive and copy the _tweet.js_ file to the newly created folder.

### Installing Node and NPM

This CLI tool requires having a version of Node and NPM installed on your computer. If you do not have these installed, check out [this documentation](https://www.npmjs.com/get-npm).

# Usage

Go to the folder containing the _tweet.js_ file and run the following command:

```
npx tweet-delete tweets
```

Follow the prompts displayed in the terminal. These will ask for the starting deletion date, as well as the 4 keys from the created Twitter app in your developer account.

**WARNING: THIS IS A DESTRUCTIVE AND PERMANENT OPERATION. ALL TWEETS AFTER AND INCLUDING THAT DATE ENTERED WILL BE DELETED AND UNABLE TO BE RECOVERED.**

# Commands

- [`tweet-delete tweets`](#tweet-delete-tweets)
- [`tweet-delete help [COMMAND]`](#tweet-delete-help-command)

## `tweet-delete tweets`

Keep your Twitter feed clean by removing all tweets before a specified date!

```
USAGE
  $ tweet-delete tweets

OPTIONS

DESCRIPTION
  ...
  Specify a date and tweet-delete will remove all tweets you've ever sent before that date.
```

_See code: [src/commands/tweets.js](https://github.com/colbymillerdev/tweet-delete/blob/v0.0.1/src/commands/tweets.js)_

## `tweet-delete help [COMMAND]`

display help for tweet-delete

```
USAGE
  $ tweet-delete help [COMMAND]

ARGUMENTS
  COMMAND  command to show help

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## Author

Colby Miller | [https://colbymillerdev.com](https://colbymillerdev.com)

## License

[MIT](./LICENSE)
