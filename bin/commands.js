#!/usr/bin/env node

require = require('esm')(module /*, options */);


const program = require('commander');


// functions
const {
    search
} = require('../src/function')

program.version('1.0.3')
    .description('Air Quality Index');

program
    .command('find [query]')
    .alias('f')
    .description('find a city/town')
    .action(location => search(location));


program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);

