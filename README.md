# tweet-delete

Keeps your twitter feed clean by removing tweets!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tweet-delete.svg)](https://npmjs.org/package/tweet-delete)
[![Downloads/week](https://img.shields.io/npm/dw/tweet-delete.svg)](https://npmjs.org/package/tweet-delete)
[![License](https://img.shields.io/npm/l/tweet-delete.svg)](https://github.com/colbymillerdev/tweet-delete/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g tweet-delete
$ tweet-delete COMMAND
running command...
$ tweet-delete (-v|--version|version)
tweet-delete/0.0.1 darwin-x64 node-v10.15.1
$ tweet-delete --help [COMMAND]
USAGE
  $ tweet-delete COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

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

<!-- commandsstop -->
