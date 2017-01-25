#!/usr/bin/env node
'use strict'
const meow = require('meow')
const fn = require('./')

const cli = meow(`
  Usage
    $ battery-percentage

  Options
    -v, --verbose     Get all info

  Example
    $ battery-percentage
    36%
`, {
  alias: {
    v: 'verbose'
  }
})

fn(cli.flags).then(res => console.log(res))
