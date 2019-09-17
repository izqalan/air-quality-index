#!/usr/bin/env node
'use strict'
require = require('esm')(module /*, options */);

const program = require('commander');

// functions
const {
    search
} = require('../src/function')

program.version('1.0.0')
    .description('Air Quality Index');

program
    .command('find <location>')
    .alias('f')
    .description('find a city/town')
    .action(location => search(location));

program
    .command('findme')
    .alias('fm')
    .description('find local air quality index')
    .action(search('here'));

program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);

